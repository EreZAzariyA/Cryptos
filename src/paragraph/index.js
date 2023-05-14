import { useCallback, useEffect, useState } from 'react';
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
  LineController,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Spin } from 'antd';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  Legend
);

const weekDays = moment().localeData().weekdays();
const format = 'HH:mm';

const Paragraph = (props) => {
  const { coin, selectedRange } = props;
  const [data, setData ] = useState();

  const [ today, setToday ] = useState(null);

  const [dataHistory, setDataHistory] = useState([]);
  const [ range, setRange ] = useState({range: [moment().startOf(selectedRange).valueOf(), moment().endOf(selectedRange).valueOf()], granularity: 1440 });
  const [ labels, setLabels ] = useState({start: null, end: null, labels: []});

  useEffect(() => {
    const date = moment().valueOf();
    if (!today) {
      setToday(date);
    };

    const timer = setInterval(() => {
      const newDate = moment().valueOf();
      setToday(newDate);
    }, 1000 * 60 * 60 * 24);

    return () => {
      clearInterval(timer);
    }
  },[today]);
  
  const changeLabels = useCallback((selectedRange) => {
    const timer = setInterval(() => {
      if (selectedRange) {
        switch (selectedRange) {
          case 'day':
            const dayAgo = moment().format(format);
            setLabels({...labels, labels: weekDays, start: dayAgo });
            break;
          case 'week':
            const weekAgo = moment().add(-7, 'days').format(format);
            setLabels({...labels, labels: weekDays, start: weekAgo });
            break;
          case 'month':
            break;
          default:
            setLabels({...labels, labels: weekDays, start: moment().format(format), end: moment().format(format) });
          break;
        };
      };

      return () => {
        clearInterval(timer);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    setRange({range: [moment().startOf(selectedRange).valueOf(), moment().endOf(selectedRange).valueOf()], granularity: 1440 });
    changeLabels(selectedRange);
  },[selectedRange,changeLabels]);


  const options = {
    ...labels.labels,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 100,
          boxHeight: 20,
          font: {
            size: 20
          }
        }
      },
      title: {
        display: true,
        text: selectedRange?.toUpperCase(),
        font: {
          size: 20
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      }
    },
  };

  useEffect(()=>{
    if (dataHistory?.length > 0) {
      const data = {
        // labels,
        datasets: [
          {
            fill: true,
            label:` ${parseFloat(coin.latest).toFixed(2)}$`,
            data: [...dataHistory],
            borderColor: coin.color,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      setData(data.datasets);
      // console.log(data.datasets);
    };
  },[coin.color, coin.latest, dataHistory]);

  
  const dataa = {
    // labels,
    datasets: [
      {
        fill: true,
        label:` ${parseFloat(coin.latest).toFixed(2)}$`,
        data: [...dataHistory],
        borderColor: coin.color,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  useEffect(()=>{
    // console.log(dataHistory.splice(0,10));
  },[dataHistory]);


  const fetchData = async () => {
    const crypto = coin.base.toUpperCase();
    try {
      const response = await fetch(`https://api.coinbase.com/v2/prices/${crypto}-USD/historic?start=${range.range[0]}&end=${range.range[1]}&granularity=${range.granularity}`);
      const data = await response.json();
      if (data?.data) {
        const history = data.data.prices;
        const dataHistory = [...history].map((data) => ({
          x: moment(data?.time).format(format),
          y: Number(data?.price).toFixed(2)
        }));
        setDataHistory(dataHistory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (!dataHistory || dataHistory.length === 0) {
      fetchData();
    };
    const timer = setInterval(async () => {
      fetchData();
      console.log('fetched');
    }, 5000);
    
    return () => {
      clearInterval(timer);
    }
  },[]);

  if (data && dataHistory) {
    return (
      <Line
        style={{width: '100%', margin: 'auto' }}
        data={{datasets: data}}
        options={
          {
            ...options,
            scales: {
              ticks: { 
                axis: 'x',
                reverse: true,
                display: true,
                // labels: [],
                autoSkip: false,
                ticks: {
                  display: true,
                  font: {
                    size: 10,
                    lineHeight: '20px',
                    weight: '10px'
                  },
                  autoSkip:false,
                  color: 'black',
                  z: 0,
                },
                time: {
                  unit: 'day',
                  round: 'day'
                }
                // type: 'time',
                // adapters: {date: 'date-fns'}
                
              },
            }
          }}
      />
    );
  } return <Spin />
};

export default Paragraph;