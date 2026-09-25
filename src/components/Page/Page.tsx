import type { ReactNode } from "react";
import styles from "./Page.module.css";

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return <main className={styles.page}>{children}</main>;
};

export default Page;
