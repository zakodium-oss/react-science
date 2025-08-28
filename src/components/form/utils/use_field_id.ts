import { useId } from 'react';

export function useFieldId(fieldName: string) {
  return `input-${fieldName}-${useId()}`;
}
