import { Select } from '@blueprintjs/select';
import styled from '@emotion/styled';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { formatISO9075 } from 'date-fns';

import { Button } from '../button/Button';
import { useSelect } from '../hooks/useSelect';

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const UpdateInfo = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: #888;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;

  /* Adjust padding on mobile */
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.p`
  margin: 0;
  font-size: 22px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CardNumber = styled.h3`
  margin: 30px;
  font-size: 36px;
  text-align: center;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 28px;
    margin: 15px;
  }
`;

const ChartPieTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InnerChartContainer = styled.div`
  height: 400px;

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (min-width: 1440px) {
    height: 500px;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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

export interface EntryStat {
  count: number;
  lastModified: number;
  value: string;
}
export interface ArrayStats {
  total: EntryStat[];
  last12Months: EntryStat[];
  lastMonth: EntryStat[];
}
export interface Stats {
  lastUpdate: number;
  nbFiles: ValueStats;
  nbNMRs: ValueStats;
  nb1D: ValueStats;
  nb2D: ValueStats;
  nbIsFid: ValueStats;
  nbIsFt: ValueStats;
  solvents: ArrayStats;
  formats: ArrayStats;
  nuclei: ArrayStats;
  pulseSequences: ArrayStats;
  usernames: ArrayStats;
  groupNames: ArrayStats;
  sources: ArrayStats;
  perMonths: PeriodMonth[];
  perYears: PeriodYear[];
}

interface NMRStatsGraphProps {
  data: Stats;
}

function getData(data: Stats) {
  const perMonths = data.perMonths.map((m) => ({
    month: m.month,
    '1H': m.count1H,
    '13C': m.count13C,
    '1H,1H': m.count1H1H,
    '1H,13C': m.count1H13C,
    'Other Nuclei': m.countOtherNuclei,
  }));

  const perYears = data.perYears.map((m) => ({
    year: m.year,
    '1H': m.count1H,
    '13C': m.count13C,
    '1H,1H': m.count1H1H,
    '1H,13C': m.count1H13C,
    'Other Nuclei': m.countOtherNuclei,
  }));

  return {
    perMonths,
    perYears,
  };
}

function getPieData(data: EntryStat[], total: number, threshold = 0.03) {
  const outData = data.filter((s) => s.count / total > threshold);
  const otherData = data.filter((s) => s.count / total <= threshold);

  for (const s of otherData) {
    const index = outData.findIndex((sol) => sol.value === 'Other');
    if (index === -1) {
      outData.push({ value: 'Other', count: s.count, lastModified: 0 });
    } else {
      outData[index].count += s.count;
    }
  }

  return outData;
}

interface SelectType {
  label: string;
  key: keyof ArrayStats;
}

export function NMRDashboard(props: NMRStatsGraphProps) {
  const { data } = props;

  const defaultSelectedItem: SelectType = {
    label: 'Last year',
    key: 'last12Months',
  };

  const selectItems: SelectType[] = [
    {
      label: 'Last month',
      key: 'lastMonth',
    },
    {
      label: 'Last year',
      key: 'last12Months',
    },
    {
      label: 'All time',
      key: 'total',
    },
  ];

  const { value: valueSolvents, ...defaultPropsSolvents } =
    useSelect<SelectType>({
      itemTextKey: 'label',
      defaultSelectedItem,
    });
  const { value: valueNuclei, ...defaultPropsNuclei } = useSelect<SelectType>({
    itemTextKey: 'label',
    defaultSelectedItem,
  });
  const { value: valuePulseSequences, ...defaultPropsPulseSequences } =
    useSelect<SelectType>({
      itemTextKey: 'label',
      defaultSelectedItem,
    });

  const { perMonths, perYears } = getData(data);

  const solvents = getPieData(
    data.solvents[valueSolvents?.key || defaultSelectedItem.key],
    data.nbNMRs[valueSolvents?.key || defaultSelectedItem.key],
  );

  const nuclei = getPieData(
    data.nuclei[valueNuclei?.key || defaultSelectedItem.key],
    data.nbNMRs[valueNuclei?.key || defaultSelectedItem.key],
  );

  const pulseSequences = getPieData(
    data.pulseSequences[valuePulseSequences?.key || defaultSelectedItem.key],
    data.nbNMRs[valuePulseSequences?.key || defaultSelectedItem.key],
  );

  return (
    <Container>
      <UpdateInfo>
        <p>Last update: {formatISO9075(data.lastUpdate)}</p>
      </UpdateInfo>

      <CardContainer>
        <Card>
          <Title>Last month</Title>
          <CardNumber>{data.nbNMRs.lastMonth}</CardNumber>
        </Card>
        <Card>
          <Title>Last 12 months</Title>
          <CardNumber>{data.nbNMRs.last12Months}</CardNumber>
        </Card>
        <Card>
          <Title>All time</Title>
          <CardNumber>{data.nbNMRs.total}</CardNumber>
        </Card>
      </CardContainer>

      <CardsWrapper>
        <Card>
          <Title>Nb Spectra per Month</Title>
          <InnerChartContainer>
            <ResponsiveBar
              data={perMonths}
              keys={['1H', '13C', '1H1H', '1H13C', 'OtherNuclei']}
              indexBy="month"
              margin={{ top: 10, right: 30, bottom: 90, left: 60 }}
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
                legend: 'Nb spectra',
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
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 75,
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
        </Card>

        <Card>
          <Title>Nb Spectra per year</Title>
          <InnerChartContainer>
            <ResponsiveBar
              data={perYears}
              keys={['1H', '13C', '1H1H', '1H13C', 'OtherNuclei']}
              indexBy="year"
              margin={{ top: 10, right: 30, bottom: 90, left: 60 }}
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
                legend: 'Nb spectra',
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
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 75,
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
        </Card>
      </CardsWrapper>

      <CardsWrapper>
        <Card>
          <ChartPieTitle>
            <Title>Solvents Distribution</Title>
            <Select
              items={selectItems}
              filterable={false}
              itemsEqual="label"
              {...defaultPropsSolvents}
            >
              <Button
                minimal
                text={valueSolvents?.label}
                rightIcon="caret-down"
              />
            </Select>
          </ChartPieTitle>
          <InnerChartContainer>
            <ResponsivePie
              data={solvents}
              id="value"
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
        </Card>
        <Card>
          <ChartPieTitle>
            <Title>Nuclei Distribution</Title>
            <Select
              items={selectItems}
              filterable={false}
              itemsEqual="label"
              {...defaultPropsNuclei}
            >
              <Button
                minimal
                text={valueNuclei?.label}
                rightIcon="caret-down"
              />
            </Select>
          </ChartPieTitle>
          <InnerChartContainer>
            <ResponsivePie
              data={nuclei}
              id="value"
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
        </Card>
        <Card>
          <ChartPieTitle>
            <Title>Pulse Sequences Distribution</Title>
            <Select
              items={selectItems}
              filterable={false}
              itemsEqual="label"
              {...defaultPropsPulseSequences}
            >
              <Button
                minimal
                text={valuePulseSequences?.label}
                rightIcon="caret-down"
              />
            </Select>
          </ChartPieTitle>
          <InnerChartContainer>
            <ResponsivePie
              data={pulseSequences}
              id="value"
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
        </Card>
      </CardsWrapper>
    </Container>
  );
}
