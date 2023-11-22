import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import axios from "axios";
import { Baseurl } from "../urls/Baseurl";
import Loader from "../loader/Loader";
import "./Coins.css";
import { Link } from "react-router-dom";

const Coins = () => {
  const [loading, setLoadong] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const currencySymbol = currency === "pkr" ? "Rs" : "$";

  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(
        `${Baseurl}/coins/markets?vs_currency=${currency}`
      );
      console.log(data);
      setCoins(data);
      setLoadong(false);
    };
    getCoinsData();
  }, [currency]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />

          <div className="searchbar">
          <input type="text" 
            placeholder='Search Your Coins ' 
            onChange={(e)=>setSearch(e.target.value)}
        
          
            />
         
          </div>

          <div className="btns">
          <button onClick={() => setCurrency("pkr")}>PKR</button>
          <button onClick={() => setCurrency("usd")}>USD</button>
          
          </div>
          {coins.filter((data)=>{
         if(search === ""){
          return data
         }else if(data.name.toLowerCase().includes(search.toLowerCase())){
          return data
         }
          }).map((coindata, i) => {
            return (
              <CoinCard key={i} coindata={coindata} id={coindata.id} currencySymbol={currencySymbol} />
            );
          })}
        </>
      )}
    </>
  );
};



function CoinCard({ coindata, i, currencySymbol, id }) {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link to={`/coins/${id}`} style={{ color: "white", textDecoration: "none" }}>
    <div key={i} className="ex-cards">
      <div className="images">
        <img height={90} src={coindata.image} alt="" />
      </div>

      <div className="name">
        <h4 style={{ color: "Yellow" }}> Name </h4> {coindata.name}
      </div>
      <div className="price">
        <h6 style={{ color: "Yellow" }}>
          Current Price {currencySymbol}
        </h6>{" "}
        {coindata.current_price.toFixed(2)}
      </div>
      <div className="rank" style={profit? {color:"green"} : {color:"red"}}>
        <h5 style={{ color: "Yellow" }}>rank</h5>{" "}
        { profit ? '+' + coindata.price_change_percentage_24h.toFixed(2) : coindata.price_change_percentage_24h.toFixed(2) }
      </div>

      <div>
        <h5 style={{ color: "Yellow" }}>symbol</h5> {coindata.symbol}
      </div>
    </div>
    
    </Link>

  );
}
export default Coins;
