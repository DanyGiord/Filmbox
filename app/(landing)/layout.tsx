import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs";

import { redirect } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth();

    if(userId) {
        redirect('/')
    }

    return ( 
        <div className="h-full bg-[url(/./assets/backgrounds/auth-bg.jpg)] bg-center bg-cover flex items-center justify-center">
            <div className="auth-overlay"></div>
            <div className="z-10">
                <Image
                    className="mx-auto absolute top-0 left-0 right-0 pt-8 md:pt-12"
                    src='/assets/logo.svg'
                    alt="flexbox-logo"
                    width={137}
                    height={30}
                />
                {children}
            </div>
        </div>
     );
}
 
export default AuthLayout;