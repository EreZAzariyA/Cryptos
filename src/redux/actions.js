import { createAsyncAction, createAction } from 'redux-promise-middleware-actions';

const URL = 'https://coinbase.com/api/v2/assets/search?base=USD&filter=listed&include_prices=true&resolution=day&sort=rank';

export const ActionsTypes = {
  GET_COINS_DATA: 'GET_COINS_DATA',
  SET_COINS_DATA: 'SET_COINS_DATA'
}

export const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data?.data ? data.data.filter((coin)=>(coin.symbol !== 'ETH2')) : [];
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};

export const MainActions = {
  setCoinsData: createAction(ActionsTypes.SET_COINS_DATA, (coinsData) => ({coinsData})),
  getCoinsData: createAsyncAction(ActionsTypes.GET_COINS_DATA, ()=>(fetchData()))
};

