import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { numberWithCommas } from '../../utils/helpers';
import { MainActions } from '../../redux/actions';


const weekDays = moment().localeData().weekdays();
const format = 'HH:mm';
const URL = 'wss://ws-feed.pro.coinbase.com';

export const Charts = (props) => {
  const { coin, selectedRange } = props;
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(URL);
  const coins = useSelector((state)=>state?.coinsData);
  const [mapCoins, setMapCoins] = useState([]);


  const [dataHistory, setDataHistory] = useState([]);
  const [ range, setRange ] = useState({range: [moment().startOf(selectedRange).valueOf(), moment().endOf(selectedRange).valueOf()], granularity: 1440 });
  const [ labels, setLabels ] = useState({start: null, end: null, labels: []});
  const dispatch = useDispatch();

  // useEffect(() => {
	// 	if (readyState === ReadyState.OPEN) {
	// 		sendJsonMessage({
	// 			type: "subscribe",
	// 			product_ids: [`${coin.base}-${coin.currency}`],
	// 			channels: ['ticker'],
	// 		});
	// 	}
	// }, [readyState]);

  // useEffect(() => {
	// 	if (lastJsonMessage) {
	// 		const { channels, ...payload } = lastJsonMessage;
  //     const coinSymbol = payload.product_id;
  //     if (coinSymbol) {
  //       console.log(payload);
  //     }
  //   }
	// }, [lastJsonMessage]);



  useEffect(() => {
    if (mapCoins?.length) {
      console.log(mapCoins);
    }
  }, [mapCoins]);


  // const CustomToolTip = (props) => {
  //   const { payload } = props;
  //   if(!payload) return;
  //   const price = payload[0]?.payload.uv;
  //   const name = payload[0]?.payload.name;

  //   return (
  //     <div className="tooltip" style={{background: 'white', border: '1px solid black'}}>
  //       <p>{name}</p>
  //       <p>${numberWithCommas(price)}</p>
  //     </div>
  //   )
  // }

  return(
    <ResponsiveContainer width="100%" height={100} aspect={2}>
        <AreaChart
          data={dataHistory}
        >
          <CartesianGrid type='time' crossOrigin='anonymous' />
          <XAxis dataKey="name" reversed />
          <YAxis domain={['auto', 0]} />
          <Tooltip
            // content={<CustomToolTip />}
            allowEscapeViewBox={{x: true, y: true}}
            position={{x: -30, y: 40}}
            contentStyle={{padding: 4}} />
          <Area type={'step'} dataKey="uv" stroke={coin.color} fill={coin.color} />
        </AreaChart>
    </ResponsiveContainer>
  );
};