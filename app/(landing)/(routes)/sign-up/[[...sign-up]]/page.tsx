// import { SignUp } from "@clerk/nextjs";
 
// export default function Page() {
//   return (
//     <SignUp 
//       afterSignUpUrl="/customize"
//       appearance={{
//         elements: {
//           card: "shadow-none bg-transparent",
//           logoBox: "mx-auto flex justify-center mb-24",
//           logoImage: "scale-[1.5]",
//           formButtonPrimary:
//             "accent_main mt-6 -skew-x-[16deg] rounded-[12px] w-[204px] h-[49px] mx-auto text-[#FAFAFA] text-[18px] capitalize",
//           formFieldInput: "px-[24px] py-[12px] rounded-[24px] leading-[38px] border-none border-0 focus:ring-0",
//           footer: "mx-auto",
//         },
//       }}
//     />
//   );
// }

'use client'
 
import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ClerkAPIErrorJSON } from '@clerk/types';
 
export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const router = useRouter();
 
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
      <form onSubmit={handleVerify}>
        <label id="code">Code</label>
        <input value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
        <button type="submit">Complete Sign Up</button>
      </form>
    )
  }
  
  // Display the initial sign-up form to capture the email and password
  return (
    <div>
      <h2 className="text-3xl text-white text-center font-semibold mb-10">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email address</label>
          <input id="email" type='email' name="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mt-8" htmlFor="password">Password</label>
          <input id="password" type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit">Verify Email</button>
        </div>
      </form>
    </div>
  );
}