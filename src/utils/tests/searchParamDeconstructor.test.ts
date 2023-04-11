import searchParamDeconstructor from "../searchParamDeconstructor";

test("Deconstructs a basic search query", () => {
  const result = searchParamDeconstructor("type=cheese");
  if (result) {
    expect(Array.isArray(result.type)).toBe(true);
    expect(result.type[0]).toBe("cheese");
  }
});

test("Deconstructs a search query with multiple params", () => {
  const result = searchParamDeconstructor("type=cheese&hair=auburn");
  if (result) {
    expect(Array.isArray(result.type)).toBe(true);
    expect(Array.isArray(result.hair)).toBe(true);
    expect(Array.isArray(result.smile)).toBe(false);
    expect(result.type[0]).toBe("cheese");
    expect(result.hair[0]).toBe("auburn");
  }
});

test("returns null if no params", () => {
  const result = searchParamDeconstructor("");
  expect(result).toBe(null);
});
