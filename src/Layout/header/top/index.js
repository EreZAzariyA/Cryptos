import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "../../../utils/helpers";
import "./top.css";
import { Options } from "./options";
import { useEffect, useState } from "react";
import { MainActions, fetchCoinsData } from "../../../redux/actions";
import { setMainCurrency } from "../../../redux/actions";

export const TopHeader = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state?.currencyReducer?.currency);
  const coinsData = useSelector((state)=>state?.coinsReducer?.coinsData);

  useEffect(() => {
    if (!coinsData?.[currency]?.length) {
      fetchCoinsData(currency).then((coins) => {
        dispatch(MainActions.setCoinsData({...coinsData ,[currency]: coins}));
      });
    } else {
      dispatch(MainActions.setCoinsData({...coinsData}));
    }
  }, [currency]);

  const onCurrencyChange = (currency) => {
    dispatch(setMainCurrency(currency));
  };

  return(
    <div className="top-header-main-container">
      <div className="top-header-inner-container">
        <div className="tickets">
          <div className="ticket">Cryptos: {numberWithCommas(coinsData?.length)}</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
        </div>

        <div className="options">
          <Options selectedCurrency={currency} onCurrencyChange={onCurrencyChange} />
        </div>

      </div>
    </div>
  );
};