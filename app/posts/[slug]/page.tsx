import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>
        ← 返回首页
      </Link>
      
      <article style={{ marginTop: '2rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#888', fontSize: '0.875rem' }}>{post.date}</span>
          <h1 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{post.title}</h1>
        </header>
        
        <div style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
      </article>

      <footer style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid #eee', color: '#888', fontSize: '0.875rem' }}>
        <Link href="/">← 返回首页</Link>
      </footer>
    </div>
  );
}
