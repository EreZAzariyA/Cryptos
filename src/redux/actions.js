import { createAsyncAction, createAction } from 'redux-promise-middleware-actions';
import currencies from "../utils/currency-symbols.json";
import { CoinsTypes } from '../utils/helpers';

export const ActionsTypes = {
  GET_COINS_DATA: 'GET_COINS_DATA',
  SET_COINS_DATA: 'SET_COINS_DATA',
  SET_LIVE_DATA: 'SET_LIVE_DATA'
};

export const fetchCoinsData = async (currency = CoinsTypes.USD) => {
  try {
    const response = await fetch(`https://coinbase.com/api/v2/assets/search?base=${currency}&filter=listed&include_prices=true&resolution=day&sort=rank`);
    const data = await response.json();
    const coins = data?.data ? data.data.filter((coin)=>(coin.symbol !== 'ETH2')) : [];
    return coins;
    // return data?.data ? data.data.filter((coin)=>(coin.symbol !== 'ETH2')) : [];
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};

export const MainActions = {
  setCoinsData: createAction(ActionsTypes.SET_COINS_DATA, (coinsData) => ({coinsData})),
  setLiveCoinsData: createAction(ActionsTypes.SET_LIVE_DATA, (liveData) => ({liveData})),
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