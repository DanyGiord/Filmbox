'use client'

import React, { SyntheticEvent, useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useRouter, redirect } from 'next/navigation';
 
const ResetPasswordForm: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);

 
  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();
 
  if (!isLoaded) {
    return null;
  }
 
  async function create(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(_ => {
        setSuccessfulCreation(true);
      })
      .catch(err => console.error('error', err.errors[0].longMessage));
  }
 
  async function reset(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then(result => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          setComplete(true);
          redirect('/customize')
        } else {
          console.log(result);
        }
      })
      .catch(err => console.error('error', err.errors[0].longMessage));
  }
 
  return (
    <div className="w-[350px] p-4 md:p-0">
      <h1 className='text-white text-2xl'>Password recovery</h1>
      <form
        className="flex flex-col justify-center my-6"
        onSubmit={!successfulCreation ? create : reset}
      >
        {!successfulCreation && !complete && (
          <>
            <Input type='email' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
            <Button type="submit" variant='skew' className="mx-auto">
                Continue
            </Button>
          </>
        )}
 
        {successfulCreation && !complete && (
          <>
            <Input placeholder='New password' type='password' value={password} onChange={e => setPassword(e.target.value)} className='mb-6' />
 
            <Input placeholder='Code from your email' type='text' value={code} onChange={e => setCode(e.target.value)}  />
 
            <Button type="submit" variant='skew' className="mx-auto">
                Reset
            </Button>
          </>
        )}
 
        {complete && (
            <>
                <p>
                    You successfully changed you password
                </p>
                <Button type="submit" variant='skew' className="mx-auto" onClick={() => router}>
                  <Link href='/'>
                    Dive into app
                  </Link>
                </Button>
            </>
        )}
        {secondFactor && '2FA is required, this UI does not handle that'}
      </form>
      <div className="mt-24 text-start text-white ">
          <p>Return to<span><Link href="/sign-in" className="hover:text-[#f3001d] ml-2">Sign In</Link></span> </p>
        </div>
    </div>
  );
};
 
export default ResetPasswordForm;