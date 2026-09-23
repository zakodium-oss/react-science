import styled from '@emotion/styled';

import { forwardAllPropsExcept } from '../../../src/components/utils/forward_all_props_except.ts';

export default {
  title: 'Components / Utils / ShouldForwardProps',
};

const Container = styled('div', {
  shouldForwardProp: forwardAllPropsExcept(['color']),
})<{ color: string }>`
  background-color: ${(props) => props.color};
`;

export function Default() {
  return <Container color="red">Hello, World!</Container>;
}
