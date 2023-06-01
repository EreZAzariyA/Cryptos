import { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { useCryptoHistory } from '../../hooks/useCryptoHistory';
import moment from 'moment/moment';
import { numberWithCommas } from '../../utils/helpers';

export const Charts = (props) => {
  const { coin } = props;
  const cryptoHistory = useCryptoHistory(coin);
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    if (cryptoHistory?.length) {
      setDataHistory(cryptoHistory.map((set) => ({uv: Number(set.price).toFixed(2), name: moment(set.time).format('HH:mm')})));
    }
  }, [cryptoHistory]);

  const CustomToolTip = (props) => {
    const { payload } = props;
    if(!payload) return;
    const price = payload[0]?.payload.uv;
    const name = payload[0]?.payload.name;
    return (
      <div className="tooltip" style={{background: 'white', border: '1px solid black'}}>
        <p>{name}</p>
        <p>${numberWithCommas(price)}</p>
      </div>
    );
  };

  return(
    <ResponsiveContainer width="100%" height={100} aspect={2}>
        <AreaChart data={dataHistory}>
          <CartesianGrid type='time' crossOrigin='anonymous' />
          <XAxis dataKey="name" reversed />
          <YAxis domain={['auto', 0]} />
          <Tooltip
            content={<CustomToolTip />}
            allowEscapeViewBox={{x: true, y: true}}
            position={{x: -30, y: 40}}
            contentStyle={{padding: 4}}
          />
          <Area type={'step'} dataKey="uv" stroke={coin?.color} fill={coin?.color} />
        </AreaChart>
    </ResponsiveContainer>
  );
};