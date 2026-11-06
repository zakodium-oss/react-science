import { useSelector } from '@tanstack/react-store';

import type { ButtonProps } from '../../../button/index.js';
import { Button } from '../../../button/index.js';
import { useFormContext } from '../../context/use_ts_form.js';

type SubmitButtonProps = ButtonProps;

export function SubmitButton(props: SubmitButtonProps) {
  const { intent = 'primary', disabled, ...otherProps } = props;

  const form = useFormContext();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <Button
      {...otherProps}
      intent={intent}
      type="submit"
      disabled={disabled || isSubmitting}
    />
  );
}
