import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";

import * as Icons from "@/public/assets/icons/Icons";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
interface SearchProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    setMouseOver: Dispatch<SetStateAction<boolean>>;
    showSearch: boolean | undefined;
    setShowSearch: Dispatch<SetStateAction<boolean | undefined>>;
}
const Search = ({ query, setQuery, setMouseOver, showSearch, setShowSearch }: SearchProps) => {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    })

    return (
        <motion.div
            variants={{
                visible: { y: 0 },
                hidden: { y: "-200%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
        >
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
                onBlur={() => setShowSearch(false)}
               
            />
        </motion.div>
    );
}

export default Search;