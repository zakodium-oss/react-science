import styled from '@emotion/styled';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { formatISO9075 } from 'date-fns';

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

const UpdateInfo = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: #888;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const CardTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const ChartContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const ChartTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 22px;
  text-align: center;
  font-weight: bold;
`;

const InnerChartContainer = styled.div`
  height: 400px;
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;
interface Period {
  count: number;
  count1D: number;
  count2D: number;
  count1H: number;
  count13C: number;
  count1H1H: number;
  count1H13C: number;
  countOtherNuclei: number;
  [key: string]: number;
}
export interface PeriodYear extends Period {
  year: number;
  firstDayOfYearEpoch: number;
}

export interface PeriodMonth extends Period {
  month: number;
  firstDayOfMonthEpoch: number;
}

export interface ValueStats {
  total: number;
  last12Months: number;
  lastMonth: number;
}
export interface Stats {
  lastUpdate: number;
  nbFiles: ValueStats;
  nbNMRs: ValueStats;
  nb1D: ValueStats;
  nb2D: ValueStats;
  nbIsFid: ValueStats;
  nbIsFt: ValueStats;
  solvents: Array<{ count: number; solvent: string }>;
  formats: Array<{ count: number; format: string }>;
  nuclei: Array<{ count: number; nucleus: string }>;
  pulseSequences: Array<{ count: number; pulseSequence: string }>;
  users: Array<{ count: number; lastModified: number; username: string }>;
  sources: Array<{ count: number; lastModified: number; source: string }>;
  perMonths: PeriodMonth[];
  perYears: PeriodYear[];
}

interface NMRStatsGraphProps {
  data: Stats;
}

function getData(data: Stats, threshold = 0.03) {
  const total = data.nbNMRs.total;

  const solvent = data.solvents.filter((s) => s.count / total > threshold);
  const otherSolvent = data.solvents.filter(
    (s) => s.count / total <= threshold,
  );

  for (const s of otherSolvent) {
    const index = solvent.findIndex((sol) => sol.solvent === 'Other');
    if (index === -1) {
      solvent.push({ solvent: 'Other', count: s.count });
    } else {
      solvent[index].count += s.count;
    }
  }
  const nuclei = data.nuclei.filter((s) => s.count / total > threshold);
  const otherNuclei = data.nuclei.filter((s) => s.count / total <= threshold);

  for (const s of otherNuclei) {
    const index = nuclei.findIndex((sol) => sol.nucleus === 'Other');
    if (index === -1) {
      nuclei.push({ nucleus: 'Other', count: s.count });
    } else {
      nuclei[index].count += s.count;
    }
  }

  const pulseSequences = data.pulseSequences.filter(
    (s) => s.count / total > threshold,
  );
  const otherPulseSequences = data.pulseSequences.filter(
    (s) => s.count / total <= threshold,
  );

  for (const s of otherPulseSequences) {
    const index = pulseSequences.findIndex(
      (sol) => sol.pulseSequence === 'Other',
    );
    if (index === -1) {
      pulseSequences.push({ pulseSequence: 'Other', count: s.count });
    } else {
      pulseSequences[index].count += s.count;
    }
  }

  const perMonths = data.perMonths.map((m) => ({
    month: m.month,
    '1H': m.count1H,
    '13C': m.count13C,
    '1H1H': m.count1H1H,
    '1H13C': m.count1H13C,
    OtherNuclei: m.countOtherNuclei,
  }));

  const perYears = data.perYears.map((m) => ({
    year: m.year,
    '1H': m.count1H,
    '13C': m.count13C,
    '1H1H': m.count1H1H,
    '1H13C': m.count1H13C,
    OtherNuclei: m.countOtherNuclei,
  }));

  return {
    solvents: solvent,
    nuclei,
    pulseSequences,
    perMonths,
    perYears,
  };
}
export function NMRDashboard(props: NMRStatsGraphProps) {
  const { data } = props;

  const { solvents, nuclei, pulseSequences, perMonths, perYears } =
    getData(data);

  return (
    <Container>
      <UpdateInfo>
        <p>Last update: {formatISO9075(data.lastUpdate)}</p>
      </UpdateInfo>

      <CardContainer>
        <Card>
          <CardTitle>Last month</CardTitle>
          <p>{data.nbNMRs.lastMonth}</p>
        </Card>
        <Card>
          <CardTitle>Last 12 months</CardTitle>
          <p>{data.nbNMRs.last12Months}</p>
        </Card>
        <Card>
          <CardTitle>Number of spectra</CardTitle>
          <p>{data.nbNMRs.total}</p>
        </Card>
      </CardContainer>

      <CardsWrapper>
        <ChartContainer>
          <ChartTitle>Monthly Spectra</ChartTitle>
          <InnerChartContainer>
            <ResponsiveBar
              data={perMonths}
              keys={['1H', '13C', '1H1H', '1H13C', 'OtherNuclei']}
              indexBy="month"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={{ scheme: 'nivo' }}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Spectrum count',
                legendPosition: 'middle',
                legendOffset: -50,
                truncateTickAt: 0,
                format: (v) => (v > 1000 ? `${v / 1000}k` : v),
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
              }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
            />
          </InnerChartContainer>
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>Yearly Spectra</ChartTitle>
          <InnerChartContainer>
            <ResponsiveBar
              data={perYears}
              keys={['1H', '13C', '1H1H', '1H13C', 'OtherNuclei']}
              indexBy="year"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={{ scheme: 'nivo' }}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Spectrum count',
                legendPosition: 'middle',
                legendOffset: -50,
                truncateTickAt: 0,
                format: (v) => (v > 1000 ? `${v / 1000}k` : v),
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
              }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
            />
          </InnerChartContainer>
        </ChartContainer>
      </CardsWrapper>

      <CardsWrapper>
        <ChartContainer>
          <ChartTitle>Solvents Distribution</ChartTitle>
          <InnerChartContainer>
            <ResponsivePie
              data={solvents}
              id="solvent"
              value="count"
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
              }}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
            />
          </InnerChartContainer>
        </ChartContainer>
        <ChartContainer>
          <ChartTitle>Nuclei Distribution</ChartTitle>
          <InnerChartContainer>
            <ResponsivePie
              data={nuclei}
              id="nucleus"
              value="count"
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
              }}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 80,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
            />
          </InnerChartContainer>
        </ChartContainer>
        <ChartContainer>
          <ChartTitle>Pulse Sequences Distribution</ChartTitle>
          <InnerChartContainer>
            <ResponsivePie
              data={pulseSequences}
              id="pulseSequence"
              value="count"
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              startAngle={-50}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={0}
              arcLabelsTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
              }}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 80,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
            />
          </InnerChartContainer>
        </ChartContainer>
      </CardsWrapper>
    </Container>
  );
}
