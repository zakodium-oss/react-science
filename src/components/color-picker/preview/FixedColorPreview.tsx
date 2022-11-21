interface FixedColorPreviewProps {
  color: string;
}

export default function FixedColorPreview(props: FixedColorPreviewProps) {
  const { color } = props;
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: color }} />
  );
}
