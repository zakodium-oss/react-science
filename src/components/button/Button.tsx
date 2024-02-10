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
import { ReactNode } from 'react';

type BlueprintProps = {
  [key in keyof BlueprintButtonProps &
    keyof BlueprintAnchorButtonProps]?: BlueprintButtonProps[key] &
    BlueprintAnchorButtonProps[key];
};
export type ButtonProps = BlueprintProps & {
  tooltipProps?: Omit<TooltipProps, 'children'>;
  tag?: ReactNode;
  tagProps?: TagProps;
};

export function Button(props: ButtonProps) {
  const { tooltipProps, children, tag, tagProps, ...buttonProps } = props;

  const InnerButton = buttonProps.disabled
    ? BlueprintAnchorButton
    : BlueprintButton;
  return (
    <Tooltip
      fill={tooltipProps?.fill || buttonProps.fill}
      {...tooltipProps}
      renderTarget={({ isOpen, ...targetProps }) => (
        <div style={{ position: 'relative' }}>
          {tag && (
            <Tag
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                cursor: 'default',
                fontSize: '0.875em',
                padding: 2,
                minHeight: 15,
                minWidth: 15,
                lineHeight: '1em',
                flexDirection: 'column-reverse',
                zIndex: 5,
              }}
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
