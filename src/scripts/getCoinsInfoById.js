const https = require('https');
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

https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(body);

    const mainCoinsInfo = body.filter((coin) => {
      return mainCoinsIdList.indexOf(coin.id) !== -1;
    });
    console.log(mainCoinsInfo);
    const watchingCoinsInfo = body.filter((coin) => {
      return watchingCoinsIdList.indexOf(coin.id) !== -1;
    });
    console.log(watchingCoinsInfo);
    console.log(mainCoinsInfo.concat(watchingCoinsInfo));
  });
});