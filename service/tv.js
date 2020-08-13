import ax from '../config/network/axios.config';

function getPopularTvShows() {
  return ax.get('/tv/popular');
}

function getTrendingTvShows(timeWindow) {
  return ax.get(`/trending/tv/${timeWindow}`);
}

export default { getPopularTvShows, getTrendingTvShows };
