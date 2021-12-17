import { ComponentStory, Meta } from '@storybook/react';
import React, { useCallback } from 'react';

import DropZone from '../src/layout/DropZone';
import EmptyDropZone from '../src/layout/EmptyDropZone';

export default {
  title: 'Layout/DropZone',
  args: {
    color: 'black',
  },
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
  },
} as Meta;

export function Empty(props: { color: string }) {
  return (
    <EmptyDropZone
      color={props.color}
      onDrop={useCallback(() => {
        //test
      }, [])}
    />
  );
}
const ActiveTemp: ComponentStory<typeof DropZone> = (props: {
  color: string;
  children: JSX.Element;
}) => (
  <DropZone
    color={props.color}
    children={props.children}
    onDrop={useCallback(() => {
      //test
    }, [])}
  />
);
export const Active = ActiveTemp.bind({});
Active.args = {
  children: (
    <div
      style={{
        backgroundColor: 'blue',
        height: '150px',
      }}
    >
      DropZone Children Undefined
    </div>
  ),
};
