import type { ButtonProps } from '../button/index.js';
import { Button } from '../button/index.js';

import { useFormContext } from './context/use_ts_form.js';

type TSSubmitButtonProps = ButtonProps;

export function TSSubmitButton(props: TSSubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe>
      <Button {...props} type="submit" />
    </form.Subscribe>
  );
}
