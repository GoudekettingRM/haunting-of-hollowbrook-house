// https://www.namecheap.com/domains/registration/results/?domain=whisperinghollowshistory.org

import ArticleCard from '../../components/ArticleCard';
import articles from './blog/articles.json';

export default function HomePage() {
  return (
    <div className='pt-4 max-w-screen-lg'>
      {/* Hero Section */}
      <div className='mb-4'>
        <h1 className='text-4xl text-dark-wood'>Whispering Hollows Historical Society</h1>
        <p className='text-base italic text-dark-wood mt-2'>
          Preserving the rich history and mysterious legends of our community since 1952
        </p>
      </div>

      {/* Introduction */}
      <div className='bg-light-wood bg-opacity-10 p-6 mb-8 text-sm text-dark-wood space-y-2'>
        <p className='indent-6'>
          Welcome to the Whispering Hollows Historical Society. Founded in 1952 by a group of passionate local history
          enthusiasts, we are dedicated to preserving and sharing the fascinating history of our region. From the
          mysterious disappearance of Edgar Hollowbrook to the architectural marvels of the early 20th century, our
          collection spans generations of local history.
        </p>
        <p className='indent-6'>
          Our origins can be traced back to a series of informal gatherings in the living room of Mildred Hawthorne, a
          retired schoolteacher with an insatiable curiosity about local history. These meetings, which began as simple
          discussions over tea and biscuits, soon evolved into something more structured as attendees realized the
          importance of documenting and preserving the stories and artifacts of Whispering Hollows.
        </p>
        <p className='indent-6'>
          In 1972, we achieved a major milestone with the acquisition of our current headquarters – a beautiful
          Victorian mansion donated by the Wilkinson family. This generous gift provided a permanent home for our
          growing collection and allowed for the establishment of our first public museum spaces. Over the decades,
          we&apos;ve expanded our mission to include not just the preservation of the past, but also the documentation
          of the present for future historians.
        </p>
        <p className='indent-6'>
          Today, our research team, a dedicated group of volunteers and professional historians, continues to delve into
          the mysteries and untold stories of our region. From investigating local legends to uncovering forgotten
          aspects of our industrial heritage, we ensure that our understanding of local history is always evolving and
          deepening. We invite you to explore our archives, attend our events, and join us in preserving the rich
          tapestry of stories that make Whispering Hollows the unique and fascinating place it is today.
        </p>
      </div>

      {/* Featured Articles */}
      <section className='mb-12'>
        <h2 className='text-4xl font-serif mb-3 text-dark-wood'>Featured Articles</h2>
        <ul className='space-y-4'>
          {[articles[0], articles[8], articles[10]].map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </ul>
      </section>

      {/* News Bulletin */}
      {/* <section className='mb-12'>
        <h2 className='text-4xl font-serif mb-6 text-parchment'>News & Events</h2>
        <ul className='space-y-4'>
          {bulletins.map((bulletin, index) => (
            <li key={index} className='bg-white bg-opacity-10 p-4 space-y-2'>
              <div className='flex items-start gap-3'>
                <Newspaper className='h-5 w-5 text-old-paper mt-1' />
                <div>
                  <div className='flex flex-col sm:flex-row gap-2 mb-2'>
                    <h3 className='font-serif text-lg text-parchment'>{bulletin.title}</h3>
                    <span className='text-sm text-old-paper font-serif flex items-center gap-1'>
                      <Clock className='h-4 w-4' />
                      {bulletin.date}
                    </span>
                  </div>
                  <p className='text-parchment'>{bulletin.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section> */}
    </div>
  );
}
