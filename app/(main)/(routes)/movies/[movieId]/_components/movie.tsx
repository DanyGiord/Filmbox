'use client'

import { Button } from "@/components/ui/button";
import { fetchSingleActors, fetchSingleImages, fetchSingleSimilar } from "@/tmdb-api/api";
import { Plus, Star } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import DiscoverContext from "../../../_context/context";
import Card from "@/components/ui/card";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;
const TMDB_API_BG_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_1280;

const Movie = (movie: any) => {
    // @ts-ignore
    const { favMovieIds, setFavMovieIds } = useContext(DiscoverContext);
    const [fullTitle, setFullTitle] = useState<number | null>(null);

    const [movieImages, setMovieImages] = useState<any[]>([]);
    const [moviePosters, setMoviePosters] = useState<any[]>([]);
    const [actors, setActors] = useState<any[]>([]);
    const [similarMovies, setSimilarMovies] = useState<any[]>([]);


    useEffect(() => {
        const getMovieImages = async () => {
            await fetchSingleImages(movie.movie.id, "movie")
                .then((res: any) => {
                    setMovieImages(res.backdrops.slice(0, 20));
                    setMoviePosters(res.posters);

                })
        }
        getMovieImages();
        const getActors = async () => {
            await fetchSingleActors(movie.movie.id, "movie")
                .then((res: any) => {
                    setActors(res.cast.slice(0, 3))
                })
        }
        getActors();

        const getSimilar = async () => {
            await fetchSingleSimilar(movie.movie.id, "movie")
                .then((res: any) => {
                    setSimilarMovies(res.results.slice(0, 10));
                })
        }
        getSimilar();
    }, [])

    useEffect(() => {
        console.log(similarMovies)
    }, [similarMovies])

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
                            <div className="flex gap-x-4">
                                <Image
                                    src={TMDB_API_IMG + movie.movie.poster_path}
                                    alt="poster"
                                    width={323}
                                    height={463}
                                    className="rounded-[28px]"
                                />
                                <div className="flex flex-col justify-between w-full">
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
                            <div className="flex gap-x-4">

                                <div className="min-w-[323px] px-7 py-5 flex flex-col gap-y-4 rounded-[28px] bg-input_bg">
                                    <h2 className="text-lg text-white_text">Top cast</h2>
                                    <div className="flex flex-col gap-y-4">
                                        {actors.map((actor: any) => (
                                            <div className="flex gap-x-4 items-center">
                                                <Image
                                                    src={`${TMDB_API_IMG}${actor.profile_path}`}
                                                    alt="actor"
                                                    width={56}
                                                    height={56}
                                                    className="rounded-full w-14 h-14 object-cover"
                                                />
                                                <div className="flex flex-col gap-y-2 py-1">
                                                    <span className="text-base text-gray">{actor.name}</span>
                                                    <span className="text-base text-white_text">{actor.character}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between py-0.5 w-full">
                                    <h2 className="text-base text-white_text text-start">More details</h2>
                                    <div className="flex justify-between">
                                        <span className="text-white_text text-base">Based on:</span>
                                        <span className="text-gray text-base">N/A</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white_text text-base">Directed by:</span>
                                        <span className="text-gray text-base">N/A</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white_text text-base">Produced by:</span>
                                        <div className="text-gray text-base flex flex-col">
                                            <span>N/A</span>
                                            <span>N/A</span>
                                            <span>N/A</span>
                                            <span>N/A</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white_text text-base">Screenplay:</span>
                                        <span className="text-gray text-base">N/A</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white_text text-base">Writers:</span>
                                        <span className="text-gray text-base">N/A</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="space-y-7">
                        <div className="flex justify-around">
                            <span className="text-lg text-white_text">Photos</span>
                            <span className="text-lg text-gray">Videos</span>
                        </div>
                        <div className="w-[323px] h-[490px] mt-auto grid grid-cols-2 grid-rows-3 gap-3">
                            <div className="w-full col-span-2 rounded-2xl overflow-hidden">
                                <Image
                                    src={`${TMDB_API_IMG}${{ ...movieImages[5] }.file_path}`}
                                    alt="slika"
                                    width={368}
                                    height={176}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                            <div className="w-full col-span-1 rounded-2xl bg-slate-300 overflow-hidden">
                                <Image
                                    src={`${TMDB_API_IMG}${{ ...movieImages[8] }.file_path}`}
                                    alt="slika"
                                    width={152}
                                    height={152}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                            <div className="w-full row-span-2 rounded-2xl bg-slate-300 overflow-hidden">
                                <Image
                                    src={`${TMDB_API_IMG}${{ ...movieImages[7] }.file_path}`}
                                    alt="slika"
                                    width={152}
                                    height={336}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                            <div className="w-full col-span-1 rounded-2xl bg-slate-300 overflow-hidden">
                                <Image
                                    src={`${TMDB_API_IMG}${{ ...movieImages[3] }.file_path}`}
                                    alt="slika"
                                    width={152}
                                    height={152}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="watch" className="flex gap-x-4 py-4">
                    <div className="grid w-[190px] 3xl:w-[323px] grid-cols-1 3xl:grid-cols-2 gap-4">
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
                    <div className="flex justify-center mx-auto">
                        <div className="flex flex-col">
                            <div className="rounded-t-[28px] py-1.5 px-6 bg-input_bg">

                            </div>
                            <iframe
                                title="video"
                                id="ytplayer"
                                // @ts-ignore
                                type="text/html"
                                width="756"
                                height="405"
                                src={`https://moviesapi.club/movie/${movie.movie.id}`}
                                frameborder="0"
                                style={{ borderRadius: "0 0 28px 28px" }}
                                className="trailer rounded-b-none"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="w-[323px]"></div>
                </div>
            </div>
        </div>
    );
}

export default Movie;