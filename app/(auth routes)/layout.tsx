"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};
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
export default function Layout({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [loading]);
  return <>{loading ? <div>loading ...</div> : children}</>;
}
