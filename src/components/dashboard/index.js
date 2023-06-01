import { useState } from "react";
import { DashboardFirst } from "./first";
import { Highlights } from "./highlights";
import { useResize } from "../../utils/helpers";
import { CoinList } from "../coin-list";
import { useLiveData } from "../../utils/useLiveData";
import "./dashboard.css";

export const Dashboard = () => {
  const liveData = useLiveData();
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
              <Highlights liveData={liveData} />
            </div>
          }
          <div className="list">
            <CoinList liveData={liveData} />
          </div>
          
        </div>
      </div>
    </div>
  );
};