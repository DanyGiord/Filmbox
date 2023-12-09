'use client'

import { fetchDiscover } from "@/tmdb-api/api";
import { useEffect, useState, useContext } from "react";
import DiscoverContext from "../../_context/discover-context";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Plus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

const DiscoverCards = () => {
    // @ts-ignore
    const { currentPage, currentYear, selectedSort, rating, selectedGenres, currentLanguage, searchFor, totalPages, setTotalPages } = useContext(DiscoverContext);

    const [cards, setCards] = useState([]);
    const [skeleton, setSkeleton] = useState(true)

    useEffect(() => {
        const getLatest = async () => {
            await fetchDiscover(currentPage, currentYear, selectedSort, rating, selectedGenres, currentLanguage, searchFor)
                .then((res) => {
                    setCards(res.results);
                    setTotalPages(res.total_pages > 500 ? 500 : res.total_pages);
                })
        }
        getLatest();
        setSkeleton(true);
    }, [currentPage, currentYear, selectedSort, rating, selectedGenres, currentLanguage, searchFor]);

    useEffect(() => {
        console.log(cards);
        console.log(totalPages);
    }, [cards, totalPages]);

    useEffect(() => {
        setTimeout(() => {
            setSkeleton(false)
        }, 2000);
    }, [skeleton])

    return (
        <div className="grid grid-cols-5 gap-3 w-full mb-7">
            {cards.map(card => (
                <>
                    {/* {skeleton ? (
                        <div className="animate-pulse w-full h-[350px] rounded-2xl absolute inset-0"></div>
                    ) : ( */}

                    <div
                        // @ts-ignore
                        key={card.id}
                        className="relative flex justify-center w-full h-[350px] px-2 py-2 items-center"
                    >
                        {skeleton && <div className="animate-pulse w-full h-full rounded-2xl absolute inset-0 z-[9999]"></div>}
                        <div
                            // @ts-ignore
                            className={`relative rounded-2xl  w-full h-full`}
                        >
                            {/* @ts-ignore */}
                            {card.poster_path ? (
                                <Image
                                    // @ts-ignore
                                    src={TMDB_API_IMG + card.poster_path}
                                    // @ts-ignore
                                    alt={card.title}
                                    width={266.5}
                                    height={350}
                                    className="rounded-2xl w-full h-full object-cover"
                                    blurDataURL="/assets/no-img.jpg"
                                />
                            ) : (
                                <Image
                                    // @ts-ignore
                                    src={'/assets/no-img.jpg'}
                                    // @ts-ignore
                                    alt={card.title}
                                    width={266.5}
                                    height={350}
                                    className="rounded-2xl w-full h-full object-cover"
                                />
                            )}
                            <div className={cn(
                                `absolute inset-0 p-3 w-full h-full flex flex-col justify-between rounded-2xl card_main group hover:backdrop-blur-sm overflow-hidden transition-all`
                            )}>
                                <div className="flex justify-end">
                                    <button className="w-9 h-7 grid place-items-center rounded-full bg-black_third">
                                        <Plus className="w-3 h-3 text-white_text" />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex justify-between translate-y-44 group-hover:translate-y-0 duration-300">
                                        <Badge className="flex justify-center items-center gap-x-1 text-sm text-gray">
                                            <Star className="w-4 h-4 text-[#ffa800] fill-[#ffa800]" />
                                            {/* @ts-ignore */}
                                            {card.vote_average.toFixed(1)}
                                        </Badge>
                                        <Badge className="flex justify-center items-center text-sm text-gray">
                                            {/* @ts-ignore */}
                                            {searchFor === 'movie' ? card?.release_date?.substring(0, 4) : card?.first_air_date?.substring(0, 4)}
                                        </Badge>
                                    </div>
                                    <p className="text-white_text text-center font-normal text-base hover:cursor-default grid place-items-center min-h-[48px] translate-y-44 group-hover:translate-y-0 duration-300">
                                        {/* @ts-ignore */}
                                        {card.title ? card.title : card.name}
                                    </p>
                                    <p className="text-white_second text-sm scale-y-0 overflow-hidden opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-300 origin-bottom min-h-[120px] grid place-items-center">
                                        {/* @ts-ignore */}
                                        {card?.overview?.split(' ').slice(0, 15).join(' ') + '...'}
                                    </p>
                                    <Button variant='skew' className="mt-0 w-11/12 translate-y-24 opacity-0 group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        Watch Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div >
                    {/* )} */}
                </>
            ))
            }
        </div >
    );
}

export default DiscoverCards;