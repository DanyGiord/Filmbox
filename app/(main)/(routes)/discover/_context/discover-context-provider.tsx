'use client'

import React, { useState } from "react";
import Context from "./discover-context";

const DiscoverContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [rating, setRating] = useState<string>("5");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [searchFor, setSearchFor] = useState<string>("movie");
  const [currentLanguage, setCurrentLanguage] = useState<string>(''); // No Language === "xx"
  const [currentYear, setCurrentYear] = useState<number>()
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(500);

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
      totalPages, setTotalPages
    }}>
      {children}
    </Context.Provider>
  );
};

export default DiscoverContextProvider;