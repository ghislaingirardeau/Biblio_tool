export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  // doi test: 10.1038/s41586-020-2649-2
  const { doi } = query;
  const url = `https://api.crossref.org/works/${encodeURIComponent(
    doi as string
  )}`;
  const response = await fetch(url);
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  // Optionally handle non-ok responses
  return { error: 'Failed to fetch data from CrossRef' };
});
