/** @jsxImportSource @emotion/react */
import {
  AnchorButton as BlueprintAnchorButton,
  AnchorButtonProps as BlueprintAnchorButtonProps,
  Button as BlueprintButton,
  ButtonProps as BlueprintButtonProps,
  Tag,
  TagProps,
  Tooltip,
  TooltipProps,
} from '@blueprintjs/core';
import { css } from '@emotion/react';
import { ReactNode } from 'react';

type BlueprintProps = {
  [key in keyof BlueprintButtonProps &
    keyof BlueprintAnchorButtonProps]?: BlueprintButtonProps[key] &
    BlueprintAnchorButtonProps[key];
};
export type ButtonProps = BlueprintProps & {
  tooltipProps?: Omit<TooltipProps, 'children'>;
  tag?: ReactNode;
  tagProps?: Omit<TagProps, 'children'>;
};

export function Button(props: ButtonProps) {
  const { tooltipProps = {}, children, tag, tagProps, ...buttonProps } = props;
  const {
    fill,
    content = '',
    disabled = !tooltipProps.content,
    ...otherToolTipProps
  } = tooltipProps;
  const InnerButton = buttonProps.disabled
    ? BlueprintAnchorButton
    : BlueprintButton;
  return (
    <Tooltip
      fill={fill || buttonProps.fill}
      disabled={disabled}
      content={content}
      {...otherToolTipProps}
      renderTarget={({ isOpen, ...targetProps }) => (
        <div style={{ position: 'relative' }}>
          {tag && (
            <Tag
              css={css`
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
              `}
              round
              intent="success"
              {...tagProps}
            >
              {tag}
            </Tag>
          )}
          <InnerButton {...targetProps} {...buttonProps} style={{}}>
            {children}
          </InnerButton>
        </div>
      )}
    />
  );
}
