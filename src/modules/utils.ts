export function firstCharToUpper(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function replaceNewlinesWithSpace(text: string) {
  return text.replace(/\n/g, ' ');
}

export function clearDoubleSpaces(text: string) {
  return text.replace(/ {2,}/g, ' ');
}
