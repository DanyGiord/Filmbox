'use client'

import { useUser } from "@clerk/nextjs";

const Favorites = () => {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div className="text-white_text text-center">
            Welcome to the Favorites page!
        </div>
    );
}
 
export default Favorites;