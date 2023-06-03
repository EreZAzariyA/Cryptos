import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "./options";
import { MainActions, fetchCoinsData } from "../../../redux/actions";
import { Button } from "antd";
import { CoinsTypes } from "../../../utils/helpers";
import "./top.css";

export const TopHeader = () => {
  const coinsData = useSelector((state) => state?.coinsReducer?.coinsData);
  const currency = useSelector((state) => state?.currencyReducer?.currency);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!coinsData) {
      fetchCoinsData().then((coins) => {
        setCount(coins.length);
        dispatch(MainActions.setCoinsData({[CoinsTypes.USD]: coins}));
      });
    };
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
        const promises = Object.keys(coinsData).map(async (currency) => {
          const coins = await fetchCoinsData(currency);
          return [currency, coins];
        });
        const results = await Promise.all(promises);
        const updatedCoinsData = Object.fromEntries(results);
        dispatch(MainActions.setCoinsData({ ...coinsData, ...updatedCoinsData }));
      }, 1000 * 2);
    }
    return () => clearInterval(timer);
  }, [coinsData]);

  return (
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