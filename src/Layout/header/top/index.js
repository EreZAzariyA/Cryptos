import { useEffect, useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainActions, fetchCoinsData } from "../../../redux/actions";
import { CoinsTypes } from "../../../utils/helpers";
import "./top.css";
import { Options } from "./options";

export const TopHeader = () => {
  const coinsData = useSelector((state) => state?.coinsReducer?.coinsData);
  const currency = useSelector((state) => state?.currencyReducer?.currency);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch()
  // dispatch(SocketActions.connect());
  
  useEffect(() => {
    if (!coinsData) {
      fetchCoinsData().then((coins) => {
        setCount(coins.length);
        dispatch(MainActions.setCoinsData({[CoinsTypes.USD]: coins}));
      });
    };
  }, [coinsData, dispatch]);

  useEffect(() => {
    if (coinsData && !coinsData?.[currency]) {
      fetchCoinsData(currency).then((coins) => {
        setCount(coins.length);
        dispatch(MainActions.setCoinsData({...coinsData, [currency]: coins}));
      });
    };
  }, [coinsData, currency, dispatch]);

  useEffect(() => {
    let timer;
    if (coinsData) {

      timer = setInterval(async () => {
        const currencies = Object.keys(coinsData);
        
        const newList = await Promise.all(currencies.map(async (currencySet) => {
          const coins = await fetchCoinsData();
          return {
            [currencySet]: coins
          };
        }));
    
        dispatch(MainActions.setCoinsData(...newList));
      }, 1000 * 2);
    }

    return () => clearInterval(timer);
  }, [coinsData, currency]);

  return(
    <div className="top-header-main-container">
      <div className="top-header-inner-container">
        <div className="logo">
          <Link to={'/'}>
            <Button type="primary">
              Home
            </Button>
          </Link>
        </div>

        <div className="tickets">
          <div className="ticket">Cryptos: {count}</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
        </div>

        <div className="options">
          <Options userCurrency={currency} />
        </div>

      </div>
    </div>
  );
};