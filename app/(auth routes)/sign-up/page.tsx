"use client";
import css from "./SignUpPage.module.css";
import { RegisterRequest, register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api/api";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an Account and make notes for your life",
  openGraph: {
    title: "Sign up",
    description: "Create an Account and make notes for your life",
    url: "https://notehub.versel.app/sign-up",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};
export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const user = Object.fromEntries(formData) as RegisterRequest;

      const res = await register(user);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>Error</p>}
      </form>
    </main>
  );
}
