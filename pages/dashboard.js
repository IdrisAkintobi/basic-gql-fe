import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "../apollo-client";
import { DELETE_USER } from "../queries";
import styles from "../styles/App.module.css";

export default function Dashboard() {
  // Protecting the route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  });
  const router = useRouter();

  const handleDelete = () => {
    client
      .mutate({
        mutation: DELETE_USER,
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      })
      .then(() => {
        alert("Account deleted successfully");
        router.push("/register");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={styles.dashboard}>
      <p>Welcome to you dashboard</p>
      <button onClick={() => router.push("/change-password")}>
        Change Password
      </button>
      <button onClick={() => handleDelete()}>Delete my Account</button>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/");
        }}
      >
        Log Out
      </button>
    </div>
  );
}
