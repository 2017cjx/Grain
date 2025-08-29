import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Articles";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const data = await getArticleDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url ?? ""],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getArticleDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(notFound);
  return (
    <>
      <Article data={data} categoryBasePath="/articles/category" />
      <div className={styles.footer}>
        <ButtonLink href="/articles">記事一覧へ</ButtonLink>
      </div>
    </>
  );
}
