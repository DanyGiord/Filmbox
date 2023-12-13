'use client'

import { api } from "@/convex/_generated/api";
import { fetchActor, fetchMovie, fetchSerie } from "@/tmdb-api/api";
import { useUser } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";
import FavoritesNavbar from "./favorites-navbar";
import Card from "@/components/ui/card";

const Favorites = () => {
    const { isLoaded, isSignedIn, user } = useUser();

    const [favMovieIds, setFavMovieIds] = useState<number[]>([]);
    const [favMovies, setFavMovies] = useState<any[]>([]);
    const [favSerieIds, setFavSerieIds] = useState<number[]>([]);
    const [favSeries, setFavSeries] = useState<any[]>([]);
    const [favActorIds, setFavActorIds] = useState<number[]>([]);
    const [favActors, setFavActors] = useState<any[]>([]);

    const convex = useConvex();

    useEffect(() => {
        let ignore = false;
        if (user) {
            convex.query(api.user.getUser, { userId: user.id })
                .then(userData => {
                    // Obradite podatke korisnika
                    if (userData && !ignore) {
                        setFavMovieIds(userData.favMovies)
                        setFavSerieIds(userData.favSeries)
                        setFavActorIds(userData.favActors)
                    }
                })
                .catch(error => {
                    // Obradite grešku
                    console.log(error);
                });
        }
        return () => { ignore = true }
    }, [user, convex]);

    useEffect(() => {
        const fetchFavMovies = async (favMovieIds: number[]) => {
            for (let favMovieId of favMovieIds) {
                await fetchMovie(favMovieId)
                    .then((res) => setFavMovies(prev => [...prev, res]))

            }
        }

        fetchFavMovies(favMovieIds);
    }, [favMovieIds]);

    useEffect(() => {
        const fetchFavSeries = async (favSerieIds: number[]) => {
            for (let favSerieId of favSerieIds) {
                await fetchSerie(favSerieId)
                    .then((res) => setFavSeries(prev => [...prev, res]))
            }
        }
        fetchFavSeries(favSerieIds);
    }, [favSerieIds]);

    useEffect(() => {
        const fetchFavActors = async (favActorIds: number[]) => {
            for (let favActorId of favActorIds) {
                await fetchActor(favActorId)
                    .then((res) => setFavActors(prev => [...prev, res]))

            }
        }

        fetchFavActors(favActorIds);
    }, [favActorIds]);

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <>
            <FavoritesNavbar />
            <div className="p-6">
                <div id="favMovies">
                    <h2 className="text-white_second text-2xl font-bold">Favorite movies</h2>
                    <div className="flex gap-2 pl-3 pt-1">
                        {favMovies.map(favMovie => (
                            <Card
                                id={favMovie.id}
                                poster_path={favMovie.poster_path}
                                title={favMovie.title}
                            />
                        ))}
                    </div>
                </div>
                <div id="favSeries">
                    <h2 className="text-white_second text-2xl font-bold">Favorite series</h2>
                    <div className="flex gap-2 pl-3 pt-1">
                        {favSeries.map(favSerie => (
                            <Card
                                id={favSerie.id}
                                poster_path={favSerie.poster_path}
                                title={favSerie.name}
                            />
                        ))}
                    </div>
                </div>
                <div id="favActors">
                    <h2 className="text-white_second text-2xl font-bold">Favorite actors</h2>
                    <div className="flex gap-2 pl-3 pt-1">
                        {favActors.map(favActor => (
                            <Card
                                id={favActor.id}
                                poster_path={favActor.profile_path}
                                title={favActor.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Favorites;