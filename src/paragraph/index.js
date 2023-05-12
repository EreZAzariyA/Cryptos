import { useEffect, useState } from 'react';
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Paragraph = (props) => {
  const { coin, selectedRange } = props;

  const [dataHistory, setDataHistory] = useState([]);
  const [ today, setToday ] = useState(null);
  const [ range, setRange ] = useState({range: [moment().startOf(selectedRange).valueOf(), moment().endOf(selectedRange).valueOf()], granularity: 3600 });
  const [ labels, setLabels ] = useState([]);

  useEffect(() => {
    const date = moment().valueOf();
    if (!today) {
      setToday(date);
    };

    const timer = setInterval(() => {
      const newDate = moment().valueOf();
      setToday(newDate);
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(timer);
  },[today]);

  useEffect(() => {
    switch(selectedRange) {
      case 'week':
        const days = moment().localeData().weekdays();
        setLabels(days);
        setRange({...range, granularity: getSecondes('week') })
        break;
      case 'month':
        const weeks = moment().localeData().months();
        setLabels(weeks);
        setRange({...range, granularity: getSecondes('month') })
        break;
      default:
        const hours = Array.from({ length: 24 }, (_, index) => index + 1);
        setLabels(hours);
        setRange({...range, granularity: getSecondes() })
        break;
    };
  }, [today, selectedRange]);

  useEffect(() => {
    // dataHistory.push({price: Number(coin.latest).toFixed(2), time: new Date().toJSON()});
    // // dataHistory.sort((a,b)=> (a.time - b.time));
    // // setDataHistory([...dataHistory],{price: coin.latest, time: new Date().toJSON()});
    // setDataHistory([...dataHistory]);
console.log(coin.latest_price);
  }, [coin]);


  const getSecondes = (prop) => {
    const seconds = 60;
    const minutes = 60;
    
    let value;
    switch (prop) {
      case 'week':
        const hours = seconds * minutes * 24;
        value = hours;
        break;
      case 'month':
        const days = seconds * minutes * 24 * moment().month() + 1;
        value = days;
        break;
      default:
        value = seconds * minutes;
        break;
    };
    return value;
  }

  const fetchData = async () => {
    try {
      const crypto = coin.base.toUpperCase();
      const response = await fetch(`https://api.coinbase.com/v2/prices/${crypto}-USD/historic?start=${range.range[0]}&end=${range.range[1]}&granularity=${range.granularity}`);
      const data = await response.json();
      if (data?.data) {
        const dataHistory = data.data.prices;
        // setDataHistory([...dataHistory]);
        const historic = [...dataHistory].map((value) => {
          return {
            ...value,
            time: moment(value.time).format('LLLL')
          }
        });
        setDataHistory(dataHistory);
        console.log({historic});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (dataHistory.length === 0) {
      fetchData();
    };
    fetchData();
    
    const timer = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(timer);
  },[]);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: selectedRange?.toUpperCase(),
      },
    },
    scales: {
      x: {
        beginAtZero: false,
        reverse: true,
        min: moment(coin.latest_price.timestamp).format('LLLL'),
        // max: 10
      },
      y: {
        beginAtZero: false,
        // min: coin.latest * (coin.latest_price.present_change?.hour * 100)
      }
    },
  };
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label:` ${parseFloat(coin.latest).toFixed(2)}$`,
        data: dataHistory.map((price) => ({
          x: moment(price.time).format('LLLL'),
          y: price.price,
        })),
        borderColor: coin.color,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return <Line style={{ width: '100%', margin: 'auto' }} options={options} data={data} />;
};

export default Paragraph;