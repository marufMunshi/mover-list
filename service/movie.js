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

function getTopRatedMovies() {
  return ax.get('/movie/top_rated');
}

function getDetails(id) {
  return ax.get(`movie/${id}`);
}

function getCredits(id) {
  return ax.get(`/movie/${id}/credits`);
}

function getExternalIds(id) {
  return ax.get(`/movie/${id}/external_ids`);
}

function getKeywords(id) {
  return ax.get(`/movie/${id}/keywords`);
}

function getReviews(id) {
  return ax.get(`/movie/${id}/reviews`);
}

function getVideos(id) {
  return ax.get(`/movie/${id}/videos`);
}

export default {
  getMovieById,
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getDetails,
  getCredits,
  getExternalIds,
  getKeywords,
  getReviews,
  getVideos,
};
