"use client";
import { getDiscoverMovies } from "@/app/api/api";
import * as Icons from "@/public/assets/icons/Icons";
import Image from "next/image";
import { useEffect, useState } from "react";

const moviesPerPage = 8;
const API_IMG = `https://image.tmdb.org/t/p/w500`;

const MovieCard = () => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovies, setSelectedMovies] = useState([]);

  const fetchMovies = async () => {
    const movies = await getDiscoverMovies(currentPage);
    setMovieList(movies);
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
            i === currentPage ? "bg-red" : "bg-transparent"
          } rounded-full ml-5`}
        >
          <Image src={Icons.Dot} alt="dots" width={14} height={14} />
        </button>
      );
    }
    return dots;
  };

  const handleMovieClick = (movieId) => {
    if (selectedMovies.includes(movieId)) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
    } else {
      setSelectedMovies([...selectedMovies, movieId]);
    }
  };

  const visibleMovies = movieList.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <div className="flex flex-wrap justify-center pt-8 w-2/4">
      {visibleMovies.map((movie) => (
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
              src={API_IMG + movie.poster_path}
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

export default MovieCard;
