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
  Icon,
  Tag,
  Tooltip,
} from '@blueprintjs/core';
import type { CSSObject } from '@emotion/styled';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

type BlueprintProps = {
  [key in keyof BlueprintButtonProps &
    keyof BlueprintAnchorButtonProps]?: BlueprintButtonProps[key] &
    BlueprintAnchorButtonProps[key];
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

// Setting the line-height makes sure regular sized buttons have a
// height consistent with the input fields and across variants.
// Using the same line height as in the blueprint docs.
function getStyledCss(
  buttonProps: BlueprintAnchorButtonProps | BlueprintButtonProps,
): CSSObject {
  return {
    lineHeight: 1.15,
    position: 'relative',
    [`.${Classes.ICON}`]: !buttonProps.children && { marginRight: 0 },
  };
}

const TooltipAnchorButton = styled(AnchorButton)<{
  children: ReactNode;
}>(getStyledCss);

const TooltipButton = styled(BlueprintButton)<{ children: ReactNode }>(
  getStyledCss,
);

export function Button(props: ButtonProps) {
  const { tooltipProps = {}, children, tag, tagProps, ...buttonProps } = props;
  const {
    fill,
    content = '',
    disabled = !tooltipProps.content,
    ...otherToolTipProps
  } = tooltipProps;

  const InnerButton = buttonProps.disabled
    ? TooltipAnchorButton
    : TooltipButton;

  return (
    <Tooltip
      fill={fill || buttonProps.fill}
      disabled={disabled}
      content={content}
      {...otherToolTipProps}
      renderTarget={({ isOpen, ...targetProps }) => (
        <InnerButton
          {...targetProps}
          {...buttonProps}
          icon={
            <Fragment>
              <Icon icon={buttonProps.icon} />
              {tag && (
                <ButtonTag round intent="success" {...tagProps}>
                  {tag}
                </ButtonTag>
              )}
            </Fragment>
          }
        >
          {children}
        </InnerButton>
      )}
    />
  );
}
