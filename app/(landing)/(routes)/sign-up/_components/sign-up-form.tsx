'use client'
 
import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ClerkAPIErrorJSON } from '@clerk/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from "next/link";

 
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

    const hashedFirstPiece = firstEmailPiece.replace(/(?<=.{3})./g, '*');

    const hashedEmail = hashedFirstPiece + secondEmailPiece;

    setHashedEmailAddress(hashedEmail);
  }
 
  // This function will handle the user submitting their email and password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress, password
      });
 
      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
      });
 
      // Set 'verifying' true to display second form and capture the OTP code
      setVerifying(true);
      hashEmail(emailAddress)
    }
    catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  }
 
  // This function will handle the user submitting a code for verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
 
    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      });
 
      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
 
      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Redirect the user to a post sign-up route
        router.push("/");
      }
    }
    catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  }
 
  // Once the sign-up form was submitted, verifying was set to true and as a result, this verification form is presented to the user to input their verification code.
  if (verifying) {
    return (
      <div className="w-[350px] p-4 md:p-0">
        <p className='text-white text-center mb-6'>Verification code sent to <span className="font-bold">{hashedEmailAddress}</span></p>
        <form onSubmit={handleVerify} className="flex flex-col justify-center">
          <Input placeholder='Enter your code' value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
          <Button type="submit" variant='skew' className="mx-auto">
          Complete Sign Up
          </Button>
        </form>
      </div>
    )
  }
  
  // Display the initial sign-up form to capture the email and password
  return (
    <div className="w-[350px] p-4 md:p-0">
      <h2 className="text-3xl text-white text-center font-semibold mb-10">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <div>
          <Input placeholder='Email address' id="email" type='email' name="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className="mb-6" />
        </div>
        <div>
          <Input placeholder='Password' id="password" type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" variant='skew' className="mx-auto">
          Verify email
        </Button>
      </form>
        <div className="mt-24 center text-white ">
          <p>Already have an account? <span><Link href="/sign-in">Sign In</Link></span> </p>
        </div>
    </div>
  );
}