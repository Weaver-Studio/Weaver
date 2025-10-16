import { Image } from "@unpic/react"
import Register from "@/components/auth/register"
import img from "@/public/teodor-drobota-smol.jpg"



function RegisterPage() {
	return (
		<div className="flex py-20 flex-row items-center justify-center min-h-screen gap-20">
			<div className="w-[50%]">
				<Image
					src={img}
					alt="Logo"
					layout="fullWidth"

				/>
			</div>

			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-4xl font-bold">Weaver</h1>
				<p className="text-lg text-slate-500">Create your account.</p>
				<Register />
			</div>

		</div >

	)
}

export default RegisterPage