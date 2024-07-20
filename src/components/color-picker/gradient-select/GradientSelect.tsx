/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import * as scaleChromatic from 'd3-scale-chromatic';
import { FaChevronDown } from 'react-icons/fa';

import FixedGradientPreview from '../preview/FixedGradientPreview';

export type GradientScaleName =
  | 'turbo'
  | 'viridis'
  | 'inferno'
  | 'magma'
  | 'plasma';

export const fixedGradientScales: Record<
  GradientScaleName,
  (t: number) => string
> = {
  turbo: scaleChromatic.interpolateTurbo,
  viridis: scaleChromatic.interpolateViridis,
  inferno: scaleChromatic.interpolateInferno,
  magma: scaleChromatic.interpolateMagma,
  plasma: scaleChromatic.interpolatePlasma,
};

const scaleOptions = Object.keys(fixedGradientScales) as GradientScaleName[];

const GradientSelectListbox = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid darkgray;
  margin-top: 100px;
  border-radius: 0.25rem;
`;

const GradientSelectChevron = styled(FaChevronDown)`
  position: absolute;
  height: 100%;
  top: 0;
  right: 0.5rem;
`;

const GradientSelectOption = styled.li`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  cursor: pointer;
`;

export interface GradientSelectProps {
  value: GradientScaleName;
  onChange: (value: GradientScaleName) => void;
}
const renderFilm: ItemRenderer<GradientScaleName> = (
  option,
  { handleClick, handleFocus, modifiers },
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      key={option}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={
        <div>
          {option}
          <GradientSelectOption>
            <div style={{ height: 15 }}>
              <FixedGradientPreview gradient={option} />
            </div>
          </GradientSelectOption>
        </div>
      }
    />
  );
};
export function GradientSelect(props: GradientSelectProps) {
  const { value, onChange } = props;
  return (
    <GradientSelectListbox>
      <Select
        popoverProps={{ matchTargetWidth: true }}
        activeItem={value}
        onItemSelect={onChange}
        items={scaleOptions}
        itemRenderer={renderFilm}
        filterable={false}
        fill
      >
        <Button
          css={css`
            width: 100%;
            height: 30px;
            padding: 4px;
            display: block;
          `}
        >
          <FixedGradientPreview gradient={value} />
          <GradientSelectChevron />
        </Button>
      </Select>
    </GradientSelectListbox>
  );
}
