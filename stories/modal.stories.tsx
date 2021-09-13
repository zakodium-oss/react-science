import { Meta } from '@storybook/react';
import React from 'react';

import {
  Accordion,
  Header,
  Modal,
  RootLayout,
  SplitPane,
  Toolbar,
} from '../src';

export default {
  title: 'Layout/Modal',
} as Meta;

export function ModalStories() {
  return (
    <RootLayout
      style={{
        borderStyle: 'solid',
        borderColor: 'rgb(213, 213, 213)',
        borderWidth: '1px',
        marginTop: 150,
      }}
    >
      <Modal title="Hello, World!">Hello !</Modal>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header>
          <Toolbar orientation="horizontal">
            <Toolbar.Item titleOrientation="horizontal" id="logo" title="Logo">
              <i className="fas fa-meteor" />
            </Toolbar.Item>
          </Toolbar>
          <Toolbar orientation="horizontal">
            <Toolbar.Item id="a" title="User manual">
              <i className="fas fa-book" />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="General settings">
              <i className="fas fa-cogs" />
            </Toolbar.Item>
            <Toolbar.Item id="c" title="Full screen">
              <i className="fas fa-tablet-alt" />
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
              <i className="fas fa-glasses" />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="Open in large mode">
              <i className="fas fa-arrows-alt" />
            </Toolbar.Item>
          </Toolbar>
        </div>
        <div
          style={{
            width: '100%',
            height: '300px',
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
                  <p style={{ padding: 5 }}>Spectra lorem</p>
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
