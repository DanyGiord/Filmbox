import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

import * as Icons from "@/public/assets/icons/Icons";
import { cn } from "@/lib/utils";


interface SearchProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    setMouseOver: Dispatch<SetStateAction<boolean>>;
    showSearch: boolean | undefined;
    setShowSearch: Dispatch<SetStateAction<boolean | undefined>>;
    setSkeleton: Dispatch<SetStateAction<boolean>>;
}

const Search = ({ query, setQuery, setMouseOver, showSearch, setShowSearch, setSkeleton }: SearchProps) => {
    return (
        <Input
            onChange={(e) => setQuery(e.target.value)}
            onMouseOver={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            placeholder="Search"
            iconSrc={Icons.Search}
            value={query}
            className={cn(
                "h-12",
                showSearch && query.length > 0 && "rounded-b-none"
            )}
            onFocus={() => {
                setShowSearch(true);
                setSkeleton(true)
            }}
            onBlur={() => setShowSearch(false)}
        />
    );
}

export default Search;