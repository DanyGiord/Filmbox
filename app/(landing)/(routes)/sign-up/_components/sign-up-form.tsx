"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@clerk/nextjs";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import axios from 'axios';
import { currentUser } from "@clerk/nextjs";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { getToken } = useAuth();

  const router = useRouter();

  const hashEmail = (email: string) => {
    const firstEmailPiece = email.split("@")[0];
    const secondEmailPiece = "@" + email.split("@")[1];

    const hashedFirstPiece = firstEmailPiece.replace(/(?<=.{3})./g, "*");

    const hashedEmail = hashedFirstPiece + secondEmailPiece;

    return hashedEmail;
  };

  // async function handleSubmitDB(email: string , firstName: string, lastName: string) {
  //   try {
  //     await fetch('/api/profile', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${await getToken()}`
  //       },
  //       body: JSON.stringify({
  //         email,
  //         firstName,
  //         lastName,
  //       }),
  //     }).then((result) => console.log(result));

  //     console.log();
      
      
  //     toast.success("GJ")
  //   } catch (error) {
  //     console.error('Error sending profile to backend:', error);
  //     // Obradite grešku
  //     toast.error("GG")
  //   }
  // }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);

      await signUp.create({
        emailAddress,
        password,
        firstName: name,
        lastName: surname,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      const hashedEmail = hashEmail(emailAddress);

      toast.success(`Verification code sent to ${hashedEmail}`, {
        style: {
          background: "#1a1a1a",
          color: "#fcfcfc",
          textAlign: "center"
        },
        position: "bottom-center",
        duration: 4000
      });

      setVerifying(true);
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

      console.error("Error:", JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        router.push("/customize");

        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Your account has been verified successfully", {
          style: {
            background: "#1a1a1a",
            color: "#fcfcfc",
            textAlign: "center"
          },
          position: "bottom-center",
          duration: 5000
        });
      }
    } catch (err: any) {
      const response = JSON.stringify(err, null, 2);
      const message = JSON.parse(response).errors[0].longMessage;

      toast.error(message, {
        style: {
          background: "#1a1a1a",
          color: "#fcfcfc",
          textAlign: "center"
        },
        position: "bottom-center",
        duration: 5000
      });

      setIsLoading(false);

      console.error("Error:", JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);

    }
  };

  if (verifying) {
    return (
      <div className="w-80 p-4 md:p-0">
        <h2 className="text-3xl text-white text-center font-semibold mb-10">
          Verify your email
        </h2>
        <form onSubmit={handleVerify} className="flex flex-col justify-center">
          <Input
            placeholder="Enter your code"
            value={code}
            id="code"
            name="code"
            disabled={isLoading}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button type="submit" variant="skew" className="mx-auto disabled:opacity-50 disabled:cursor-progress">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Complete sign up"
            )}
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
            placeholder="First Name"
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="mb-4"
          />
        </div>
        <div>
          <Input
            placeholder="Last Name"
            id="surname"
            type="text"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            disabled={isLoading}
            className="mb-4"
          />
        </div>
        <div>
          <Input
            placeholder="Email Address"
            id="email"
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            disabled={isLoading}
            className="mb-4"
          />
        </div>
        <div>
          <div className="relative">
            <Input
              placeholder="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>
        <Button type="submit" variant="skew" className="mx-auto disabled:opacity-50 disabled:cursor-progress">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Verify email"
          )}
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
