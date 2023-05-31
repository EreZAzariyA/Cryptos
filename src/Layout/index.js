import { Routing } from "./Routing";
import { Header } from "./header";
import "./layout.css";

export const Layout = () => {
  return(
    <div className="layout">
      <Header />
      <Routing />
    </div>
  );
};