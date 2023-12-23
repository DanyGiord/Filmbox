import { fetchMovie } from "@/tmdb-api/api";
import Movie from "./_components/movie";

const MoviePage = async ({ params }: { params: { movieId: string } }) => {
    const movie = await fetchMovie(Number(params.movieId));

    return (
        <div>
            <Movie movie={movie} />
        </div>
    );
}

export default MoviePage;