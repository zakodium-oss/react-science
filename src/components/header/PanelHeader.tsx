import styled from '@emotion/styled';
import type { ComponentProps, ReactNode } from 'react';

import type { ButtonProps } from '../button/index.js';
import { Button } from '../button/index.js';
import { SelectedTotal } from '../selected-total/index.js';

interface PanelHeaderProps extends Pick<
  ComponentProps<typeof HeaderContainer>,
  'aria-label'
> {
  total?: number;
  current?: number;
  onClickSettings?: () => void;
  tooltipPropsSettings?: ButtonProps['tooltipProps'];
  ariaLabelSettingsButton?: string;
  children?: ReactNode;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.55px solid rgb(240 240 240);
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  min-width: 0;
`;

/**
 * PanelHeader onClickSettings mount a button.
 * By default, tooltipProps content is bound to 'Panel settings'.
 * If you have to use tooltip content JSX instead string, take a look to Button documentation for the accessibility.
 * @param props
 * @see Button
 */
export function PanelHeader(props: PanelHeaderProps) {
  const {
    total,
    current,
    children,
    'aria-label': ariaLabel = 'Panel header',
    onClickSettings,
    tooltipPropsSettings,
    ariaLabelSettingsButton,
  } = props;

  return (
    <HeaderContainer aria-label={ariaLabel}>
      <HeaderLeftContainer>{children}</HeaderLeftContainer>
      <SelectedTotal count={current} total={total} />
      {onClickSettings && (
        <Button
          color="black"
          variant="minimal"
          onClick={onClickSettings}
          icon="cog"
          aria-label={ariaLabelSettingsButton}
          tooltipProps={{ content: 'Panel settings', ...tooltipPropsSettings }}
        />
      )}
    </HeaderContainer>
  );
}
