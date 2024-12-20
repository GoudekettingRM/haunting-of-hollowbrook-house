import articles from '@/data/articles.json';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface BlogPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { year, month, day, slug } = await params;

  const article = articles.find(
    (art) => art.slug === slug && year === art.year && month === art.month && day === art.day,
  );

  if (!article) {
    return notFound();
  }

  return (
    <article>
      <header className='-mx-8 -mt-8'>
        <div
          style={{
            backgroundImage: `url(${article.images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
          }}
        />
        <div className='pl-8 my-4'>
          <h1 className='font-serif text-2xl text-blue-900'>{article.title}</h1>
          <time className='font-mono text-xs/tight text-gray-500'>
            {year}-{month}-{day}
          </time>
        </div>
      </header>
      {article.paragraphs.map((paragraph) => {
        if (paragraph.startsWith('image:')) {
          const imageData = paragraph.split(':');
          return (
            <Image
              src={article.images[imageData[1] as unknown as number]}
              alt={imageData[2]}
              width={(imageData[3] as unknown as number | undefined) ?? 400}
              height={300}
              className='mx-auto my-4 sm:my-8'
              title={imageData[2]}
              key={imageData[2]}
            />
          );
        }
        return (
          <p className='proce text-base/snug text-gray-900 font-minerva mb-3' key={paragraph.replaceAll(' ', '')}>
            {paragraph}
          </p>
        );
      })}
    </article>
  );
};
export default BlogPage;
