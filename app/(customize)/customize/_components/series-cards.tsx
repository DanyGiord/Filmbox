"use client";
import { searchSeries } from "@/tmdb-api/api";
import * as Icons from "@/public/assets/icons/Icons";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const moviesPerPage = 8;
const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface SeriesCardsProps {
  list: never[];
  selectedSeries: never[];
  setSelectedSeries: Dispatch<SetStateAction<never[]>>
}

const SeriesCards = ({ list, selectedSeries, setSelectedSeries }: SeriesCardsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleSerieClick = (serieId: never) => {
    if (selectedSeries.includes(serieId) && selectedSeries.length <= 3) {
      setSelectedSeries(selectedSeries.filter((id) => id !== serieId));
    } else if ((selectedSeries.length < 3 || selectedSeries.length < 3) && !selectedSeries.includes(serieId)) {
      setSelectedSeries([...selectedSeries, serieId]);
    }
  };


  return (
    <ScrollArea>

      <div className="grid grid-cols-2 lg:grid-cols-4 max-w-[435px] md:max-w-[870px] h-[600px] md:h-[400px]">
        {list?.map((serie) => (
          <div
            // @ts-ignore
            key={serie.id}
            className="flex justify-center px-2 py-2 relative items-center"
          >
            <div
              // @ts-ignore
              className={`relative rounded-2xl border-[3px] ${selectedSeries.includes(serie.id)
                ? "border-orange-500"
                : "border-transparent"
                }`}
              // @ts-ignore
              onClick={() => handleSerieClick(serie.id)}
            >
              {/* @ts-ignore */}
              {selectedSeries.includes(serie.id) && (
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
                src={TMDB_API_IMG + serie.poster_path}
              // @ts-ignore
                alt={serie.original_name}
                width={192}
                height={252}
                className="rounded-2xl"
              />
              <div className={cn(
                `absolute inset-0 w-48 h-full flex flex-col justify-end p-2 rounded-2xl`,
                // @ts-ignore
                (selectedSeries.length > 0 && !selectedSeries.includes(serie.id)) ? "bg-neutral-800/75" : "card_main"
              )}>
                <p className="text-white font-normal text-sm absolute bottom-4 right-0 left-0 hover:cursor-default">
                  {/* @ts-ignore */}
                  {serie.original_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SeriesCards;
