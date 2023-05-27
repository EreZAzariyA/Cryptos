import { TopHeader } from "./top";
import "./header.css";

export const Header = () => {
  return(
    <div className="header-main-container">
      <div className="header-inner-container">
        <div className="top-header">
          <TopHeader />
        </div>
      </div>
    </div>
  );
};