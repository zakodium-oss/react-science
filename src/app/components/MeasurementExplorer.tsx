/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { FaExchangeAlt, FaArrowsAltH } from 'react-icons/fa';

import { MeasurementPlot, MeasurementPlotProps } from './MeasurementPlot';

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
export function MeasurementExplorer(props: MeasurementExplorerProps) {
  const {
    measurement: { data },
    width = 800,
    height = 400,
  } = props;

  function defaultInfo(dataIndex: number) {
    const axes = data[dataIndex].variables;
    const axesNames = Object.keys(data[dataIndex].variables);
    return {
      dataIndex,
      xVariableName: axes.x ? 'x' : axesNames[0],
      yVariableName: axes.y ? 'y' : axesNames[1],
    };
  }
  const [info, setInfo] = useState<ExplorerInfo>({
    flipHorizontalAxis: false,
    ...defaultInfo(0),
  });

  function generateAxisOptions(index: number, oppositeAxis: string) {
    const { variables } = data[index];
      function optionText(label: string, units:string|undefined) {
      const unit = units ? ` (${units})` : '';
      return (
       label + unit
      );
    }
    return Object.keys(variables).map((d) => {
      if (d !== info[oppositeAxis]) {
        return (
          <option key={d} value={d}>
            {optionText(variables[d].label, variables[d].units)}
          </option>
        );
      }
      return null;
    });
  }

  return (
    <div
      css={css`
        width: ${width}px;
        height: ${height}px;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 40px;
          justify-content: space-around;
          margin-bottom: 20px;
        `}
      >
        <div>
          <label>dataIndex :</label>
          <select
            css={css`
              cursor: pointer;
              border: 1px solid black;
              padding: 1px;
              margin-left: 2px;
            `}
            onChange={({ target }) => {
              const value = Number(target.value);
              if (value !== undefined && !isNaN(value)) {
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
          <label>xVariable :</label>
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
            {generateAxisOptions(info.dataIndex, info.yVariableName)}
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
            {generateAxisOptions(info.dataIndex, info.xVariableName)}
          </select>
        </div>
        <div
          css={css`
            padding: 1px;
            display: flex;
          `}
        >
          Flip &quot;{info.xVariableName}&quot; axis:
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
