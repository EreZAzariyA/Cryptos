import { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Charts = () => {

  useEffect(()=>{
    const timer = setInterval(()=>{
      console.log('message');
    },2000);

    return () => {
      clearInterval(timer);
    };
  },[]);

  return(
    <p>c</p>
  )
};