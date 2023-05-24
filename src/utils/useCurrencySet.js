import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { MainActions, fetchCoinsData } from "../redux/actions";

export const useCurrencySet = () => {
  const userCurrency = useSelector((state) => state?.currencyReducer?.currency);
  const coinsData = useSelector((state) => state?.coinsReducer?.coinsData);

  const dispatch = useDispatch();
  const [ currencySet, setCurrencySet ] = useState(null);

  useEffect(() => {
    if (!coinsData){
      fetchCoinsData().then((cryptos) => {
        dispatch(MainActions.setCoinsData({ 'USD': cryptos }));
        setCurrencySet({ 'USD': cryptos });
      });
    }
  }, [coinsData, dispatch]);

  useEffect(() => {
    if (coinsData && !coinsData[userCurrency]) {
      fetchCoinsData(userCurrency).then((cryptos) => {
        dispatch(MainActions.setCoinsData({ ...coinsData, [userCurrency]: cryptos }));
        setCurrencySet({...coinsData, [userCurrency]: cryptos});
      });
    } else if (coinsData?.[userCurrency]) {
      setCurrencySet({...coinsData, [userCurrency]: coinsData[userCurrency]});
    };

  }, [coinsData, dispatch, userCurrency]);

  return {currencySet, userCurrency};
};
