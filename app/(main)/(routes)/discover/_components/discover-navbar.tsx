'use client'

import { useContext, useEffect, useState } from "react";
import DiscoverContext from "../_context/discover-context";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { discoverSearch, fetchGenres } from "@/tmdb-api/api";
import { cn } from "@/lib/utils";
import SearchNewCard from "./search-new-card";
import Search from "./navbar-components/search";
import SearchFor from "./navbar-components/search-for";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

const DiscoverNavbar = () => {
    // @ts-ignore
    const { query, setQuery, searchFor, setSearchFor } = useContext(DiscoverContext);
    const [genres, setGenres] = useState<any[]>([]);
    const [searchItems, setSearchItems] = useState<any>([]);
    const [showSearch, setShowSearch] = useState<boolean | undefined>(false);
    const [skeleton, setSkeleton] = useState<boolean>(true);
    const [mouseOver, setMouseOver] = useState<boolean>(false);


    useEffect(() => {
        const getGenres = async () => {
            await fetchGenres(searchFor)
                .then((res) => setGenres(res.genres))
        }
        getGenres();
    }, [searchFor]);

    useEffect(() => {
        setTimeout(() => {
            setSkeleton(false)
        }, 500);
    }, [skeleton])

    useEffect(() => {
        const getSearch = async () => {
            await discoverSearch(searchFor, query)
                .then(res => setSearchItems(res));
        }
        getSearch();
        setSkeleton(true);
    }, [query, searchFor]);

    return (
        <div className="mb-7 flex justify-between max-h-[48px] overflow-visible sticky top-5 z-[9999]">
            <div className={cn(
                "w-[300px] relative transition-all duration-500",
                showSearch && "w-[400px]"
            )}>
                {/* <Input
                    onChange={(e) => setQuery(e.target.value)}
                    onMouseOver={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                    placeholder="Search"
                    iconSrc={Icons.Search}
                    value={query}
                    className={cn(
                        "h-12",
                        showSearch && query.length > 0 && "rounded-b-none"
                    )}
                    onFocus={() => {
                        setShowSearch(true);
                        setSkeleton(true)
                    }}
                    onBlur={() => setShowSearch(false)}
                /> */}
                <Search
                    query={query}
                    setQuery={setQuery}
                    setMouseOver={setMouseOver}
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                    setSkeleton={setSkeleton}
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
                                route="search"
                                skeleton={skeleton}
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
        </div>
    );
}

export default DiscoverNavbar;