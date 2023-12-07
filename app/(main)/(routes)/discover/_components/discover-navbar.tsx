'use client'

import { Dispatch, SetStateAction } from "react";
import * as Icons from "@/public/assets/icons/Icons";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DiscoverNavbarProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    searchFor: string;
    setSearchFor: Dispatch<SetStateAction<string>>;
}

const DiscoverNavbar = ({ query, setQuery, searchFor, setSearchFor }: DiscoverNavbarProps) => {
    return (
        <div className="mb-7 flex justify-between">
            <div className="w-[440px]">
                <Input
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    iconSrc={Icons.Search}
                    value={query}
                    className="h-12"
                />
            </div>
            <Select onValueChange={setSearchFor}>
                <SelectTrigger className="w-[120px] h-12 rounded-full bg-gradient-to-tr from-red to-[#FF004D] text-white_text justify-center gap-x-2 text-base border-none">
                    <SelectValue defaultValue={searchFor} placeholder="Movies" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl bg-input_bg text-white_text p-2 border-none -translate-x-1">
                    <SelectGroup>
                        <SelectItem value="movie" className="rounded-lg">Movies</SelectItem>
                        <SelectItem value="tv" className="rounded-lg">Series</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default DiscoverNavbar;