import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "./options";
import { MainActions, SocketActions, fetchCoinsData } from "../../../redux/actions";
import { Button } from "antd";
import { CoinsTypes } from "../../../utils/helpers";
import "./top.css";

export const TopHeader = () => {
  const coinsData = useSelector((state) => state?.coinsReducer?.coinsData);
  const currency = useSelector((state) => state?.currencyReducer?.currency);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SocketActions.connect());
  }, []);
  
  useEffect(() => {
    if (!coinsData) {
      fetchCoinsData().then((coins) => {
        setCount(coins.length);
        dispatch(MainActions.setCoinsData({[CoinsTypes.USD]: coins}));
        dispatch(SocketActions.getLiveData());
      });
    } else {
      if (coinsData && !coinsData?.[currency]) {
        fetchCoinsData(currency).then((coins) => {
          setCount(coins.length);
          dispatch(MainActions.setCoinsData({...coinsData, [currency]: coins}));
          dispatch(SocketActions.getLiveData(currency));
          console.log('new Coins');
        });
      };
    }

  }, [coinsData, currency, dispatch]);


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