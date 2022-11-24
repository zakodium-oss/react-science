import { ColorConfig } from '../../../app-data/index';
import { ColorPreview } from '../../../components/index';

interface MeasurementColorPreviewProps {
  color: ColorConfig;
}

export default function MeasurementColorPreview(
  props: MeasurementColorPreviewProps,
) {
  const { color } = props;
  return (
    <div style={{ width: '1em', height: '1em' }}>
      <ColorPreview color={color} />{' '}
    </div>
  );
}
