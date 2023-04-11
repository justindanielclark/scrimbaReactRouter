type SearchParamLiteral = {
  [key: string]: Array<string>;
};

export default function searchParamDeconstructor(
  urlSearchQuery: string
): SearchParamLiteral | null {
  const returnable = urlSearchQuery
    .split("&")
    .map((entry) => entry.split("="))
    .reduce<SearchParamLiteral>((acc, [index, value]) => {
      if (
        value !== "" &&
        value !== "null" &&
        index !== "" &&
        index !== "null"
      ) {
        acc[index] ? acc[index].push(value) : (acc[index] = [value]);
      }
      return acc;
    }, {});
  return Object.keys(returnable).length === 0 ? null : returnable;
}

export type { SearchParamLiteral };
