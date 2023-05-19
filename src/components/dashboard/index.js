import { useEffect, useState } from "react";
import { DashboardFirst } from "./first";
import { Highlights } from "./highlights";
import { useResize } from "../../utils/helpers";
import { CoinList } from "./coin-list";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";
import { MainActions, fetchData } from "../../redux/actions";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { isResponsive } = useResize();
  const [ withHighlights, setWithHighlights ] = useState(true);
  const coins = useSelector(state => state?.coinsData);

  useEffect(() => {
    fetchData().then((coins) => {
      const newList = coins?.filter((coin)=>(coin.symbol !== 'ETH2'))
      dispatch(MainActions.setCoinsData(newList));
    })
    const timer = setInterval(() => {
      fetchData().then((coins) => {
        dispatch(MainActions.setCoinsData(coins));
      })
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const displayHighlights = (val) => {
    setWithHighlights(val);
  };

  return(
    <div className="dashboard-main-container">
      <div className="dashboard-inner-container">
        <div className="dashboard">
          <DashboardFirst withHighlights={withHighlights} displayHighlights={displayHighlights} />
          {withHighlights && !isResponsive &&
            <div className="highlights">
              <Highlights coins={coins} />
            </div>
          }
          <div className="list">
            <CoinList coins={coins} />
          </div>
        </div>
      </div>
    </div>
  );
};