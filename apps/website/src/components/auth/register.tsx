import { useForm, useStore } from "@tanstack/react-form";
import { Link, useRouter } from "@tanstack/react-router";
import { signIn, signUp } from "@weaver/shared/lib/auth-client";
import { Button } from "@weaver/ui/components/ui/button";
import { Spinner } from "@weaver/ui/components/ui/spinner";
import { maxPasswordLength, minPasswordLength } from "@weaver/ui/lib/constants";
import { useState } from "react";
import { z } from "zod";
import Discord from "../svgs/Discord";
import Github from "../svgs/Github";
import Google from "../svgs/Google";
import FormFieldChild from "./form-field-child";

const formSchema = z
  .object({
    email: z.email("Please enter a valid email address."),
    password: z
      .string()
      .min(
        minPasswordLength,
        `Passwords must be at least ${minPasswordLength} characters long.`
      )
      .max(
        maxPasswordLength,
        `Passwords cannot be more than ${maxPasswordLength} characters long.`
      )
      .regex(/[a-z]/, "Passwords must contain at least one lowercase letter.")
      .regex(/[A-Z]/, "Passwords must contain at least one uppercase letter.")
      .regex(/\d/, "Passwords must contain at least one digit.")
      .regex(
        /[@$!%*?&_]/,
        "Passwords must contain at least one special character (@,$,!,%,*,?,&,_)"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const socialProviders = [
  { name: "Discord", icon: <Discord />, "aria-label": "Continue with Discord" },
  { name: "Github", icon: <Github />, "aria-label": "Continue with Github" },
  { name: "Google", icon: <Google />, "aria-label": "Continue with Google" },
];

function Register() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      await signUp.email(
        {
          name: "",
          email: value.email,
          password: value.password,
          // image: "",
          callbackURL: "http://test.com:5170/",
        },
        {
          onRequest: () => {
            //show loading
          },
          onSuccess: () => {
            router.navigate({ to: "/" });
          },
          onError: (ctx) => {
            setFormError(ctx.error.message);
          },
        }
      );
    },
  });

  const { isSubmitting, canSubmit } = useStore(form.store, (state) => ({
    isSubmitting: state.isSubmitting,
    canSubmit: state.canSubmit,
    errors: state.errors,
  }));

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-6 py-10">
      <form
        className="flex w-full flex-col items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          children={(field) => <FormFieldChild field={field} label="Email" />}
          name="email"
        />
        <form.Field
          children={(field) => (
            <FormFieldChild field={field} label="Password" type="password" />
          )}
          name="password"
        />
        <form.Field
          children={(field) => (
            <FormFieldChild
              field={field}
              label="Confirm Password"
              type="password"
            />
          )}
          name="confirmPassword"
        />
        {formError ? (
          <span className="text-red-500 text-sm">{formError}</span>
        ) : null}
        <Button
          className="w-full"
          disabled={!canSubmit || isSubmitting}
          onClick={form.handleSubmit}
          type="submit"
        >
          {isSubmitting ? <Spinner /> : "Register"}
        </Button>
        <p className="text-slate-500 text-sm">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/sign-in">
            Sign In
          </Link>
        </p>{" "}
      </form>

      <div className="flex w-full items-center gap-2">
        <div className="h-px flex-grow bg-slate-200" />
        <p className="text-slate-500 text-sm">or</p>
        <div className="h-px flex-grow bg-slate-200" />
      </div>

      <div className="flex w-full flex-col gap-4">
        {socialProviders.map((provider) => (
          <Button
            aria-label={provider["aria-label"]}
            className="flex w-full items-center justify-center gap-2"
            disabled={isSubmitting}
            key={provider.name}
            onClick={() => {
              signIn.social(
                {
                  provider: provider.name.toLocaleLowerCase(),
                  callbackURL: "http://test:5170/",
                },
                {
                  onSuccess: () => {
                    router.navigate({ to: "/" });
                  },
                  onError: (ctx) => {
                    setFormError(ctx.error.message);
                  },
                }
              );
            }}
            variant="outline"
          >
            {provider.icon}
            <span>Continue with {provider.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
export default Register;
