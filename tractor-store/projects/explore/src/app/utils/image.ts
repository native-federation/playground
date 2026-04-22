let imageServer = '';

export function setImageServer(url: string): void {
  imageServer = url ?? '';
}

export function cdnUrl(path: string): string {
  return imageServer + path;
}

export function replaceSize(image: string, size: number): string {
  return image.replace('[size]', `${size}`);
}

export function imgSrc(image: string, size: number): string {
  return imageServer + replaceSize(image, size);
}

export function imgSrcset(image: string, sizes: number[] = []): string {
  return sizes
    .map((size) => `${imageServer + replaceSize(image, size)} ${size}w`)
    .join(', ');
}

export function fmtPrice(price: number): string {
  return `${price},00 Ø`;
}
