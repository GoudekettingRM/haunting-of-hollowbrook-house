import HomePageInvestigationCard from '@/components/HomePageInvestigationCard';
import OngoingInvestigations from '@/components/OngoingInvestigations';
import articles from '@/data/articles.json';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Between Apparitions | Paranormal Investigation Journal</title>
        <meta
          name='description'
          content='The journal of James Chen, documenting paranormal investigations since 1998'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='max-w-4xl mx-auto'>
        <h1 className='text-5xl font-serif font-bold text-indigo-900 mb-2'>Between Apparitions</h1>
        <p className='text-2xl font-serif mb-1'>A Paranormal Investigation Journal</p>
        <p className='text-lg text-gray-400 italic'>Documenting the unexplained since 1998</p>
      </div>

      <main className='max-w-4xl mx-auto pt-10 pb-6'>
        <section className='mb-8 pb-8'>
          <h2 className='text-2xl font-serif font-bold text-indigo-900 mb-4'>Welcome to Between Apparitions</h2>
          <div className='space-y-4'>
            <p>
              The line between this world and whatever lies beyond is thinner than most people realize. For over 20
              years, I&apos;ve dedicated my spare time to investigating phenomena that defy conventional explanation.
              This journal documents select cases from my ongoing research into the paranormal.
            </p>
            <p>
              What you&apos;ll find here isn&apos;t sensationalism or ghost hunting entertainment. I approach each
              investigation with skepticism, methodical documentation, and respect for both science and history. Some
              cases reveal ordinary explanations. Others leave questions that science has yet to answer.
            </p>
          </div>
        </section>

        <OngoingInvestigations />

        <section className='mb-12'>
          <h2 className='text-2xl font-serif font-bold text-indigo-900 mb-6'>Recent Blog Posts</h2>

          {articles
            .slice(articles.length - 3, articles.length)
            .reverse()
            .map((article) => {
              return <HomePageInvestigationCard article={article} key={article.slug} />;
            })}
        </section>
      </main>
    </>
  );
};

export default Home;
