'use client'

import { useContext, useEffect, useState } from "react";
import DiscoverContext from "../_context/discover-context";

import * as Icons from "@/public/assets/icons/Icons";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { discoverSearch, fetchGenres } from "@/tmdb-api/api";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

const DiscoverNavbar = () => {
    // @ts-ignore
    const { query, setQuery, searchFor, setSearchFor } = useContext(DiscoverContext);
    const [genres, setGenres] = useState<any[]>([]);
    const [searchItems, setSearchItems] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [skeleton, setSkeleton] = useState(true);
    const [mouseOver, setMouseOver] = useState(false);
    

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
                "w-[440px] relative transition-all duration-500",
                showSearch && "w-[660px]"
            )}>
                <Input
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
                />
                {showSearch && query.length > 0 && (
                    <ScrollArea onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} className={cn(
                        "bg-black_second absolute h-0 inset-0 border-t-2 border-gray/25 rounded-b-3xl text-white p-4 transition-all",
                        !mouseOver && 'opacity-30',
                        query.length > 0 && "h-[530px]"
                        )}>
                        {searchItems.map(single => (
                            <>
                                {skeleton ? (
                                    <div className="w-full h-60 p-4 flex gap-x-3 bg-black-900 rounded-3xl">
                                        <div className="w-36 h-full bg-black-800 rounded-xl animate-pulse"></div>
                                        <div className="flex-1 space-y-4 py-1">
                                            <div className="h-5 bg-black-800 rounded animate-pulse"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-black-800 rounded animate-pulse"></div>
                                                <div className="h-4 bg-black-800 rounded animate-pulse"></div>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <div className="h-4 bg-black-800 rounded animate-pulse w-3/4"></div>
                                                <div className="h-4 bg-black-800 rounded animate-pulse w-3/4"></div>
                                                <div className="h-4 bg-black-800 rounded animate-pulse w-3/4"></div>
                                            </div>
                                            <div className="w-10/12 h-8 rounded-xl mx-auto -skew-x-[15deg] animate-pulse"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-black_second group hover:bg-black_third transition-all relative rounded-xl w-full h-60 p-4 flex gap-x-3 my-2">
                                        <div className="discover-search-overlay absolute inset-0 -z-10"></div>
                                        {/* @ts-ignore */}
                                        <img src={TMDB_API_IMG + single?.poster_path} alt="" className="w-36 h-full rounded-xl object-cover" />
                                        <div className="flex flex-col justify-between">
                                            {/* @ts-ignore */}
                                            <h3 className="text-xl text-white_text font-semibold">{searchFor === 'movie' ? single?.title : single?.name}</h3>
                                            <div className="flex gap-x-2 items-center">
                                                {/* @ts-ignore */}
                                                <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
                                                {/* @ts-ignore */}
                                                <span className="text-white_text text-base">{single?.vote_average.toFixed(1)}</span>
                                            </div>
                                            {/* @ts-ignore */}
                                            <span className="text-gray text-sm">{searchFor === 'movie' ? single?.release_date?.substring(0, 4) : single?.first_air_date?.substring(0, 4)}, {genres.find(genre => genre.id === single?.genre_ids[0])?.name}</span>
                                            <div className="text-gray text-sm">
                                                {/* @ts-ignore */}
                                                {searchFor === 'movie' && (single?.title?.length > 15 ? single?.overview?.substring(0, 60) + '...' : single?.overview?.substring(0, 80) + '...')}
                                                {/* @ts-ignore */}
                                                {searchFor === 'tv' && (single?.name?.length > 15 ? single?.overview?.substring(0, 60) + '...' : single?.overview?.substring(0, 80) + '...')}
                                            </div>
                                            <div className="flex gap-x-1.5">
                                                <Button variant="skew" className="w-10/12 my-0">
                                                    Watch Now
                                                </Button>
                                                <ActionTooltip side="top" align="center" label="Create session">
                                                    <Button variant="skew_gray" className="w-2/12 group-hover:bg-black_second mt-0 grid place-items-center bg-black_third">
                                                        <Plus className="w-3 h-3 text-white_text" />
                                                    </Button>
                                                </ActionTooltip>
                                            </div>
                                        </div>
                                    </div>)}
                            </>
                        ))}
                        <ScrollBar />
                    </ScrollArea>
                )}
            </div>
            <Select onValueChange={setSearchFor}>
                <SelectTrigger className="w-[120px] h-12 rounded-full bg-gradient-to-tr from-red to-[#FF004D] text-white_text justify-center gap-x-2 text-base border-none">
                    <SelectValue defaultValue={searchFor} placeholder="Movies" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl bg-input_bg text-white_text p-2 border-none -translate-x-2">
                    <SelectGroup>
                        <SelectItem value="movie" className="rounded-lg">Movies</SelectItem>
                        <SelectItem value="tv" className="rounded-lg">Series</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default DiscoverNavbar;