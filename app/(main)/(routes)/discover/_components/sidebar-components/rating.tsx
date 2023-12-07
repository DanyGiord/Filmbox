import { Dispatch, SetStateAction } from "react";

interface RatingProps {
    rating: string;
    setRating: Dispatch<SetStateAction<string>>;
}

const Rating = ({ rating, setRating }: RatingProps) => {
    return (
        <>
            <div className="flex justify-between w-full text-gray">
                <label htmlFor="rating">IMDB</label>
                <span>{Math.round(parseFloat(rating))}{Math.round(parseFloat(rating)) === 10 ? "" : " - " + String(Math.round(parseFloat(rating)) + 1)}</span>
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
                    // @ts-ignore
                    background: `linear-gradient(to right, #F3001D 0%, #F3001D ${(rating - 0) * 10}%, #565656 ${(rating - 0) * 10}%, #565656 100%)`
                }}
            />
        </>
    );
}

export default Rating;