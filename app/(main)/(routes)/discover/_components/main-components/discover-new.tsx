"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchGenres, fetchLatest } from "@/tmdb-api/api";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import DiscoverContext from "../../_context/discover-context";
import SearchNewCard from "../search-new-card";

const DiscoverNew = () => {
  // @ts-ignore
  const { searchFor } = useContext(DiscoverContext);

  const [latest, setLatest] = useState<never[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      await fetchGenres(searchFor).then((res) => setGenres(res.genres));
    };
    getGenres();
  }, [searchFor]);

  useEffect(() => {
    const getLatest = async () => {
      await fetchLatest(searchFor).then((res) => setLatest(res.results));
    };
    getLatest();
  }, [searchFor]);

  return (
    <>
      <h2 className="text-white_text text-2xl mb-5 font-bold">New Films</h2>
      <ScrollArea className="w-auto">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            // @ts-ignore
            key={genres}
            className="flex w-max gap-x-6 mb-2.5"
          >
            {latest.map((single) => (
              <SearchNewCard
                route="new"
                searchFor={searchFor}
                // @ts-ignore
                poster_path={single.poster_path} title={single.title ? single.title : single.name} vote_average={single.vote_average} release_date={single.release_date} overview={single.overview} genre_ids={single.genre_ids}
                genres={genres}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default DiscoverNew;