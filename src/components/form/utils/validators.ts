import type { ZodCodec, ZodNumber, ZodOptional, ZodString } from 'zod';
import { z } from 'zod';

interface StringToNumberOptionalOptions<
  StringSchema extends ZodString,
  NumberSchema extends ZodNumber,
> {
  /**
   * @default z.string()
   */
  strSchema?: StringSchema;
  /**
   * @default z.number()
   */
  numSchema?: NumberSchema;
  /**
   * @default Number
   */
  parse?: (value: string) => number;
}

/**
 * The purpose is to replace `z.coerce.number().optional()` without coercing undefined to `0`
 * @param options
 */
export function stringToNumberOptional<
  StringSchema extends ZodString = ZodString,
  NumberSchema extends ZodNumber = ZodNumber,
>(
  options: StringToNumberOptionalOptions<StringSchema, NumberSchema> = {},
): ZodCodec<ZodOptional<StringSchema>, ZodOptional<NumberSchema>> {
  const stringSchema = options?.strSchema ?? (z.string() as StringSchema);
  const numberSchema = options?.numSchema ?? (z.number() as NumberSchema);
  const parse = options?.parse ?? Number;

  return z.codec(stringSchema.optional(), numberSchema.optional(), {
    encode: (value) => {
      if (value === undefined) return undefined;

      return String(value) as z.output<ZodOptional<StringSchema>>;
    },
    decode: (value) => {
      if (!value) return undefined;

      const parsed = parse(value);
      if (Number.isNaN(parsed)) return undefined;

      return parsed as z.input<ZodOptional<NumberSchema>>;
    },
  });
}
