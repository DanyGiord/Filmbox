"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import * as Icons from "@/public/assets/icons/Icons";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface MovieCardsProps {
  list: never[];
  selectedMovies: never[];
  setSelectedMovies: Dispatch<SetStateAction<never[]>>;
}

const MovieCards = ({ list, selectedMovies, setSelectedMovies }: MovieCardsProps) => {
  const handleMovieClick = (movieId: never) => {
    if (selectedMovies.includes(movieId) && selectedMovies.length <= 3) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
    } else if ((selectedMovies.length < 3) && !selectedMovies.includes(movieId)) {
      setSelectedMovies([...selectedMovies, movieId]);
    }
  };


  return (
    <ScrollArea id="movies-scroll-area">
      <div className="grid grid-cols-2 lg:grid-cols-4 max-w-[435px] md:max-w-[870px] h-[600px] md:h-[400px]">
        {list?.map((movie) => (
          <div
            // @ts-ignore
            key={movie.id}
            className="flex justify-center px-2 py-2 relative items-center"
          >
            <div
              // @ts-ignore
              className={`relative rounded-2xl border-[3px] ${selectedMovies.includes(movie.id)
                ? "border-orange-500"
                : "border-transparent"
                }`}
              // @ts-ignore
              onClick={() => handleMovieClick(movie.id)}
            >
              {/* @ts-ignore */}
              {selectedMovies.includes(movie.id) && (
                <Image
                  src={Icons.OrangeCheck}
                  width={30}
                  height={30}
                  alt="icon"
                  className="absolute -top-0 -right-3.5"
                />
              )}
              <Image
                // @ts-ignore
                src={TMDB_API_IMG + movie.poster_path}
                // @ts-ignore
                alt={movie.title}
                width={192}
                height={252}
                className="rounded-2xl"
              />
              <div className={cn(
                `absolute inset-0 w-48 h-full flex flex-col justify-end p-2 rounded-2xl`,
                // @ts-ignore
                (selectedMovies.length > 0 && !selectedMovies.includes(movie.id)) ? "bg-neutral-800/75" : "card_main"
              )}>
                <p className="text-white font-normal text-sm absolute bottom-4 right-0 left-0 hover:cursor-default">
                  {/* @ts-ignore */}
                  {movie.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MovieCards;
