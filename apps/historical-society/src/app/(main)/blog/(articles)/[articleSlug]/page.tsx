// app/blog/[articleSlug]/page.tsx
import ArticlePageContent from '@/components/ArticlePageContent';
import type { Metadata } from 'next';
import allArticles from '../../articles.json';

export interface Article {
  title: string;
  date: string;
  lastEdited: string;
  excerpt: string;
  paragraphs: string[];
  tags: string[];
  slug: string;
}

interface ArticlePageProps {
  params: Promise<{ articleSlug: string }>;
}

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    articleSlug: article.slug,
  }));
}

export async function generateMetadata(props: ArticlePageProps): Promise<Metadata> {
  const params = await props.params;
  const article = allArticles.find((art) => art.slug === params.articleSlug);

  if (!article) {
    return {
      title: 'Article Not Found | Whispering Hollows Historical Society',
      description: 'The requested article could not be found.',
    };
  }

  const publishDate = new Date(article.date).toISOString();
  const modifiedDate = new Date(article.lastEdited).toISOString();

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: 'Whispering Hollows Historical Society' }],
    publisher: 'Whispering Hollows Historical Society',
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: publishDate,
      modifiedTime: modifiedDate,
      authors: ['Whispering Hollows Historical Society'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

// JSON-LD Generator function
function generateArticleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.lastEdited).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Whispering Hollows Historical Society',
      url: 'https://whisperinghollows.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Whispering Hollows Historical Society',
      logo: {
        '@type': 'ImageObject',
        url: 'https://whisperinghollows.org/images/whhs-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://whisperinghollows.org/blog/${article.slug}`,
    },
    keywords: article.tags.join(', '),
    articleSection: 'Local History',
    isAccessibleForFree: true,
  };
}

async function ArticlePage(props: ArticlePageProps) {
  const { articleSlug } = await props.params;

  const article = allArticles.find((art) => art.slug === articleSlug);

  if (!article) {
    return <p>Article not found</p>;
  }

  const jsonLd = generateArticleJsonLd(article);

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticlePageContent article={article} />
    </>
  );
}

export default ArticlePage;
