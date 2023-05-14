import { useEffect, useState } from 'react';
import { CoinList } from './components/coin-list';
import './App.css';
import { Layout } from './Layout';

function App() {
  const [ coins, setCoins ] = useState([]);

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

  return (
    <div className="main-container">
      <div className="inner-container">
        <div className="main">
          <Layout coins={[...coins]} />
        </div>
      </div>
    </div>
  );
}

export default App;
