import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Star, StarHalf } from "lucide-react";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface SearchNewCardProps {
  route: string;
  searchFor: string;
  poster_path: string;
  title: string;
  vote_average: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
  genres: number[];
}

const SearchNewCard = ({ route, skeleton, searchFor, poster_path, title, vote_average, release_date, overview, genre_ids, genres }: SearchNewCardProps) => {
    return (
        <>
            {skeleton ? (
                <div className="w-96 h-60 p-4 flex gap-x-3 bg-input_bg rounded-3xl">
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
                    <div className={cn("group bg-input_bg hover:bg-black_third transition-all rounded-3xl w-[373px] h-60 p-4 flex gap-x-3",
                        route === 'search' && 'bg-black_second relative rounded-xl w-full my-2'
                    )}
                    >
                        {/* @ts-ignore */}
                        <img src={TMDB_API_IMG + poster_path} alt="" className="w-36 h-full rounded-xl object-cover" />
                        <div className="flex flex-col justify-between">
                            {/* @ts-ignore */}
                            <h3 className="text-xl text-white_text font-semibold">{title?.substring(0, 14)}{title?.length > 14 && "..."}</h3>
                            <div className="flex gap-x-2 items-center">
                                {/* @ts-ignore */}
                                {parseFloat(vote_average?.toFixed(1)) >= 2.0 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : (
                                    <div className={cn(
                                        "relative",
                                        // @ts-ignore

                                    )}>
                                        <Star className="w-4 h-4 text-[#ffa800]" /> {/* Pozadinska zvezda */}
                                        {/* @ts-ignore */}
                                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(vote_average / 2) * 100}%` }}>
                                            <Star className="w-4 h-4 fill-[#ffa800] text-transparent" /> {/* Popunjena zvezda */}
                                        </div>
                                    </div>
                                )}
                                {/* @ts-ignore */}
                                {parseFloat(vote_average?.toFixed(1)) >= 4.0 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : (
                                    <div className={cn(
                                        "relative",
                                        // @ts-ignore

                                    )}>
                                        <Star className="w-4 h-4 text-[#ffa800]" /> {/* Pozadinska zvezda */}
                                        {/* @ts-ignore */}
                                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${((vote_average - 2) / 2) * 100}%` }}>
                                            <Star className="w-4 h-4 fill-[#ffa800] text-transparent" /> {/* Popunjena zvezda */}
                                        </div>
                                    </div>
                                )}
                                {/* @ts-ignore */}
                                {parseFloat(vote_average?.toFixed(1)) >= 6.0 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : (
                                    <div className={cn(
                                        "relative",
                                        // @ts-ignore
                                    )}>
                                        <Star className="w-4 h-4 text-[#ffa800]" /> {/* Pozadinska zvezda */}
                                        {/* @ts-ignore */}
                                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${((vote_average - 4) / 2) * 100}%` }}>
                                            <Star className="w-4 h-4 fill-[#ffa800] text-transparent" /> {/* Popunjena zvezda */}
                                        </div>
                                    </div>
                                )}
                                {/* @ts-ignore */}
                                {parseFloat(vote_average?.toFixed(1)) >= 8.0 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : (
                                    <div className={cn(
                                        "relative",
                                        // @ts-ignore
                                    )}>
                                        <Star className="w-4 h-4 text-[#ffa800]" /> {/* Pozadinska zvezda */}
                                        {/* @ts-ignore */}
                                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${vote_average >= 6 && (((vote_average - 6) / 2) * 100)}%` }}>
                                            <Star className="w-4 h-4 fill-[#ffa800] text-transparent" /> {/* Popunjena zvezda */}
                                        </div>
                                    </div>
                                )}
                                {/* @ts-ignore */}
                                {parseFloat(vote_average?.toFixed(1)) >= 10.0 ? <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" /> : (
                                    <div className={cn(
                                        "relative",
                                        // @ts-ignore

                                    )}>
                                        <Star className="w-4 h-4 text-[#ffa800]" /> {/* Pozadinska zvezda */}
                                        {/* @ts-ignore */}
                                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${((vote_average - 8) / 2) * 100}%` }}>
                                            <Star className="w-4 h-4 fill-[#ffa800] text-transparent" /> {/* Popunjena zvezda */}
                                        </div>
                                    </div>
                                )}
                                {/* @ts-ignore */}
                                <span className="text-white_text text-base">{vote_average?.toFixed(1)}</span>
                            </div>
                            {/* @ts-ignore */}
                            <span className="text-gray text-sm ">{release_date?.substring(0, 4)}, {genres.find(genre => genre.id === genre_ids[0])?.name}</span>
                            <div className="text-gray text-sm pb-3">
                                {/* @ts-ignore */}
                                {overview?.substring(0, 60) + '...'}
                            </div>
                            <div className="flex flex-row gap-x-1.5">
                                <Button variant="skew" className="w-9/12 my-0">
                                    <span className="skew-x-[15deg]">Watch Now</span>
                                </Button>
                                <ActionTooltip side="top" align="center" label="Create session">
                                    <Button variant="skew_gray" className="w-3/12 mt-0 grid place-items-center bg-black_third group-hover:bg-black_second">
                                        <Plus className="w-3 h-3 text-white_text skew-x-[15deg]" />
                                    </Button>
                                </ActionTooltip>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
const SearchNewCard = ({
  route,
  searchFor,
  poster_path,
  title,
  vote_average,
  release_date,
  overview,
  genre_ids,
  genres,
}: SearchNewCardProps) => {
  return (
    <>
      <div>
        <div
          className={cn(
            "group bg-input_bg hover:bg-black_third transition-all rounded-3xl w-[373px] h-60 p-4 flex gap-x-3",
            route === "search" &&
              "bg-black_second relative rounded-xl w-full my-2"
          )}
        >
          {/* @ts-ignore */}
          <img
            src={TMDB_API_IMG + poster_path}
            alt=""
            className="w-36 h-full rounded-xl object-cover"
          />
          <div className="flex flex-col justify-between">
            {/* @ts-ignore */}
            <h3 className="text-xl text-white_text font-semibold">
              {title?.substring(0, 14)}
              {title?.length > 14 && "..."}
            </h3>
            <div className="flex gap-x-2 items-center">
              {/* @ts-ignore */}
              {vote_average?.toFixed(1) < 1 ? (
                ""
              ) : vote_average?.toFixed(1) > 2 ? (
                <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              ) : (
                <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              )}
              {/* @ts-ignore */}
              {vote_average?.toFixed(1) < 3 ? (
                ""
              ) : vote_average?.toFixed(1) > 4 ? (
                <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              ) : (
                <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              )}
              {/* @ts-ignore */}
              {vote_average?.toFixed(1) < 5 ? (
                ""
              ) : vote_average?.toFixed(1) > 6 ? (
                <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              ) : (
                <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              )}
              {/* @ts-ignore */}
              {vote_average?.toFixed(1) < 7 ? (
                ""
              ) : vote_average?.toFixed(1) > 8 ? (
                <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              ) : (
                <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              )}
              {/* @ts-ignore */}
              {vote_average?.toFixed(1) < 9 ? (
                ""
              ) : vote_average?.toFixed(1) > 10 ? (
                <Star className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              ) : (
                <StarHalf className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]" />
              )}
              {/* @ts-ignore */}
              <span className="text-white_text text-base">
                {vote_average?.toFixed(1)}
              </span>
            </div>
            {/* @ts-ignore */}
            <span className="text-gray text-sm ">
              {release_date?.substring(0, 4)},{" "}
              {genres.find((genre) => genre.id === genre_ids[0])?.name}
            </span>
            <div className="text-gray text-sm pb-3">
              {/* @ts-ignore */}
              {overview?.substring(0, 60) + "..."}
            </div>
            <div className="flex flex-row gap-x-1.5">
              <Button variant="skew" className="w-9/12 my-0">
                <span className="skew-x-[15deg]">Watch Now</span>
              </Button>
              <ActionTooltip side="top" align="center" label="Create session">
                <Button
                  variant="skew_gray"
                  className="w-3/12 mt-0 grid place-items-center bg-black_third group-hover:bg-black_second"
                >
                  <Plus className="w-3 h-3 text-white_text skew-x-[15deg]" />
                </Button>
              </ActionTooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchNewCard;
