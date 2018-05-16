const axios = require('axios');

const coinsHoldWebsiteSlug = [
  'bitcoin',
  'nuls',
  'power-ledger',
  'wabi'
];

const coinsHoldId = {
  bitcoin: null,
  nuls: null,
  "power-ledger": null,
  wabi: null
};

const coinsWatchWebsiteSlug = [
  'ethereum',
  'ripple',
  'iota',
  'cardano',
  'litecoin',
  'omisego',
  'icon',
  'ardor',
  'raiden-network-token',
  'monaco',
  'substratum',
  'ethlend'
];

const coinsWatchId = {
  ethereum: null,
  ripple: null,
  iota: null,
  cardano: null,
  litecoin: null,
  omisego: null,
  icon: null,
  ardor: null,
  "raiden-network-token": null,
  monaco: null,
  substratum: null,
  ethlend: null
}

let allCoinsData;

axios.get('https://api.coinmarketcap.com/v2/ticker/')
  .then(res => {
    allCoinsData = res.data.data;
    console.log('allCoinsData length', Object.keys(allCoinsData).length);
    return axios.get('https://api.coinmarketcap.com/v2/ticker/?start=101');
  })
  .then(res => {
    const newCoinsData = res.data.data;
    allCoinsData = {...allCoinsData, ...newCoinsData}
    console.log('allCoinsData length', Object.keys(allCoinsData).length);
    return axios.get('https://api.coinmarketcap.com/v2/ticker/?start=201');
  })
  .then(res => {
    const newCoinsData = res.data.data;
    allCoinsData = {...allCoinsData, ...newCoinsData}
    console.log('allCoinsData length', Object.keys(allCoinsData).length);
    coinsHoldWebsiteSlug.map(slug => {
      for (let coinNo in allCoinsData) {
        if (allCoinsData[coinNo].website_slug === slug) {
          coinsHoldId[slug] = allCoinsData[coinNo].id;
        }
      }
    });
    coinsWatchWebsiteSlug.map(slug => {
      for (let coinNo in allCoinsData) {
        if (allCoinsData[coinNo].website_slug === slug) {
          coinsWatchId[slug] = allCoinsData[coinNo].id;
        }
      }
    });
    console.log('Coins Hold:', coinsHoldId);
    console.log('Coins Watch:', coinsWatchId);
  })
  .catch(err => {
    console.log(err);
  });
