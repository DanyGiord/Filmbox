'use client'

import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import DiscoverSidebar from "./discover-sidebar";
import DiscoverNavbar from "./discover-navbar";

import DiscoverNew from "./main-components/discover-new";
import DiscoverMain from "./discover-main";
import { motion } from "framer-motion";
import { useContext } from "react";
import DiscoverContext from "../_context/discover-context";

const Discover = () => {
    // @ts-ignore
    const { hidden } = useContext(DiscoverContext);
    const { isLoaded, isSignedIn } = useUser();
    
    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div
            className={cn(
                "p-1",
                "md:p-5 flex gap-x-5 transition-all",
                hidden && "md:p-0"
            )}
        >
            <motion.div
                variants={{
                    visible: { width: "20%", opacity: 1 },
                    hidden: { width: "0%", opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.75, ease: "backInOut" }}
                className="w-[20%]"
            >
                <DiscoverSidebar />
            </motion.div>
            <motion.div
                variants={{
                    visible: { width: "80%" },
                    hidden: { width: "97.5%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.75, ease: "backInOut" }}
                className="w-[80%]"
            >
                <DiscoverNavbar />
                <DiscoverNew />
                <DiscoverMain />
            </motion.div>
        </div>
    );
}

export default Discover;