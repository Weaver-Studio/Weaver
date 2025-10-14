import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Discord from "../svgs/Discord"
import Github from "../svgs/Github"
import Google from "../svgs/Google"


import { useForm } from "@tanstack/react-form"
import type { AnyFieldApi } from "@tanstack/react-form"
import { z } from "zod"

const formSchema = z.object({
	email: z.email(),
	password: z.string()
		.min(8, "Password must be at least 8 characters long")
		.max(16, "Password cannot be more than 16 characters long"),
})

// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,


function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid
				? field.state.meta.errors.map((err, index) => {
					return (
						<em key={index}>{err.message}</em>
					)
				})
				: null}
			{field.state.meta.isValidating ? 'Validating...' : null}
		</>
	)
}

function SignIn() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: formSchema,
		},
		onSubmit: ({ value }) => {
			console.log(value)
		},
	})

	return (
		<div className="flex py-10 flex-col items-center justify-center gap-4">
			<form.Field
				name="email"
				children={(field) =>
					<div className="flex flex-col gap-2 w-full">
						<Label htmlFor={field.name}>Email:</Label>
						<Input
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
						<FieldInfo field={field} />
					</div>
				}
			/>
			<form.Field
				name="password"
				children={(field) =>
					<div className="flex flex-col gap-2 w-full">
						<Label htmlFor={field.name}>Password:</Label>
						<Input
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
						<FieldInfo field={field} />
					</div>
				}
			/>

			<Button type="submit" onClick={form.handleSubmit} className="w-full">Login</Button>

			<div className="flex items-center gap-2">
				<div className="h-px w-20 bg-slate-400" />
				<p>or</p>
				<div className="h-px w-20 bg-slate-400" />
			</div>

			<div className="flex flex-col gap-4 w-full">
				<Button className="w-full"><Discord /> Discord</Button>
				<Button className="w-full"><Github /> Github</Button>
				<Button className="w-full"><Google /> Google</Button>
			</div>
		</div>
	)
}

export default SignIn