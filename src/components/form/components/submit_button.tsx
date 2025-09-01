import { useStore } from '@tanstack/react-form';

import type { ButtonProps } from '../../button/index.js';
import { Button } from '../../button/index.js';
import { useFormContext } from '../context/use_ts_form.js';

type SubmitButtonProps = ButtonProps;

export function SubmitButton(props: SubmitButtonProps) {
  const { intent, ...otherProps } = props;

  const form = useFormContext();
  const [isSubmitting] = useStore(form.store, (state) => [state.isSubmitting]);

  return (
    <Button
      {...otherProps}
      intent={intent ?? 'primary'}
      type="submit"
      disabled={isSubmitting}
    />
  );
}
