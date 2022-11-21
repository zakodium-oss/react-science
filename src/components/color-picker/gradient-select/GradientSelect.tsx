import styled from '@emotion/styled';
import { Listbox } from '@headlessui/react';
import * as scaleChromatic from 'd3-scale-chromatic';
import { Fragment } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import GradientPreview from './GradientPreview';

const scales = {
  turbo: scaleChromatic.interpolateTurbo,
  viridis: scaleChromatic.interpolateViridis,
  inferno: scaleChromatic.interpolateInferno,
  magma: scaleChromatic.interpolateMagma,
  plasma: scaleChromatic.interpolatePlasma,
};

export type GradientScaleName = keyof typeof scales;

const scaleOptions = Object.keys(scales) as GradientScaleName[];

const GradientSelectListbox = styled.div`
  position: relative;
  width: 100%;
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
          <GradientPreview scale={scales[value]} />
          <GradientSelectChevron />
        </Listbox.Button>
        <Listbox.Options as={GradientSelectOptions}>
          {scaleOptions.map((option) => (
            <Listbox.Option as={Fragment} key={option} value={option}>
              {({ active }) => (
                <GradientSelectOption active={active}>
                  {option}
                  <div style={{ height: 15 }}>
                    <GradientPreview scale={scales[option]} />
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
