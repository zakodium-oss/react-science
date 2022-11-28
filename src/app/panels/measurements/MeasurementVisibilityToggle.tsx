import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useAppDispatch } from '../../../app-data/index';

import { MeasurementsTableProps } from './MeasurementsTable';

interface MeasurementVisibilityToggleProps {
  id: string;
  isVisible: boolean;
}

export default function MeasurementVisibilityToggle(
  props: MeasurementVisibilityToggleProps,
) {
  const { id, isVisible } = props;
  const dispatch = useAppDispatch();

  function setVisibility(isVisible: boolean) {
    dispatch({
      type: 'SET_MEASUREMENT_VISIBILITY',
      payload: { id, isVisible },
    });
  }

  return isVisible ? (
    <FaEye onClick={() => setVisibility(false)} style={{ cursor: 'pointer' }} />
  ) : (
    <FaEyeSlash
      onClick={() => setVisibility(true)}
      style={{ cursor: 'pointer', opacity: 0.6 }}
    />
  );
}

export function MeasurementAllVisibilityToggle(
  props: Omit<MeasurementVisibilityToggleProps, 'id'> & {
    kind: MeasurementsTableProps['kind'];
  },
) {
  const { kind, isVisible } = props;
  const dispatch = useAppDispatch();

  function setVisibility(isVisible: boolean) {
    dispatch({
      type: 'SET_ALL_MEASUREMENT_VISIBILITY',
      payload: { kind, isVisible },
    });
  }

  return isVisible ? (
    <FaEye onClick={() => setVisibility(false)} style={{ cursor: 'pointer' }} />
  ) : (
    <FaEyeSlash
      onClick={() => setVisibility(true)}
      style={{ cursor: 'pointer', opacity: 0.6 }}
    />
  );
}
