import { useState } from "react";
import { DashboardFirst } from "./first";
import { Highlights } from "./highlights";
import { useResize } from "../../utils/helpers";
import { CoinList } from "./coin-list";
import "./dashboard.css";

export const Dashboard = () => {
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
              <Highlights />
            </div>
          }
          <div className="list">
            <CoinList />
          </div>
        </div>
      </div>
    </div>
  );
};