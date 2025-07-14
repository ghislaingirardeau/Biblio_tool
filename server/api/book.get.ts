export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { isbn } = query;
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(
      isbn as string
    )}&maxResults=1`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const result = await response.json();

    const data = result.items;

    if (!data || data.length === 0) {
      return { message: 'No data found' };
    }

    return data[0].volumeInfo;
  } catch (error) {
    console.error('Erreur API Google Books :', error.message);
  }
});
