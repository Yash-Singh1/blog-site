import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import stripExtension from '../../../../../helpers/stripExtension';
import PostContent from './post';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

function getRootDir() {
  let dir = '../../../../';
  while (!fs.existsSync(path.join(__dirname, dir, 'node_modules'))) {
    dir += '../';
  }
  return path.join(__dirname, dir);
}

function getPostData(id: string) {
  try {
    return matter(fs.readFileSync(path.join(getRootDir(), `content/posts/${id}.mdx`), 'utf8'));
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  return fs
    .readdirSync(path.join(getRootDir(), 'content/posts/'))
    .filter((contentFilename) => contentFilename.endsWith('.mdx'))
    .map((contentFilename) => ({ post: stripExtension(contentFilename) }));
}

interface PostProps {
  params: {
    post: string;
  };
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { data } = getPostData(params.post);

  return {
    title: `${data.title}`,
    description: data.subtitle,
    authors: { name: 'Yash Singh' },
    openGraph: {
      title: `${data.title}`,
      images: data.image || undefined,
    },
  };
}

export default function Post({ params }: PostProps) {
  const { content, data } = getPostData(params.post);

  if (data.link) {
    redirect(data.link);
  }

  return <PostContent source={content} data={data} />;
}
