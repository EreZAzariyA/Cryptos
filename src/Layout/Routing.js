import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/dashboard";
import { CryptoPage } from "../components/crypto";

export const Routing = () => (
  <Routes>
    <Route path="/" element={<Dashboard/>} />
    <Route path="/cryptos/:coin" element={<CryptoPage />} />

    <Route path="*" element={<p>Page not found</p>}/>
  </Routes>
)