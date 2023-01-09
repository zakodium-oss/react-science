import styled from '@emotion/styled';
import { ReactNode } from 'react';

const ButtonGroupRoot = styled.div`
  display: inline-flex;
  border-radius: 0.375rem;
  isolation: isolate;
`;

const ButtonGroupCustomButton = styled.button<{ isLast: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 5px;
  padding-bottom: 5px;
  border-width: 1px;
  border-top-left-radius: ${({ isLast }) => !isLast && '0.375rem'};
  border-bottom-left-radius: ${({ isLast }) => !isLast && '0.375rem'};

  border-top-right-radius: ${({ isLast }) => isLast && '0.375rem'};
  border-bottom-right-radius: ${({ isLast }) => isLast && '0.375rem'};
  margin-left: ${({ isLast }) => isLast && '-1px'};
`;

interface ButtonGroupProps {
  children: [ReactNode, ReactNode];
}

export function ButtonGroup(props: ButtonGroupProps) {
  const { children } = props;
  return <ButtonGroupRoot>{children}</ButtonGroupRoot>;
}

interface ButtonGroupButtonProps {
  position: 'first' | 'last';
  label: string;
  onClick: () => void;
}

ButtonGroup.Button = function ButtonGroupButton(props: ButtonGroupButtonProps) {
  const { position, label, onClick } = props;

  return (
    <ButtonGroupCustomButton
      type="button"
      onClick={onClick}
      isLast={position === 'last'}
    >
      {label}
    </ButtonGroupCustomButton>
  );
};
