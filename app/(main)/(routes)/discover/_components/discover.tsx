'use client'

import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import DiscoverSidebar from "./discover-sidebar";
import DiscoverNavbar from "./discover-navbar";
import { useState } from "react";

const Discover = () => {
    const { isLoaded, isSignedIn } = useUser();

    const [rating, setRating] = useState<string>("5");
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [query, setQuery] = useState<string>("");
    const [searchFor, setSearchFor] = useState<string>("movie");
    const [currentLanguage, setCurrentLanguage] = useState<string>(''); // No Language === "xx"

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div className={cn(
            "p-1",
            "md:p-5 flex gap-x-4"
        )}>
            <div className="w-[237px]">
                <DiscoverSidebar setCurrentLanguage={setCurrentLanguage} rating={rating} setRating={setRating} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} searchFor={searchFor} />
            </div>
            <div className="w-10/12">
                <DiscoverNavbar query={query} setQuery={setQuery} searchFor={searchFor} setSearchFor={setSearchFor} />
            </div>
        </div>
    );
}

export default Discover;