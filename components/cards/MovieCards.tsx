"use client";
import { searchMovies } from "@/tmdb-api/api";
import * as Icons from "@/public/assets/icons/Icons";
import Image from "next/image";
import { useEffect, useState } from "react";

const moviesPerPage = 8;
const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface MovieCardsProps {
  query: string
}

const MovieCards = ({ query }: MovieCardsProps) => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);

  const fetchMovies = async () => {
    searchMovies(query)
      .then((movies) => setMovieList(movies));
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const totalPages = Math.ceil(movieList.length / moviesPerPage);

  const handlePagination = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const generatePaginationDots = () => {
    const dots = [];
    for (let i = 1; i <= totalPages; i++) {
      dots.push(
        <button
          key={i}
          onClick={() => handlePagination(i)}
          className={`${
            i === currentPage ? "bg-red w-[40px]" : "bg-transparent"
          } rounded-full ml-5 transition-all`}
        >
          <Image src={Icons.Dot} alt="dots" width={14} height={14} />
        </button>
      );
    }
    return dots;
  };

  const handleMovieClick = (movieId: never) => {
      if (selectedMovies.includes(movieId) && selectedMovies.length <= 3) {
        setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
      } else if((selectedMovies.length < 3 || selectedMovies.length < 3) && !selectedMovies.includes(movieId)) {
        setSelectedMovies([...selectedMovies, movieId]);
      }
  };

  useEffect(() => {
    const sliceMovies = movieList.slice(
      (currentPage - 1) * moviesPerPage,
      currentPage * moviesPerPage
    );

    setVisibleMovies(sliceMovies)
  }, [movieList])

  useEffect(() => {
    console.log(selectedMovies.length);
    
  }, [selectedMovies])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 pt-8">
      {movieList?.map((movie) => (
        <div
          key={movie.id}
          className="flex justify-center px-2 py-2 relative items-center"
        >
          <div
            className={`relative rounded-2xl ${
              selectedMovies.includes(movie.id)
                ? "border-2 border-orange-500"
                : ""
            }`}
            onClick={() => handleMovieClick(movie.id)}
          >
            <Image
              src={TMDB_API_IMG + movie.poster_path}
              alt={movie.title}
              width={192}
              height={252}
              className="rounded-2xl"
            />
            <div className="absolute top-0 left-0 w-48 h-full flex flex-col justify-end p-2 card_main rounded-2xl">
              <p className="text-white font-normal text-sm absolute bottom-4 right-0 left-0 hover:cursor-default">
                {movie.title}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center w-full mt-4">
        {generatePaginationDots()}
      </div>
    </div>
  );
};

export default MovieCards;
