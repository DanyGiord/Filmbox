// import { SignIn } from "@clerk/nextjs";
 
// export default function Page() {
//   return (
//     <SignIn 
//       afterSignInUrl="/customize"
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
 
import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
 
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
 
      if (completeSignIn.status !== 'complete') {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
        console.log(JSON.stringify(completeSignIn, null, 2));
      }
 
      if (completeSignIn.status === 'complete') {
        // If complete, user exists and provided password match -- set session active
        await setActive({ session: completeSignIn.createdSessionId });
        // Redirect the user to a post sign-in route
        router.push('/');
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // Display a form to capture the user's email and password
  return (
    <div className="w-[350px] p-4 md:p-0">
        <h2 className="text-3xl text-white text-center font-semibold mb-10">Sign In</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-center">
          <div>
            {/* <label htmlFor="email">Email</label> */}
            <Input placeholder="Email Adress" onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" value={email} className="mb-[26px]" />
            {/* <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" value={email} /> */}
          </div>
          <div>
            {/* <label htmlFor="password">Password</label> */}
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" value={password} />
            {/* <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" value={password} /> */}
          </div>
          <Button type="submit" variant='skew' className="mx-auto">
            Continue
          </Button>
          {/* <button type="submit">Sign In</button> */}
        </form>
        <div className="mt-24 text-start text-white">
          <p>Forgot password? <span><Link href="">Reset password</Link></span> </p>
          <p>Don't have an account? <span><Link href="">Sign Up</Link></span> </p>
        </div>
    </div>
  );
}