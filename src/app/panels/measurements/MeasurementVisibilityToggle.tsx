import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useAppDispatch } from '../../../app-data/index';
import { Button } from '../../../components/index';

import { MeasurementsTableProps } from '.';

interface MeasurementVisibilityToggleProps {
  id: string;
  isVisible: boolean;
}

export function MeasurementVisibilityToggle(
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
    <Button icon="eye-on" onClick={() => setVisibility(false)} minimal />
  ) : (
    <Button
      icon="eye-off"
      onClick={() => setVisibility(true)}
      style={{ opacity: 0.6 }}
      minimal
    />
  );
}

export function MeasurementSelectedVisibilityChange(props: {
  openedEyes: boolean;
  kind: MeasurementsTableProps['kind'];
}) {
  const { kind, openedEyes } = props;
  const dispatch = useAppDispatch();

  function setVisibility(isVisible: boolean) {
    dispatch({
      type: 'SET_SELECTED_MEASUREMENTS_VISIBILITY',
      payload: { kind, isVisible: !isVisible },
    });
  }

  return openedEyes ? (
    <FaEye onClick={() => setVisibility(false)} style={{ cursor: 'pointer' }} />
  ) : (
    <FaEyeSlash
      onClick={() => setVisibility(true)}
      style={{ cursor: 'pointer', opacity: 0.6 }}
    />
  );
}
