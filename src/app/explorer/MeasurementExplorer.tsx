import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { FaArrowsAltH, FaExchangeAlt } from 'react-icons/fa';

import { MeasurementPlot, MeasurementPlotProps } from '../helpers';

export type MeasurementExplorerProps = Omit<
  MeasurementPlotProps,
  keyof ExplorerInfo
>;
interface ExplorerInfo {
  dataIndex: number;
  xVariableName: string;
  yVariableName: string;
  flipHorizontalAxis: boolean;
}

const MeasurementExplorerRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeasurementExplorerContent = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const MeasurementExplorerSelect = styled.select`
  cursor: pointer;
  border: 1px solid black;
  padding: 1px;
  margin-left: 2px;
`;

const MeasurementExplorerAction = styled.div`
  padding: 1px;
  display: flex;
`;

export function MeasurementExplorer(props: MeasurementExplorerProps) {
  const { measurement, width = '100%', height = '100%' } = props;
  const measurementsArray = useMemo(
    () => (Array.isArray(measurement) ? measurement : [measurement]),
    [measurement],
  );
  const varNames = useMemo(() => {
    const varNames: string[][] = [];
    for (const [i, { data }] of measurementsArray.entries()) {
      for (const { variables } of data) {
        const names: string[] = [];
        for (const varName in variables) {
          if (i === 0) {
            names.push(varName);
          } else if (!varNames.flat().includes(varName)) {
            throw new Error(
              `Measurements selected does not have the same variables `,
            );
          }
        }
        varNames.push(names);
      }
    }
    return varNames;
  }, [measurementsArray]);

  function defaultInfo(dataIndex: number) {
    return {
      dataIndex,
      xVariableName: varNames[dataIndex].includes('x')
        ? 'x'
        : varNames[dataIndex][0],
      yVariableName: varNames[dataIndex].includes('y')
        ? 'y'
        : varNames[dataIndex][1],
    };
  }

  const [info, setInfo] = useState<ExplorerInfo>({
    flipHorizontalAxis: false,
    ...defaultInfo(0),
  });

  /* variables for this measurement are mapped into `id - label (units)`
    `id` necessary bc files may have repeated labels
  */
  function dropdownVariables(axis: 'x' | 'y') {
    function formatVar(varKey: string) {
      const { label, units } = variables[varKey];
      const formatUnit = units ? ` (${units})` : '';
      const formatVarKey = `${varKey} - `;
      return formatVarKey + label + formatUnit;
    }
    const { variables } = measurementsArray[0].data[info.dataIndex];
    const oppositeAxis = axis === 'x' ? 'yVariableName' : 'xVariableName';
    return varNames[info.dataIndex].map((d) => {
      if (d !== info[oppositeAxis]) {
        return (
          <option key={d} value={d}>
            {formatVar(d)}
          </option>
        );
      }
      return null;
    });
  }

  return (
    <MeasurementExplorerRoot style={{ width, height }}>
      <MeasurementExplorerContent>
        <div>
          <label>dataIndex: </label>
          <MeasurementExplorerSelect
            onChange={({ target }) => {
              const value = Number(target.value);
              if (value !== undefined && !Number.isNaN(value)) {
                setInfo(({ flipHorizontalAxis }) => ({
                  flipHorizontalAxis,
                  ...defaultInfo(value),
                }));
              }
            }}
          >
            {measurementsArray[0].data.map((d, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </MeasurementExplorerSelect>
        </div>
        <div>
          <label>xVariable: </label>
          <MeasurementExplorerSelect
            onChange={({ target }) => {
              const value = target.value;
              if (value) {
                setInfo((info) => ({ ...info, xVariableName: value }));
              }
            }}
            value={info.xVariableName}
          >
            {dropdownVariables('x')}
          </MeasurementExplorerSelect>
        </div>
        <div>
          <FaExchangeAlt
            style={{ marginTop: 2, cursor: 'pointer' }}
            size="20"
            onClick={() =>
              setInfo(({ xVariableName, yVariableName, ...info }) => ({
                ...info,
                xVariableName: yVariableName,
                yVariableName: xVariableName,
              }))
            }
          />
        </div>
        <div>
          <label>yVariable :</label>
          <MeasurementExplorerSelect
            onChange={({ target }) => {
              const value = target.value;
              if (value) {
                setInfo((info) => ({ ...info, yVariableName: value }));
              }
            }}
            value={info.yVariableName}
          >
            {dropdownVariables('y')}
          </MeasurementExplorerSelect>
        </div>
        <MeasurementExplorerAction>
          Flip horizontal axis:
          <FaArrowsAltH
            style={{
              cursor: 'pointer',
              border: '1px solid black',
              padding: 1,
              marginLeft: 2,
            }}
            size="28"
            onClick={() =>
              setInfo(({ flipHorizontalAxis, ...other }) => ({
                flipHorizontalAxis: !flipHorizontalAxis,
                ...other,
              }))
            }
          />
        </MeasurementExplorerAction>
      </MeasurementExplorerContent>
      <MeasurementPlot {...props} {...info} />
    </MeasurementExplorerRoot>
  );
}
