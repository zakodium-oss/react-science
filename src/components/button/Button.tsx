/** @jsxImportSource @emotion/react */
import type {
  AnchorButtonProps as BlueprintAnchorButtonProps,
  ButtonProps as BlueprintButtonProps,
  TagProps,
  TooltipProps,
} from '@blueprintjs/core';
import {
  AnchorButton as BlueprintAnchorButton,
  Button as BlueprintButton,
  Icon,
  Tag as BlueprintTag,
  Tooltip,
} from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

type BlueprintProps = {
  [key in keyof BlueprintButtonProps &
    keyof BlueprintAnchorButtonProps]?: BlueprintButtonProps[key] &
    BlueprintAnchorButtonProps[key];
};
export type ButtonProps = BlueprintProps & {
  tooltipProps?: Partial<Omit<TooltipProps, 'children'>>;
  tag?: ReactNode;
  tagProps?: Omit<TagProps, 'children'>;
};

const Tag = styled(BlueprintTag)`
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
function getStyledCss(children: ReactNode) {
  const base: Record<string, any> = {
    lineHeight: 1.15,
    position: 'relative',
  };

  if (!children) {
    base['.bp5-icon'] = {
      marginRight: 0,
    };
  }

  return base;
}

const TooltipAnchorButton = styled(BlueprintAnchorButton)<{
  children: ReactNode;
}>((template) => {
  return getStyledCss(template.children);
});

const TooltipButton = styled(BlueprintButton)<{ children: ReactNode }>((
  template,
) => {
  return getStyledCss(template.children);
});

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
                <Tag round intent="success" {...tagProps}>
                  {tag}
                </Tag>
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
