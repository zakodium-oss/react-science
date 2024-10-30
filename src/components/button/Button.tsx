/** @jsxImportSource @emotion/react */
import {
  AnchorButton as BlueprintAnchorButton,
  type AnchorButtonProps as BlueprintAnchorButtonProps,
  Button as BlueprintButton,
  type ButtonProps as BlueprintButtonProps,
  Icon,
  Tag,
  type TagProps,
  Tooltip,
  type TooltipProps,
} from '@blueprintjs/core';
import { css } from '@emotion/react';
import { Fragment, type ReactNode } from 'react';

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
        <InnerButton
          css={css({
            // Setting the line-height makes sure regular sized buttons have a
            // height consistent with the input fields and across variants.
            // Using the same line height as in the blueprint docs.
            lineHeight: 1.15,
            position: 'relative',
            '.bp5-icon': !children && {
              marginRight: '0',
            },
          })}
          {...targetProps}
          {...buttonProps}
          icon={
            <Fragment>
              <Icon icon={buttonProps.icon} />
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
            </Fragment>
          }
        >
          {children}
        </InnerButton>
      )}
    />
  );
}
