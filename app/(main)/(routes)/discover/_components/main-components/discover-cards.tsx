"use client";

import { fetchDiscover } from "@/tmdb-api/api";
import { useEffect, useState, useContext } from "react";
import DiscoverContext from "../../_context/discover-context";
import { useUser } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import Card from "@/components/ui/card";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

const DiscoverCards = () => {
    // @ts-ignore
    const { currentPage, setCurrentPage, currentYear, selectedSort, rating, selectedGenres, currentLanguage, searchFor, totalPages, setTotalPages,
    } = useContext(DiscoverContext);

    const { user } = useUser();
    const convex = useConvex();

    const [cards, setCards] = useState([]);
    const [skeleton, setSkeleton] = useState(true);

    const [fullTitle, setFullTitle] = useState<number | null>(null);

    useEffect(() => {
        const getLatest = async () => {
            await fetchDiscover(
                currentPage,
                currentYear,
                selectedSort,
                rating,
                selectedGenres,
                currentLanguage,
                searchFor
            ).then((res) => {
                setCards(res.results);
                setTotalPages(res.total_pages > 500 ? 500 : res.total_pages);
            });
        };
        getLatest();
        setSkeleton(true);
    }, [
        currentPage,
        currentYear,
        selectedSort,
        rating,
        selectedGenres,
        currentLanguage,
        searchFor,
    ]);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        currentYear,
        selectedSort,
        rating,
        selectedGenres,
        currentLanguage,
        searchFor,
    ]);

    useEffect(() => {
        setTimeout(() => {
            setSkeleton(false);
        }, 2000);
    }, [skeleton]);

    const [favMovieIds, setFavMovieIds] = useState<number[]>([]);
    const [favSerieIds, setFavSerieIds] = useState<number[]>([]);

    useEffect(() => {
        let ignore = false;
        if (user) {
            convex
                .query(api.user.getUser, { userId: user.id })
                .then((userData) => {
                    // Obradite podatke korisnika
                    if (userData && !ignore) {
                        setFavMovieIds(userData.favMovies);
                        setFavSerieIds(userData.favSeries);
                        localStorage.setItem("convexUserId", userData._id);
                    }
                })
                .catch((error) => {
                    // Obradite grešku
                    console.log(error);
                });
        }
        return () => {
            ignore = true;
        };
    }, [user, convex]);



    return (
        <div className="grid justify-items-center xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 sm:grid-cols-2 gap-4 w-full mb-7">
            {cards.map((card) => (
                <Card
                    skeleton={skeleton}
                    // @ts-ignore
                    id={card.id} poster_path={card.poster_path} title={card.title ? card.title : card.name} vote_average={card.vote_average} release_date={card.release_date ? card.release_date : card.first_air_date}
                    fullTitle={fullTitle}
                    setFullTitle={setFullTitle}
                    searchFor={searchFor}
                    favMovieIds={favMovieIds}
                    setFavMovieIds={setFavMovieIds}
                    favSerieIds={favSerieIds}
                    setFavSerieIds={setFavSerieIds}
                    route="discover"
                />
            ))}
        </div>
    );
};

export default DiscoverCards;
