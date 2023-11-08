"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as Icons from "@/public/assets/icons/Icons";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      if (completeSignIn.status !== "complete") {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
        console.log(JSON.stringify(completeSignIn, null, 2));
      }

      if (completeSignIn.status === "complete") {
        // If complete, user exists and provided password match -- set session active
        await setActive({ session: completeSignIn.createdSessionId });
        // Redirect the user to a post sign-in route
        router.push("/");
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display a form to capture the user's email and password
  return (
    <div className="w-80 p-4 md:p-0">
      <h2 className="text-3xl text-white text-center font-semibold mb-7">
        Sign In
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center"
      >
        <div>
          <Input
            placeholder="Email Adress"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
            className="mb-7"
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            iconSrc={Icons.Eye}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            value={password}
          />
        </div>
        <Button type="submit" variant="skew" className="mx-auto">
          Continue
        </Button>
      </form>
      <div className="mt-24 text-center text-white absolute bottom-9 left-0 right-0">
        <p className="sm:text-xl text-lg">
          <Link href="">Forgot password?</Link>
        </p>
        <p className="sm:text-xl text-lg text-session_variant_2">
          Don&apos;t have an account?{" "}
          <span className="underline">
            <Link href="">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
