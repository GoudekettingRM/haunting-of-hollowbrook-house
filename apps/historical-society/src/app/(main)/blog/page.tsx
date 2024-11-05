import { Suspense } from 'react';
import BlogIndexPage from '../../../components/BlogIndexPage';

export default function BlogIndex() {
  return (
    <Suspense>
      <BlogIndexPage />
    </Suspense>
  );
}
