'use client'

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchGenres, fetchLatest } from "@/tmdb-api/api";
import { Star, StarHalf } from "lucide-react";

import { useEffect, useState, useContext } from "react";
import DiscoverContext from "../_context/discover-context";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

const DiscoverNew = () => {
    // @ts-ignore
    const { searchFor } = useContext(DiscoverContext);

    const [latest, setLatest] = useState<never[]>([]);
    const [skeleton, setSkeleton] = useState(true)
    const [genres, setGenres] = useState<any[]>([]);

    useEffect(() => {
        const getGenres = async () => {
            await fetchGenres(searchFor)
                .then((res) => setGenres(res.genres))
        }
        getGenres();
    }, [searchFor]);

    useEffect(() => {
        const getLatest = async () => {
            await fetchLatest(searchFor)
                .then((res) => setLatest(res.results))
        }
        getLatest();
        setSkeleton(true);
    }, [searchFor]);

    useEffect(() => {
        setTimeout(() => {
            setSkeleton(false)
        }, 2000);
    }, [skeleton])

    return (
        <>
            <h2 className="text-white_text text-2xl mb-5 font-bold">New Films</h2>
            <ScrollArea className="w-auto">
                <div className="flex w-max gap-x-6 mb-2.5">
                    {latest.map((single) => (
                        <>
                            {skeleton ? (
                                <div className="w-96 h-60 p-4 flex gap-x-3 bg-black-900 rounded-3xl">
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
                                        <div className="w-full h-8 rounded-xl -skew-x-[15deg] animate-pulse"></div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="bg-input_bg rounded-3xl w-96 h-60 p-4 flex gap-x-3">
                                        {/* @ts-ignore */}
                                        <img src={TMDB_API_IMG + single?.poster_path} alt="" className="w-36 h-full rounded-xl object-cover" />
                                        <div className="flex flex-col justify-between">
                                            {/* @ts-ignore */}
                                            <h3 className="text-xl text-white_text font-semibold">{searchFor === 'movie' ? single?.title : single?.name}</h3>
                                            <div className="flex gap-x-2 items-center">
                                                {/* @ts-ignore */}
                                                {single?.vote_average.toFixed(1) < 1 ? '' : single?.vote_average.toFixed(1) > 2 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />}
                                                {/* @ts-ignore */}
                                                {single?.vote_average.toFixed(1) < 3 ? '' : single?.vote_average.toFixed(1) > 4 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />}
                                                {/* @ts-ignore */}
                                                {single?.vote_average.toFixed(1) < 5 ? '' : single?.vote_average.toFixed(1) > 6 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />}
                                                {/* @ts-ignore */}
                                                {single?.vote_average.toFixed(1) < 7 ? '' : single?.vote_average.toFixed(1) > 8 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />}
                                                {/* @ts-ignore */}
                                                {single?.vote_average.toFixed(1) < 9 ? '' : single?.vote_average.toFixed(1) > 10 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />}
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
                                            <Button variant="skew_gray" className="w-full my-0">
                                                Watch Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            )}
                        </>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </>
    );
}

export default DiscoverNew;