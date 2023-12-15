'use client'

import React, { useEffect, useState } from "react";
import Context from "./discover-context";
import { discoverSearch, fetchDiscover, fetchGenres, fetchLanguages, fetchLatest } from "@/tmdb-api/api";
import { useMotionValueEvent, useScroll } from "framer-motion";

const DiscoverContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [rating, setRating] = useState<string>("5");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [searchFor, setSearchFor] = useState<string>("movie");
  const [currentLanguage, setCurrentLanguage] = useState<string>(''); // No Language === "xx"
  const [currentYear, setCurrentYear] = useState<number>()
  const [selectedSort, setSelectedSort] = useState<string>("popularity");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(500);
  const [genres, setGenres] = useState<any[]>([]);
  const [searchItems, setSearchItems] = useState<any>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [fullTitle, setFullTitle] = useState<number | null>(null);
  const [cards, setCards] = useState([]);
  const [favMovieIds, setFavMovieIds] = useState<number[]>([]);
  const [favSerieIds, setFavSerieIds] = useState<number[]>([]);
  const [latest, setLatest] = useState<never[]>([]);
  const [hidden, setHidden] = useState<boolean>(false);

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    // const previous = scrollY.getPrevious();
    // if (latest > previous && latest > 150) {
    //   setHidden(true);
    // } else {
    //   setHidden(false);
    // }
    const isScrolledToTop = latest <= 0;

    if (isScrolledToTop) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  })

  useEffect(() => {
    const getGenres = async () => {
      await fetchGenres(searchFor)
        .then((res) => setGenres(res.genres))
    }
    getGenres();
  }, [searchFor]);

  useEffect(() => {
    const getSearch = async () => {
      await discoverSearch(searchFor, query)
        .then(res => setSearchItems(res));
    }
    getSearch();
  }, [query, searchFor]);

  useEffect(() => {
    const getLanguages = async () => {
      await fetchLanguages()
        .then((res) => setLanguages(res))
    }
    getLanguages();
  }, [])

  useEffect(() => {
    const yearsArray = Array.from({ length: 2023 - 1882 + 1 }, (_, index) => 2023 - index);
    setYears(yearsArray);
  }, []);

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
    const getLatest = async () => {
      await fetchLatest(searchFor)
        .then((res) => setLatest(res.results))
    }
    getLatest();
  }, [searchFor]);

  return (
    <Context.Provider value={{
      rating, setRating,
      selectedGenres, setSelectedGenres,
      query, setQuery,
      searchFor, setSearchFor,
      currentLanguage, setCurrentLanguage,
      currentYear, setCurrentYear,
      selectedSort, setSelectedSort,
      currentPage, setCurrentPage,
      totalPages, setTotalPages,
      genres, setGenres,
      searchItems,
      languages,
      years,
      fullTitle, setFullTitle,
      cards,
      favMovieIds, setFavMovieIds,
      favSerieIds, setFavSerieIds,
      latest,
      hidden, setHidden,
    }}>
      {children}
    </Context.Provider>
  );
};

export default DiscoverContextProvider;