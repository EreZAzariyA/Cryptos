// import moment from 'moment';
import { useEffect, useState } from 'react';
// import useWebSocket from "react-use-websocket";
// import { useDispatch, useSelector } from "react-redux"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { useCryptoHistory } from '../../../hooks/useCryptoHistory';
import moment from 'moment/moment';
// import { numberWithCommas } from '../../utils/helpers';


// const weekDays = moment().localeData().weekdays();
const format = 'HH:mm';

export const Graph = (props) => {
  const { coin } = props;
  const cryptoHistory = useCryptoHistory(coin);
  const [dataHistory, setDataHistory] = useState([]);


  useEffect(() => {
    if (cryptoHistory?.length) {
      setDataHistory(cryptoHistory.map((set) => ({uv: Number(set.price).toFixed(2), name: moment(set.time).format(format)})));
    }
  }, [cryptoHistory]);

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
      <AreaChart width={900} height={250} data={dataHistory} >
        <CartesianGrid type='time' />
        <XAxis dataKey="name" reversed />
        <YAxis domain={['auto', 0]} />
        <Tooltip
          // content={<CustomToolTip />}
          allowEscapeViewBox={{x: true, y: true}}
          contentStyle={{padding: 4}} />
        <Area type={'linear'} dataKey="uv" stroke={coin?.color} fill={coin?.color} />
      </AreaChart>
  );
};