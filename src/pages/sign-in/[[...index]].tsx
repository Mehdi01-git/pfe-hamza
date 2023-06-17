import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid min-h-[100vh] place-items-center">
      <SignIn />
    </div>
  );
}
