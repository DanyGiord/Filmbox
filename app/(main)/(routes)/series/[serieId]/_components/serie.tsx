'use client'

import { Button } from "@/components/ui/button";
import { fetchSingleActors, fetchSingleImages } from "@/tmdb-api/api";
import { Plus, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;
const TMDB_API_BG_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_1280;

const Serie = (serie: any) => {
    const [serieImages, setSerieImages] = useState<any[]>([]);
    const [seriePosters, setSeriePosters] = useState<any[]>([]);
    const [actors, setActors] = useState<any[]>([])

    useEffect(() => {
        const getSerieImages = async () => {
            await fetchSingleImages(serie.serie.id, "tv")
                .then((res: any) => {
                    setSerieImages(res.backdrops.slice(0, 20));
                    setSeriePosters(res.posters);

                })
        }
        getSerieImages();
        const getActors = async () => {
            await fetchSingleActors(serie.serie.id, "tv")
                .then((res: any) => {
                    setActors(res.cast.slice(0, 3))
                })
        }
        getActors();
    }, [])

    return (
        <div>
            <div className="rounded-b-[31px] relative h-80 w-full">
                <Image
                    src={TMDB_API_BG_IMG + serie.serie.backdrop_path}
                    alt="backdrop"
                    className="w-full h-80 rounded-b-[31px] object-cover object-top opacity-60"
                    width={1400}
                    height={368}
                />
                <div className="absolute inset-0 backdrop-bg rounded-b-[31px]" />
            </div>
            <div className="flex gap-x-8 mx-16 mt-4">
                <div className="flex gap-x-8 -translate-y-56">
                    <div className="flex flex-col gap-y-6 ">
                        <div className="flex gap-x-4">
                            <Image
                                src={TMDB_API_IMG + serie.serie.poster_path}
                                alt="poster"
                                width={323}
                                height={463}
                                className="rounded-[28px]"
                            />
                            <div className="flex flex-col justify-between w-[580px]">
                                <div className="flex flex-col gap-y-2">
                                    <span className="text-lg text-white_text">{serie.serie.first_air_date.substring(0, 4)}</span>
                                    <h1 className="text-[36px] font-bold text-white_text">{serie.serie.name}</h1>
                                    <span className="text-lg text-white_text">
                                        {serie.serie.genres.map((genre: any, i: any) => (
                                            <span key={genre.id}>
                                                {genre.name}{serie.serie.genres.length - 1 === i ? "" : ", "}
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
                                        {serie.serie.overview}
                                    </p>
                                </div>
                                <div className="flex gap-x-2">
                                    <Button variant="skew" className="mx-0 mymt-0">
                                        Watch now
                                    </Button>
                                    <Button variant="plus" className="mx-0 mymt-0">
                                        <Plus className="w-5 h-5 text-white_text" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[323px] px-7 py-5 flex flex-col gap-y-4 rounded-[28px] bg-input_bg">
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
                    </div>

                </div>
                <div className="w-80 h-[490px] grid grid-cols-2 grid-rows-3 gap-3">
                    <div className="w-full h-[152px] col-span-2 rounded-2xl overflow-hidden">
                        <Image
                            src={`${TMDB_API_IMG}${{ ...serieImages[5] }.file_path}`}
                            alt="slika"
                            width={368}
                            height={176}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <div className="w-full h-[152px] col-span-1 rounded-2xl bg-slate-300 overflow-hidden">
                        <Image
                            src={`${TMDB_API_IMG}${{ ...serieImages[8] }.file_path}`}
                            alt="slika"
                            width={152}
                            height={152}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <div className="w-full h-[326px] row-span-2 rounded-2xl bg-slate-300 overflow-hidden">
                        <Image
                            src={`${TMDB_API_IMG}${{ ...serieImages[7] }.file_path}`}
                            alt="slika"
                            width={152}
                            height={336}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <div className="w-full h-[152px] col-span-1 rounded-2xl bg-slate-300 overflow-hidden">
                        <Image
                            src={`${TMDB_API_IMG}${{ ...serieImages[3] }.file_path}`}
                            alt="slika"
                            width={152}
                            height={152}
                            className="object-cover h-full w-full"
                        />
                    </div>
                </div>
            </div>
            <div>
                <iframe
                    title="video"
                    id="ytplayer"
                    // @ts-ignore
                    type="text/html"
                    width="840"
                    height="450"
                    src={`https://moviesapi.club/tv/${serie.serie.id}`}
                    frameborder="0"
                    style={{ borderRadius: "12.5px" }}
                    className="trailer"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}

export default Serie;