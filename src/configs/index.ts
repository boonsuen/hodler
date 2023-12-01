export const COLORS: {
  [key: string]: [string, string];
} = {
  '--shadow-dropdown-opener': ['0 2px 6px rgb(255 178 136 / 25%)', 'none'],
  '--shadow-dropdown-list': ['0 2px 6px rgb(136 198 255 / 25%)', 'none'],
  '--color-mode-circle': ['#B1B6C8', '#F3F4FE'],
  '--color-logo-fill': ['#FFF4E1', '#E5E1FF'],
  '--color-logo-stroke': ['#FF6B00', '#001AFF'],
  '--color-navlink': ['#EE732F', '#3E50FA'],
  '--color-table-border': ['rgba(255,107,0,0.1)', '#003CB0'],
  '--color-sorter': ['#A0C2F9', '#D4DAFB'],
  '--color-sorter-active': ['#5892E8', '#8893F2'],
  '--color-loader-primary': ['#f3f3f3', '#6476ad'],
  '--color-loader-secondary': ['#ecebeb', '#505d84'],
  '--color-black-white': ['#000', '#fff'],
  '--color-twitter-icon': ['#00c3ff', '#fff'],
  '--bg-body': ['white', '#1A1D33'],
  '--bg-dropdown': ['#fff', '#434661'],
  '--bg-navlink-inactive': ['#fff', '#BEC4FB'],
  '--bg-navlink-hover': ['rgba(255,107,0,0.1)', '#E8EAFF'],
  '--bg-table': ['white', '#090D2C'],
  '--bg-table-row-odd': ['#f7feff', '#121B3C'],
  '--bg-footer-links-github': ['#FFF0E8', '#000'],
  '--bg-footer-links-twitter': ['#FFF0E8', '#0045AC'],
  '--text-logo-title': ['#181B3A', '#fff'],
  '--text-header-cell': ['#65748e', '#CBD9F0'],
  '--text-header-cell-main': ['#FF6B00', '#8F9BFF'],
  '--text-tbody': ['#000', '#CFD6EF'],
  '--text-change-green': ['#4ae264', '#84D492'],
  '--text-change-red': ['#ff8282', '#F19090'],
};

export const mainCoinsInfo = [
  {
    id: 'basic-attention-token',
    symbol: 'bat',
    name: 'Basic Attention Token',
  },
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
  { id: 'cardano', symbol: 'ada', name: 'Cardano' },
  { id: 'eos', symbol: 'eos', name: 'EOS' },
  { id: 'neo', symbol: 'neo', name: 'NEO' },
  { id: 'nuls', symbol: 'nuls', name: 'Nuls' },
  { id: 'ripple', symbol: 'xrp', name: 'XRP' },
  { id: 'binancecoin', symbol: 'bnb', name: 'Binance Coin' },
];

export const watchingCoinsInfo = [
  { id: 'ardor', symbol: 'ardr', name: 'Ardor' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
  { id: 'icon', symbol: 'icx', name: 'ICON' },
  { id: 'iota', symbol: 'miota', name: 'IOTA' },
  { id: 'litecoin', symbol: 'ltc', name: 'Litecoin' },
  { id: 'omisego', symbol: 'omg', name: 'OmiseGO' },
  { id: 'power-ledger', symbol: 'powr', name: 'Power Ledger' },
];

const mainCoinsIdList = mainCoinsInfo.map((coinObj) => coinObj.id);
const watchingCoinsIdList = watchingCoinsInfo.map((coinObj) => coinObj.id);
const allCoinsIdList = mainCoinsIdList.concat(watchingCoinsIdList);

export const COINGECKO_API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${allCoinsIdList.join()}&vs_currencies=usd%2Cbtc&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;
