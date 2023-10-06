export function convertBinaryText(binaryText: string) {
  return String.fromCharCode(parseInt(binaryText, 2));
}
