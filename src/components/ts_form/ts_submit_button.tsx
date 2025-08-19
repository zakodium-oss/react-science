import type { ButtonProps } from '../button/index.js';
import { Button } from '../button/index.js';

import { useFormContext } from './context/use_ts_form.js';

type TSSubmitButtonProps = ButtonProps;

export function TSSubmitButton(props: TSSubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        errors: state.errors,
      })}
    >
      {({ isSubmitting, errors }) => (
        <Button
          {...props}
          type="submit"
          disabled={isSubmitting || errors.length > 0}
        />
      )}
    </form.Subscribe>
  );
}
