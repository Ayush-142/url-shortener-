export function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function generateShortCode(): string {
  return Math.random().toString(36).slice(2, 8);
}
