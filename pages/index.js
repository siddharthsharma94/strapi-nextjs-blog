import Head from "next/head";
import Link from "next/link";
import { formatDistance } from "date-fns";

export default function Home({ posts }) {
  return (
    <div className="prose lg:prose-lg">
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p className="font-bold">
            {formatDistance(new Date(), new Date(post.publishedat))} ago
          </p>
          <p>{post.summary}</p>

          <Link href={`/blog/${post.slug}`}>
            <a className="font-semibold rounded-lg text-blue-400 no-underline">
              Read &rarr;
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await fetch(
    "https://strapi-sidd-cms.herokuapp.com/posts"
  ).then((res) => res.json());

  console.log(data);

  return { props: { posts: data } };
}
