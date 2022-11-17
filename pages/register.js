import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import client from "../apollo-client";
import { REGISTER } from "../queries";
import styles from "../styles/App.module.css";

export default function Signup() {
  const [category, setCategory] = useState("USER");
  const formInput = useRef({});
  const router = useRouter();
  const toggleCategory = (newCategory) => {
    setCategory(newCategory);
  };
  const handleClick = (e) => {
    formInput.current = {
      ...formInput.current,
      category,
      [e.target.name]: e.target.value,
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    client
      .mutate({
        mutation: REGISTER,
        variables: {
          input: {
            ...formInput.current,
          },
        },
      })
      .then(() => {
        alert("Registration successfully");
        e.target.reset();
        router.push("/");
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
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="fullName"
            placeholder={category === "BUSINESS" ? "Business Name" : "Name"}
            onChange={handleClick}
          />
          <input name="email" placeholder="Email" onChange={handleClick} />
          <input
            name="password"
            placeholder="Password"
            onChange={handleClick}
            type="password"
          />
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleClick}
            type="password"
          />
          <button name="Signup" type="submit">
            Sign up
          </button>
          <p>
            Already have an account? <Link href="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
