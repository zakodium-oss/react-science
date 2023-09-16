import styled from '@emotion/styled';
import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaTimesCircle } from 'react-icons/fa';

import { FullSpinner } from '../index';

import { useFieldsContext } from './context/FieldsContext';
import {
  InputContainer,
  GroupStyled,
  LabelStyled,
  InputVariant,
} from './styles';
import { SubText, SubTextProps } from './utils';

const InputStyled = styled.input`
  padding: 0;
  flex: 1 1 0%;
  border: none;
  position: relative;
  outline: none;
`;

const LeadingAddonStyled = styled.div`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-right-width: 0px;
  border-width: 1px;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  align-items: center;
  display: inline-flex;

  border-right: none;

  border-color: var(--custom-border-color);
`;

const TrailingAddonStyled = styled.div`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-left-width: 0px;
  border-width: 1px;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  align-items: center;
  display: inline-flex;

  border-left: none;

  border-color: var(--custom-border-color);
`;

const LeadingInlineAddonStyled = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
`;

const TrailingInlineAddonStyled = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
`;

interface RenderAddon {
  addon: ReactNode;
  inline?: boolean;
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    SubTextProps {
  clearable?: boolean;
  variant?: InputVariant;
  leadingAddon?: RenderAddon;
  trailingAddon?: RenderAddon;
  help?: string;
  error?: string;
  valid?: true | string;
  loading?: boolean;
}

export function Input(props: InputProps) {
  const {
    variant: variantProps,
    trailingAddon,
    leadingAddon,
    help,
    error,
    valid,
    loading,
    clearable = false,
    onChange,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  const { name, variant: contextVariant } = useFieldsContext();

  const hasLeading = (leadingAddon && !leadingAddon.inline) || false;
  const hasTrailing = (trailingAddon && !trailingAddon.inline) || false;
  const variant = variantProps || contextVariant;
  const clearInput = () => {
    if (ref.current) {
      setValue('');
      ref.current.value = '';
      const event = {
        target: ref.current,
      } as ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    }
  };
  const [value, setValue] = useState(otherProps.value);
  useEffect(() => {
    setValue(otherProps.value);
  }, [otherProps.value]);

  return (
    <InputContainer>
      <GroupStyled hasError={!!error} hasValid={!!valid}>
        {leadingAddon && !leadingAddon.inline && (
          <LeadingAddonStyled>{leadingAddon.addon}</LeadingAddonStyled>
        )}

        <LabelStyled
          variant={variant}
          hasLeading={hasLeading}
          hasTrailing={hasTrailing}
        >
          {leadingAddon?.inline && (
            <LeadingInlineAddonStyled className="addon">
              {leadingAddon.addon}
            </LeadingInlineAddonStyled>
          )}
          <InputStyled
            ref={ref}
            id={name}
            name={name}
            onChange={(e) => {
              setValue(e.target.value);
              onChange?.(e);
            }}
            {...otherProps}
          />
          {clearable && value && (
            <TrailingInlineAddonStyled>
              <FaTimesCircle
                style={{ cursor: 'pointer', opacity: 0.8 }}
                onClick={clearInput}
                size={variant === 'default' ? 14 : 12}
              />
            </TrailingInlineAddonStyled>
          )}
          {trailingAddon?.inline && (
            <TrailingInlineAddonStyled className="addon">
              {trailingAddon.addon}
            </TrailingInlineAddonStyled>
          )}

          {loading && (
            <TrailingInlineAddonStyled
              style={{ height: variant === 'default' ? 20 : 10 }}
            >
              <FullSpinner
                height={variant === 'default' ? 20 : 10}
                width={variant === 'default' ? 20 : 10}
              />
            </TrailingInlineAddonStyled>
          )}
        </LabelStyled>

        {trailingAddon && !trailingAddon.inline && (
          <TrailingAddonStyled>{trailingAddon.addon}</TrailingAddonStyled>
        )}
      </GroupStyled>

      <SubText error={error} help={help} valid={valid} />
    </InputContainer>
  );
}
