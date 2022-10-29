import type { AppState } from './context/appState';

function download(blob: Blob, name: string) {
  const link = document.createElement('a');

  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', name);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
export function saveHandler(
  appState: AppState,
  filename = 'file',
  spaceIndent = 0,
) {
  const data = JSON.stringify(
    { data: appState.data, view: appState.view },
    (_key, value) =>
      ArrayBuffer.isView(value) ? Array.from(value as any) : value,
    spaceIndent,
  );
  const blob = new Blob([data], { type: 'text/plain' });
  download(blob, `${filename}.ium`);
}
