export function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    }
    catch {
        return false;
    }
}
export function generateShortCode() {
    return Math.random().toString(36).slice(2, 8);
}
