import { useStore } from '@tanstack/react-form';

import type { ButtonProps } from '../../button/index.js';
import { Button } from '../../button/index.js';
import { useFormContext } from '../context/use_ts_form.js';

type SubmitButtonProps = ButtonProps;

export function SubmitButton(props: SubmitButtonProps) {
  const form = useFormContext();

  const [isSubmitting, errors, isDirty] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.errors,
    state.isDirty,
  ]);

  return (
    <Button
      {...props}
      type="submit"
      disabled={isSubmitting || errors.length > 0 || !isDirty}
    />
  );
}
