import { Meta } from '@storybook/react';
import React, { useRef } from 'react';
import {
  FaMeteor,
  FaBook,
  FaCogs,
  FaTabletAlt,
  FaGlasses,
} from 'react-icons/fa';

import { Accordion, Header, RootLayout, SplitPane, Toolbar } from '../src';

export default {
  title: 'Layout/Full',
} as Meta;

export function FullExample() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <RootLayout
      style={{
        borderStyle: 'solid',
        borderColor: 'rgb(213, 213, 213)',
        borderWidth: '1px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header>
          <Toolbar orientation="horizontal">
            <Toolbar.Item titleOrientation="horizontal" id="logo" title="Logo">
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
          ref={ref}
          style={{
            width: '100%',
            height: '300px',
            maxHeight: '100%',
          }}
        >
          <SplitPane initialSeparation="35%">
            <div style={{ padding: 5 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              earum omnis, et voluptatum veniam repellendus similique! Sunt
              nostrum necessitatibus reprehenderit asperiores excepturi
              corrupti? Optio soluta illo quae ex nam nulla.
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
                  <p style={{ padding: 5 }}>Integral lorem</p>
                </Accordion.Item>
              </Accordion>
            </div>
          </SplitPane>
        </div>
      </div>
    </RootLayout>
  );
}
