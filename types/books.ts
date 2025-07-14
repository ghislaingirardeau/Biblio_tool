export interface Book {
  id: number;
  title: string;
  subtitle: string;
  author: string[];
  publisher: string;
  publishedDate: string;
  industryIdentifiers: IndustryIdentifiers[];
  pageCount: number;
  categories: string[];
  language: string;
  infoLink: string;
  imageLinks: { thumbnail: string };
}

interface IndustryIdentifiers {
  type: string;
  identifier: string;
}
