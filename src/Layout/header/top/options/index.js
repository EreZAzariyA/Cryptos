import { Select } from "antd";
import { useEffect, useState } from "react";
import { fetchCountriesCurrencies } from "../../../../redux/actions";


export const Options = (props) => {
  const { selectedCurrency, onCurrencyChange } = props;
  const [ currencies, setCurrencies ] = useState([]);

  useEffect(() => {
    const currencies = fetchCountriesCurrencies();
    if (currencies) {
      currencies.sort((a, b)=> (a.abbreviation - b.abbreviation));
      setCurrencies(currencies);
    };
  }, []);

  const onSelect = (val) => {
    onCurrencyChange(val);
  };


  // useEffect(()=> {
  //   console.log(select);
  // },[select]);

  
  return (
    <div className="options-main-container">
      <div className="options-inner-container">
        <div>
          <Select defaultValue={selectedCurrency} onSelect={onSelect}>
            {currencies?.map((currency) => (
              <Select.Option
                key={currency.abbreviation}
                loading={!currency}
                value={currency.abbreviation}
                title={currency.currency}
              >
                {currency.abbreviation}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  )
};