import { useCallback, useEffect, useState } from "react";
import "./top.css";

export const TopHeader = () => {
  const [allCryptos, setAllCryptos] = useState([]);

  const fetchCryptos = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    const coins = response.json();
    return coins;
  };

  const fetchAllCryptos = useCallback( async() => {
    fetchCryptos().then((coins) => {
      setAllCryptos(coins);
    });
    const timer = setInterval(() => {
      fetchCryptos().then((coins) => {
        setAllCryptos(coins);
      });
    }, 1000 * 60 * 10);
    return () => clearInterval(timer);
  },[]);

  useEffect(() => {
    // fetchAllCryptos();
    console.log('fe');

  }, [fetchAllCryptos]);

  return(
    <div className="top-header-main-container">
      <div className="top-header-inner-container">
        <div className="tickets">
          {/* <div className="ticket">Cryptos: {allCryptos?.length}</div> */}
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
        </div>
      </div>
    </div>
  );
};