import styled from '@emotion/styled';

// Applying global styles that apply to elements that are not part of the shadow DOM.
export const CustomDivPreflight = styled.div`
  /* html */
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    'Noto Sans',
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji';

  width: 100%;
  height: 100%;
  position: relative;
`;
