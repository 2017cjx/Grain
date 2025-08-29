import { getCategoryDetail, getArticleList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";
import ContentList from "@/app/_components/ContentList";
import Pagination from "@/app/_components/Pagination";
import Category from "@/app/_components/Category";
import { CONTENT_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const category = await getCategoryDetail(params.id).catch(notFound);
  const { contents: article, totalCount } = await getArticleList({
    limit: CONTENT_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
  });
  return (
    <>
      <p>
        <Category category={category} /> の一覧
      </p>
      <ContentList items={article} basePath="/articles" />
      <Pagination
        totalCount={totalCount}
        basePath={`/article/category/${category.id}`}
      />
    </>
  );
}
