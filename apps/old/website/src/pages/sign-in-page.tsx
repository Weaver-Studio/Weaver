import { Image } from "@unpic/react";
import SignIn from "@website/components/auth/sign-in";
import img from "@website/public/teodor-drobota-smol.jpg";

function SignInPage() {
  return (
    <div className="flex min-h-screen flex-row items-center justify-center gap-20 py-20">
      <div className="w-[50%]">
        <Image alt="Logo" layout="fullWidth" src={img} />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-4xl">Weaver</h1>
        <p className="text-lg text-slate-500">
          Welcome back! Please sign in to your account.
        </p>
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
