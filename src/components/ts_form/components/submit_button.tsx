import type { ButtonProps } from '../../button/index.js';
import { Button } from '../../button/index.js';
import { useFormContext } from '../context/use_ts_form.js';

type SubmitButtonProps = ButtonProps;

export function SubmitButton(props: SubmitButtonProps) {
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
