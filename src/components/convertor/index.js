import { useEffect, useState } from "react";
import { Col, Input, Row, Select, Space, Spin, Tooltip } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import "./convertor.css";
import { customIcon } from "../../utils/helpers";
import { fetchCountriesCurrencies } from "../../redux/actions";
import { useSelector } from "react-redux";



export const CurrencyConvertor = ({crypto}) => {
  const userCurrency = useSelector((state) => state?.currencyReducer?.currency);
  const [currencyToExchange, setCurrencyToExchange] = useState(userCurrency);
  const [valueToExchange, setValueToExchange] = useState(1);
  const [returnedValue, setReturnedValue] = useState(parseFloat(valueToExchange * crypto?.latest)?.toFixed(2))
  const [currencyPrefixSelectOpen, setCurrencyPrefixSelectOpen] = useState(false);
  const countries = fetchCountriesCurrencies();

  useEffect(() => {
    console.log(currencyToExchange);
  }, [currencyToExchange]);

  
  
  const iconProps = {
    width: '20px',
    height: '20px'
  };

  const prefix = () => {
    return (
      <>
        {customIcon(crypto.image_url, iconProps)}
        <div style={{fontWeight: '700'}}>{crypto.base}</div>
      </>
    );
  };

  useEffect(() => {
    const value = parseFloat(valueToExchange * crypto?.latest)?.toFixed(2);
    setReturnedValue(value);
  }, [valueToExchange, crypto]);
  
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
            dir="RTL"
            value={valueToExchange}
            onChange={(val) => setValueToExchange(val.target.value)}
            type="number"
            prefix={prefix()}
          />

        </Col>
        <Col span={24} className="change-icon">
          <p>Switch BTN</p>
        </Col>
        <Col span={24} className="label-box">
          <Space.Compact style={{width: '100%'}}>
            <Select
              style={{ width: '20%' }}
              value={currencyToExchange}
              onChange={(val) => setCurrencyToExchange(val)}
            >
              {countries.map((country) => (
                <Select.Option key={country.code} value={country.code}>
                  {country.code}
                </Select.Option>
              ))}
            </Select>
            
            <Input
              disabled
              type="number"
              dir="RTL"
              style={{ width: '80%' }}
              value={returnedValue}
              // onChange={(e) => setValueToExchange(e.target.value)}
              prefix={countries?.find((c)=>(c.code === currencyToExchange))?.symbol}
            />
          </Space.Compact>
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