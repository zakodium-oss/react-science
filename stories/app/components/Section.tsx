import styled from '@emotion/styled';
import type { ReactNode } from 'react';

const ContainerInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.05rem;

  > h2 {
    font-weight: 600;
    font-size: 1rem;
    line-height: calc(0.25rem * 7);
  }

  > h3 {
    color: #737373;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }
`;

const Container = styled.div`
  display: grid;
  padding-block: 0.5rem 0.05rem;
  padding-inline: 1.5rem;
  gap: 2rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (width >= 48rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ContainerContent = styled.div`
  background-color: white;
  outline: 1px solid rgb(17 24 39 / 5%);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 0.75rem;
  box-sizing: border-box;
  border: 0 solid;
  padding: 2rem;

  @media (width >= 48rem) {
    grid-column: span 2 / span 2;
  }
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
