import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

export default function Page() {
  return (
    <div className="grid min-h-[100vh] place-items-center">
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login to PFE hamza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn afterSignInUrl="/services" redirectUrl="/services" />
    </div>
  );
}
