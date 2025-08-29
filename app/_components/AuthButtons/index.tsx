"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./index.module.css";

export default function AuthButtons() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className={styles.contaier}>
        {/* <span className={styles.status}>
          Signed in as {session.user?.email || "Unknown User"}
        </span> */}
        <button className={styles.button} onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* <span className={styles.status}>Not Signed in</span> */}
      <button className={styles.button} onClick={() => signIn("google")}>
        Sign in with Google
      </button>
    </div>
  );
}
