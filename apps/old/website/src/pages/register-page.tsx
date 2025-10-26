import { Image } from "@unpic/react";
import Register from "@website/components/auth/register";
import img from "@website/public/teodor-drobota-smol.jpg";

function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-row items-center justify-center gap-20 py-20">
      <div className="w-[50%]">
        <Image alt="Logo" layout="fullWidth" src={img} />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-4xl">Weaver</h1>
        <p className="text-lg text-slate-500">Create your account.</p>
        <Register />
      </div>
    </div>
  );
}

export default RegisterPage;
