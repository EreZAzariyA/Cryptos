import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CurrencyConvertor } from "./convertor";
import { fetchCountriesCurrencies } from "../../redux/actions";
import { Graph } from "./graph";
import { Breadcrumb, Col, Row, Spin } from "antd";
import "./crypto.css";
import { Trending } from "./Trending";

export const CryptoPage = () => {
  const { coin } = useParams();
  const [ crypto, setCrypto ] = useState(null);
  const currencies = fetchCountriesCurrencies();
  const coinsData = useSelector((state) => state?.coinsReducer?.coinsData);
  const userCurrency = useSelector((state) => state?.currencyReducer?.currency);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    if (coinsData && userCurrency && coinsData?.[userCurrency]) {
      setCrypto(coinsData[userCurrency]?.find((cryptoCoin) => (cryptoCoin.base === coin)));
      setTrending([...coinsData[userCurrency]].filter((c)=>c.base !== coin).slice(0, 8));
    }
  }, [coin, coinsData, userCurrency]);


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
            <Breadcrumb separator=">" items={breadcrumbItems} />
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

                <div className="convertor">
                  <Trending trending={trending} />
                </div>
              </div>
            </Col>
          </Row>

        </div>
      </div>
    );
  } return <Spin />
};
