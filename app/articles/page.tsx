import { getArticleList } from "@/app/_libs/microcms";
import ContentList from "@/app/_components/ContentList";
import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";
import { CONTENT_LIST_LIMIT } from "@/app/_constants";

export default async function Page() {
  const { contents: article, totalCount } = await getArticleList({
    limit: CONTENT_LIST_LIMIT,
  });

  return (
    <>
      <SearchField />
      <ContentList items={article} basePath="/articles" />
      <Pagination totalCount={totalCount} />
    </>
  );
}
