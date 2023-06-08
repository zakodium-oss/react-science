/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import * as RadixSelect from '@radix-ui/react-select';
import { SelectGroup } from '@radix-ui/react-select';
import { Fragment, ReactNode, CSSProperties } from 'react';
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { Portal } from '../root-layout/Portal';

interface Category {
  label: ReactNode;
  options: Option[];
}
interface Option {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  placeholder?: string;
  value: string | undefined;
  onSelect?: (value: string) => void;
  options: (Option[] | Category[])[];
  disabled?: boolean;
  style?: CSSProperties;
}

const SelectRoot = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  font-size: 1.125em;
  width: 120px;
`;

const SelectTrigger = styled(RadixSelect.Trigger)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 4px 11px;
  user-select: none;
  font-size: 1.125em;
  line-height: 1.125em;

  &[data-disabled] {
    color: rgba(0, 0, 0, 0.5);
    background-color: #f5f5f5;
  }
`;

const SelectContent = styled(RadixSelect.Content)`
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
`;

const SelectViewport = styled(RadixSelect.Viewport)`
  width: var(--radix-select-trigger-width);
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: 5px;
`;

const SelectItem = styled(RadixSelect.Item)`
  user-select: none;
  font-size: 1.125em;
  padding: 4px 11px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #e6f4ff;
  }
  &[data-disabled] {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SelectLabel = styled(RadixSelect.Label)`
  color: rgba(0, 0, 0, 0.5);
  font-size: 1em;
  padding: 4px 11px;
  margin-top: 8px;
`;

const SelectItemIndicator = styled(RadixSelect.ItemIndicator)`
  right: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SelectSeparator = styled(RadixSelect.Separator)`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  margin: 5px 0;
`;

export function Select(props: SelectProps) {
  const {
    placeholder,
    value,
    onSelect,
    options,
    disabled = false,
    style,
  } = props;

  const realValue = value ?? '';

  return (
    <SelectRoot style={{ ...style }}>
      <RadixSelect.Root
        value={realValue}
        onValueChange={onSelect}
        disabled={disabled}
      >
        <SelectTrigger>
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon asChild>
            <FaChevronDown />
          </RadixSelect.Icon>
        </SelectTrigger>
        <Portal>
          <SelectContent position="popper">
            <RadixSelect.ScrollUpButton>
              <FaChevronUp />
            </RadixSelect.ScrollUpButton>
            <SelectViewport>
              {options.map((group, groupIndex) => (
                <Fragment key={groupIndex}>
                  {group.map((optionOrCategory, optionOrCategoryIndex) =>
                    'options' in optionOrCategory ? (
                      <SelectGroup key={optionOrCategoryIndex}>
                        <SelectLabel>{optionOrCategory.label}</SelectLabel>
                        {optionOrCategory.options.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            <RadixSelect.ItemText>
                              {option.label}
                            </RadixSelect.ItemText>
                            <SelectItemIndicator>
                              <FaCheck />
                            </SelectItemIndicator>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ) : (
                      <SelectItem
                        key={optionOrCategory.value}
                        value={optionOrCategory.value}
                        disabled={optionOrCategory.disabled}
                      >
                        <RadixSelect.ItemText>
                          {optionOrCategory.label}
                        </RadixSelect.ItemText>
                        <SelectItemIndicator>
                          <FaCheck />
                        </SelectItemIndicator>
                      </SelectItem>
                    ),
                  )}
                  {groupIndex < options.length - 1 && <SelectSeparator />}
                </Fragment>
              ))}
            </SelectViewport>
            <RadixSelect.ScrollDownButton />
            <RadixSelect.Arrow />
          </SelectContent>
        </Portal>
      </RadixSelect.Root>
    </SelectRoot>
  );
}
