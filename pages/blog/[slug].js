import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { formatDistance } from "date-fns";

export default function BlogPost({ post }) {
  const thisPost = post[0];
  return (
    <div>
      <div className="prose lg:prose-lg">
        <h1>{thisPost.title}</h1>
        <h4>
          Published {formatDistance(new Date(), new Date(thisPost.publishedat))}
          ago
        </h4>
        <ReactMarkdown children={thisPost.content} />
      </div>
    </div>
  );
}

export async function getStaticPaths(context) {
  const data = await fetch(
    "https://strapi-sidd-cms.herokuapp.com/posts"
  ).then((res) => res.json());

  const paths = data.map((post) => ({
    params: { slug: post.slug },
  }));

  console.log(paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = await fetch(
    `https://strapi-sidd-cms.herokuapp.com/posts?slug_eq=${params.slug}`
  ).then((res) => res.json());

  return { props: { post: data } };
}
