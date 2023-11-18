import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import axios from "axios";
import { Baseurl } from "../urls/Baseurl";
import Loader from "../loader/Loader";
import "./Exchanges.css";
import Model from "../model/Model";

const Exchanges = () => {
  const [loading, setLoadong] = useState(true);
  const [exchange, setExchange] = useState([]);
  useEffect(() => {
    const getExchangeData = async () => {
      const { data } = await axios.get(`${Baseurl}/exchanges`);
      console.log(data);
      setExchange(data);
      setLoadong(false);
    };
    getExchangeData();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Model />
          <div>
            {
              exchange.map((exchanges,i) => {
                return(
                  <div key={i} className="ex-cards">
              <div className="images">
              <img src={exchanges.image} alt="" />
              </div>

              <div className="name">
                {exchanges.name}
              </div>
              <div className="price">
               {exchanges.trade_volume_24h_btc.toFixed(2)}
              </div>
              <div className="rank">
               {exchanges.trust_score_rank}
              </div>
            </div>
                )
              })
            }
          </div>
        </>
      )
    }
    </>
  );
};

export default Exchanges;
