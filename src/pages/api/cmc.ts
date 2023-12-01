import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers = new Headers();
  headers.append('X-CMC_PRO_API_KEY', process.env.CMC_API_KEY as string);

  try {
    const response = await fetch(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1,1839,1765,2010,52,1376,1697,2092,1027,2,1720,1808,2099,1320,2132',
      {
        headers,
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    console.log('API call error:', error.message);
    res.status(error.statusCode).json(error);
  }
}

export default handler;
