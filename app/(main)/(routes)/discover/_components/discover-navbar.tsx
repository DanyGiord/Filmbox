'use client'

import { useContext, useEffect, useState } from "react";
import DiscoverContext from "../_context/discover-context";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { discoverSearch, fetchGenres } from "@/tmdb-api/api";
import { cn } from "@/lib/utils";
import SearchNewCard from "./search-new-card";
import Search from "./navbar-components/search";
import SearchFor from "./navbar-components/search-for";
import { motion,useScroll, useMotionValueEvent } from "framer-motion";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

const DiscoverNavbar = () => {
    // @ts-ignore
    const { query, setQuery, searchFor, setSearchFor, genres, searchItems } = useContext(DiscoverContext);
    const [showSearch, setShowSearch] = useState<boolean | undefined>(false);
    const [mouseOver, setMouseOver] = useState<boolean>(false);
  
    useEffect(() => {
      }, [query, searchFor]);

      const {scrollY} =useScroll()
      const [hidden, setHidden] = useState(false)
  
      useMotionValueEvent(scrollY,"change",(latest)=>{
          const previous = scrollY.getPrevious();
          if(latest > previous && latest > 150){
              setHidden(true);
          }else{
              setHidden(false);
          }
      })   

    return (
        <motion.div
        variants={{
            visible:{y:0},
            hidden:{y:"-200%"},
        }}
        animate={hidden ? "hidden":"visible"}
        transition={{duration: 0.35, ease:"easeInOut"}}
         className="mb-7 flex justify-between max-h-[48px] overflow-visible sticky top-5 z-[9999]">
            <div className={cn(
                "w-[300px] relative transition-all duration-500",
                showSearch && "w-[400px]"
            )}>
                <Search
                    query={query}
                    setQuery={setQuery}
                    setMouseOver={setMouseOver}
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                />
                {showSearch && query.length > 0 && (
                    <ScrollArea onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} className={cn(
                        "bg-black_second absolute h-0 inset-0 border-t-2 border-gray/25 rounded-b-3xl text-white p-4 transition-all",
                        !mouseOver && 'opacity-30',
                        query.length > 0 && "h-[530px]"
                    )}
                    >
                        {searchItems.map((single: any) => (
                            <SearchNewCard
                                key={single.id}
                                route="search"
                                searchFor={searchFor}
                                // @ts-ignore
                                poster_path={single.poster_path} title={single.title ? single.title : single.name} vote_average={single.vote_average} release_date={single.release_date} overview={single.overview} genre_ids={single.genre_ids}
                                genres={genres}
                            />
                        ))}
                        <ScrollBar />
                    </ScrollArea>
                )}
            </div>
            <SearchFor
                searchFor={searchFor}
                setSearchFor={setSearchFor}
            />
        </motion.div>
    );
}

export default DiscoverNavbar;