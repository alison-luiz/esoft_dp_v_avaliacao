export function isValidData(data: any): data is { data: { results: any[] } } {
  return (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    typeof data.data === "object" &&
    data.data !== null &&
    "results" in data.data &&
    Array.isArray(data.data.results)
  );
}