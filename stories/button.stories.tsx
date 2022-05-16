import { Meta } from '@storybook/react';
import React from 'react';

import { Button, CloseButton, ValidateButton } from '../src';

export default {
  title: 'Layout/Button',
  argTypes: {
    onClick: {
      action: 'handle',
    },
  },
} as Meta;

interface StoryBookButtonProps {
  onClick: () => void;
}

export function DefaultButton(props: StoryBookButtonProps) {
  const { onClick } = props;

  return <Button onClick={onClick}>Hello, World!</Button>;
}

export function CloseButtonStory(props: StoryBookButtonProps) {
  const { onClick } = props;

  return <CloseButton onClick={onClick} />;
}

CloseButtonStory.storyName = 'Close Button';

export function ValidateButtonStory(props: StoryBookButtonProps) {
  const { onClick } = props;

  return <ValidateButton onClick={onClick} />;
}

CloseButtonStory.storyName = 'Validate Button';
