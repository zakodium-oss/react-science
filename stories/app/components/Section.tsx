import styled from '@emotion/styled';
import type { ReactNode } from 'react';

const ContainerInformation = styled.div`
  display: flex;
  flex-direction: column;

  > h2 {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.75rem;
  }

  > h3 {
    color: #737373;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }
`;

const Container = styled.div`
  margin-top: 15px;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

const ContainerContent = styled.div`
  outline: 1px solid rgb(17 24 39 / 5%);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 0.75rem;
  padding: 10px;
`;

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function Section(props: SectionProps) {
  const { title, description, children } = props;

  return (
    <Container>
      <ContainerInformation>
        <h2>{title}</h2>
        <h3>{description}</h3>
      </ContainerInformation>

      <ContainerContent>{children}</ContainerContent>
    </Container>
  );
}
