import { useAppDispatch } from '../../../app-data/index.js';
import { Button } from '../../../components/index.js';

import type { MeasurementsTableProps } from './index.js';

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
    <Button
      icon="eye-on"
      onClick={() => setVisibility(false)}
      variant="minimal"
    />
  ) : (
    <Button
      icon="eye-off"
      onClick={() => setVisibility(true)}
      style={{ opacity: 0.6 }}
      variant="minimal"
    />
  );
}

export function MeasurementSelectedVisibilityChange(props: {
  isVisible: boolean;
  kind: MeasurementsTableProps['kind'];
}) {
  const { kind, isVisible } = props;
  const dispatch = useAppDispatch();

  function setVisibility(isVisible: boolean) {
    dispatch({
      type: 'SET_SELECTED_MEASUREMENTS_VISIBILITY',
      payload: { kind, isVisible: !isVisible },
    });
  }

  return isVisible ? (
    <Button
      icon="eye-on"
      onClick={() => setVisibility(true)}
      variant="minimal"
    />
  ) : (
    <Button
      icon="eye-off"
      onClick={() => setVisibility(false)}
      style={{ opacity: 0.6 }}
      variant="minimal"
    />
  );
}
