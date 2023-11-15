const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 
const TMDB_API_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;

export const getDiscoverMovies = async (page:number) => {
  return fetch(`${TMDB_API_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`)
    .then((res) => res.json())
    .then((json) => json.results);
};

export const searchMovies = async (query:string) => {
  return fetch(`${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`)
    .then((res) => res.json())
    .then((json) => json.results);
};
