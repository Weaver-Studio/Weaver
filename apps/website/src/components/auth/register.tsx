import FormFieldChild from "./form-field-child"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import Discord from "../svgs/Discord"
import Github from "../svgs/Github"
import Google from "../svgs/Google"

import { signIn, signUp } from "@/lib/auth-client"
import { useForm, useStore } from "@tanstack/react-form"
import { z } from "zod"
import { Link, useRouter } from "@tanstack/react-router"
import { useState } from "react"

const formSchema = z.object({
	email: z.email("Please enter a valid email address."),
	password: z.string()
		.min(8, "Passwords must be at least 8 characters long.")
		.max(16, "Passwords cannot be more than 16 characters long.")
		.regex(/[a-z]/, "Passwords must contain at least one lowercase letter.")
		.regex(/[A-Z]/, "Passwords must contain at least one uppercase letter.")
		.regex(/\d/, "Passwords must contain at least one digit.")
		.regex(/[@$!%*?&_]/, "Passwords must contain at least one special character (@,$,!,%,*,?,&,_)"),
	confirmPassword: z.string()
})
	.refine((data) => data.confirmPassword === data.password, {
		message: "Passwords do not match.",
		path: ['confirmPassword'],
	})

const socialProviders = [
	{ name: "Discord", icon: <Discord />, "aria-label": "Continue with Discord" },
	{ name: "Github", icon: <Github />, "aria-label": "Continue with Github" },
	{ name: "Google", icon: <Google />, "aria-label": "Continue with Google" },
]

function Register() {
	const router = useRouter()
	const [formError, setFormError] = useState<string | null>(null)
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onChange: formSchema,
		},
		onSubmit: async ({ value, formApi }) => {

			const { data, error } = await signUp.email({
				name: "",
				email: value.email,
				password: value.password,
				// image: "",
				callbackURL: "http://test.com:5170/",
			}, {
				onRequest: (ctx) => {
					//show loading
				},
				onSuccess: (ctx) => {
					console.log("redirecting..")

					router.navigate({ to: "/" })
				},
				onError: (ctx) => {
					setFormError(ctx.error.message)
				}
			});

		},
	})

	const { isSubmitting, canSubmit, errors } = useStore(form.store, state => ({
		isSubmitting: state.isSubmitting,
		canSubmit: state.canSubmit,
		errors: state.errors,
	}))

	return (
		<div className="flex max-w-sm mx-auto py-10 flex-col items-center justify-center gap-6">
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
				className="w-full flex flex-col items-center gap-4"
			>
				<form.Field
					name="email"
					children={(field) => <FormFieldChild field={field} label="Email" />}
				/>
				<form.Field
					name="password"
					children={(field) => (
						<FormFieldChild field={field} label="Password" type="password" />
					)}
				/>
				<form.Field
					name="confirmPassword"
					children={(field) => (
						<FormFieldChild
							field={field}
							label="Confirm Password"
							type="password"
						/>
					)}
				/>

				{formError ? (
					<span className="text-red-500 text-sm">{formError}</span>
				) : null}

				                <Button
				                    type="submit"
				                    className="w-full"
				                    disabled={!canSubmit || isSubmitting}
				                    onClick={form.handleSubmit}
				                >
				                    {isSubmitting ? <Spinner /> : "Register"}
				                </Button>
				                <p className="text-sm text-slate-500">
				                    Already have an account?{" "}
				                    <Link to="/sign-in" className="text-blue-500 hover:underline">
				                        Sign In
				                    </Link>
				                </p>			</form>

			<div className="flex items-center gap-2 w-full">
				<div className="h-px flex-grow bg-slate-200" />
				<p className="text-slate-500 text-sm">or</p>
				<div className="h-px flex-grow bg-slate-200" />
			</div>

			<div className="flex flex-col gap-4 w-full">
				{socialProviders.map((provider) => (
					<Button
						key={provider.name}
						className="w-full flex items-center justify-center gap-2"
						disabled={isSubmitting}
						variant="outline"
						aria-label={provider["aria-label"]}
						onClick={() => {
							signIn.social({
								provider: provider.name.toLocaleLowerCase(),
								callbackURL: "http://test:5170/",
							}, {
								onSuccess: () => {
									console.log("redirecting..")
								},
								onError: (ctx) => {
									setFormError(ctx.error.message)
								}
							})
						}}
					>
						{provider.icon}
						<span>Continue with {provider.name}</span>
					</Button>
				))}
			</div>
		</div>
	)
}

export default Register
