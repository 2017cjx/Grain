import type { CategoryLike } from "@/app/_libs/microcms";
import styles from "./index.module.css";

type Props = {
  category: CategoryLike;
};
export default function Category({ category }: Props) {
  return <span className={styles.tag}>{category.name}</span>;
}
