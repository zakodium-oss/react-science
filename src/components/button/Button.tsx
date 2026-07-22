import type {
  AnchorButtonProps as BlueprintAnchorButtonProps,
  ButtonProps as BlueprintButtonProps,
  TagProps,
  TooltipProps,
} from '@blueprintjs/core';
import {
  AnchorButton,
  Button as BlueprintButton,
  Classes,
  Tag,
  Tooltip,
} from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

type BlueprintProps = {
  [
    key in keyof BlueprintButtonProps & keyof BlueprintAnchorButtonProps
  ]?: BlueprintButtonProps[key] & BlueprintAnchorButtonProps[key];
};

export type ButtonProps = BlueprintProps & {
  tooltipProps?: Partial<Omit<TooltipProps, 'children' | 'targetProps'>>;
  tag?: ReactNode;
  tagProps?: Omit<TagProps, 'children'>;
};

const ButtonTag = styled(Tag)`
  position: absolute;
  top: 0;
  left: 0;
  cursor: default;
  font-size: 0.875em;
  padding: 2px !important;
  min-height: 15px;
  min-width: 15px;
  line-height: 1em;
  text-align: center;
  z-index: 20;
`;

interface InnerButtonProps {
  isIconButton: boolean;
  isTagButton: boolean;
}

/*
  Setting the line-height makes sure that when passing regular text in icons instead of an svg, they are vertically centered
  max-width makes sure buttons with tag or hoverability indicator (both implying absolutely positioned elements) keep their intended width
  When a button just has an icon with a tag, we override BP styles and remove the margin-right to keep the layout correct.
*/
const buttonStyles = ({ isIconButton, isTagButton }: InnerButtonProps) => `
  line-height: 1em;
  position: relative;
  max-width: ${isIconButton ? '30px' : 'none'};

  & .${Classes.ICON} {
    ${isIconButton && isTagButton ? 'margin-right: 0px;' : ''}
  }
`;

const propsToIgnore = new Set(['isIconButton', 'isTagButton']);
function shouldForwardButtonProp(propName: string) {
  return !propsToIgnore.has(propName);
}

const TooltipAnchorButton = styled(AnchorButton, {
  shouldForwardProp: shouldForwardButtonProp,
})<InnerButtonProps>`
  ${(props) => buttonStyles(props)}
`;

const TooltipButton = styled(BlueprintButton, {
  shouldForwardProp: shouldForwardButtonProp,
})<InnerButtonProps>`
  ${(props) => buttonStyles(props)}
`;

export function Button(props: ButtonProps) {
  const { tooltipProps = {}, children, tag, tagProps, ...buttonProps } = props;
  const {
    fill,
    content = '',
    disabled = !tooltipProps.content,
    ...otherTooltipProps
  } = tooltipProps;

  const InnerButton = buttonProps.disabled
    ? TooltipAnchorButton
    : TooltipButton;

  return (
    <Tooltip
      fill={fill || buttonProps.fill}
      disabled={disabled}
      content={content}
      {...otherTooltipProps}
      renderTarget={({ isOpen, ...targetProps }) => (
        <InnerButton
          {...targetProps}
          {...buttonProps}
          isIconButton={!children && !buttonProps.text}
          isTagButton={Boolean(tag)}
        >
          {tag && (
            <ButtonTag round intent="success" {...tagProps}>
              {tag}
            </ButtonTag>
          )}
          {children}
        </InnerButton>
      )}
    />
  );
}
