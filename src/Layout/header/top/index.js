import { useCurrencySet } from "../../../utils/useCurrencySet";
import { useEffect, useState } from "react";
import "./top.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainActions, SocketActions, fetchCoinsData } from "../../../redux/actions";
import { Options } from "./options";
import { CoinsTypes } from "../../../utils/helpers";

export const TopHeader = () => {
  const currency = useSelector((state) => state?.currencyReducer?.currency);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch()
  
  useEffect(() => {
    // fetchCoinsData().then((coins) => {
    //   dispatch(MainActions.setCoinsData({[CoinsTypes.USD]: coins}));
    // });
    dispatch(MainActions.getCoinsData().payload.then((coins) => {
      dispatch(MainActions.setCoinsData({USD: coins}));
      // console.log(coins);
    }));
    dispatch(SocketActions.connect());
    // if (currencySet && userCurrency && currencySet?.[userCurrency]){
    //   dispatch(SocketActions.getLiveData({[userCurrency]: currencySet[userCurrency]}));
    //   setCount(currencySet[userCurrency].length);
    // };

  }, [dispatch]);

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
          {/* <Options userCurrency={userCurrency} /> */}
        </div>

      </div>
    </div>
  );
};