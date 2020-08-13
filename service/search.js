import ax from '../config/network/axios.config';

function searchMoviesOrTvShows(query) {
  return ax.get(`/search/multi?query=${query}`);
}

export default { searchMoviesOrTvShows };
