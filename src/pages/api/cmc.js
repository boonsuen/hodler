import rp from 'request-promise';
import Cors from 'cors';

const corsOptions = {
  origin: 'https://boonsuen.com',
  optionsSuccessStatus: 200
};

const cors = Cors(corsOptions);

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    qs: {
      id: '1,1765,2010,1376,1697,2132,2092,2267,1027,52,2,1720,1808,2239,2099,1776,1320'      
    },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
    },
    json: true,
    gzip: true
  };
  
  rp(requestOptions).then(response => {
    console.log('API call response:', response);
    res.json(response);
  }).catch((err) => {
    console.log('API call error:', err.message);
    res.status(err.statusCode).json(err);
  });
}

export default handler;