"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);

      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      if (completeSignIn.status !== "complete") {
        console.log(JSON.stringify(completeSignIn, null, 2));
      }

      if (completeSignIn.status === "complete") {
        toast.success(`Successfully signed in`, {
          style: {
            background: "#1a1a1a",
            color: "#fcfcfc",
            textAlign: "center",
          },
          position: "bottom-center",
          duration: 4000,
        });
        await setActive({ session: completeSignIn.createdSessionId });
        router.push("/home");
      }
    } catch (err: any) {
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

      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
            className="mb-6"
            autoComplete="one-time-code"
          />
        </div>
        <div className="relative">
          <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            disabled={isLoading}
            value={password}
          />
          {showPassword ? (
            <Eye
              onClick={() => setShowPassword(false)}
              className="text-white_second absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
            />
          ) : (
            <EyeOff
              onClick={() => setShowPassword(true)}
              className="text-[#565656] absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
            />
          )}
        </div>
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
