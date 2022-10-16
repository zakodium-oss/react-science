export function download(blob: Blob, name: string) {
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
