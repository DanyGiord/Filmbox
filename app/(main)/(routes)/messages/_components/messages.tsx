'use client'

import { useUser } from "@clerk/nextjs";

const Messages = () => {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div className="text-white_text text-center">
            Welcome to the Messages page!
        </div>
    );
}
 
export default Messages;