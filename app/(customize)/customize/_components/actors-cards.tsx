"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import * as Icons from "@/public/assets/icons/Icons";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const moviesPerPage = 8;
const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface ActorCardsProps {
  list: never[];
  selectedActors: never[];
  setSelectedActors: Dispatch<SetStateAction<never[]>>
}

const ActorCards = ({ list, selectedActors, setSelectedActors }: ActorCardsProps) => {
  const handleActorClick = (actorId: never) => {
    if (selectedActors.includes(actorId) && selectedActors.length <= 3) {
      setSelectedActors(selectedActors.filter((id) => id !== actorId));
    } else if ((selectedActors.length < 3) && !selectedActors.includes(actorId)) {
      setSelectedActors([...selectedActors, actorId]);
    }
  };

  return (
    <ScrollArea>
      <div className="grid grid-cols-2 lg:grid-cols-4 max-w-[435px] md:max-w-[870px] h-[600px] md:h-[400px]">
        {list?.map((actor) => (
          <div
              // @ts-ignore
            key={actor.id}
            className="flex justify-center px-2 py-2 relative items-center"
          >
            <div
              // @ts-ignore
              className={`relative rounded-2xl border-[3px] ${selectedActors.includes(actor.id)
                ? "border-orange-500"
                : "border-transparent"
                }`}
                // @ts-ignore
              onClick={() => handleActorClick(actor.id)}
            >
                {/* @ts-ignore */}
              {selectedActors.includes(actor.id) && (
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
                src={TMDB_API_IMG + actor.profile_path}
                // @ts-ignore
                alt={actor.original_name}
                width={192}
                height={252}
                className="rounded-2xl"
              />
              <div className={cn(
                `absolute inset-0 w-48 h-full flex flex-col justify-end p-2 rounded-2xl`,
                // @ts-ignore
                (selectedActors.length > 0 && !selectedActors.includes(actor.id)) ? "bg-neutral-800/75" : "card_main"
              )}>
                <p className="text-white font-normal text-sm absolute bottom-4 right-0 left-0 hover:cursor-default">
                {/* @ts-ignore */}
                  {actor.original_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ActorCards;
