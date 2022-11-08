export function download(blob: Blob, name: string) {
  const link = document.createElement('a');

  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', name);
  link.style.visibility = 'hidden';
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
