import { useEffect, useState } from 'react';


export const useCryptoHistory = (coin) => {
  const [dataHistory, setDataHistory] = useState([]);

  const fetchData = async (crypto, currency) => {
    const response = await fetch(`https://api.coinbase.com/v2/prices/${crypto}-${currency}/historic`);
    // const response = await fetch(`https://api.pro.coinbase.com/products/${crypto}-${currency}/candles?start=${moment().add(-5, 'day').toJSON()}&end=${moment().toJSON()}&granularity=3600`);

    const history = response.json();
    return history;
  };

  useEffect(() => {
    if (coin) {
      fetchData(coin.base, coin.currency).then((history) => {
        if (history?.data?.prices) {
          setDataHistory(history?.data?.prices);
        }
      });
    }
  }, [coin]);


  return dataHistory;
};