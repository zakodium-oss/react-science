import styled from '@emotion/styled';
import { Listbox } from '@headlessui/react';
import * as RadixSelect from '@radix-ui/react-select';
import * as scaleChromatic from 'd3-scale-chromatic';
import { Fragment } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './grandiant-select.css';

import { Portal } from '../../root-layout/Portal';
import FixedGradientPreview from '../preview/FixedGradientPreview';

export const fixedGradientScales = {
  turbo: scaleChromatic.interpolateTurbo,
  viridis: scaleChromatic.interpolateViridis,
  inferno: scaleChromatic.interpolateInferno,
  magma: scaleChromatic.interpolateMagma,
  plasma: scaleChromatic.interpolatePlasma,
};

export type GradientScaleName = keyof typeof fixedGradientScales;

const scaleOptions = Object.keys(fixedGradientScales) as GradientScaleName[];

const GradientSelectListbox = styled.div`
  position: relative;
  border: 1px solid darkgray;
  border-radius: 0.25rem;
`;

const GradientSelectButton = styled.button`
  position: relative;
  width: 100%;
  height: 30px;
  padding: 3px;
`;

const GradientSelectChevron = styled(FaChevronDown)`
  position: absolute;
  height: 100%;
  top: 0;
  right: 0.5rem;
`;

const GradientSelectOptions = styled.ul`
  position: absolute;
  max-height: 13rem;
  overflow: scroll;
  width: 100%;
  margin-top: 5px;
  border: 1px solid darkgray;
  border-radius: 0.25rem;
  padding-inline: 3px;
  padding-bottom: 5px;
`;

const GradientSelectOption = styled.li<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  cursor: pointer;
  background-color: red;
  ${(props) => !props.active && 'opacity: 0.8;'}
  ${(props) => props.active && 'font-weight: bold;'}
`;

export interface GradientSelectProps {
  value: GradientScaleName;
  onChange: (value: GradientScaleName) => void;
}

export function GradientSelect(props: GradientSelectProps) {
  const { value, onChange } = props;
  return (
    <Listbox value={value} onChange={onChange}>
      <GradientSelectListbox>
        <Listbox.Button as={GradientSelectButton}>
          <FixedGradientPreview gradient={value} />
          <GradientSelectChevron />
        </Listbox.Button>
        <Listbox.Options as={GradientSelectOptions}>
          {scaleOptions.map((option) => (
            <Listbox.Option as={Fragment} key={option} value={option}>
              {({ active }) => (
                <GradientSelectOption active={active}>
                  {option}
                  <div style={{ height: 15 }}>
                    <FixedGradientPreview gradient={option} />
                  </div>
                </GradientSelectOption>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </GradientSelectListbox>
    </Listbox>
  );
}

const Styled = {
  RadixTrigger: styled(RadixSelect.Trigger)`
    position: relative;
    width: 100%;
    height: 30px;
    padding: 3px;
    border: 1px solid darkgray;
    border-radius: 0.25rem;
  `,
  RadixContent: styled(RadixSelect.Content)`
    width: var(--radix-select-trigger-width);
    max-height: 13rem;
  `,
  RadixViewport: styled(RadixSelect.Viewport)`
    max-height: 13rem;
    overflow: scroll;
    margin-top: 5px;
    border: 1px solid darkgray;
    border-radius: 0.25rem;
    padding-inline: 3px;
    padding-bottom: 5px;

    border: 1px solid darkgray;
    border-radius: 0.25rem;
  `,
  RadixItemText: styled(RadixSelect.ItemText)`
    background-color: red;
  `,
};

export function NewGradiantSelect(props: GradientSelectProps) {
  const { onChange, value } = props;

  return (
    <RadixSelect.Root open>
      <Styled.RadixTrigger>
        <RadixSelect.Value>
          <FixedGradientPreview gradient={value} />
        </RadixSelect.Value>
        <RadixSelect.Icon>
          <GradientSelectChevron />
        </RadixSelect.Icon>
      </Styled.RadixTrigger>
      <Portal>
        <Styled.RadixContent position="popper" sideOffset={5}>
          <Styled.RadixViewport>
            {scaleOptions.map((option) => {
              return (
                <RadixSelect.Item value={option} key={option}>
                  <Styled.RadixItemText
                    asChild
                    style={{ backgroundColor: 'yellow' }}
                  >
                    <li className="toto">
                      {option}
                      <div style={{ height: 15 }}>
                        <FixedGradientPreview gradient={option} />
                      </div>
                    </li>
                  </Styled.RadixItemText>
                </RadixSelect.Item>
              );
            })}
          </Styled.RadixViewport>
        </Styled.RadixContent>
      </Portal>
    </RadixSelect.Root>
  );
}

/*
<GradientSelectListbox>
      <GradientSelectOption active>
        <p>AAA</p>
      </GradientSelectOption>
      <RadixSelect.Root open>
        <RadixSelect.Trigger asChild>
          <GradientSelectButton>
            <RadixSelect.Value>
              <FixedGradientPreview gradient={value} />
            </RadixSelect.Value>
            <RadixSelect.Icon>
              <GradientSelectChevron />
            </RadixSelect.Icon>
          </GradientSelectButton>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={5}
            style={{
              width: 'var(--radix-select-trigger-width)',
              maxHeight: '13rem',
            }}
          >
            <RadixSelect.Viewport asChild>
              <ul
                style={{
                  maxHeight: '13rem',
                  overflow: 'scroll',
                  marginTop: 5,
                  border: '1px solid darkgray',
                  borderRadius: '0.25rem',
                  paddingInline: 3,
                  paddingBottom: 5,
                }}
              >
                {scaleOptions.map((option) => {
                  return (
                    <RadixSelect.Item value={option} key={option} asChild>
                      <RadixSelect.ItemText asChild>
                        <li className="test">
                          {option}
                          <div style={{ height: 15 }}>
                            <FixedGradientPreview gradient={option} />
                          </div>
                        </li>
                      </RadixSelect.ItemText>
                    </RadixSelect.Item>
                  );
                })}
              </ul>
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </GradientSelectListbox>
*/
