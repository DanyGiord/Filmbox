"use client";

import MovieCards from "@/components/cards/MovieCards";
import { Input } from "@/components/ui/input";
import * as Icons from "@/public/assets/icons/Icons";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const CustomizeProfile = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [query, setQuery] = useState('');

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  useEffect(() => {
    if(query.length === 0) {
      setQuery("Batman")
    }
  }, [query])

  return (
    <div className="bg-black_main w-full h-screen">
      <UserButton afterSignOutUrl="/sign-in" />
      <div className="flex flex-col justify-center items-center text-center pt-10">
        <h1 className="text-white text-4xl font-bold">
          Select your favorite movies
        </h1>
        <p className="text-gray text-lg mt-4">Choose 3 favorite movies</p>
        <div className="w-80 mt-4">
          <Input onChange={(e) => setQuery(e.target.value)} placeholder="Find a movie" iconSrc={Icons.Search} />
        </div>
        <MovieCards query={query}/>
        {/* ovde ide component movie cards */}
      </div>
    </div>
  );
};

export default CustomizeProfile;
