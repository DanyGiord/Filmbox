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
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      if (completeSignIn.status !== "complete") {
        console.log(JSON.stringify(completeSignIn, null, 2));
      }

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        router.push("/customize");
      }
    } catch (err: any) {
      setErrorMessage(err.status);
      console.log(errorMessage);

      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="w-80 p-4 md:p-0">
      <h2 className="text-3xl text-white text-center font-semibold mb-10">
        Sign In
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center"
      >
        <div>
          <Input
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
            className="mb-6"
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
        <p>
          Forgot password?{" "}
          <span>
            <Link href="/reset-password" className="hover:text-red underline">
              Reset password
            </Link>
          </span>
        </p>
        <p>
          Don&apos;t have an account?{" "}
          <span>
            <Link href="/sign-up" className="hover:text-red underline">
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
