'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Languages from "./sidebar-components/languages";
import Rating from "./sidebar-components/rating";
import { fetchGenres } from "@/tmdb-api/api";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface DiscoverSidebarProps {
    rating: string;
    setRating: Dispatch<SetStateAction<string>>;
    selectedGenres: string[];
    setSelectedGenres: Dispatch<SetStateAction<string[]>>;
    searchFor: string;
    setCurrentLanguage: Dispatch<SetStateAction<string>>;
}

const DiscoverSidebar = ({ rating, setRating, selectedGenres, setSelectedGenres, searchFor, setCurrentLanguage }: DiscoverSidebarProps) => {
    const [genres, setGenres] = useState<any[]>([]);

    useEffect(() => {
        const getGenres = async () => {
            await fetchGenres(searchFor)
                .then((res) => setGenres(res.genres))
        }
        getGenres();
        setSelectedGenres([]);
    }, [searchFor])

    const handleSelectedGenres = (e: any) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedGenres((prev) => [...prev, value]);
        } else {
            setSelectedGenres((prev) => prev.filter((e) => e !== value));
        }
    };

    const sortBy = [
        {
            value: 'popularity',
            id: "r1",
            label: "Popularity"
        },
        {
            value: 'revenue',
            id: "r2",
            label: "Revenue"
        },
        {
            value: 'primary_release_date',
            id: "r3",
            label: "Release date"
        },
        {
            value: 'vote_average',
            id: "r4",
            label: "Vote average"
        },
        {
            value: 'vote_count',
            id: "r5",
            label: "Vote count"
        },
    ]

    const [selectedSort, setSelectedSort] = useState("")

    useEffect(() => {
        console.log(selectedSort)
    }, [selectedSort])

    return (
        <div className="w-full rounded-3xl bg-input_bg px-6 max-h-screen">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-[3px] border-b-[#242424]">
                    <AccordionTrigger className="text-white_text">Genres</AccordionTrigger>
                    <AccordionContent>
                        {genres.map(genre => (
                            <div className="flex first-line:mb-1.5 items-center space-x-2 custom-checkbox" key={genre.id}>
                                <input type="checkbox" checked={selectedGenres.includes(String(genre.id))} onChange={handleSelectedGenres} value={genre.id} name={genre.name} id={genre.name} className=" ring-gray peer genre" />
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
                <AccordionItem value="item-2" className="border-b-[3px] border-b-[#242424]">
                    <AccordionTrigger className="text-white_text">Sort By</AccordionTrigger>
                    <AccordionContent>
                        <RadioGroup className="text-gray" onValueChange={setSelectedSort}>
                            {sortBy.map(sort => (
                                <div className="flex items-center space-x-2">
                                    {/* <RadioGroupItem value={sort.value} id={sort.id} className="sort-radio border-2 border-gray text-red checked:border-red peer" />
                                    <Label htmlFor={sort.id} className="sort-label">{sort.label}</Label> */}
                                    <input
                                        type="radio"
                                        value={sort.value}
                                        id={sort.id}
                                        name="radio"
                                        className="hidden peer" // Skriva radio button ali ga čini dostupnim za peer klasu
                                    />
                                    <label
                                        htmlFor={sort.id}
                                        className="w-4 h-4 rounded-full border-2 border-gray-400 bg-white peer-checked:bg-red-500 peer-checked:border-red-500 after:content-[''] after:block after:w-2 after:h-2 after:bg-red-600 after:rounded-full after:peer-checked:bg-white"
                                    ></label>
                                    <label htmlFor={sort.id} className="text-gray-400 peer-checked:text-white">{sort.label}</label>
                                </div>
                            ))}
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b-[3px] border-b-[#242424]">
                    <AccordionTrigger className="text-white_text">Rating</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-y-2">
                        <Rating rating={rating} setRating={setRating} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b-[0px] border-b-[#242424]">
                    <AccordionTrigger className="text-white_text">Languages</AccordionTrigger>
                    <AccordionContent>
                        <Languages setCurrentLanguage={setCurrentLanguage} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default DiscoverSidebar;