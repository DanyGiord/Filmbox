'use client'

import { fetchSingleActors, fetchSingleImages, fetchSingleSimilar } from "@/tmdb-api/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cast from "./cast";
import MoreDetails from "./more-details";
import ImagesVideos from "./images-videos";
import Details from "./details";
import SimilarMovies from "./similar-movies";
import VideoPlayer from "./video-player";
import Participants from "./participants";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;
const TMDB_API_BG_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_1280;

const Movie = (movie: any) => {

    const [movieImages, setMovieImages] = useState<any[]>([]);
    const [actors, setActors] = useState<any[]>([]);
    const [similarMovies, setSimilarMovies] = useState<any[]>([]);

    const [director, setDirector] = useState<string>("");
    const [producers, setProducers] = useState<any[]>([]);
    const [screenplayer, setScreenplayer] = useState<string>("");
    const [writer, setWriter] = useState<string>("");


    useEffect(() => {
        const getMovieImages = async () => {
            await fetchSingleImages(movie.movie.id, "movie")
                .then((res: any) => {
                    setMovieImages(res.backdrops.slice(0, 20));
                })
        }
        getMovieImages();

        const getActors = async () => {
            await fetchSingleActors(movie.movie.id, "movie")
                .then((res: any) => {
                    console.log(res)
                    setActors(res.cast.slice(0, 3))
                    setDirector(res.crew.find((single: any) => single.known_for_department === "Directing").name)
                    setProducers(res.crew.filter((single: any) => single.known_for_department === "Production").map((single: any) => single.name).slice(0, 4))
                    setScreenplayer(res.crew.find((single: any) => single.known_for_department === "Visual Effects").name)
                    setWriter(res.crew.find((single: any) => single.known_for_department === "Writing").name)
                })
        }
        getActors();

        const getSimilar = async () => {
            await fetchSingleSimilar(movie.movie.id, "movie")
                .then((res: any) => {
                    setSimilarMovies(res.results.slice(0,                       0));
                })
        }
        getSimilar();
    }, []);

    useEffect(() => {
        console.log(producers)
    }, [producers])


    return (
        <div>
            <div className="rounded-b-[31px] relative h-80 w-full scroll-smooth">
                <Image
                    src={TMDB_API_BG_IMG + movie.movie.backdrop_path}
                    alt="backdrop"
                    className="w-full h-80 rounded-b-[31px] object-cover object-top opacity-60"
                    width={1400}
                    height={368}
                />
                <div className="absolute inset-0 backdrop-bg rounded-b-[31px]" />
            </div>
            <div className="-translate-y-64 mx-16 mt-4">
                <div className="flex gap-x-8 items-end">
                    <div className="flex gap-x-8">
                        <div className="flex flex-col gap-y-6 ">
                            <Details movie={movie} />
                            <div className="flex gap-x-4">
                                <Cast actors={actors} />
                                <MoreDetails movie={movie} director={director} producers={producers} screenplayer={screenplayer} writer={writer} />
                            </div>
                        </div>
                    </div>
                    <ImagesVideos movieImages={movieImages} />
                </div>
                <div id="watch" className="flex gap-x-4 py-4">
                    <SimilarMovies similarMovies={similarMovies} />
                    <VideoPlayer movie={movie} />
                    <Participants />
                </div>
            </div>
        </div>
    );
}

export default Movie;