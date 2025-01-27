import { Article } from '@/types/article';

export const filterArticles = (articles: Article[], query?: string): Article[] => {
  if (!query) return articles;

  return articles
    .filter((art) => filterComponents(art, query))
    .sort((a, b) => parseInt(b.year + b.month + b.day) - parseInt(a.year + a.month + a.day));
};

const filterComponents = (article: Article, query: string): boolean => {
  return (
    // Filter keywords
    article.keywords.map((kw) => kw.toLowerCase().replaceAll(' ', '')).includes(query) ||
    // Filter title
    article.title.toLowerCase().replaceAll(' ', '').includes(query)
    // Filter paragraphs, disabled because will probably take too  much processing power to actually go through all articles if im gonna have 200 articles.
    // article.paragraphs.join('').toLowerCase().replaceAll(' ', '').includes(query)
  );
};
