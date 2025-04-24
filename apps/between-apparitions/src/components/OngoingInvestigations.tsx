import Image from 'next/image';

const OngoingInvestigations = () => {
  return (
    <>
      <section className='mb-12 rounded-lg p-6 border border-gray-400 shadow-lg'>
        <h2 className='text-2xl font-serif font-bold text-indigo-900 mb-6'>Current Investigations</h2>

        <div className='space-y-8'>
          <div className='md:flex gap-6 pb-6 border-b border-gray-300'>
            <div className='md:w-1/3 mb-4 md:mb-0 relative h-56 md:h-auto'>
              <Image
                src='/images/hollowbrook-house-fisheye.jpg'
                alt='Hollowbrook House'
                fill
                className='object-cover rounded'
              />
            </div>
            <div className='md:w-2/3'>
              <h3 className='text-xl font-bold text-indigo-900 mb-1'>The Hollowbrook House Mystery</h3>
              <p className='text-sm mb-3'>Ongoing since November 2008</p>
              <div className='space-y-3'>
                <p>
                  For years, I&apos;ve received requests to investigate the infamous Hollowbrook House, site of two
                  mysterious disappearances separated by 44 years. When James Hollowbrook finally granted permission to
                  serious researchers in 2005, I was among the first to visit. What began as a standard investigation
                  has evolved into something far more complex.
                </p>
                <p>
                  After nearly two decades studying paranormal phenomena, I&apos;ve never encountered a case with such
                  compelling historical documentation, consistent electromagnetic anomalies, and intriguing temporal
                  fluctuations. The evidence I&apos;ve gathered suggests that the disappearances of Edgar Hollowbrook in
                  1939 and his great-niece Margaret in 1983 may not be the tragedies we&apos;ve assumed.
                </p>
              </div>
              <div className='mt-3 bg-gray-200 px-3 py-2 rounded text-sm inline-block'>
                Status: Active Investigation
              </div>
            </div>
          </div>

          <div className='md:flex gap-6'>
            <div className='md:w-1/3 mb-4 md:mb-0 relative h-56 md:h-auto'>
              <Image
                src='/images/pinewood-forest.jpg'
                alt='Pinewood Forest Anomalies'
                fill
                className='object-cover rounded'
              />
            </div>
            <div className='md:w-2/3'>
              <h3 className='text-xl font-bold text-indigo-900 mb-1'>The Shifting Paths: Pinewood Forest Anomalies</h3>
              <p className='text-sm mb-3'>Initiated July 2022</p>
              <div className='space-y-3'>
                <p>
                  Fifty miles north of the sleepy town of Millbrook, Pinewood Forest sits largely undisturbed, its
                  ancient trees holding secrets that have only recently begun to manifest. Park rangers first noticed
                  anomalies in 2022 when established hiking trails would mysteriously reconfigure overnight. Paths that
                  had been meticulously maintained for decades suddenly led to unfamiliar clearings or looped back
                  impossibly on themselves. Experienced hikers began reporting &ldquo;lost time&rdquo; - entering the
                  forest in morning light only to emerge at dusk with no memory of the intervening hours.
                </p>
              </div>
              <div className='mt-3 bg-gray-200 px-3 py-2 rounded text-sm inline-block'>
                Status: Active Investigation
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default OngoingInvestigations;
