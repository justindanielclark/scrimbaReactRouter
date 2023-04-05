export default function capitalize(str: string): string {
  if (str.length === 0) {
    return ``;
  }
  const strArray = str.split(" ");
  return strArray
    .map(
      (str) =>
        `${str.substring(0, 1).toUpperCase()}${str.substring(1, str.length)}`
    )
    .join(" ");
}
