import { useState } from "react";
import { DashboardFirst } from "./first";
import { Highlights } from "./highlights";
import { useResize } from "../../utils/helpers";
import { CoinList } from "../coin-list";
import "./dashboard.css";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const coinsData = useSelector((state) => state?.coinsReducer?.coinsData);
  const { isResponsive } = useResize();
  const [ withHighlights, setWithHighlights ] = useState(true);

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
              <Highlights coinsData={coinsData} />
            </div>
          }
          <div className="list">
            <CoinList coinsData={coinsData} />
          </div>
          
        </div>
      </div>
    </div>
  );
};