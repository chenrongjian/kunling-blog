import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

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
    <div style={styles.container}>
      <Link href="/" style={styles.backLink}>← 返回首页</Link>
      
      <article style={styles.article}>
        <header style={styles.header}>
          <span style={styles.date}>{post.date}</span>
          <h1 style={styles.title}>{post.title}</h1>
        </header>
        
        <div className="markdown-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      <footer style={styles.footer}>
        <Link href="/">← 返回首页</Link>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: '100vh',
  } as const,
  backLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'inline-block',
    marginBottom: '1rem',
  } as const,
  article: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  } as const,
  header: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
  } as const,
  date: {
    color: '#888',
    fontSize: '0.875rem',
  } as const,
  title: {
    fontSize: '2rem',
    marginTop: '0.5rem',
    marginBottom: 0,
    color: '#333',
  } as const,
  footer: {
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid #eee',
    color: '#888',
    fontSize: '0.875rem',
  } as const,
};
