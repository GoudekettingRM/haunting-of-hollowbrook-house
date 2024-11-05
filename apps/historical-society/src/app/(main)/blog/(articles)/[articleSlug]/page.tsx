// app/blog/[articleSlug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import allArticles from '../../articles.json';

interface Article {
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

  const parseParagraph = (paragraph: string) => {
    if (paragraph.startsWith('h2:')) {
      const title = paragraph.replace('h2:', '');
      return <h2 className='text-xl font-semibold mt-5 sm:mt-8 mb-2'>{title}</h2>;
    } else if (paragraph.startsWith('ul:')) {
      const listItems = paragraph.slice(3).split('|');
      return (
        <ul className='list-[circle] list-inside mb-3 sm:mb-5 pl-2 sm:pl-6'>
          {listItems.map((item, index) => (
            <li key={index} className='mb-1'>
              {parseInlineElements(item.trim())}
            </li>
          ))}
        </ul>
      );
    } else if (paragraph.startsWith('no-i:')) {
      return (
        <p key={paragraph} className=''>
          {parseInlineElements(paragraph.slice(5))}
        </p>
      );
    }
    return (
      <p key={paragraph} className='indent-6 mb-3 sm:mb-5'>
        {parseInlineElements(paragraph)}
      </p>
    );
  };

  const parseInlineElements = (text: string) => {
    const splitText = text.split(/(<a.*?>.*?<\/a>)/g);
    return splitText.map((part, index) => {
      if (part.startsWith('<a')) {
        const pattern = /<a href='([^']*)'>(.*?)<\/a>/;
        const match = pattern.exec(part);

        if (match) {
          const [, hrefValue, content] = match;
          return (
            <Link key={index} href={hrefValue} className='text-medium-wood hover:text-dark-wood underline'>
              {content}
            </Link>
          );
        }
      }
      return part;
    });
  };

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href='/blog' className='text-sm text-medium-wood hover:text-dark-wood mb-4'>
        ‹ Back to overview
      </Link>
      <h1 className='text-3xl mb-6 mt-3 text-dark-wood'>{article.title}</h1>
      <div className='leading-tight text-sm'>
        {article.paragraphs.map((paragraph, index) => {
          return <Fragment key={`${paragraph}_${index}`}>{parseParagraph(paragraph)}</Fragment>;
        })}
      </div>
      <div className='mt-8 text-sm text-dark-wood italic'>
        <p>
          Published on {article.date} | Last updated on {article.lastEdited}
        </p>
      </div>

      <div className='flex flex-wrap gap-1 mt-8 text-sm italic'>
        {article.tags.map((tag) => {
          return (
            <span key={tag} className='py-1 px-2 rounded-md bg-light-wood text-white'>
              {tag}
            </span>
          );
        })}
      </div>
    </>
  );
}

export default ArticlePage;
