import { useEffect, useState } from "react";
import { Col, Image, Input, InputNumber, Row, Select, Space, Spin, Tooltip } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import "./convertor.css";
import { customIcon } from "../../../utils/helpers";
import { fetchCountriesCurrencies } from "../../../redux/actions";
import { useSelector } from "react-redux";

const { Option } = Select;

export const CurrencyConvertor = ({crypto}) => {
  const userCurrency = useSelector((state) => state?.currencyReducer?.currency);
  const coinsData = useSelector((state) => state?.coinsReducer?.coinsData);
  const [currencyToExchange, setCurrencyToExchange] = useState(userCurrency);
  const [valueToExchange, setValueToExchange] = useState(1);
  const [returnedValue, setReturnedValue] = useState(parseFloat(valueToExchange * crypto?.latest)?.toFixed(2))
  const [currencyPrefixSelectOpen, setCurrencyPrefixSelectOpen] = useState(false);
  const countries = fetchCountriesCurrencies();


  useEffect(() => {
    const value = parseFloat(valueToExchange * crypto?.latest)?.toFixed(2);
    setReturnedValue(value);
  }, [valueToExchange, crypto]);

  const iconStyle = {
    width: '20px',
    height: '20px'
  };
  
  const coinPrefix = (
    <div className="coin-prefix">
      <img src={crypto.image_url} style={iconStyle} alt='' />
      <p className="base">{crypto.base}</p>
    </div>
  );

  const currencySelectPrefix = (
    <div className="currency-select-prefix">
      <Select
        defaultValue={currencyToExchange}
        onChange={(val) => {
          console.log(val);
          setCurrencyToExchange(val);
          const value = coinsData?.[val]?.find((c)=>(c.base === crypto.base))?.latest;
          console.log(value);
          setReturnedValue(parseFloat(value)?.toFixed(2))
        }}
      >
        {countries?.map((country) => (
          <Option
            title={country.countryName}
            key={country.code}
            value={country.code}
          >
            {country.code}
          </Option>
        ))}
      </Select>
    </div>
  );
  
  return (
    <div className="convertor-container">
      <Row>
        <Col>
          <h1 className="title">Currency Convertor</h1>
        </Col>
      </Row>
      <Row gutter={[10, 5]}>
        <Col span={24} className="label-box">
          <Input
            min={'0'}
            type="number"
            dir="RTL"
            style={{ width: '100%' }}
            value={valueToExchange}
            onChange={(e) => setValueToExchange(e.target.value)}
            prefix={coinPrefix}
          />
        </Col>

        <Col span={24} className="change-icon">
          <p>Switch BTN</p>
        </Col>

        <Col span={24} className="label-box">
          <InputNumber
            controls={false}
            dir="RTL"
            style={{width: '100%'}}
            value={returnedValue}
            addonBefore={currencySelectPrefix}
            addonAfter={countries?.find((c)=>(c.code === currencyToExchange))?.symbol}
          />
        </Col>

      </Row>
    </div>
  );
};






// const currencyPrefix = () => {

//   const countries = fetchCountriesCurrencies();
  
//   const onChange = (val) => {
//     setCurrencyPrefixSelectOpen(false);
//     setCurrencyToExchange(val);
//   }

//   return (
//     <>
//       <Select
//         showSearch
//         style={{
//           width: 80,
//         }}
//         open={currencyPrefixSelectOpen}
//         onClick={()=>setCurrencyPrefixSelectOpen(!currencyPrefixSelectOpen)}
//         onSelect={(val) => setCurrencyPrefixSelectOpen(false) }
//         defaultValue={currencyToExchange}
//         placeholder="Search for coin"
//         onChange={(val) => onChange(val)}
//         options={[...countries]?.map((country) => ({
//           value: country.code,
//           label: country.code
//         }))}
//       />
//       <div style={{fontWeight: '700'}}>{currencyToExchange}</div>
//     </>
//   );
// };