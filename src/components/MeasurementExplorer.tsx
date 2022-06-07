/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

import { Measurement, MeasurementPlot } from './MeasurementPlot';

export interface MeasurementExplorerProps {
  measurement: Measurement;
  width?: number;
  height?: number;
}
interface ExplorerInfo {
  dataIndex: number;
  xVariableName: string;
  yVariableName: string;
}
export function MeasurementExplorer(props: MeasurementExplorerProps) {
  const {
    measurement: { data },
    width = 800,
    height = 400,
  } = props;
  const [info, setInfo] = useState<ExplorerInfo>({
    dataIndex: 0,
    xVariableName: Object.keys(data[0].variables)[0] || 'x',
    yVariableName: Object.keys(data[0].variables)[1] || 'y',
  });
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
            onChange={({ target }) => {
              const value = Number(target.value);
              if (value) {
                setInfo({
                  dataIndex: value,
                  xVariableName: Object.keys(data[value].variables)[0],
                  yVariableName: Object.keys(data[value].variables)[1],
                });
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
            onChange={({ target }) => {
              const value = target.value;
              if (value) {
                setInfo((info) => ({ ...info, xVariableName: value }));
              }
            }}
          >
            {Object.keys(data[info.dataIndex].variables).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>xVariable :</label>
          <select
            onChange={({ target }) => {
              const value = target.value;
              if (value) {
                setInfo((info) => ({ ...info, yVariableName: value }));
              }
            }}
          >
            {Object.keys(data[info.dataIndex].variables).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
      <MeasurementPlot {...props} {...info} />
    </div>
  );
}
