import type { FormGroupProps } from '@blueprintjs/core';
import { FormGroup } from '@blueprintjs/core';
import type { SelectProps as BPSelectProps } from '@blueprintjs/select';
import { Select as BPSelect } from '@blueprintjs/select';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { useCallback, useMemo } from 'react';

import { Button } from '../../../button/index.js';
import { useInputId } from '../hooks/use_input_id.js';
import type {
  GetOptionLabel,
  GetOptionValue,
  SelectId,
  SelectOption,
  SelectOptionLabel,
} from '../util/select.js';
import {
  getItemRenderer,
  getSelectLabel,
  getSelectValue,
} from '../util/select.js';

type FieldGroupProps = Pick<FormGroupProps, 'label' | 'inline'>;

export interface SelectPropsRenderButtonState<OptionType> {
  error: string | undefined;
  selectedOption: OptionType | undefined;
}

interface SelectCustomProps<OptionType, ID extends SelectId> {
  renderButton?: (state: SelectPropsRenderButtonState<OptionType>) => ReactNode;
  onChange?: (selected: ID | undefined, option: OptionType | undefined) => void;
  id?: string;
  selected?: ID;

  required?: boolean;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SelectGetValue<OptionType, ID extends SelectId> = {
  /**
   * Optional if OptionType extends SelectOption<ID>
   * @default getSelectValue
   */
  getValue: GetOptionValue<OptionType, ID>;
};

type SelectGetValueProps<OptionType, ID extends SelectId> =
  OptionType extends SelectOption<ID>
    ? Partial<SelectGetValue<OptionType, ID>>
    : SelectGetValue<OptionType, ID>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SelectGetLabel<OptionType> = {
  /**
   * Optional if OptionType extends SelectOptionLabel
   * @default getSelectLabel
   */
  getLabel: GetOptionLabel<OptionType>;
};

type SelectGetLabelProps<OptionType> = OptionType extends SelectOptionLabel
  ? Partial<SelectGetLabel<OptionType>>
  : SelectGetLabel<OptionType>;

export type SelectProps<OptionType, ID extends SelectId> = FieldGroupProps &
  Pick<
    BPSelectProps<OptionType>,
    | 'placeholder'
    | 'items'
    | 'className'
    | 'disabled'
    | 'popoverProps'
    | 'filterable'
    | 'itemDisabled'
    | 'itemListPredicate'
    | 'resetOnClose'
  > &
  Pick<ComponentProps<typeof FormGroup>, 'helperText' | 'intent'> &
  SelectCustomProps<OptionType, ID> &
  SelectGetValueProps<OptionType, ID> &
  SelectGetLabelProps<OptionType>;

/**
 * A wrapper for the BlueprintJS Select component that integrates with react-hook-form.
 * Store in form the selected value.
 * Find selected option getValue.
 * Display options with getLabel.
 *
 * @param props
 * @constructor
 */

interface RealSelectProps<OptionType, ID extends SelectId> {
  id?: string;
  renderButton?: (state: SelectPropsRenderButtonState<OptionType>) => ReactNode;
  disabled?: boolean;
  selected?: ID;
  formGroupProps: Pick<
    ComponentProps<typeof FormGroup>,
    'helperText' | 'intent' | 'label' | 'className' | 'inline'
  > & {
    required?: boolean;
  };
  selectProps: Pick<BPSelectProps<OptionType>, 'filterable' | 'items'> & {
    onChange?: (
      selected: ID | undefined,
      option: OptionType | undefined,
    ) => void;
  };
  buttonProps?: {
    getLabel: GetOptionLabel<OptionType>;
    getValue: GetOptionValue<OptionType, ID>;
  };
}

export function Select<
  OptionType extends SelectOption<ID>,
  ID extends SelectId,
>(props: RealSelectProps<OptionType, ID>): ReactElement {
  const {
    renderButton,
    id,
    disabled,
    selected,
    buttonProps: { getLabel: _getLabel, getValue: _getValue } = {},
    formGroupProps: { className, helperText, inline, intent, label, required },
    // Weirdly, setting the filterable prop on BP's Select component activates the filter input
    selectProps: { filterable = false, items, onChange },
  } = props;

  const getValue: GetOptionValue<OptionType, ID> = _getValue ?? getSelectValue;
  const getLabel: GetOptionLabel<OptionType> = _getLabel ?? getSelectLabel;

  const selectedOption = useMemo(
    () => items.find((item) => getValue(item) === selected),
    [getValue, items, selected],
  );

  const itemRenderer = useMemo(() => {
    return getItemRenderer<OptionType, ID>({
      selected,
      getValue,
      getLabel,
    });
  }, [getLabel, getValue, selected]);

  const onItemSelect = useCallback(
    (option: OptionType | undefined) => {
      const value = getValue(option);
      onChange?.(value, option);
    },
    [getValue, onChange],
  );

  const inputId = useInputId(id, null);

  return (
    <FormGroup
      label={label}
      labelFor={inputId}
      helperText={helperText}
      intent={intent}
      style={{ margin: 0, position: 'relative' }}
      className={className}
      inline={inline}
      disabled={disabled}
      labelInfo={required && <span style={{ color: 'red' }}>*</span>}
    >
      <BPSelect<OptionType>
        filterable={filterable}
        items={items}
        onItemSelect={onItemSelect}
        itemRenderer={itemRenderer}
        disabled={disabled}
      >
        {renderButton ? (
          renderButton({ selectedOption, error: undefined })
        ) : (
          <Button
            id={inputId}
            text={getLabel(selectedOption) || 'Select ...'}
            endIcon="double-caret-vertical"
            variant="outlined"
            intent="none"
            disabled={disabled}
            style={{ minWidth: 180 }}
          />
        )}
      </BPSelect>
    </FormGroup>
  );
}
