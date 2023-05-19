import { Dashboard } from "../components/dashboard";
import { Header } from "./header";
import "./layout.css";

export const Layout = () => {

  return(
    <div className="layout">
      <Header />
      <Dashboard />
    </div>
  );
};