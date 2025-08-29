import styles from "./page.module.css";
import Image from "next/image";
import { getNewsList } from "@/app/_libs/microcms";
import { TOP_CONTENT_LIMIT } from "@/app/_constants";
import ContentList from "@/app/_components/ContentList";
import ButtonLink from "@/app/_components/ButtonLink";

export default async function Home() {
  const name = "世界";
  const data = await getNewsList({
    limit: TOP_CONTENT_LIMIT,
  });

  return (
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>映画を語れる自分になる</h1>
          <p className={styles.description}>
            映画史と業界の知識を体系的に学ぶハリウッド発・日本唯一の映画学習システム
          </p>
        </div>
        <Image
          className={styles.bgimg}
          src="/film-2205325_1280.jpg"
          alt=""
          width={4000}
          height={1200}
          priority
          sizes="100vw"
        />
      </section>
      <section className={styles.news}>
        <h2 className={styles.newsTitle}>News</h2>
        <ContentList items={data.contents} basePath="/news" />
        <div className={styles.newsLink}>
          <ButtonLink href="/news">もっと見る</ButtonLink>
        </div>
      </section>
    </>
  );
}
