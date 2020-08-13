import ax from '../config/network/axios.config';

function getMovieById(id) {
  return ax.get(`/movie/${id}`);
}

function getPopularMovies() {
  return ax.get('/movie/popular');
}

function getTrendingMovies(timeWindow) {
  return ax.get(`/trending/movie/${timeWindow}`);
}

export default { getMovieById, getPopularMovies, getTrendingMovies };
