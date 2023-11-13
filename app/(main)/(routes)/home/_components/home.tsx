'use client'

import { useUser } from "@clerk/nextjs";
import HomeNavbar from "./home-navbar";

const Home = () => {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div className="h-full w-full bg-black_main text-white_text text-center">                                     {/* obrisati h-screen */}
            Welcome to the Home page!
        </div>
    );
}
 
export default Home;