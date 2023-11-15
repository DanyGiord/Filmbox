const API_KEY = `9d78c82d3f773f4e170f920a4e336601`; 
const API_BASE_URL = `https://api.themoviedb.org/3`;

export const getDiscoverMovies = (page:number) => {
  return fetch(`${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`)
    .then((res) => res.json())
    .then((json) => json.results);
};

export const searchMovies = (query:string) => {
  return fetch(`${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then((res) => res.json())
    .then((json) => json.results);
};
