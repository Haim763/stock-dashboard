const url = 'https://www.alphavantage.co';
const apiKey = 'T87ODF4CY55ATB7T';
export const DATA_TYPES = ['1. open', '2. high', '3. low', '4. close'];
export const DEFAULT_COMPANY_SYM = 'KO';
export const DEFAULT_TIMEFRAME = 'INTRADAY';
export const DATA_LENGTH = {
  INTRADAY: 24,
  DAILY: 30,
  WEEKLY: 1
}
export const API_TIME_FRAMES = [
  'INTRADAY',
  'DAILY',
  'WEEKLY'
]

export const getJSON = (url) => {
  return fetch(url + '&apikey=' + apiKey)
    .then(res => {
      return res.json();
    })
    .catch(err => err);
};

export const getData = (symbol, timeframe) => {
  let addition = '';
  if (timeframe === 'INTRADAY')
    addition += '&interval=60min';

  return getJSON(`${url}/query?function=TIME_SERIES_${timeframe}&symbol=${symbol}${addition}`)
    .then((data) => {
      return ({
        Status: 'Success',
        data: (data || {})[Object.keys(data)[1]]
      });
    }).catch((e) => {
      return {
        Status: 'Error',
        Error: e.stack
      };
    });
};