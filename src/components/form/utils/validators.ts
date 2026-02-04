import type { ZodCodec, ZodNumber, ZodOptional, ZodString } from 'zod';
import { z } from 'zod';

interface StringToNumberOptionalOptions<
  Str extends ZodString,
  Nbr extends ZodNumber,
> {
  /** @default z.string() */
  strSchema?: Str;
  /** @default z.number() */
  nbrSchema?: Nbr;
  /** @default Number */
  parse?: (str: string) => number;
}

/**
 * The purpose is to replace `z.coerce.number().optional()` without coercing undefined to `0`
 * @param options
 */
export function stringToNumberOptional<
  Str extends ZodString = ZodString,
  Nbr extends ZodNumber = ZodNumber,
>(
  options: StringToNumberOptionalOptions<Str, Nbr> = {},
): ZodCodec<ZodOptional<Str>, ZodOptional<Nbr>> {
  const strSchema = options?.strSchema ?? (z.string() as Str);
  const nbrSchema = options?.nbrSchema ?? (z.number() as Nbr);
  const parse = options?.parse ?? Number;

  return z.codec(strSchema.optional(), nbrSchema.optional(), {
    encode: (nbr) => {
      if (nbr === undefined) return undefined;

      return String(nbr) as z.output<ZodOptional<Str>>;
    },
    decode: (str) => {
      if (!str) return undefined;

      const value = parse(str);
      if (Number.isNaN(value)) return undefined;

      return value as z.input<ZodOptional<Nbr>>;
    },
  });
}
