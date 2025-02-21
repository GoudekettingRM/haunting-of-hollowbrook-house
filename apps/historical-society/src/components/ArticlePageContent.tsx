'use client';
import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Article } from './ArticleCard';
import SwingingDiv from './SwingingBoard';
import { useBuggingContext } from './useBuggingContext';

const createSeededRandom = (seed: string) => {
  let x = 0;
  for (let i = 0; i < seed.length; i++) {
    x = (x << 5) - x + seed.charCodeAt(i);
    x = x & x;
  }

  const seededRandom = () => {
    x = Math.imul(x, 1597);
    return (x >>> 0) / 4294967296;
  };

  return seededRandom;
};

const ArticlePageContent = ({ article }: { article: Article }) => {
  const [isClient, setIsClient] = useState(false);
  const { isBugged } = useBuggingContext();

  const pageSeed = useMemo(() => {
    const baseTime = new Date().toISOString().split('T')[0];
    return `${baseTime}-${article.slug}-${Math.random()}`;
  }, [article.slug]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const parseParagraph = useCallback(
    (paragraph: string, index: number, type: 'p' | 'h2' | 'ul') => {
      const seed = `${pageSeed}-${type}-${index}-${paragraph.slice(0, 20)}`;
      const random = createSeededRandom(seed);

      const getPositiveOrNegativeRotation = () => {
        if (!isBugged) return '';
        const randomValue = random();

        if (randomValue > 0.5) {
          return randomValue > 0.75 ? 'rotate-2' : '-rotate-2';
        }
        return randomValue > 0.75 ? `rotate-1` : `-rotate-1`;
      };

      const getSidewaysSlide = () => {
        if (!isBugged || random() < 0.7) return '';

        return random() > 0.5 ? 'right-8 relative' : 'left-8 relative';
      };

      const positiveOrNegativeRotation = getPositiveOrNegativeRotation();
      const sidewaysSlide = getSidewaysSlide();

      if (type === 'h2') {
        const title = paragraph.replace('h2:', '');
        return (
          <h2
            key={`h2-${index}`}
            className={`${positiveOrNegativeRotation} ${sidewaysSlide} text-xl font-semibold mt-5 sm:mt-8 mb-2`}
          >
            {title}
          </h2>
        );
      } else if (type === 'ul') {
        const listItems = paragraph.slice(3).split('|');
        return (
          <ul
            key={`ul-${index}`}
            className={`${positiveOrNegativeRotation} ${sidewaysSlide} list-[circle] list-inside mb-3 sm:mb-5 pl-2 sm:pl-6`}
          >
            {listItems.map((item, itemIndex) => {
              const itemSeed = `${seed}-li-${itemIndex}-${item.slice(0, 20)}`;
              const itemRandom = createSeededRandom(itemSeed);

              const itemRotation = !isBugged
                ? ''
                : itemRandom() > 0.5
                  ? itemRandom() > 0.75
                    ? 'rotate-2'
                    : '-rotate-2'
                  : itemRandom() > 0.75
                    ? `rotate-1`
                    : `-rotate-1`;

              const itemSlide =
                !isBugged || itemRandom() < 0.7 ? '' : itemRandom() > 0.5 ? 'right-8 relative' : 'left-8 relative';

              return (
                <li key={`li-${index}-${itemIndex}`} className={`${itemRotation} ${itemSlide} mb-1`}>
                  {parseInlineElements(item.trim())}
                </li>
              );
            })}
          </ul>
        );
        // eslint-disable-next-line  @typescript-eslint/no-unnecessary-condition -- false positive
      } else if (type === 'p') {
        const paragraphType = paragraph.startsWith('no-i:') ? 'no-i' : 'normal';
        const content = paragraphType === 'no-i' ? paragraph.slice(5) : paragraph;

        return (
          <p
            key={`p-${index}`}
            className={`${positiveOrNegativeRotation} ${sidewaysSlide} ${paragraphType === 'no-i' ? '' : 'indent-6'} mb-3 sm:mb-5`}
          >
            {parseInlineElements(content)}
          </p>
        );
      }
    },
    [isBugged, pageSeed],
  );

  const parseInlineElements = useCallback((text: string) => {
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
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Link
        href='/blog'
        className={`text-sm text-medium-wood hover:text-dark-wood mb-4 ${isBugged ? 'rotate-[120deg] mt-10 inline-block' : ''}`}
      >
        ‹ Back to overview
      </Link>
      <h1 className='text-3xl mb-6 mt-3 text-dark-wood'>{article.title}</h1>
      <div className='leading-tight text-sm'>
        {article.paragraphs.map((paragraph, index) => {
          if (paragraph.startsWith('h2:')) {
            return parseParagraph(paragraph, index, 'h2');
          } else if (paragraph.startsWith('ul:')) {
            return parseParagraph(paragraph, index, 'ul');
          } else {
            return parseParagraph(paragraph, index, 'p');
          }
        })}
      </div>
      <div className='mt-8 text-sm text-dark-wood italic'>
        <p>
          Published on {article.date} | Last updated on {article.lastEdited}
        </p>
      </div>

      <div className='flex flex-wrap gap-1 mt-8 text-sm italic'>
        {article.tags.map((tag) => {
          if (isBugged) {
            return (
              <SwingingDiv key={tag} originSide='right'>
                <span className='py-1 px-2 rounded-md bg-light-wood text-white'>{tag}</span>
              </SwingingDiv>
            );
          }

          return (
            <span key={tag} className='py-1 px-2 rounded-md bg-light-wood text-white'>
              {tag}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default memo(ArticlePageContent);
