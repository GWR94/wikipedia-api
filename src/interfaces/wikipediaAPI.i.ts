import { ArticleProps } from "./article.i";

export interface WikiState {
  searchQuery: string;
  inputFocus: boolean;
  searchResults: ArticleProps[] | null;
  pageNum: number;
  closeNav: boolean;
  noArticleFound: boolean;
  resultsLength: number;
  max: number;
}
