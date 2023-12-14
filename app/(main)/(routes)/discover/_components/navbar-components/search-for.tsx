import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface SearchForProps {
    searchFor: string;
    setSearchFor: Dispatch<SetStateAction<string>>
}

const SearchFor = ({ setSearchFor, searchFor }: SearchForProps) => {
    return (
        <Select onValueChange={setSearchFor}>
            <SelectTrigger className="w-[120px] h-12 rounded-full bg-gradient-to-tr from-red to-[#FF004D] text-white_text justify-center gap-x-2 text-base border-none">
                <SelectValue defaultValue={searchFor} placeholder="Movies" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl bg-input_bg text-white_text p-2 border-none -translate-x-2">
                <SelectGroup>
                    <SelectItem value="movie" className="rounded-lg">Movies</SelectItem>
                    <SelectItem value="tv" className="rounded-lg">Series</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SearchFor;