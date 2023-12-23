import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Heart, Plus, Star } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import { ActionTooltip } from "../action-tooltip";
import CreateSessionModal from "../modals/create-session-modal";
import { Badge } from "./badge";
import { Button } from "./button";
import { redirect, useRouter } from "next/navigation";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface CardProps {
    key?: number;
    id: number;
    poster_path: string;
    title: string;
    vote_average?: string;
    release_date?: string;
    fullTitle?: number | null
    setFullTitle?: Dispatch<SetStateAction<number | null>>
    searchFor: string;
    favMovieIds?: number[];
    setFavMovieIds?: Dispatch<SetStateAction<number[]>>
    favSerieIds?: number[];
    setFavSerieIds?: Dispatch<SetStateAction<number[]>>
    favActorIds?: number[];
    setFavActorIds?: Dispatch<SetStateAction<number[]>>
    className?: string;
}

const Card = ({ id, poster_path, title, vote_average, release_date, fullTitle, setFullTitle, searchFor, favMovieIds, favSerieIds, setFavMovieIds, setFavSerieIds, setFavActorIds, favActorIds, className }: CardProps) => {
    const addFavMovie = useMutation(api.user.addFavMovie);
    const removeFavMovie = useMutation(api.user.removeFavMovie);
    const addFavSerie = useMutation(api.user.addFavSerie);
    const removeFavSerie = useMutation(api.user.removeFavSerie);
    const addFavActor = useMutation(api.user.addFavActor);
    const removeFavActor = useMutation(api.user.removeFavActor);

    const router = useRouter();

    const addRemoveFavMovie = (movieId: number, title: string) => {
        const convexUserId = localStorage.getItem("convexUserId");
        if (!favMovieIds?.includes(movieId)) {
            // @ts-ignore
            const promise = addFavMovie({ id: convexUserId, movieId })
                .then(() => {
                    toast.success(
                        <p>
                            <b className="font-black">{title}</b> <br />{" "}
                            <span className="text-[#61D345]">added</span> to Favorite Movies
                        </p>,
                        {
                            style: {
                                background: "#1a1a1a",
                                color: "#fcfcfc",
                                textAlign: "center",
                            },
                            position: "bottom-center",
                            duration: 4000,
                        }
                    );
                })
                .catch((error) => {
                    console.error(error);
                    toast.error(
                        <p>
                            An error occured while{" "}
                            <span className="text-[#61D345]">adding</span> <br />{" "}
                            <b className="font-black">{title}</b> <br /> to Favorite Movies
                        </p>,
                        {
                            style: {
                                background: "#1a1a1a",
                                color: "#fcfcfc",
                                textAlign: "center",
                            },
                            position: "bottom-center",
                            duration: 4000,
                        }
                    );
                });

            // @ts-ignore
            setFavMovieIds((prev) => [...prev, movieId]);
        } else {
            // @ts-ignore
            const promise = removeFavMovie({ id: convexUserId, movieId })
                .then(() => {
                    toast.success((
                        <p><b className="font-black">{title}</b> <br /> <span className="text-[#FF4B4B]">deleted</span> from Favorite Movies</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast.error((
                        <p>An error occured while <span className="text-[#FF4B4B]">deleting</span> <br /> <b className="font-black">{title}</b> <br /> to Favorite Movies</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                });
            // @ts-ignore
            setFavMovieIds((prev) => prev.filter((id) => id !== movieId));
        }
    };

    const addRemoveFavSerie = (serieId: number, title: string) => {
        const convexUserId = localStorage.getItem("convexUserId");

        if (!favSerieIds?.includes(serieId)) {
            // @ts-ignore
            const promise = addFavSerie({ id: convexUserId, serieId })
                .then(() => {
                    toast.success((
                        <p><b className="font-black">{title}</b> <br /> <span className="text-[#61D345]">added</span> to Favorite Series</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast.error((
                        <p>An error occured while <span className="text-[#61D345]">adding</span> <br /> <b className="font-black">{title}</b> <br /> to Favorite Series</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                });
            // @ts-ignore
            setFavSerieIds((prev) => [...prev, serieId]);
        } else {
            // @ts-ignore
            const promise = removeFavSerie({ id: convexUserId, serieId })
                .then(() => {
                    toast.success((
                        <p><b className="font-black">{title}</b> <br /> <span className="text-[#FF4B4B]">deleted</span> from Favorite Series</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast.error((
                        <p>An error occured while <span className="text-[#FF4B4B]">deleting</span> <br /> <b className="font-black">{title}</b> <br /> from Favorite Series</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                });
            // @ts-ignore
            setFavSerieIds((prev) => prev.filter((id) => id !== serieId));
        }
    }
    const addRemoveFavActor = (actorId: number, title: string) => {
        const convexUserId = localStorage.getItem("convexUserId");
        if (!favActorIds?.includes(actorId)) {
            // @ts-ignore
            const promise = addFavActor({ id: convexUserId, actorId })
                .then(() => {
                    toast.success((
                        <p><b className="font-black">{title}</b> <br /> <span className="text-[#61D345]">added</span> to Favorite Actors</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast.error((
                        <p>An error occured while <span className="text-[#61D345]">adding</span> <br /> <b className="font-black">{title}</b> <br /> to Favorite Actors</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                });

            // @ts-ignore
            setFavActorIds((prev) => [...prev, actorId]);
        } else {
            // @ts-ignore
            const promise = removeFavActor({ id: convexUserId, actorId })
                .then(() => {
                    toast.success((
                        <p><b className="font-black">{title}</b> <br /> <span className="text-[#FF4B4B]">deleted</span> from Favorite Actors</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast.error((
                        <p>An error occured while <span className="text-[#FF4B4B]">deleting</span> <br /> <b className="font-black">{title}</b> <br /> from Favorite Actors</p>
                    ), {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center"
                        },
                        position: "bottom-center",
                        duration: 4000
                    });
                });
            // @ts-ignore
            setFavActorIds((prev) => prev.filter((id) => id !== actorId));
        }
    }

    const addRemoveFav = (id: number, title: string) => {
        if (searchFor === "movie") {
            addRemoveFavMovie(id, title);
        } else if (searchFor === "tv") {
            addRemoveFavSerie(id, title);
        } else if (searchFor === "actor") {
            addRemoveFavActor(id, title);
        }
    };


    return (
        <>
            {poster_path && (
                <div className={className}>
                    {/* @ts-ignore */}
                    <div
                        onMouseEnter={() => {
                            // @ts-ignore
                            if (searchFor !== "actor") setFullTitle(id)
                        }}
                        // @ts-ignore
                        onMouseLeave={() => {
                            // @ts-ignore
                            if (searchFor !== "actor") setFullTitle(null)
                        }}
                        // @ts-ignore
                        key={id}
                        className={cn("relative w-full h-full flex justify-center items-center")}
                    >
                        <div
                            // @ts-ignore
                            className={`relative rounded-3xl w-full h-full`}
                        >
                            <Image
                                // @ts-ignore
                                src={TMDB_API_IMG + poster_path}
                                // @ts-ignore
                                alt={title}
                                width={266.5}
                                height={350}
                                className="rounded-3xl w-full h-full object-cover"
                            />
                            <div
                                className={cn(
                                    `absolute inset-0 p-3 w-full h-full flex flex-col justify-between rounded-3xl card_main group hover:backdrop-blur-[1.5px] hover:bg-black_second/50 overflow-hidden transition-all`
                                )}
                            >
                                <div className="flex justify-between">
                                    <ActionTooltip
                                        side="bottom"
                                        align="start"
                                        label={(favMovieIds?.includes(id) || favSerieIds?.includes(id) || favActorIds?.includes(id) ? "Delete favorite" : "Add to favorite")}
                                    >
                                        <button onClick={() => addRemoveFav(id, title)}
                                            className="w-9 h-7 grid place-items-center rounded-full bg-black_third"
                                        >
                                            <Heart
                                                className={cn(
                                                    "w-4 h-4 text-white_text transition-all",
                                                    // @ts-ignore
                                                    (favMovieIds?.includes(id) || favSerieIds?.includes(id) || favActorIds?.includes(id)) && "text-red fill-red"
                                                )}
                                            />
                                        </button>
                                    </ActionTooltip>
                                    <CreateSessionModal>
                                        <ActionTooltip
                                            side="bottom"
                                            align="end"
                                            label="Create session"
                                        >
                                            <button className="w-9 h-7 grid place-items-center rounded-full bg-black_third">
                                                <Plus className="w-4 h-4 text-white_text" />
                                            </button>
                                        </ActionTooltip>
                                    </CreateSessionModal>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    {searchFor !== "actor" && (
                                        <div className="flex justify-center gap-x-2 translate-y-12 group-hover:-translate-y-2 duration-300">
                                            {vote_average && Number(vote_average) > 0 && (
                                                <Badge className="flex justify-center items-center gap-x-1 text-sm text-gray">
                                                    {/* <Star className="w-4 h-4 text-[#ffa800] fill-[#ffa800]" /> */}
                                                    <div className="relative">
                                                        <Star className="w-4 h-4 text-[#ffa800]" /> {/* Pozadinska zvezda */}
                                                        {/* @ts-ignore */}
                                                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(vote_average / 10) * 100 - 5}%` }}>
                                                            <Star className="w-4 h-4 fill-[#ffa800] text-transparent" /> {/* Popunjena zvezda */}
                                                        </div>
                                                    </div>
                                                    {/* @ts-ignore */}
                                                    {vote_average?.toFixed(1)}
                                                </Badge>
                                            )}
                                            {release_date && (
                                                <Badge className="flex justify-center items-center font-normal  text-sm text-gray">
                                                    {/* @ts-ignore */}
                                                    {release_date?.substring(0, 4)}
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                    <p className={cn("text-white_text min-h-[48px] text-center font-normal text-base hover:cursor-default grid place-items-center transition-all translate-y-12 group-hover:-translate-y-2 duration-300",
                                        searchFor === "actor" && "translate-y-0 group-hover:translate-y-0"
                                    )}>
                                        {/* @ts-ignore */}
                                        {title && (fullTitle === id ? title : title.substring(0, 20))}{fullTitle === id ? "" : title.length < 20 ? "" : "..."}
                                    </p>
                                    {searchFor !== "actor" && (
                                        <>
                                            {/* @ts-ignore */}
                                            <Button
                                                onClick={() => {
                                                    if (searchFor === "movie") {
                                                        router.push(`/movies/${id}`)
                                                    } else if (searchFor === "tv") {
                                                        router.push(`/series/${id}`)
                                                    }
                                                }}
                                                variant="skew"
                                                className="mt-0 w-11/12 translate-y-24 opacity-0 group-hover:-translate-y-1 group-hover:opacity-100 transition-all duration-300"
                                            >
                                                <span className="skew-x-[15deg]">Watch Now</span>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* )} */}
                </div>
            )}
        </>
    )
}

export default Card;
