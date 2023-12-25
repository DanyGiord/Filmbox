import Card from "@/components/ui/card";
import { useContext, useState } from "react";
import DiscoverContext from "../../../_context/context";

interface SimilarMoviesProps {
    similarMovies: any[]
}

const SimilarMovies = ({
    similarMovies
}: SimilarMoviesProps) => {
    // @ts-ignore
    const { favMovieIds, setFavMovieIds } = useContext(DiscoverContext);
    const [fullTitle, setFullTitle] = useState<number | null>(null);

    return (
        <div className="grid 3xl:w-[323px] grid-cols-2 gap-4">
            {similarMovies.map((movie: any, i: number) => (
                <Card
                    key={i}
                    id={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                    vote_average={movie.vote_average}
                    release_date={movie.release_date}
                    fullTitle={fullTitle}
                    setFullTitle={setFullTitle}
                    searchFor="movie"
                    favMovieIds={favMovieIds}
                    setFavMovieIds={setFavMovieIds}
                    className="w-[190px] 3xl:w-[152.5px] cardcard"
                />
            ))}
        </div>
    );
}

export default SimilarMovies;