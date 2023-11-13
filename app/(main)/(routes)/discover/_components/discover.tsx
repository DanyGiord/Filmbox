'use client'

import { useUser } from "@clerk/nextjs";

const Discover = () => {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div className="text-white_text text-center">
            Welcome to the Discover page!
        </div>
    );
}
 
export default Discover;