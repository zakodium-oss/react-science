interface BoxPlotProps {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
  markers?: number[];
  scaleMin?: number;
  scaleMax?: number;
  width?: number;
  height?: number;
  medianStyle?: React.CSSProperties;
  quartileStyle?: React.CSSProperties;
  whiskerStyle?: React.CSSProperties;
  outlierStyle?: React.CSSProperties;
  outlierRadius?: number;
  markerStyle?: React.CSSProperties;
  markerRadius?: number;
  lineStyle?: React.CSSProperties;
}

export function BoxPlot(props: BoxPlotProps) {
  const {
    min,
    q1,
    median,
    q3,
    max,
    outliers = [],
    markers = [],
    scaleMin = min,
    scaleMax = max,
    width = 300,
    height = 30,
    medianStyle = {},
    quartileStyle = {},
    whiskerStyle = {},
    outlierStyle = {},
    outlierRadius = 3,
    markerStyle = {},
    markerRadius = 3,
    lineStyle = {},
  } = props;

  const horizontalFactor = width / (scaleMax - scaleMin);

  const verticalMiddlePos = height / 2;

  const minPos = horizontalFactor * min;
  const maxPos = horizontalFactor * max;
  const q1Pos = horizontalFactor * q1;
  const q3Pos = horizontalFactor * q3;
  const medianPos = horizontalFactor * median;

  return (
    <svg width={width} height={height}>
      <rect
        x={q1Pos}
        width={q3Pos - q1Pos}
        y={0}
        height={height}
        style={{
          stroke: 'black',
          fill: 'yellow',
          strokeWidth: 2,
          ...quartileStyle,
        }}
      />
      <line
        x1={minPos}
        y1={verticalMiddlePos}
        x2={maxPos}
        y2={verticalMiddlePos}
        style={{
          stroke: 'red',
          strokeWidth: 2,
          ...lineStyle,
        }}
      />
      <line
        x1={minPos}
        y1={0}
        x2={minPos}
        y2={height}
        style={{
          stroke: 'black',
          strokeWidth: 2,
          ...whiskerStyle,
        }}
      />
      <line
        x1={maxPos}
        y1={0}
        x2={maxPos}
        y2={height}
        style={{
          stroke: 'black',
          strokeWidth: 2,
          ...whiskerStyle,
        }}
      />
      <line
        x1={medianPos}
        y1={0}
        x2={medianPos}
        y2={height}
        style={{
          stroke: 'black',
          strokeWidth: 2,
          ...medianStyle,
        }}
      />
      {outliers.map((outlier) => (
        <circle
          key={outlier}
          cx={horizontalFactor * outlier}
          cy={verticalMiddlePos}
          style={{
            stroke: 'blue',
            fill: 'pink',
            strokeWidth: 1,
            ...outlierStyle,
          }}
          r={outlierRadius}
        />
      ))}
      {markers.map((marker) => (
        <circle
          key={marker}
          cx={horizontalFactor * marker}
          cy={verticalMiddlePos}
          r={markerRadius}
          style={{
            stroke: 'black',
            fill: 'black',
            strokeWidth: 1,
            ...markerStyle,
          }}
        />
      ))}
    </svg>
  );
}
