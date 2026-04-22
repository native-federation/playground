let imageServer = '';

export function setImageServer(url: string): void {
  imageServer = url ?? '';
}

export function cdnUrl(path: string): string {
  return imageServer + path;
}

export function replaceSize(path: string, size: number): string {
  return imageServer + path.replace('[size]', String(size));
}

export function srcset(path: string, sizes: number[]): string {
  return sizes.map((s) => `${replaceSize(path, s)} ${s}w`).join(', ');
}
