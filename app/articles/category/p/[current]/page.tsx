import { notFound } from "next/navigation";
import { getCategoryDetail, getArticleList } from "@/app/_libs/microcms";
import ContentList from "@/app/_components/ContentList";
import Pagination from "@/app/_components/Pagination";
import { CONTENT_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    id: string;
    current: string;
  };
};

export default async function Page({ params }: Props) {
  const current = parseInt(params.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  const category = await getCategoryDetail(params.id).catch(notFound);

  const { contents: article, totalCount } = await getArticleList({
    filters: `category[equals]${category.id}`,
    limit: CONTENT_LIST_LIMIT,
    offset: CONTENT_LIST_LIMIT * (current - 1),
  });

  if (article.length === 0) {
    notFound();
  }

  return (
    <>
      <ContentList items={article} basePath="/articles" />
      <Pagination
        totalCount={totalCount}
        current={current}
        basePath={`/article/category/${category.id}`}
      />
    </>
  );
}
