import { useEffect, useState } from 'react';
import { Table, Row, Col, Spin, Radio } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './App.css';
import Paragraph from './paragraph';

function App() {
  const [ coins, setCoins ] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [ selectedRange, setSelectedRange ] = useState('day');

  useEffect(() => {
    if (coins.length === 0) {
      fetchData();
    };
    const timer = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(timer);
  }, [coins]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://coinbase.com/api/v2/assets/search?base=USD&filter=listed&include_prices=true&resolution=day&sort=rank&limit=100'
      );
      const data = await response.json();
      if (data?.data) {
        const coins = data.data;
        const newLIst = [...coins].filter((coin) => coin.base !== 'ETH2');
        setCoins([...newLIst]);
      };

    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const data = [...coins].map((coin, index) => {
      return {
        ...coin,
        key: coin.id,
        num: index + 1
      }
    });
    setDataSource(data);
  }, [coins]);

  const columns = [
    {
      key: 'num',
      title: '#',
      dataIndex: 'num',
      width: 50,
      fixed: 'left',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        return a.num - b.num
      }
    },
    {
      key: 'base',
      title: 'Coin',
      dataIndex: 'base',
      render: (value, record) => {
        return (
          <Row justify={'center'} align={'middle'}>
            <Col span={8}>
              <img src={record.image_url} className='coin-img' alt="" />
            </Col>
            <Col span={8}>
             <p>{value}</p>
            </Col>
            <Col span={8}>
              <p>{record.name}</p>
            </Col>
          </Row>
        )
      },
      fixed: 'left',
      width: 220,
      sorter: (a, b) => {
        return a.base.localeCompare(b.base)
      }
    },
    {
      key: 'latest',
      title: 'Price',
      dataIndex: 'latest',
      render: (value, record) => {
        const textColor = record.percent_change >= 0 ? 'green' : 'red';
        const arrow = record.percent_change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;

        return (
          <div style={{color: textColor}}>
            <span>${parseFloat(value).toFixed(2)}</span>
            {arrow}
          </div>
        );
      },
      sorter: (a, b) => {
        return a.latest - b.latest
      },
      width: 120,
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
          sorter: (a, b) => (
            a.latest_price.percent_change.hour - b.latest_price.percent_change.hour
          )
        },
        {
          key: '24h',
          title: '24 Hour',
          render: (_,record) => {
            const textColor = record.latest_price.percent_change.day >= 0 ? 'green' : 'red';
            return <p style={{color: textColor}}>{parseFloat(record.latest_price.percent_change.day * 100).toFixed(2)}%</p>
          },
          sorter: (a, b) => (
            a.latest_price.percent_change.day - b.latest_price.percent_change.day
          )
        },
        {
          key: '7d',
          title: '7 Days',
          render: (_,record) => {
            const textColor = record.latest_price.percent_change.week >= 0 ? 'green' : 'red';
            return <p style={{color: textColor}}>{parseFloat(record.latest_price.percent_change.week * 100).toFixed(2)}%</p>
          },
          sorter: (a, b) => (
            a.latest_price.percent_change.week - b.latest_price.percent_change.week
          )
        },
      ]
    },
    {
      key: 'market_cap',
      title: 'Market Cap',
      dataIndex: 'market_cap',
      render: (_,record) => {
        const value = parseFloat(record.market_cap);
        return <p>{value} B</p>
      },
      width: 160
    },
    {
      key: 'volume_24h',
      title: 'Volume(24h)',
      dataIndex: 'volume_24h',
      render: (_,record) => {
        const value = parseFloat(record.market_cap);
        return <p>{value} B</p>
      },
      width: 160
    },
    {
      key: 'circulating_supply',
      title: 'Circulating Supply',
      dataIndex: 'circulating_supply',
      render: (_,record) => {
        const value = parseFloat(record.market_cap);
        return <p>{value} {record.base}</p>
      },
      width: 180
    },
    // {
    //   key: 'last_7_days',
    //   title: 'Last 7 days',
    //   render: (record) => {
    //     return <Paragraph coin={record} />
    //   },
    //   width: 200
    // },
  ];

  const onRangeChange = (e) => {
    const selectedRange = e.target.value;
    setSelectedRange(selectedRange);
    // console.log([moment().startOf(selectedRange),moment().endOf(selectedRange)]);
  };

  if (coins.length >= 0) {
    return (
      <div className="main-container">
        <div className="inner-container">
          <div className="table">
            <Table
              bordered
              columns={columns}
              dataSource={dataSource}
              loading={coins.length === 0}
              expandable={{ expandedRowRender: (record) => {
                return (
                  <div style={{margin: 0, padding: '10px', maxHeight: '90%', height: '300px', width: '100%'}} key={record.id}>
                    <Paragraph coin={record} selectedRange={selectedRange} />
                    
                    <Radio.Group onChange={onRangeChange} defaultValue={selectedRange}>
                      <Radio.Button value={'day'}>24h</Radio.Button>
                      <Radio.Button value={'week'}>Last 7 days</Radio.Button>
                      <Radio.Button value={'month'}>Last month</Radio.Button>
                    </Radio.Group>

                  </div>
                );
              }}}
              scroll={{
                x: 1700,
                y: 600
              }}
            />
          </div>
        </div>
      </div>
    );
  } return <Spin />
}

export default App;
