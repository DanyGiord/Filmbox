'use client'

import DiscoverContext from "../../_context/context";
import { useContext } from "react";

import Pagination from "./main-components/pagination";
import DiscoverCards from "./main-components/discover-cards";

const DiscoverMain = () => {
    // @ts-ignore
    const { searchFor } = useContext(DiscoverContext);

    return (
        <div className="mt-7">
            <h2 className="text-white_text text-2xl mb-5 font-bold">{searchFor === "movie" ? "Movies" : "Series"}</h2>
            <DiscoverCards />
            <Pagination />
        </div>
    );
}

export default DiscoverMain;