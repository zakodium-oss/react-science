import styled from '@emotion/styled';

import { shouldForwardPropExcept } from '../../../src/components/utils/shouldForwardPropExcept.js';

export default {
  title: 'Components / Utils / ShouldForwardProps',
};

const Container = styled('div', {
  shouldForwardProp: shouldForwardPropExcept(['color']),
})<{ color: string }>`
  background-color: ${(props) => props.color};
`;

export function Default() {
  return <Container color="red">Hello, World!</Container>;
}
