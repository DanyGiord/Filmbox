'use client'

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchGenres, fetchLatest } from "@/tmdb-api/api";

import { useEffect, useState, useContext } from "react";
import DiscoverContext from "../../_context/discover-context";
import SearchNewCard from "../search-new-card";


const DiscoverNew = () => {
    // @ts-ignore
    const { searchFor } = useContext(DiscoverContext);

    const [latest, setLatest] = useState<never[]>([]);
    const [skeleton, setSkeleton] = useState(true);
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
                        <SearchNewCard
                            route="new"
                            skeleton={skeleton}
                            searchFor={searchFor}
                            // @ts-ignore
                            poster_path={single.poster_path} title={single.title ? single.title : single.name} vote_average={single.vote_average} release_date={single.release_date} overview={single.overview} genre_ids={single.genre_ids}
                            genres={genres}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </>
    );
}

export default DiscoverNew;