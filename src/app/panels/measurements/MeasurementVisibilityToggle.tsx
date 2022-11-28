import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useAppDispatch } from '../../../app-data/index';

interface MeasurementVisibilityToggleProps {
  id: string | null;
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
