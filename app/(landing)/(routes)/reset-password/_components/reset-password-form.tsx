"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const ResetPasswordForm: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  const hashEmail = (email: string) => {
    const firstEmailPiece = email.split("@")[0];
    const secondEmailPiece = "@" + email.split("@")[1];

    const hashedFirstPiece = firstEmailPiece.replace(/(?<=.{3})./g, "*");

    const hashedEmail = hashedFirstPiece + secondEmailPiece;

    return hashedEmail;
  };

  async function create(e: SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        const hashedEmail = hashEmail(email);

        toast.success(`Password recovery code sent to ${hashedEmail}`, {
          style: {
            background: "#1a1a1a",
            color: "#fcfcfc",
            textAlign: "center"
          },
          position: "bottom-center",
          duration: 4000
        });

        setSuccessfulCreation(true);
        setIsLoading(false);
      })
      .catch((err) => {
        const response = JSON.stringify(err, null, 2);
        const message = JSON.parse(response).errors[0].message;

        toast.error(message, {
          style: {
            background: "#1a1a1a",
            color: "#fcfcfc",
            textAlign: "center"
          },
          position: "bottom-center",
          duration: 4000
        });

        setIsLoading(false);

        console.error("error", err.errors[0].longMessage);
      });
  }

  async function reset(e: SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
        } else if (result.status === "complete") {
          toast.success(`New password is successfully set`, {
            style: {
              background: "#1a1a1a",
              color: "#fcfcfc",
              textAlign: "center"
            },
            position: "bottom-center",
            duration: 4000
          });
          setActive({ session: result.createdSessionId });
          setComplete(true);
          router.push("/home");
        } else {
          console.log(result);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        const response = JSON.stringify(err, null, 2);
        const message = JSON.parse(response).errors[0].longMessage;

        toast.error(message, {
          style: {
            background: "#1a1a1a",
            color: "#fcfcfc",
            textAlign: "center"
          },
          position: "bottom-center",
          duration: 4000
        });

        setIsLoading(false);

        console.error("error", err.errors[0].longMessage);
      });
  }

  return (
    <div className="w-80 p-4 md:p-0">
      <h1 className="text-white text-2xl text-center">Password recovery</h1>
      <form
        className="flex flex-col justify-center my-6"
        onSubmit={!successfulCreation ? create : reset}
      >
        {!successfulCreation && !complete && (
          <>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              variant="skew"
              className="mx-auto disabled:opacity-50 disabled:cursor-progress"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </>
        )}

        {successfulCreation && !complete && (
          <>
            <Input
              placeholder="New password"
              type="password"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6"
            />

            <Input
              placeholder="Code from your email"
              type="text"
              disabled={isLoading}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="submit" variant="skew" className="mx-auto  disabled:opacity-50 disabled:cursor-progress">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Reset"
              )}
            </Button>
          </>
        )}
      </form>
      <div className="mt-24 text-center text-white absolute bottom-9 left-0 right-0">
        <p>
          Return to
          <span>
            <Link href="/sign-in" className="hover:text-red ml-2 underline">
              Sign In
            </Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
