'use client'

import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import DiscoverSidebar from "./discover-sidebar";
import DiscoverNavbar from "./discover-navbar";

import DiscoverNew from "./main-components/discover-new";
import DiscoverMain from "./discover-main";

const Discover = () => {
    const { isLoaded, isSignedIn } = useUser();


    if (!isLoaded || !isSignedIn) {
        return null;
    }
    

    return (
        <div className={cn(
            "p-1",
            "md:p-5 flex gap-x-5"
        )}>
            <div className="w-[20%]">
                <DiscoverSidebar />
            </div>
            <div className="w-[80%]">
                <DiscoverNavbar />
                <DiscoverNew />
                <DiscoverMain />
            </div>
        </div>
    );
}

export default Discover;