import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCountriesCurrencies, setMainCurrency } from "../../../../redux/actions";
import { Select } from "antd";


export const Options = (props) => {
  const { userCurrency } = props;
  const [ currencies, setCurrencies ] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const currencies = fetchCountriesCurrencies();
    if (currencies) {
      currencies.sort((a, b)=> (a.code - b.code));
      setCurrencies(currencies);
    };
  }, []);

  const onSelect = (currency) => {
    dispatch(setMainCurrency(currency));
  };

  return (
    <div className="options-main-container">
      <div className="options-inner-container">
        <div>
          <Select defaultValue={userCurrency} onSelect={onSelect}>
            {currencies?.map((currency) => (
              <Select.Option
                key={currency.code}
                loading={!currency}
                value={currency.code}
                title={currency.currency}
              >
                {currency.code}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};