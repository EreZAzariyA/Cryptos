import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Col, Row, Spin } from "antd";
import { useCurrencySet } from "../../utils/useCurrencySet";
import { useEffect, useState } from "react";
import { CurrencyConvertor } from "../convertor";
import { fetchCountriesCurrencies } from "../../redux/actions";
import { useLiveData } from "../../utils/useLiveData";
import "./crypto.css";
import { Graph } from "./graph";

export const CryptoPage = () => {
  const { coin } = useParams();
  const { currencySet, userCurrency } = useCurrencySet();
  const [ crypto, setCrypto ] = useState(null);
  const currencies = fetchCountriesCurrencies();
  const liveDataSet = useLiveData();


  useEffect(() => {
    if (liveDataSet) {
      const cryptoCoin = liveDataSet.find((crypto) => (crypto.base === coin));
      if (cryptoCoin) {
        setCrypto(cryptoCoin);
      };
    };
  }, [coin, liveDataSet]);

  const breadcrumbItems = [
    {
      title: <Link to="/">All-Cryptos</Link>,
      key: 'home',
    },
    {
      title: `${crypto?.name}`,
    }
  ];


  if (crypto) {
    return (
      <div className="crypto-main-container">
        <div className="crypto-inner-container">
          <Row justify={'start'} className="breadcrumb">
            <Breadcrumb
              separator=">"
              items={breadcrumbItems}
            />
          </Row>

          <Row className="crypto-details mt-10" align={'middle'} justify={"space-between"}>
            <Col sm={{span: 20}} xs={{span: 24}}>
              <Row justify={{xs: 'center', sm: 'start'}}  align={'middle'} gutter={5}>
                <Col className="crypto-image">
                  <img width={30} src={crypto.image_url} alt={crypto.name}/>
                </Col>
                <Col className="crypto-name">
                  <h1>{crypto.name}</h1>
                </Col>
                <Col className="crypto-base">
                  <h4>{crypto.base}</h4>
                </Col>
              </Row>
            </Col>
            
            <Col sm={{span: 4}} xs={{span: 24}}>
              <Row gutter={25} justify={{xs: 'center', sm: 'start'}}>
                <Col>a</Col>
                <Col>b</Col>
                <Col>c</Col>
              </Row>
            </Col>
          </Row>

          <Row className="crypto-price mt-5" justify={{xs: 'center'}} align={'top'} gutter={[25, 50]}>
            
            <Col className="right-container container" xs={{span: 24}} lg={{span: 16}}>
              <div className="box">
                <div className="current-price-container">
                  <h1>{currencies?.find((c)=>(c.code === userCurrency))?.symbol} {parseFloat(crypto?.latest)?.toFixed(2)}</h1>
                </div>
                <div className="charts">
                  <Graph coin={crypto} />
                </div>
              </div>
            </Col>
            
            <Col className="left-container container" xs={{span: 24}} lg={{span: 8}}>
              <div className="box">
                <div className="convertor">
                  <CurrencyConvertor crypto={crypto} />
                </div>
              </div>
            </Col>
          </Row>

        </div>
      </div>
    );
  } return <Spin />
};