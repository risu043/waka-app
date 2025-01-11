import SearchTable from '@/components/SearchTable';
import Search from '@/components/Search';
import { Suspense } from 'react';

export default async function StaticPage(props: {
  searchParams?: Promise<{
    filter?: string;
    author?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const filter = searchParams?.filter || '';
  const author = searchParams?.author || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <Search />
      <Suspense
        key={filter + author + currentPage}
        fallback={<div>loading...</div>}
      >
        <SearchTable filter={filter} author={author} page={currentPage} />
      </Suspense>
    </div>
  );
}
