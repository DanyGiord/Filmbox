"use client";
import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ClerkAPIErrorJSON } from "@clerk/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as Icons from "@/public/assets/icons/Icons";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [hashedEmailAddress, setHashedEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const router = useRouter();

  const hashEmail = (email: string) => {
    const firstEmailPiece = email.split("@")[0];
    const secondEmailPiece = "@" + email.split("@")[1];

    const hashedFirstPiece = firstEmailPiece.replace(/(?<=.{3})./g, "*");

    const hashedEmail = hashedFirstPiece + secondEmailPiece;

    setHashedEmailAddress(hashedEmail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
      hashEmail(emailAddress);
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  if (verifying) {
    return (
      <div className="w-80 p-4 md:p-0">
        <p className="text-white text-center mb-6">
          Verification code sent to{" "}
          <span className="font-bold">{hashedEmailAddress}</span>
        </p>
        <form onSubmit={handleVerify} className="flex flex-col justify-center">
          <Input
            placeholder="Enter your code"
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button type="submit" variant="skew" className="mx-auto">
            Complete Sign Up
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-80 p-4 md:p-0">
      <h2 className="text-3xl text-white text-center font-semibold mb-10">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <div>
          <Input
            placeholder="Email Address"
            id="email"
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="mb-6"
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            iconSrc={Icons.Eye}
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" variant="skew" className="mx-auto">
          Verify email
        </Button>
      </form>
      <div className="mt-24 text-center text-white absolute bottom-9 left-0 right-0">
        <p>
          Already have an account?{" "}
          <span>
            <Link href="/sign-in" className="hover:text-red underline">
              Sign In
            </Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
