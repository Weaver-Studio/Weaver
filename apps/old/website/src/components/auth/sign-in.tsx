import { useForm, useStore } from "@tanstack/react-form";
import { Link, useRouter } from "@tanstack/react-router";
import { signIn } from "@weaver/shared/lib/auth-client";
import { Button } from "@weaver/ui/components/ui/button";
import { Spinner } from "@weaver/ui/components/ui/spinner";
import { maxPasswordLength, minPasswordLength } from "@weaver/ui/lib/constants";
import { useState } from "react";
import { z } from "zod";
import Discord from "../svgs/Discord";
import Github from "../svgs/Github";
import Google from "../svgs/Google";
import FormFieldChild from "./form-field-child";

const formSchema = z.object({
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
    .regex(
      /[@$!%*?&_]/,
      "Passwords must contain at least one of these special character (@,$,!,%,*,?,&,_)"
    ),
});

const socialProviders = [
  { name: "Discord", icon: <Discord />, "aria-label": "Continue with Discord" },
  { name: "Github", icon: <Github />, "aria-label": "Continue with Github" },
  { name: "Google", icon: <Google />, "aria-label": "Continue with Google" },
];

function SignIn() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      await signIn.email(
        {
          email: value.email,
          password: value.password,
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
    },
  });

  const { isSubmitting, canSubmit } = useStore(form.store, (state) => ({
    isSubmitting: state.isSubmitting,
    canSubmit: state.canSubmit,
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

        {formError ? (
          <span className="text-red-500 text-sm">{formError}</span>
        ) : null}

        <Button
          className="w-full"
          disabled={!canSubmit || isSubmitting}
          onClick={form.handleSubmit}
          type="submit"
        >
          {isSubmitting ? <Spinner /> : "Sign In"}
        </Button>
        <p className="text-slate-500 text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </form>

      <div className="flex w-full items-center gap-2">
        <div className="h-px flex-grow bg-slate-200" />
        <p className="text-slate-500 text-sm">or</p>{" "}
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
                  callbackURL: "http://test.com:5170/",
                },
                {
                  onSuccess: () => {
                    // biome-ignore lint/suspicious/noConsole: testing
                    console.log("redirecting..");
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

export default SignIn;
