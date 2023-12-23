'use client'

import DiscoverContext from "../../../_context/context";
import { useContext } from "react";

const Rating = () => {
     // @ts-ignore
     const { rating, setRating } = useContext(DiscoverContext);

    return (
        <>
            <div className="flex justify-between w-full text-gray">
                <label htmlFor="rating">IMDB</label>
                <span>{Number(rating) > 9 ? 9 : Math.round(parseFloat(rating))}+</span>
            </div>
            <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="rating"
                style={{
                    background: `linear-gradient(to right, #F3001D 0%, #F3001D ${(Number(rating) - 0) * 10}%, #565656 ${(Number(rating) - 0) * 10}%, #565656 100%)`
                }}
            />
        </>
    );
}

export default Rating;