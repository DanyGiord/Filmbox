/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Card from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchDiscover } from "@/tmdb-api/api";
import { useUser } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import DiscoverContext from "../../../_context/context";
import { cn } from "@/lib/utils";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

const DiscoverCards = () => {
  // @ts-ignore
  const { currentPage, setCurrentPage, currentYear, selectedSort, rating, selectedGenres, currentLanguage, searchFor, setTotalPages, favMovieIds, setFavMovieIds,favSerieIds, setFavSerieIds, hidden
  } = useContext(DiscoverContext);

  const { user } = useUser();
  const convex = useConvex();

  const [cards, setCards] = useState([]);
  const [fullTitle, setFullTitle] = useState<number | null>(null);

  useEffect(() => {
    const getLatest = async () => {
      await fetchDiscover(
        currentPage,
        currentYear,
        selectedSort,
        rating,
        selectedGenres,
        currentLanguage,
        searchFor
      ).then((res) => {
        setCards(res.results);
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages);
      });
    };
    getLatest();
  }, [
    currentPage,
    currentYear,
    selectedSort,
    rating,
    selectedGenres,
    currentLanguage,
    searchFor,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    currentYear,
    selectedSort,
    rating,
    selectedGenres,
    currentLanguage,
    searchFor,
  ]);


  useEffect(() => {
    let ignore = false;
    if (user) {
      convex
        .query(api.user.getUser, { userId: user.id })
        .then((userData) => {
          // Obradite podatke korisnika
          if (userData && !ignore) {
            setFavMovieIds(userData.favMovies);
            setFavSerieIds(userData.favSeries);
            localStorage.setItem("convexUserId", userData._id);
          }
        })
        .catch((error) => {
          // Obradite grešku
          console.log(error);
        });
    }
    return () => {
      ignore = true;
    };
  }, [user, convex]);

  return (
    <motion.div
      layout
      className={cn(
        "grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 sm:grid-cols-2 gap-4 w-full mb-7"
      )}
    >
      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
              // @ts-ignore
            key={card.id}
            className="h-full"
          >
            <Card
              // @ts-ignore
              id={card.id} poster_path={card.poster_path} title={card.original_title ? card.original_title : card.original_name} vote_average={card.vote_average} release_date={ card.release_date ? card.release_date : card.first_air_date}
              fullTitle={fullTitle}
              setFullTitle={setFullTitle}
              searchFor={searchFor}
              favMovieIds={favMovieIds}
              setFavMovieIds={setFavMovieIds}
              favSerieIds={favSerieIds}
              setFavSerieIds={setFavSerieIds}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default DiscoverCards;