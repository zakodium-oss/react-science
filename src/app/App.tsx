/* eslint-disable react/no-array-index-key */
import { xyToXYObject } from 'ml-spectra-processing';
import React, { useState } from 'react';
import { ResponsiveChart } from 'react-d3-utils';
import {
  FaMeteor,
  FaBook,
  FaCogs,
  FaTabletAlt,
  FaGlasses,
} from 'react-icons/fa';
import { Heading, LineSeries, Plot } from 'react-plot';

import {
  Accordion,
  Header,
  RootLayout,
  SplitPane,
  TabItem,
  Tabs,
  Toolbar,
} from '..';
import { DropZone, DropZoneContainer } from '../components/DropZone';

interface IrPlot {
  data: { x: number[]; y: number[] };
  info: { filename: string; path: string };
}
interface DataMeasurements {
  irs: IrPlot[];
}
export default function App() {
  const [data, setData] = useState<DataMeasurements>({ irs: [] });
  const items: Array<TabItem> = [
    {
      id: '1h',
      title: '1H',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem odit nulla delectus rem et non quis animi molestias pariatur tempora. Corporis consequuntur asperiores odio officia minima fugiat, corrupti hic illum!',
    },
    { id: '13c', title: '13C', content: 'Hello, World! [b]' },
    { id: '1h,1h', title: '1H,1H', content: 'Hello, World! [c]' },
    { id: '1h,13c', title: '1H,13C', content: 'Hello, World! [d]' },
  ];
  function onDrop(files: File[]) {
    files.forEach((file) => {
      if (file.type !== 'application/json') {
        throw Error(`the file ${file.name} must be JSON but it's ${file.type}`);
      }
      file
        .text()
        .then((d) => {
          const info = {
            filename: file.name,
            path: file.webkitRelativePath,
          };
          const data = JSON.parse(d);
          const ir: IrPlot = { data, info };

          setData(({ irs }) => ({
            irs: [...irs, ir],
          }));
        })
        .catch((e) => {
          throw Error(e);
        });
    });
  }

  return (
    <RootLayout>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Header>
            <Toolbar orientation="horizontal">
              <Toolbar.Item
                titleOrientation="horizontal"
                id="logo"
                title="Logo"
              >
                <FaMeteor />
              </Toolbar.Item>
            </Toolbar>
            <Toolbar orientation="horizontal">
              <Toolbar.Item id="a" title="User manual">
                <FaBook />
              </Toolbar.Item>
              <Toolbar.Item id="b" title="General settings">
                <FaCogs />
              </Toolbar.Item>
              <Toolbar.Item id="c" title="Full screen">
                <FaTabletAlt />
              </Toolbar.Item>
            </Toolbar>
          </Header>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <div>
            <Toolbar orientation="vertical">
              <Toolbar.Item id="a" title="Glasses" active>
                <FaGlasses />
              </Toolbar.Item>
              <Toolbar.Item id="b" title="Open in large mode">
                <FaTabletAlt />
              </Toolbar.Item>
            </Toolbar>
          </div>
          <div
            style={{
              width: '100%',
              maxHeight: '100%',
            }}
          >
            <SplitPane initialSeparation="50%" sideSeparation="end">
              <div
                style={{
                  width: '100%',
                  padding: '10px',
                }}
              >
                <div>
                  {data.irs.length > 0 ? (
                    <DropZoneContainer onDrop={onDrop}>
                      <div
                        style={{
                          padding: 5,
                          textAlign: 'left',
                          border: '2px solid black',
                        }}
                      >
                        {data.irs.map((ir, i) => (
                          <div key={i}>
                            <ResponsiveChart>
                              {({ width }) => (
                                <Plot width={width} height={400}>
                                  <Heading title={ir.info.filename} />
                                  <LineSeries data={xyToXYObject(ir.data)} />
                                </Plot>
                              )}
                            </ResponsiveChart>
                          </div>
                        ))}
                      </div>
                    </DropZoneContainer>
                  ) : (
                    <DropZone onDrop={onDrop} />
                  )}
                </div>
              </div>

              <div
                style={{
                  width: '100%',
                  height: '100%',
                  flex: '1 1 0%',
                }}
              >
                <Accordion>
                  <Accordion.Item title="Spectra" defaultOpened>
                    <div>
                      {Array(10)
                        .fill(0)
                        .map((a, i) => (
                          <p key={i} style={{ padding: 5 }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nostrum quos soluta animi accusantium ipsum
                            delectus facilis! Modi quis tenetur enim aut beatae
                            deleniti aspernatur reprehenderit distinctio rerum
                            eius. Quidem, nam?
                          </p>
                        ))}
                    </div>
                  </Accordion.Item>
                  <Accordion.Item title="Integral">
                    <div
                      style={{
                        flex: '1 1 0%',
                        width: '100%',
                      }}
                    >
                      <Tabs
                        orientation="horizontal"
                        items={items}
                        opened={items[0]}
                      />
                    </div>
                  </Accordion.Item>
                </Accordion>
              </div>
            </SplitPane>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
