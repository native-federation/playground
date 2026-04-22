let imageServer = '';

export function setImageServer(url: string): void {
  imageServer = url ?? '';
}

export function cdnUrl(path: string): string {
  return imageServer + path;
}

export function src(image: string, size: number): string {
  return imageServer + image.replace('[size]', `${size}`);
}

export function srcset(image: string, sizes: number[] = []): string {
  return sizes
    .map((size) => `${imageServer + image.replace('[size]', `${size}`)} ${size}w`)
    .join(', ');
}
