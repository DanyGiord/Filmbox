"use client";

import { Button } from "@/components/ui/button";
import MovieCards from "./movie-cards";
import { Input } from "@/components/ui/input";
import * as Icons from "@/public/assets/icons/Icons";
import { searchActors, searchMovies, searchSeries } from "@/tmdb-api/api";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import SeriesCards from "./series-cards";
import ActorCards from "./actors-cards";
import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";

const CustomizeProfile = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [query, setQuery] = useState('');

  const [isMounted, setIsMounted] = useState(false);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [actors, setActors] = useState([]);

  const [currentTab, setCurrentTab] = useState(1);
  const [inputPlaceholder, setInputPlaceholder] = useState('Find a movie');

  const [translateValue, setTranslateValue] = useState(0);

  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);

  const [moviesPage, setMoviesPage] = useState(1);
  const [seriesPage, setSeriesPage] = useState(1);
  const [actorsPage, setActorsPage] = useState(1);

  const [isNextBtnDisabled, setisNextBtnDisabled] = useState(true);
  const [isCompleteBtnDisabled, setIsCompleteBtnDisabled] = useState(true);

  const router = useRouter();

  const fetchMovies = async () => {
    searchMovies(query)
      .then((movies: any) => setMovies(movies));
  };
  const fetchSeries = async () => {
    searchSeries(query)
      .then((series: any) => setSeries(series));
  };
  const fetchActors = async () => {
    searchActors(query)
      .then((actors: any) => setActors(actors))
  }

  const createProfile = useMutation(api.user.createProfile);
  const { user } = useUser();

  const [isProfileCreated, setIsProfileCreated] = useState(false)

  const onCreate = () => {
    if (user?.firstName && user?.lastName && !isProfileCreated) {
      const promise = createProfile({
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,

        favMovies: selectedMovies,
        favSeries: selectedSeries,
        favActors: selectedActors,
      })
      setIsProfileCreated(true);
      toast.success("Your profile has been customized successfully", {
        style: {
          background: "#1a1a1a",
          color: "#fcfcfc",
          textAlign: "center"
        },
        position: "bottom-center",
        duration: 4000
      });
      return router.push('/home');

    }
  };

  const convex = useConvex();

  const [existingProfile, setExistingProfile] = useState(false);

  const redirectToHomePage = () => {
    return router.push('/home');
  }

  useEffect(() => {
    let ignore = false;
    if (user) {
      convex.query(api.user.getUser, { userId: user.id })
        .then(userData => {
          // Obradite podatke korisnika
          if (userData && !ignore) {
            setExistingProfile(true)
            redirectToHomePage();
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
    if (currentTab === 1 && selectedMovies.length === 3) {
      setisNextBtnDisabled(false);
    } else if (currentTab === 2 && selectedSeries.length === 3) {
      setisNextBtnDisabled(false);
    } else if (currentTab === 3 && selectedActors.length === 3) {
      setisNextBtnDisabled(false);
      setIsCompleteBtnDisabled(false);
    } else {
      setisNextBtnDisabled(true);
    }
  }, [selectedMovies, selectedSeries, selectedActors, currentTab])


  useEffect(() => {
    if (currentTab === 1) {
      setInputPlaceholder("Find a movie");
      setTranslateValue(150);
    } else if (currentTab === 2) {
      setInputPlaceholder("Find a TV serie")
      setTranslateValue(50);
      fetchSeries();
    } else if (currentTab === 3) {
      setInputPlaceholder("Find an actor")
      setTranslateValue(-50);
      fetchActors();
    }
  }, [currentTab]);

  useEffect(() => {
    if (currentTab === 1) {
      fetchMovies();
    } else if (currentTab === 2) {
      fetchSeries();
    } else if (currentTab === 3) {
      fetchActors();
    }
  }, [query])


  useEffect(() => {
    setIsMounted(true)
  }, []);

  if (!isLoaded || !isSignedIn || !isMounted) {
    return null;
  }

  return (
    <div className="bg-black_main w-full overflow-hidden h-screen">
      <div className="flex flex-col justify-center items-center text-center py-5">
        <h1 className="text-white text-2xl md:text-4xl font-bold">
          {currentTab === 1 && "Select your favorite movies"}
          {currentTab === 2 && "Select your favorite TV series"}
          {currentTab === 3 && "Select your favorite actors"}
        </h1>
        <p className="text-gray text-lg mt-4">
          {currentTab === 1 && "Choose 3 favorite movies"}
          {currentTab === 2 && "Choose 3 favorite TV series"}
          {currentTab === 3 && "Choose 3 favorite actors"}
        </p>
        <div className="w-80 mt-4 mb-6">
          <Input
            onChange={(e) => setQuery(e.target.value)}
            placeholder={inputPlaceholder}
            iconSrc={Icons.Search}
            value={query}
          />
        </div>
        <div className="multistep h-full">
          <div className={`h-10/12 tabs w-[400vw] flex flex-nowrap transition-transform duration-500`} style={{ transform: `translateX(${translateValue}vw)` }}>
            <div className="tab w-full h-full flex justify-center">
              <MovieCards selectedMovies={selectedMovies} setSelectedMovies={setSelectedMovies} list={movies} />
            </div>
            <div className="tab w-full h-full flex justify-center">
              <SeriesCards selectedSeries={selectedSeries} setSelectedSeries={setSelectedSeries} list={series} />
            </div>
            <div className="tab w-full h-full flex justify-center">
              <ActorCards selectedActors={selectedActors} setSelectedActors={setSelectedActors} list={actors} />
            </div>
            <div className="tab w-full h-full flex justify-center">
              <MovieCards selectedMovies={selectedMovies} setSelectedMovies={setSelectedMovies} list={movies} />
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-between h-2/12">
            <Button disabled={currentTab === 1} variant='skew' type="button" id="prevBtn" onClick={() => {
              if (currentTab > 1) {
                setCurrentTab(prev => prev - 1)
              };
              setQuery("");
            }}>Previous</Button>
            <div className="flex justify-center gap-x-3">
              <span className={cn("step rounded-full w-4 h-4 bg-slate-500 transition-all", currentTab === 1 && "bg-red/50 w-8", selectedMovies.length === 3 && "bg-red")}></span>
              <span className={cn("step rounded-full w-4 h-4 bg-slate-500 transition-all", currentTab === 2 && "bg-red/50 w-8", selectedSeries.length === 3 && "bg-red")}></span>
              <span className={cn("step rounded-full w-4 h-4 bg-slate-500 transition-all", currentTab === 3 && "bg-red/50 w-8", selectedActors.length === 3 && "bg-red")}></span>

            </div>
            {currentTab === 3 ? (
              <Button disabled={isCompleteBtnDisabled} onClick={onCreate} variant="skew" id="completeBtn" type="button">Complete</Button>
            ) : (
              <Button disabled={isNextBtnDisabled} className={cn(
                currentTab === 3 && "hidden"
              )} variant='skew' type="button" id="nextBtn" onClick={() => {
                if (currentTab < 3) {
                  if (currentTab === 1 && selectedMovies.length === 3) {
                    setCurrentTab(prev => prev + 1);
                  }
                  if (currentTab === 2 && selectedMovies.length === 3) {
                    setCurrentTab(prev => prev + 1);
                  }
                };
                setQuery("");
              }}>Next</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeProfile;
