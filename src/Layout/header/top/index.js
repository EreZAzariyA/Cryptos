import { useCurrencySet } from "../../../utils/useCurrencySet";
import { useEffect, useState } from "react";
import "./top.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const TopHeader = () => {
  const { currencySet, userCurrency } = useCurrencySet();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (currencySet && userCurrency && currencySet?.[userCurrency]) {
      setCount(currencySet[userCurrency].length);
    };
  }, [currencySet, userCurrency]);

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