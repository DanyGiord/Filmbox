'use client'

import { useUser } from "@clerk/nextjs";

const Account = () => {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div className="text-white_text text-center">
            Welcome to the Account page!
        </div>
    );
}
 
export default Account;