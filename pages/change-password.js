import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import client from "../apollo-client";
import { CHANGE_PASSWORD } from "../queries";
import styles from "../styles/App.module.css";

export default function ChangePassword() {
  // Protecting the route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  });

  const formInput = useRef({});
  const router = useRouter();
  const handleClick = (e) => {
    formInput.current = {
      ...formInput.current,
      [e.target.name]: e.target.value,
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    client
      .mutate({
        mutation: CHANGE_PASSWORD,
        variables: {
          input: {
            ...formInput.current,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      })
      .then(() => {
        alert("Password changed successfully");
        e.target.reset();
        router.push("/dashboard");
      })
      .catch((err) => {
        e.target.reset();
        alert(err.message);
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.formDiv}>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="newPassword"
            placeholder="New Password"
            onChange={handleClick}
          />
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleClick}
          />
          <button name="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
