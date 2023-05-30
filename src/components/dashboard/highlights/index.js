import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { fetchCurrencySymbol } from "../../../redux/actions";
import "./highlights.css";

const box_table_coins_length = 3;

export const Highlights = (props) => {
  const { coinsData } = props;
  const currency = useSelector((state) => state?.currencyReducer?.currency);
  const [topCoins, setTopCoins] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    if (coinsData?.[currency]?.length) {
      findTopCoins(coinsData[currency]);
      findRecentlyAddedCoins(coinsData[currency]);
    }
  }, [currency, coinsData]);

  const findTopCoins = (coins) => {
    const sortedCoins = [...coins].sort((a, b) => b.latest_price.percent_change.day - a.latest_price.percent_change.day);
    const top =  sortedCoins.slice(0, box_table_coins_length);
    setTopCoins(top);
  };
  
  const findRecentlyAddedCoins = (coins) => {
    const format = 'YYYY-MM-DD'
    const sortedCoins = [...coins].sort((a, b) => moment(a.launched_at, format) - moment(b.launched_at, format));
    const recentlyAdded =  sortedCoins.slice(0, box_table_coins_length);
    setRecentlyAdded(recentlyAdded);
  };

  const findMostTrendingCoins = (coins) => {

  };

  const createTable = (type, coins) => {
    let column;
    // eslint-disable-next-line default-case
    switch(type){
      case "Top 24h":
        column = {
          key: 'Top-24h',
          render: (val,record) => {
            const textColor = record.latest_price.percent_change.day >= 0 ? 'green' : 'red';
            const arrow = record.latest_price.percent_change.day >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  
            return (
              <div style={{color: textColor}} key={record.id}>
                <span>{parseFloat(record.latest_price.percent_change.day * 100).toFixed(2)}%</span>
                <span>
                  {arrow}
                </span>
              </div>
            );
          },
          sorter: (a, b) => (
            a.latest_price.percent_change.day - b.latest_price.percent_change.day
          )
        };
      break;
      case 'Recently added':
        column = {
          key: 'Recently-added',
          render: (_, record) => {
            const textColor = record.percent_change >= 0 ? 'green' : 'red';
            const arrow = record.percent_change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
            
            return (
              <div style={{color: textColor}}>
                <span>
                  <span style={{color: textColor}} dangerouslySetInnerHTML={{__html: fetchCurrencySymbol(record.currency)}}/>
                  {parseFloat(record.latest).toFixed(2)}
                </span>
                {arrow}
              </div>
            );
          },
          sorter: (a, b) => {
            return a.latest - b.latest
          }
        };
      break;
      case 'Trending':
        column = {
          key: 'Trending',
          render: (_, record) => {
            const textColor = record.percent_change >= 0 ? 'green' : 'red';
            const arrow = record.percent_change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
            
            return (
              <div style={{color: textColor}}>
                <span>${parseFloat(record.latest).toFixed(2)}</span>
                {arrow}
              </div>
            );
          },
          sorter: (a, b) => {
            return a.latest - b.latest
          }
        };
      break;
    }

    const columns = [
      {
        key: 'name',
        dataIndex: 'name',
        width: '70%'
      },
      {...column, width: '30%'}
    ];

    return (
      <Table
        rootClassName="highlight-table"
        loading={!coinsData?.[currency]?.length}
        key={type}
        pagination={false}
        showHeader={false}
        size="small"
        columns={columns}
        dataSource={coins}
      />
    );
  };

  return (
    <div className="highlights-main-container">
      <div className="highlights-inner-container">
        <div className="highlights">
          {/* Boxes: */}
          <div className="box top">
            <div className="box-head">
              <div className="box-title">
                <h2>Top 24h</h2>
              </div>
              <div className="view-more">
                <Button type="link">More</Button>
              </div>

            </div>
            {createTable('Top 24h', topCoins )}
          </div>
          <div className="box recently">
            <div className="box-head">
              <div className="box-title">
                <h2>Recently added</h2>
              </div>
              <div className="view-more">
                <Button type="link">More</Button>
              </div>
            </div>
            {createTable('Recently added', recentlyAdded )}
          </div>
          <div className="box trending">
            <div className="box-head">
              <div className="box-title">
                <h2>Trending</h2>
              </div>
              <div className="view-more">
                <Button type="link">More</Button>
              </div>
            </div>
            {createTable('Trending', trending )}
          </div>
        </div>
      </div>
    </div>
  );
};
