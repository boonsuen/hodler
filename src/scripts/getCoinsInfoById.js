import https from 'https';
const url = 'https://api.coingecko.com/api/v3/coins/list';

const mainCoinsIdList = [
  'bitcoin',
  'nuls',
  'ripple',
  'basic-attention-token',
  'cardano',
  'eos',
  'neo',
  'binancecoin',
];

const watchingCoinsIdList = [
  'litecoin',
  'ethereum',
  'ardor',
  'iota',
  'omisego',
  'icon',
  'power-ledger',
];

https.get(url, (res) => {
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (data) => {
    body += data;
  });
  res.on('end', () => {
    let parsedBody = JSON.parse(body);
    console.log(body);

    const mainCoinsInfo = parsedBody.filter((coin) => {
      return mainCoinsIdList.indexOf(coin.id) !== -1;
    });
    console.log(mainCoinsInfo);
    const watchingCoinsInfo = parsedBody.filter((coin) => {
      return watchingCoinsIdList.indexOf(coin.id) !== -1;
    });
    console.log(watchingCoinsInfo);
    console.log(mainCoinsInfo.concat(watchingCoinsInfo));
  });
});
