/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { FaExchangeAlt, FaArrowsAltH } from 'react-icons/fa';

import { MeasurementPlot, MeasurementPlotProps } from '../helpers/index';

export interface MeasurementExplorerProps
  extends Omit<MeasurementPlotProps, keyof ExplorerInfo> {}
interface ExplorerInfo {
  dataIndex: number;
  xVariableName: string;
  yVariableName: string;
  flipHorizontalAxis: boolean;
}

export function MeasurementExplorer(props: MeasurementExplorerProps) {
  const {
    measurement: { data },
    width = '100%',
    height = '100%',
  } = props;
  function defaultInfo(dataIndex: number) {
    const varNames = Object.keys(data[dataIndex].variables);
    return {
      dataIndex,
      xVariableName: varNames.includes('x') ? 'x' : varNames[0],
      yVariableName: varNames.includes('y') ? 'y' : varNames[1],
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
    const { variables } = data[info.dataIndex];
    const oppositeAxis = axis === 'x' ? 'yVariableName' : 'xVariableName';
    return Object.keys(variables).map((d) => {
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
    <div
      style={{ width, height }}
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        `}
      >
        <div>
          <label>dataIndex: </label>
          <select
            css={css`
              cursor: pointer;
              border: 1px solid black;
              padding: 1px;
              margin-left: 2px;
            `}
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
            {data.map((d, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>xVariable: </label>
          <select
            css={css`
              cursor: pointer;
              border: 1px solid black;
              padding: 1px;
              margin-left: 2px;
            `}
            onChange={({ target }) => {
              const value = target.value;
              if (value) {
                setInfo((info) => ({ ...info, xVariableName: value }));
              }
            }}
            value={info.xVariableName}
          >
            {dropdownVariables('x')}
          </select>
        </div>
        <div>
          <FaExchangeAlt
            css={css`
              margin-top: 2px;
              cursor: pointer;
            `}
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
          <select
            css={css`
              cursor: pointer;
              border: 1px solid black;
              padding: 1px;
              margin-left: 2px;
            `}
            onChange={({ target }) => {
              const value = target.value;
              if (value) {
                setInfo((info) => ({ ...info, yVariableName: value }));
              }
            }}
            value={info.yVariableName}
          >
            {dropdownVariables('y')}
          </select>
        </div>
        <div
          css={css`
            padding: 1px;
            display: flex;
          `}
        >
          Flip horizontal axis:
          <FaArrowsAltH
            css={css`
              cursor: pointer;
              border: 1px solid black;
              padding: 1px;
              margin-left: 2px;
            `}
            size="28"
            onClick={() =>
              setInfo(({ flipHorizontalAxis, ...other }) => ({
                flipHorizontalAxis: !flipHorizontalAxis,
                ...other,
              }))
            }
          />
        </div>
      </div>
      <MeasurementPlot {...props} {...info} />
    </div>
  );
}
