import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import Image from "next/image";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface DetailsProps {
    movie: any
}

const Details = ({ movie }: DetailsProps) => {
    return (
        <div className="flex gap-x-4">
            <Image
                src={TMDB_API_IMG + movie.movie.poster_path}
                alt="poster"
                width={323}
                height={463}
                className="rounded-[28px]"
            />
            <div className="flex flex-col py-1 justify-between w-full">
                <div className="flex flex-col gap-y-2">
                    <span className="text-lg text-white_text">{movie.movie.release_date.substring(0, 4)}</span>
                    <h1 className="text-[36px] font-bold text-white_text whitespace-nowrap">{movie.movie.title}</h1>
                    <span className="text-lg text-white_text">
                        {movie.movie.genres.map((genre: any, i: any) => (
                            <span key={genre.id}>
                                {genre.name}{movie.movie.genres.length - 1 === i ? "" : ", "}
                            </span>
                        ))}
                    </span>
                </div>
                <div className="flex flex-col gap-y-2">
                    <span className="text-lg text-white_text">IMDB</span>
                    <div className="flex gap-x-1.5">
                        <Star className="w-5 h-5 fill-[#ffa800] text-[#ffa800]" />
                        <Star className="w-5 h-5 fill-[#ffa800] text-[#ffa800]" />
                        <Star className="w-5 h-5 fill-[#ffa800] text-[#ffa800]" />
                        <Star className="w-5 h-5 fill-[#ffa800] text-[#ffa800]" />
                        <Star className="w-5 h-5 fill-[#ffa800] text-[#ffa800]" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <span className="text-lg text-white_text">Storyline</span>
                    <p className="text-base text-gray whitespace">
                        {movie.movie.overview}
                    </p>
                </div>
                <div className="flex gap-x-2">
                    <a href="#watch">
                        <Button variant="skew" className="mx-0 mymt-0">
                            Watch now
                        </Button>
                    </a>
                    <Button variant="plus" className="mx-0 mymt-0">
                        <Plus className="w-5 h-5 text-white_text" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Details;