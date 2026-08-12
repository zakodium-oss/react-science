import {
  columnVisibilityFeature,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric as sortFnAlphanumeric,
  sortFn_alphanumericCaseSensitive as sortFnAlphanumericCaseSensitive,
  sortFn_basic as sortFnBasic,
  sortFn_datetime as sortFnDatetime,
  sortFn_text as sortFnText,
  sortFn_textCaseSensitive as sortFnTextCaseSensitive,
  tableFeatures,
} from '@tanstack/react-table';

export const reactScienceTableFeatures = tableFeatures({
  columnVisibilityFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFnAlphanumeric,
    alphanumericCaseSensitive: sortFnAlphanumericCaseSensitive,
    basic: sortFnBasic,
    datetime: sortFnDatetime,
    text: sortFnText,
    textCaseSensitive: sortFnTextCaseSensitive,
  },
});

export type ReactScienceTableFeatures = typeof reactScienceTableFeatures;
