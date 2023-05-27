import { useEffect, useState } from "react";
import { Col, Input, Row, Select, Spin, Tooltip } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import "./convertor.css";
import { customIcon } from "../../utils/helpers";
import { fetchCountriesCurrencies } from "../../redux/actions";
import { useCurrencySet } from "../../utils/useCurrencySet";



export const CurrencyConvertor = ({crypto}) => {
  const { currencySet, userCurrency } = useCurrencySet();
  const [currencyToExchange, setCurrencyToExchange] = useState(userCurrency);
  const [valueToExchange, setValueToExchange] = useState(1);
  const [currencyPrefixSelectOpen, setCurrencyPrefixSelectOpen] = useState(false);

  useEffect(() => {
    setCurrencyToExchange(userCurrency);
  }, [userCurrency]);
  
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

  const currencyPrefix = () => {

    const countries = fetchCountriesCurrencies();
    
    const onChange = (val) => {
      setCurrencyPrefixSelectOpen(false);
      setCurrencyToExchange(val);
    }

    return (
      <>
        <Select
          showSearch
          style={{
            width: 80,
          }}
          open={currencyPrefixSelectOpen}
          // onClick={()=>setCurrencyPrefixSelectOpen(true)}
          // onSelect={(val) => setCurrencyPrefixSelectOpen(false) }
          onDropdownVisibleChange={(val) => {setCurrencyPrefixSelectOpen(val); console.log(val);}}
          // onMouseLeave={() => setCurrencyPrefixSelectOpen(false)}
          // defaultValue={currencyToExchange}
          placeholder="Search for coin"
          onChange={(val) => onChange(val)}
          options={[...countries]?.map((country) => ({
            value: country.code,
            label: country.code
          }))}
        />
        <div style={{fontWeight: '700'}}>{currencyToExchange}</div>
      </>
    );
  };
  
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
          <Spin />
        </Col>
        <Col span={24} className="label-box">
          <Input
            dir="RTL"
            // value={valueToExchange}
            // onChange={(val) => setValueToExchange(val)}
            type="number"
            prefix={currencyPrefix()}
          />
        </Col>

      </Row>
    </div>
  );
};