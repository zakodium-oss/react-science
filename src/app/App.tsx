import React, { useEffect, useState } from 'react';
import {
  FaMeteor,
  FaBook,
  FaCogs,
  FaTabletAlt,
  FaGlasses,
} from 'react-icons/fa';

import {
  DataContext,
  Accordion,
  Header,
  MeasurementsPanelData,
  RootLayout,
  SplitPane,
  TabItem,
  Tabs,
  Toolbar,
} from '..';
import { AppContext } from '../components/context/app/AppContext';
import { LayoutContext } from '../components/context/layout/LayoutContext';

import DropFile from './DropFile';

export default function App() {
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

  return (
    <RootLayout>
      <AppContext>
        <LayoutContext>
          <DataContext>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
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
                  <SplitPane
                    initialSeparation="500px"
                    minimumSize={500}
                    sideSeparation="end"
                  >
                    <DropFile>
                      <div style={{ padding: 5 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum earum omnis, et voluptatum veniam repellendus
                        similique! Sunt nostrum necessitatibus reprehenderit
                        asperiores excepturi corrupti? Optio soluta illo quae ex
                        nam nulla.
                      </div>
                    </DropFile>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        flex: '1 1 0%',
                      }}
                    >
                      <Accordion>
                        <Accordion.Item title="Measurement" defaultOpened>
                          <div
                            style={{
                              flex: '1 1 0%',
                              width: '100%',
                            }}
                          >
                            {<MeasurementsPanelData />}
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
          </DataContext>
        </LayoutContext>
      </AppContext>
    </RootLayout>
  );
}
