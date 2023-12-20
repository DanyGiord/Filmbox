'use client'

import { useUser } from "@clerk/nextjs";

const Home = () => {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }
   

    return (
        <div className="h-screen flex flex-col mt-4 items-center justify-center w-full text-white_text text-center">                                     {/* obrisati h-screen */}
            Welcome to the Home page
        </div>
    );
}

export default Home;