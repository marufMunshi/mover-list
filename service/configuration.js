import ax from '../config/network/axios.config';

function getConfiguration() {
  return ax.get('/configuration');
}

export default { getConfiguration };
