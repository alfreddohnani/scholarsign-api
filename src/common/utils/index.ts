export function getEnumKeys(enumType: any): string[] {
  return Object.keys(enumType).filter((key) => isNaN(+key));
}
