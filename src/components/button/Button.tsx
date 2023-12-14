import {
  AnchorButton as BlueprintAnchorButton,
  AnchorButtonProps as BlueprintAnchorButtonProps,
  Button as BlueprintButton,
  ButtonProps as BlueprintButtonProps,
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
    <Tooltip
      fill={tooltipProps?.fill || buttonProps.fill}
      {...tooltipProps}
      renderTarget={({ isOpen, ...targetProps }) => (
        <InnerButton {...targetProps} {...buttonProps}>
          {children}
        </InnerButton>
      )}
    />
  );
}
