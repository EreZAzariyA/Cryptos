import { Options } from "./options";
import { useCurrencySet } from "../../../utils/useCurrencySet";
import { useEffect, useState } from "react";
import "./top.css";

export const TopHeader = () => {
  const { currencySet, userCurrency } = useCurrencySet();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (currencySet) {
      setCount(currencySet.length);
    }
  }, [currencySet]);

  return(
    <div className="top-header-main-container">
      <div className="top-header-inner-container">
        <div className="tickets">
          <div className="ticket">Cryptos: {count}</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
          <div className="ticket">cryptos: 250</div>
        </div>

        <div className="options">
          <Options userCurrency={userCurrency} />
        </div>

      </div>
    </div>
  );
};