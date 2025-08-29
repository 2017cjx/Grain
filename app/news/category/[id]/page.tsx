import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
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
  const { contents: news, totalCount } = await getNewsList({
    limit: CONTENT_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
  });
  return (
    <>
      <p>
        <Category category={category} /> の一覧
      </p>
      <ContentList items={news} basePath="/news" />
      <Pagination
        totalCount={totalCount}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
