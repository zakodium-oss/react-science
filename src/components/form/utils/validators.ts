import type { ZodCodec, ZodNumber, ZodOptional, ZodString } from 'zod';
import { z } from 'zod';

interface StringToNumberOptionalOptions<
  Str extends ZodString,
  Num extends ZodNumber,
> {
  /** @default z.string() */
  strSchema?: Str;
  /** @default z.number() */
  numSchema?: Num;
  /** @default Number */
  parse?: (str: string) => number;
}

/**
 * The purpose is to replace `z.coerce.number().optional()` without coercing undefined to `0`
 * @param options
 */
export function stringToNumberOptional<
  Str extends ZodString = ZodString,
  Num extends ZodNumber = ZodNumber,
>(
  options: StringToNumberOptionalOptions<Str, Num> = {},
): ZodCodec<ZodOptional<Str>, ZodOptional<Num>> {
  const strSchema = options?.strSchema ?? (z.string() as Str);
  const numSchema = options?.numSchema ?? (z.number() as Num);
  const parse = options?.parse ?? Number;

  return z.codec(strSchema.optional(), numSchema.optional(), {
    encode: (num) => {
      if (num === undefined) return undefined;

      return String(num) as z.output<ZodOptional<Str>>;
    },
    decode: (str) => {
      if (!str) return undefined;

      const value = parse(str);
      if (Number.isNaN(value)) return undefined;

      return value as z.input<ZodOptional<Num>>;
    },
  });
}
