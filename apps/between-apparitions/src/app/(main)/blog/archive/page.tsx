import ArchivePageContent from '@/components/ArchivePageContent';

interface ArchiveParams {
  searchParams: Promise<{
    q?: string;
  }>;
}

const Archive = async (props: ArchiveParams) => {
  const query = (await props.searchParams).q;

  return (
    <>
      <ArchivePageContent query={query} />
    </>
  );
};

export default Archive;
