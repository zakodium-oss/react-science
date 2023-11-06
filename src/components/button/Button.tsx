import {
  Button as BlueprintButton,
  AnchorButton as BlueprintAnchorButton,
  ButtonProps as BlueprintButtonProps,
  AnchorButtonProps as BlueprintAnchorButtonProps,
  Tooltip,
  TooltipProps,
} from '@blueprintjs/core';

type BlueprintProps = {
  [key in keyof BlueprintButtonProps &
    keyof BlueprintAnchorButtonProps]?: BlueprintButtonProps[key] &
    BlueprintAnchorButtonProps[key];
};
export type ButtonProps = BlueprintProps & {
  tooltipProps?: Omit<TooltipProps, 'children'>;
};

export function Button(props: ButtonProps) {
  const { tooltipProps, children, ...buttonProps } = props;

  const InnerButton = buttonProps.disabled
    ? BlueprintAnchorButton
    : BlueprintButton;
  return (
    <Tooltip fill={tooltipProps?.fill || buttonProps.fill} {...tooltipProps}>
      <InnerButton {...buttonProps}>{children}</InnerButton>
    </Tooltip>
  );
}
