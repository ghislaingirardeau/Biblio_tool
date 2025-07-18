export default defineEventHandler(async (event) => {
  try {
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
    throw Error('get Doi data failed');
  } catch (error: unknown) {
    return { error: 'Failed to fetch data from CrossRef' };
  }
});
