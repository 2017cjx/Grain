import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

// 記事、ニュース共通のカテゴリ、コンテンツ型

export type CategoryLike = {
  name: string;
} & MicroCMSListContent;

export type ContentBase = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: CategoryLike;
} & MicroCMSListContent;

export type NewsCategory = CategoryLike;
export type ArticleCategory = CategoryLike;
export type News = ContentBase;
export type Article = ContentBase;

// export type Category = {
//   name: string;
// } & MicroCMSListContent;

// export type News = {
//   title: string;
//   description: string;
//   content: string;
//   thumbnail?: MicroCMSImage;
//   category: Category;
// } & MicroCMSListContent;

// export type ArticleCategory = {
//   name: string;
// } & MicroCMSListContent;

// export type Article = {
//   title: string;
//   description: string;
//   content: string;
//   thumbnail?: MicroCMSImage;
//   category: Category;
// } & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getMembersList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Member>({
    endpoint: "members",
    queries,
  });
  return listData;
};

// News

export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: "news",
    queries,
  });
  return listData;
};

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });
  return detailData;
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<CategoryLike>({
    endpoint: "categories",
    contentId,
    queries,
  });
  return detailData;
};

export const getAllNewsList = async () => {
  const listData = await client.getAllContents<News>({
    endpoint: "news",
  });
  return listData;
};

export const getAllCategoryList = async () => {
  const listData = await client.getAllContents<CategoryLike>({
    endpoint: "categories",
  });
  return listData;
};

// Article

export const getArticleList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Article>({
    endpoint: "articles",
    queries,
  });
  return listData;
};

export const getArticleDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Article>({
    endpoint: "articles",
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });
  return detailData;
};

export const getArticleCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<CategoryLike>({
    endpoint: "article_categories",
    contentId,
    queries,
  });
  return detailData;
};

export const getAllArticleList = async () => {
  const listData = await client.getAllContents<Article>({
    endpoint: "articles",
  });
  return listData;
};

export const getAllArticleCategoryList = async () => {
  const listData = await client.getAllContents<ArticleCategory>({
    endpoint: "article_categories",
  });
  return listData;
};
