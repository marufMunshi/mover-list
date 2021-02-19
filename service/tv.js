import ax from '../config/network/axios.config';

function getPopularTvShows() {
  return ax.get('/tv/popular');
}

function getTrendingTvShows(timeWindow) {
  return ax.get(`/trending/tv/${timeWindow}`);
}

function getTopRatedTvShows() {
  return ax.get('/tv/top_rated');
}

function getDetails(id) {
  return ax.get(`/tv/${id}`);
}

function getCredits(id) {
  return ax.get(`/tv/${id}/credits`);
}

function getExternalIds(id) {
  return ax.get(`/tv/${id}/external_ids`);
}

function getKeywords(id) {
  return ax.get(`/tv/${id}/keywords`);
}

function getReviews(id) {
  return ax.get(`/tv/${id}/reviews`);
}

function getVideos(id) {
  return ax.get(`/tv/${id}/videos`);
}

export default {
  getPopularTvShows,
  getTrendingTvShows,
  getTopRatedTvShows,
  getDetails,
  getCredits,
  getExternalIds,
  getKeywords,
  getReviews,
  getVideos,
};
