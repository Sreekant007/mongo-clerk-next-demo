import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo: any = await res.json();
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: any }>;
export default function login({
  repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>login {repo}</div>;
}
