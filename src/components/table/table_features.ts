import {
  columnVisibilityFeature,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric as sortFunctionAlphanumeric,
  sortFn_alphanumericCaseSensitive as sortFunctionAlphanumericCaseSensitive,
  sortFn_basic as sortFunctionBasic,
  sortFn_datetime as sortFunctionDatetime,
  sortFn_text as sortFunctionText,
  sortFn_textCaseSensitive as sortFunctionTextCaseSensitive,
  tableFeatures,
} from '@tanstack/react-table';

export const reactScienceTableFeatures = tableFeatures({
  columnVisibilityFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFunctionAlphanumeric,
    alphanumericCaseSensitive: sortFunctionAlphanumericCaseSensitive,
    basic: sortFunctionBasic,
    datetime: sortFunctionDatetime,
    text: sortFunctionText,
    textCaseSensitive: sortFunctionTextCaseSensitive,
  },
});

export type ReactScienceTableFeatures = typeof reactScienceTableFeatures;
