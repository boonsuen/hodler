import { COINGECKO_API_URL } from '@/configs';
import axios from 'axios';

export const getCoinGeckoData = () => {
  return axios.get(COINGECKO_API_URL);
};

export const getCoinMarketCapData = () => {
  return axios.get('/api/cmc');
};
