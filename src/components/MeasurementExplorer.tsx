/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

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
  function defaultInfo(dataIndex: number) {
    return {
      dataIndex,
      xVariableName: Object.keys(data[dataIndex].variables).includes('x')
        ? 'x'
        : Object.keys(data[dataIndex].variables)[0],
      yVariableName: Object.keys(data[dataIndex].variables).includes('y')
        ? 'y'
        : Object.keys(data[dataIndex].variables)[1],
    };
  }
  const [info, setInfo] = useState<ExplorerInfo>(defaultInfo(0));
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
              if (value !== undefined && !isNaN(value)) {
                setInfo(defaultInfo(value));
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
            `}
            onChange={({ target }) => {
              const value = target.value;
              if (value) {
                setInfo((info) => ({ ...info, xVariableName: value }));
              }
            }}
          >
            {Object.keys(data[info.dataIndex].variables).map((d) => {
              if (d !== info.yVariableName) {
                return (
                  <option key={d} value={d} selected={d === info.xVariableName}>
                    {d}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>
        <div>
          <FaExchangeAlt
            css={css`
              cursor: pointer;
            `}
            size="25"
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
            `}
            onChange={({ target }) => {
              const value = target.value;
              if (value) {
                setInfo((info) => ({ ...info, yVariableName: value }));
              }
            }}
          >
            {Object.keys(data[info.dataIndex].variables).map((d) => {
              if (d !== info.xVariableName) {
                return (
                  <option key={d} value={d} selected={d === info.yVariableName}>
                    {d}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>
      </div>
      <MeasurementPlot {...props} {...info} />
    </div>
  );
}
