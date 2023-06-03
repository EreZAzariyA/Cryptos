import { createAsyncAction, createAction } from 'redux-promise-middleware-actions';
import currencies from "../utils/currency-symbols.json";
import { CoinsTypes } from '../utils/helpers';

export const ActionsTypes = {
  GET_COINS_DATA: 'GET_COINS_DATA',
  SET_COINS_DATA: 'SET_COINS_DATA',
};

export const fetchCoinsData = async (currency = CoinsTypes.USD) => {
  try {
    const response = await fetch(`https://coinbase.com/api/v2/assets/search?base=${currency}&filter=listed&include_prices=true&resolution=week&sort=rank`);
    const data = await response.json();
    const coins = data?.data ? data.data.filter((coin)=>(coin.symbol !== 'ETH2')) : [];
    // console.log(coins[0]?.prices);
    return coins;
    // return data?.data ? data.data.filter((coin)=>(coin.symbol !== 'ETH2')) : [];
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};
// const fetchData = async (crypto, currency) => {
  // const response = await fetch(`https://api.coinbase.com/v2/prices/${crypto}-${currency}/historic`);
  // // const response = await fetch(`https://api.pro.coinbase.com/products/${crypto}-${currency}/candles?start=${moment().add(-5, 'day').toJSON()}&end=${moment().toJSON()}&granularity=3600`);

  // const history = response.json();
  // return history;
// };
export const fetchCryptoHistory = async (crypto, currency) => {
  const response = await fetch(`https://api.coinbase.com/v2/prices/${crypto}-${currency}/historic`);
  // const response = await fetch(`https://api.pro.coinbase.com/products/${crypto}-${currency}/candles?start=${moment().add(-5, 'day').toJSON()}&end=${moment().toJSON()}&granularity=3600`);
  const history = response.json();
  return history;
};

export const MainActions = {
  setCoinsData: createAction(ActionsTypes.SET_COINS_DATA, (coinsData) => ({coinsData})),
  getCoinsData: createAsyncAction(ActionsTypes.GET_COINS_DATA, (currency) => (fetchCoinsData(currency))),
};

export const setMainCurrency = (currency = CoinsTypes.USD) => ({
  type: 'CHANGE_CURRENCY_SET',
  currency: currency,
});

export const fetchCountriesCurrencies = () => {
  return currencies;
};

export const fetchCurrencySymbol = (currencyCode) => {
  const currency = currencies.find((currency)=>{
    return currency.code === currencyCode
  });
  return currency.symbol;
};