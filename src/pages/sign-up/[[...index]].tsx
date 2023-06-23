import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid min-h-[100vh] place-items-center">
      <SignUp afterSignUpUrl="/services" redirectUrl="/services" />
    </div>
  );
}
