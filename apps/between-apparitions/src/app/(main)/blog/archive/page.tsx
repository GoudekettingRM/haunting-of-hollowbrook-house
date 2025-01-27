import ArchivePageContent from '@/components/ArchivePageContent';

interface IArchiveParams {
  searchParams: {
    q?: string;
  };
}

const Archive = async (props: Promise<IArchiveParams>) => {
  const query = await (await (await props).searchParams).q;

  return (
    <>
      <ArchivePageContent query={query} />
    </>
  );
};
export default Archive;
