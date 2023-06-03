import { createAsyncAction, createAction } from 'redux-promise-middleware-actions';
import currencies from "../utils/currency-symbols.json";
import { CoinsTypes } from '../utils/helpers';

export const ActionsTypes = {
  GET_COINS_DATA: 'GET_COINS_DATA',
  SET_COINS_DATA: 'SET_COINS_DATA',
};

export const SocketActionsTypes = {
  CONNECT: 'CONNECT',
  GET_LIVE_DATA: 'GET_LIVE_DATA',
  SET_PRODUCTS_IDS: 'SET_PRODUCTS_IDS',
  SET_LIVE_DATA: 'ticker-data/update',
  DISCONNECT: 'DISCONNECT',
};

export const fetchCoinsData = async (currency = CoinsTypes.USD) => {
  try {
    const response = await fetch(`https://coinbase.com/api/v2/assets/search?base=${currency}&filter=listed&include_prices=true&resolution=day&sort=rank`);
    const data = await response.json();
    const coins = data?.data ? data.data.filter((coin)=>(coin.symbol !== 'ETH2')) : [];
    return coins;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};

export const fetchDataHistory = async (crypto, currency) => {
  const response = await fetch(`https://api.coinbase.com/v2/prices/${crypto}-${currency}/historic`);
  const history = response.json();
  return history;
};

export const MainActions = {
  setCoinsData: createAction(ActionsTypes.SET_COINS_DATA, (coinsData) => ({coinsData})),
  getCoinsData: createAsyncAction(ActionsTypes.GET_COINS_DATA, (currency) => (fetchCoinsData(currency))),
};

export const SocketActions = {
  connect: createAction(SocketActionsTypes.CONNECT),
  getLiveData: createAction(SocketActionsTypes.GET_LIVE_DATA, (currency = CoinsTypes.USD) => ({currency})),
  setProductsIds: createAction(SocketActionsTypes.SET_PRODUCTS_IDS, (productsId) => (productsId)),
  setLiveData: createAction(SocketActionsTypes.SET_LIVE_DATA, (updatedCoin, currency) => ({updatedCoin, currency})),
  disconnect: createAction(SocketActionsTypes.DISCONNECT),
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



