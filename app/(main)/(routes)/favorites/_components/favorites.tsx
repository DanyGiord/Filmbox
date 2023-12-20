'use client'

import { api } from "@/convex/_generated/api";
import { fetchActor, fetchMovie, fetchSerie } from "@/tmdb-api/api";
import { useUser } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";
import FavoritesNavbar from "./favorites-navbar";
import Card from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Favorites = () => {
    const { isLoaded, isSignedIn, user } = useUser();

    const [favMovieIds, setFavMovieIds] = useState<number[]>([]);
    const [favMovies, setFavMovies] = useState<any[]>([]);
    const [favSerieIds, setFavSerieIds] = useState<number[]>([]);
    const [favSeries, setFavSeries] = useState<any[]>([]);
    const [favActorIds, setFavActorIds] = useState<number[]>([]);
    const [favActors, setFavActors] = useState<any[]>([]);

    const [skeleton, setSkeleton] = useState(true);

    const [fullTitle, setFullTitle] = useState<number | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setSkeleton(false);
        }, 2000);
    }, [skeleton]);

    const convex = useConvex();

    useEffect(() => {
        let ignore = false;
        if (user) {
            convex.query(api.user.getUser, { userId: user.id })
                .then(userData => {
                    if (userData && !ignore) {
                        setFavMovieIds(userData.favMovies)
                        setFavSerieIds(userData.favSeries)
                        setFavActorIds(userData.favActors)
                        localStorage.setItem("convexUserId", userData._id);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        return () => { ignore = true }
    }, [user, convex]);

    useEffect(() => {
        const fetchFavMovies = async (favMovieIds: number[]) => {
            setFavMovies([]);

            const moviesPromises = favMovieIds.map(favMovieId => fetchMovie(favMovieId));
            const movies = await Promise.all(moviesPromises);

            setFavMovies(movies);
        }

        if (favMovieIds.length > 0) {
            fetchFavMovies(favMovieIds);
        }
    }, [favMovieIds]);

    useEffect(() => {
        const fetchFavSeries = async (favSerieIds: number[]) => {
            setFavSeries([]);

            const seriesPromises = favSerieIds.map(favSerieId => fetchSerie(favSerieId));
            const series = await Promise.all(seriesPromises);

            setFavSeries(series);
        }

        if (favSerieIds.length > 0) {
            fetchFavSeries(favSerieIds);
        }
    }, [favSerieIds]);

    useEffect(() => {
        const fetchFavActors = async (favSerieIds: number[]) => {
            setFavActors([]);

            const actorsPromises = favActorIds.map(favActorId => fetchActor(favActorId));
            const actors = await Promise.all(actorsPromises);

            setFavActors(actors);
        }

        if (favMovieIds.length > 0) {
            fetchFavActors(favMovieIds);
        }
    }, [favActorIds]);

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <>
            <FavoritesNavbar />
            <div className="p-6">
                {favMovies.length > 0 && (
                    <div id="favMovies">
                        <h2 className="text-white_second text-2xl font-bold">Favorite movies</h2>
                        <ScrollArea className="w-auto">
                            <div className="flex w-max gap-3 pl-3 py-2.5">
                                {[...favMovies].reverse().map(favMovie => (
                                    <Card
                                        id={favMovie.id}
                                        poster_path={favMovie.poster_path}
                                        title={favMovie.title}
                                        vote_average={favMovie.vote_average}
                                        release_date={favMovie.release_date}
                                        fullTitle={fullTitle}
                                        setFullTitle={setFullTitle}
                                        searchFor="movie"
                                        favMovieIds={favMovieIds}
                                        setFavMovieIds={setFavMovieIds}
                                        favSerieIds={favSerieIds}
                                        className="w-[190px] cardcard"
                                    />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                )}
                {favSeries.length > 0 && (
                    <div id="favSeries">
                        <h2 className="text-white_second text-2xl font-bold">Favorite series</h2>
                        <ScrollArea className="w-auto">
                            <div className="flex w-max gap-3 pl-3 py-2.5">
                                {[...favSeries].reverse().map(favSerie => (
                                    <Card
                                        id={favSerie.id}
                                        poster_path={favSerie.poster_path}
                                        title={favSerie.name}
                                        vote_average={favSerie.vote_average}
                                        release_date={favSerie.first_air_date}
                                        fullTitle={fullTitle}
                                        setFullTitle={setFullTitle}
                                        searchFor="tv"
                                        favMovieIds={favMovieIds}
                                        setFavMovieIds={setFavMovieIds}
                                        favSerieIds={favSerieIds}
                                        setFavSerieIds={setFavSerieIds}
                                        className="w-[190px]"
                                    />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                )}
                {favActors.length > 0 && (
                    <div id="favActors">
                        <h2 className="text-white_second text-2xl font-bold">Favorite actors</h2>
                        <ScrollArea className="w-auto">
                            <div className="flex w-max gap-3 pl-3 py-2.5">
                                {[...favActors].reverse().map(favActor => (
                                    <Card
                                        id={favActor.id}
                                        poster_path={favActor.profile_path}
                                        title={favActor.name}
                                        favActorIds={favActorIds}
                                        setFavActorIds={setFavActorIds}
                                        searchFor="actor"
                                        className="w-[190px]"
                                    />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                )}
            </div >
        </>
    );
}

export default Favorites;