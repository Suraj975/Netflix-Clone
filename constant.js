const API_KEY = "3772c22cc1f4a99c1c96f4b9c7b96b35"
export const BASE_IMAGE_URL = "http://image.tmdb.org/t/p/original/";
export const DATA_ACCESS_POINTS = {
    NETFLIX_ORIGINALS:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`,
    TRENDING:`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`,
    TOP_RATED:`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    ACTION_MOVIES:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_networks=28`,
    COMEDY_MOVIES:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_networks=35`,
    HORROR_MOVIES:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_networks=27`,
    ROMANTIC_MOVIES:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_networks=10749`,
    DOCUMENTARIES:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_networks=99`,
}