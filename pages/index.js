import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import client from "../apollo-client";
import { LOGIN } from "../queries";
import styles from "../styles/App.module.css";

export default function Login() {
  const [category, setCategory] = useState("USER");
  const formInput = useRef({});
  const router = useRouter();
  const toggleCategory = (newCategory) => {
    setCategory(newCategory);
  };

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
        mutation: LOGIN,
        variables: {
          input: {
            ...formInput.current,
          },
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.login.token);
        alert("Login successfully");
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
      <div className={styles.toggleDiv}>
        <div
          onClick={() => toggleCategory("USER")}
          className={category === "USER" ? styles.active : styles.inactive}
        >
          USER
        </div>
        <div
          onClick={() => toggleCategory("CUSTOMER")}
          className={category === "CUSTOMER" ? styles.active : styles.inactive}
        >
          CUSTOMER
        </div>
        <div
          onClick={() => toggleCategory("BUSINESS")}
          className={category === "BUSINESS" ? styles.active : styles.inactive}
        >
          BUSINESS
        </div>
      </div>
      <div className={styles.formDiv}>
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" onChange={handleClick} />
          <input
            name="password"
            placeholder="Password"
            onChange={handleClick}
            type="password"
          />
          <button name="Signin" type="submit">
            Sign in
          </button>
          <p>
            Don&#39;t have an account? <Link href="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
