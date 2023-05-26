import { useEffect, useMemo, useState } from 'react';
import { Col, Row, Table } from "antd";
import { numberWithCommas, useResize } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { fetchCurrencySymbol } from '../../redux/actions';
import { useNavigate, NavLink } from "react-router-dom"

export const CoinList = (props) => {
  const {liveDataSet} = props;
  const { isMobile } = useResize();
  const [ dataSource, setDataSource ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (liveDataSet?.length) {
      liveDataSet.forEach((coin) => {
        coin.num = liveDataSet.indexOf(coin) + 1;
        coin.key = coin.id
      })
      setDataSource(liveDataSet);
    };
  }, [liveDataSet]);

  const columns = [
    {
      key: 'num',
      title: 'Rank',
      dataIndex: 'num',
      width: 70,
      fixed: isMobile ? '' : 'left',
      defaultSortOrder: 'ascend',
      shouldCellUpdate: (a, b) => (a.num !== b.num),
      // sorter: (a, b) => (a.num - b.num),
      render: (val) => (<p>{val}</p>)
    },
    {
      key: 'base',
      title: 'Coin',
      dataIndex: 'base',
      shouldCellUpdate: (a, b) => (a.base !== b.base),
      render: (value, record) => {
        return (
          <Row justify={'center'} align={'middle'}>
            <Col span={8}>
              <img src={record.image_url} className='coin-img' alt="" />
            </Col>
            <Col span={8}>
             <h4>{value}</h4>
            </Col>
            <Col span={8}>
              <h4>{record.name}</h4>
            </Col>
          </Row>
        )
      },
      fixed: isMobile ? '' : 'left',
      width: 220,
      // sorter: (a, b) => {
      //   return a.base.localeCompare(b.base)
      // }
    },
    {
      key: 'latest',
      title: 'Price',
      dataIndex: 'latest',
      shouldCellUpdate: (a,b) => {
        return a.latest !== b.latest
      },
      render: (value, record) => {
        const textColor = record.percent_change >= 0 ? 'green' : 'red';
        const arrow = record.percent_change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;

        return (
          <div style={{color: textColor}}>
            <span>
              <span
                style={{color: textColor}}
                dangerouslySetInnerHTML={{__html: fetchCurrencySymbol(record.currency)}}
              />
              {numberWithCommas(parseFloat(value).toFixed(2))}
              </span>
            {arrow}
          </div>
        );
      },
      // sorter: (a, b) => {
      //   return a.latest - b.latest
      // },
    width: 150,
    },
    {
      key: 'last_changes',
      title: 'Last changes',
      children: [
        {
          key: '1h',
          title: '1 Hour',
          render: (_,record) => {
            const textColor = record.latest_price.percent_change.hour >= 0 ? 'green' : 'red';
            // const arrow = record.latest_price.percent_change.hour >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
            return <p style={{color: textColor}}>{parseFloat(record.latest_price.percent_change.hour * 100).toFixed(2)}%</p>
          },
          // sorter: (a, b) => (
          //   a.latest_price.percent_change.hour - b.latest_price.percent_change.hour
          // ),
          width: 120
        },
        {
          key: '24h',
          title: '24 Hour',
          render: (_,record) => {
            const textColor = record.latest_price.percent_change.day >= 0 ? 'green' : 'red';
            return <p style={{color: textColor}}>{parseFloat(record.latest_price.percent_change.day * 100).toFixed(2)}%</p>
          },
          // sorter: (a, b) => (
          //   a.latest_price.percent_change.day - b.latest_price.percent_change.day
          // ),
          width: 120
        },
        {
          key: '7d',
          title: '7 Days',
          render: (_,record) => {
            const textColor = record.latest_price.percent_change.week >= 0 ? 'green' : 'red';
            return <p style={{color: textColor}}>{parseFloat(record.latest_price.percent_change.week * 100).toFixed(2)}%</p>
          },
          // sorter: (a, b) => (
          //   a.latest_price.percent_change.week - b.latest_price.percent_change.week
          // ),
          width: 120
        },
      ]
    },
    {
      key: 'market_cap',
      title: 'Market Cap',
      dataIndex: 'market_cap',
      render: (_,record) => {
        const value = parseFloat(record.market_cap);
        return <p>${numberWithCommas(value)}</p>
      },
      width: 180
    },
    {
      key: 'volume_24h',
      title: 'Volume(24h)',
      dataIndex: 'volume_24h',
      render: (_,record) => {
        const value = parseFloat(record.market_cap);
        return <p>${numberWithCommas(value)}</p>
      },
      width: 180
    },
    {
      key: 'circulating_supply',
      title: 'Circulating Supply',
      dataIndex: 'circulating_supply',
      render: (_,record) => {
        const value = parseFloat(record.market_cap);
        return <p>{numberWithCommas(value)} {record.base}</p>
      },
      width: 200
    },
    // {
    //   key: 'last_7_days',
    //   title: 'Last 7 days',
    //   dataIndex: 'volume_24h',
    //   render: (_,record) => {
    //     return <Charts coin={record} />
    //   },
    //   width: 200
    // },
  ];

  return(
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={!liveDataSet?.length}
      scroll={{
        x: 1700,
        y: 400
      }}
   />
  );
};