import { Spinner as BpSpinner } from '@blueprintjs/core';

export default {
  title: 'Components / FullSpinner',
};

export function Spinner() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <BpSpinner />
    </div>
  );
}
