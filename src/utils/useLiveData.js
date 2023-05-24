import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCurrencySet } from "./useCurrencySet";
import { fetchCoinsData } from "../redux/actions";

export const useLiveData = () => {
  const {currencySet, userCurrency} = useCurrencySet();
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    let timer;
    if (currencySet && userCurrency) {
      setLiveData(currencySet[userCurrency]);

      timer = setInterval(() => {
        fetchCoinsData(userCurrency).then((coins) => {
          setLiveData(coins);
        })
      }, 3000);
    
    };
    return () => clearInterval(timer);

  }, [currencySet, userCurrency]);


  return liveData;
}
