import styled from '@emotion/styled';
import { type ReactNode, useMemo } from 'react';
import { ResponsiveChart } from 'react-d3-utils';
import {
  useRectangularZoom,
  useAxisZoom,
  useAxisWheelZoom,
  useCrossHair,
  usePan,
  Plot,
  Heading,
  Annotations,
  Axis,
} from 'react-plot';

import type { MeasurementPlotProps } from './MeasurementPlot';

interface BasicComponentProps extends MeasurementPlotProps {
  children: ReactNode[] | ReactNode;
}

const BasicComponentRoot = styled.div`
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export function BasicComponent(props: BasicComponentProps) {
  const {
    children,
    measurement,
    dataIndex = 0,
    xVariableName = 'x',
    yVariableName = 'y',
    width = '100%',
    height = '100%',
    zoom = 'horizontal',
    wheelZoom = 'vertical',
    crossHair = true,
    showHorizontalAxis = true,
    showVerticalAxis = true,
    showHorizontalGrid = true,
    showVerticalGrid = true,
    flipHorizontalAxis = false,
  } = props;

  const {
    info: { title },
    data,
  } = measurement;

  const { x, y } = useMemo(() => {
    const { variables } = data[dataIndex];
    const { [xVariableName]: x, [yVariableName]: y } = variables;
    if (x === undefined || y === undefined) {
      throw new Error(
        `Variable "${
          x === undefined ? xVariableName : yVariableName
        }" is not available in data. Only ${Object.keys(
          data[dataIndex].variables,
        ).join(', ')} are available`,
      );
    }

    return { x, y };
  }, [data, dataIndex, xVariableName, yVariableName]);

  const direction = new Set(['vertical', 'horizontal']);

  const rectZoom = useRectangularZoom({
    disabled: zoom !== 'rectangular',
  });

  const axisZoom = useAxisZoom({
    direction: zoom === 'vertical' ? 'vertical' : 'horizontal',
    disabled: !direction.has(zoom),
  });

  useAxisWheelZoom({
    direction: wheelZoom === 'vertical' ? 'vertical' : 'horizontal',
    axisId: wheelZoom === 'vertical' ? 'y' : 'x',
    disabled: !direction.has(wheelZoom),
  });

  const crossHairAnnot = useCrossHair({
    disabled: !crossHair,
  });

  usePan();

  return (
    <BasicComponentRoot style={{ width, height }}>
      <ResponsiveChart width={width} height={height}>
        {({ width, height }) => (
          <Plot width={width} height={height}>
            <Heading title={title} />
            {children}
            <Annotations>
              {rectZoom.annotations}
              {axisZoom.annotations}
              {crossHairAnnot.annotations}
            </Annotations>
            <Axis
              hidden={!showHorizontalAxis}
              displayPrimaryGridLines={showVerticalGrid}
              flip={flipHorizontalAxis}
              position="bottom"
              label={`${x.label}${x.units ? `(${x.units})` : ''}`}
            />
            <Axis
              hidden={!showVerticalAxis}
              displayPrimaryGridLines={showHorizontalGrid}
              position="left"
              label={`${y.label}${y.units ? `(${y.units})` : ''}`}
              paddingStart="10"
              paddingEnd="10"
            />
          </Plot>
        )}
      </ResponsiveChart>
    </BasicComponentRoot>
  );
}
