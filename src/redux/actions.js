import { createAsyncAction, createAction } from 'redux-promise-middleware-actions';
import currencies from "../utils/currency-symbols.json";

// const URL = 'https://coinbase.com/api/v2/assets/search?base=USD&filter=listed&include_prices=true&resolution=day&sort=rank&limit=100';

export const ActionsTypes = {
  GET_COINS_DATA: 'GET_COINS_DATA',
  SET_COINS_DATA: 'SET_COINS_DATA',
}

export const fetchCoinsData = async (currency = 'USD') => {
  try {
    const response = await fetch(`https://coinbase.com/api/v2/assets/search?base=${currency}&filter=listed&include_prices=true&resolution=day&sort=rank&limit=100`);
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
  getCoinsData: createAsyncAction(ActionsTypes.GET_COINS_DATA, () => (fetchCoinsData())),
};

export const fetchCountriesCurrencies = () => {
  return currencies;
};

export const fetchCurrencySymbol = (currencyCode) => {
  const currency = currencies.find((currency)=>{
    return currency.abbreviation === currencyCode
  });
  return currency.symbol;
};

export const setMainCurrency = (currency) => ({
  type: 'CHANGE_CURRENCY_SET',
  currency: currency,
})
