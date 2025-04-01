import type {
  AnchorButtonProps as BlueprintAnchorButtonProps,
  ButtonProps as BlueprintButtonProps,
  TagProps,
  TooltipProps,
} from '@blueprintjs/core';
import {
  AnchorButton,
  Button as BlueprintButton,
  Icon,
  Tag,
  Tooltip,
} from '@blueprintjs/core';
import type { CSSObject } from '@emotion/styled';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

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
const buttonStyles: CSSObject = {
  lineHeight: 1.15,
  position: 'relative',
};

const TooltipAnchorButton = styled(AnchorButton)<{
  children: ReactNode;
}>(buttonStyles);

const TooltipButton = styled(BlueprintButton)<{ children: ReactNode }>(
  buttonStyles,
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
            /*
             icon and children will be children of the same node.
             Blueprintjs' stylesheet treats the presence of multiple child elements
             as there being icon and text, styling the icon with a right margin
             so that the text is not right next to it.
             In blueprint alone, this only happens when the button has children.
             Here, we need to handle the case when the button has a tag, which
             adds a sibling but should not affect the margin on its own.
            */
            tag ? (
              <>
                {children ? (
                  <Icon icon={buttonProps.icon} />
                ) : (
                  <div style={{ display: 'contents' }}>
                    <Icon icon={buttonProps.icon} />
                  </div>
                )}
                <ButtonTag round intent="success" {...tagProps}>
                  {tag}
                </ButtonTag>
              </>
            ) : (
              buttonProps.icon
            )
          }
        >
          {children}
        </InnerButton>
      )}
    />
  );
}
