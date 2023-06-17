import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Render html here</div>
    </>
  );
}
