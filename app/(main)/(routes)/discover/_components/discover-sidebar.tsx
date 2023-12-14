"use client";

import { useContext, useEffect, useState } from "react";
import DiscoverContext from "../_context/discover-context";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { fetchGenres } from "@/tmdb-api/api";
import Languages from "./sidebar-components/languages";
import Rating from "./sidebar-components/rating";
import ReleaseYear from "./sidebar-components/release-year";
import Sort from "./sidebar-components/sort";

const DiscoverSidebar = () => {
  // @ts-ignore
  const {
    rating,
    setRating,
    selectedGenres,
    setSelectedGenres,
    searchFor,
    currentLanguage,
    setCurrentLanguage,
    currentYear,
    setCurrentYear,
    selectedSort,
    setSelectedSort,
  } = useContext(DiscoverContext);

  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      await fetchGenres(searchFor).then((res) => setGenres(res.genres));
    };
    getGenres();
    setSelectedGenres([]);
  }, [searchFor]);

  const handleSelectedGenres = (e: any) => {
    const { value, checked } = e.target;

    if (checked) {
      // @ts-ignore
      setSelectedGenres((prev) => [...prev, value]);
    } else {
      // @ts-ignore
      setSelectedGenres((prev) => prev.filter((e) => e !== value));
    }
  };

  return (
    <div className="w-full rounded-3xl bg-input_bg px-6 py-3 sticky top-5 max-h-screen overflow-y-scroll custom-scrollbar">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="border-b-[3px] border-b-[#242424]"
        >
          <AccordionTrigger className="text-white_text">
            Genres
          </AccordionTrigger>
          <AccordionContent>
            {genres.map((genre) => (
              <div
                className="flex first-line:mb-1.5 items-center space-x-2 custom-checkbox"
                key={genre.id}
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(String(genre.id))}
                  onChange={handleSelectedGenres}
                  value={genre.id}
                  name={genre.name}
                  id={genre.name}
                  className=" ring-gray peer genre"
                />
                <Label
                  htmlFor={genre.name}
                  className="checkbox-label peer-checked:text-white_text transition-all text-base font-normal leading-none"
                >
                  {genre.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border-b-[3px] border-b-[#242424]"
        >
          <AccordionTrigger className="text-white_text">
            Sort By
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup className="text-gray" onValueChange={setSelectedSort}>
              {/* @ts-ignore */}
              <Sort selectedSort={selectedSort} />
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border-b-[3px] border-b-[#242424]"
        >
          <AccordionTrigger className="text-white_text">
            Rating
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2">
            {/* @ts-ignore */}
            <Rating rating={rating} setRating={setRating} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-4"
          className="border-b-[3px] border-b-[#242424]"
        >
          <AccordionTrigger className="text-white_text">
            Languages
          </AccordionTrigger>
          <AccordionContent>
            {/* @ts-ignore */}
            <Languages
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-5"
          className="border-b-[0px] border-b-[#242424]"
        >
          <AccordionTrigger className="text-white_text">
            Release year
          </AccordionTrigger>
          <AccordionContent>
            {/* @ts-ignore */}
            <ReleaseYear
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DiscoverSidebar;
