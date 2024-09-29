import { ResponsiveBar } from '@nivo/bar';
import { formatISO9075 } from 'date-fns';

export interface PeriodMonth {
  month: number;
  count1D: number;
  count2D: number;
  count1H: number;
  count13C: number;
  count1H1H: number;
  count1H13C: number;
  countOtherNuclei: number;
  [key: string]: number | string;
}
export interface PeriodYear {
  year: number;
  count1D: number;
  count2D: number;
  count1H: number;
  count13C: number;
  count1H1H: number;
  count1H13C: number;
  countOtherNuclei: number;
  [key: string]: number | string;
}

export interface Stats {
  lastUpdate: number;
  nbFiles: number;
  nbNMRs: number;
  nb1D: number;
  nb2D: number;
  nbIsFid: number;
  nbIsFt: number;
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

export function NMRStatsGraph(props: NMRStatsGraphProps) {
  const { data } = props;

  return (
    <div>
      <div>
        <p>Last update: {formatISO9075(data.lastUpdate)}</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
          }}
        >
          <p>Last month: xxx</p>
          <p>Last 12 months: xxx</p>
          <p>Nb spectra:: {data.nbNMRs}</p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
        }}
      >
        <div
          style={{
            height: 400,
            width: 400,
          }}
        >
          <ResponsiveBar
            data={data.perMonths}
            keys={[
              'count1D',
              'count2D',
              'count1H',
              'count13C',
              'count1H1H',
              'count1H13C',
              'countOtherNuclei',
            ]}
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
              legendOffset: -40,
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
            ariaLabel="Nivo bar chart demo"
          />
        </div>
        <div
          style={{
            height: 400,
            width: 400,
          }}
        >
          <ResponsiveBar
            data={data.perYears}
            keys={[
              'count1D',
              'count2D',
              'count1H',
              'count13C',
              'count1H1H',
              'count1H13C',
              'countOtherNuclei',
            ]}
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
              legend: 'Year',
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
              legendOffset: -40,
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
            ariaLabel="Nivo bar chart demo"
          />
        </div>
      </div>
    </div>
  );
}
