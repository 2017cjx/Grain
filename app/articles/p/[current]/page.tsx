import { notFound } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import ContentList from "@/app/_components/ContentList";
import Pagination from "@/app/_components/Pagination";
import { CONTENT_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    current: string;
  };
};

export default async function Page({ params }: Props) {
  const current = parseInt(params.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  const { contents: news, totalCount } = await getNewsList({
    limit: CONTENT_LIST_LIMIT,
    offset: CONTENT_LIST_LIMIT * (current - 1),
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <ContentList news={news} />
      <Pagination totalCount={totalCount} current={current} />
    </>
  );
}
