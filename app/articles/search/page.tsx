import { getArticleList } from "@/app/_libs/microcms";
import { CONTENT_LIST_LIMIT } from "@/app/_constants";
import ContentList from "@/app/_components/ContentList";
import SearchField from "@/app/_components/SearchField";

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const { contents: articles } = await getArticleList({
    limit: CONTENT_LIST_LIMIT,
    q: searchParams.q,
  });

  return (
    <>
      <SearchField />
      <ContentList items={articles} basePath="/articles" />
    </>
  );
}
