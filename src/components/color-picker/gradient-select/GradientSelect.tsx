/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as Select from '@radix-ui/react-select';
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

export function GradientSelect(props: GradientSelectProps) {
  const { value, onChange } = props;
  return (
    <GradientSelectListbox>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          css={css`
            width: 100%;
            height: 30px;
            padding: 4px;
          `}
        >
          <Select.Value>
            <FixedGradientPreview gradient={value} />
            <GradientSelectChevron />
          </Select.Value>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={10}
            css={css`
              background-color: white;
              width: var(--radix-select-trigger-width);
              border: 1px solid darkgray;
              border-radius: 0.25rem;
              padding: 4px;
            `}
          >
            <Select.Viewport>
              {scaleOptions.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  css={css`
                    outline: none;
                    padding: 8px 0 8px 0;
                    cursor: pointer;
                    margin-left: 20px;
                    &[data-state='checked'] {
                      font-weight: bold;
                    }
                    &[data-state='unchecked'] {
                      opacity: 1;
                    }

                    &:not([data-highlighted]) span {
                      margin-left: 12px;
                    }
                    &[data-highlighted] {
                      span {
                        margin-left: 4px;
                      }
                      ::before {
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 1px;
                        filter: brightness(60%);
                        background-color: dimgray;
                      }
                    }
                  `}
                >
                  <Select.ItemText>
                    {option}
                    <GradientSelectOption>
                      <div style={{ height: 15 }}>
                        <FixedGradientPreview gradient={option} />
                      </div>
                    </GradientSelectOption>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </GradientSelectListbox>
  );
}
