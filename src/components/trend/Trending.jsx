import React, { useEffect, useState }  from "react";
import Header from "../header/Header";
import axios from "axios";
import { Baseurl } from "../urls/Baseurl";
import Loader from "../loader/Loader";
import "./Trending.css";
function Trending() {
    const [loading, setLoading] = useState(true);
    const [trendingData, setTrendingData] = useState([]);

 useEffect(() => {
     const  getTrendingData = async () => {
        try {
            const { data } = await axios.get(`${Baseurl}/search/trending`);
         console.log(data);
         setLoading(false);
         setTrendingData(data.nfts)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        
     }
     getTrendingData();
 }, []);


 return (
    <div>
      {loading ? (
        <Loader />
      ) : ( 
        <>
        <Header />
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>Trending NFT</h2>
        <div className="card"> 
        
        <ul>
          {trendingData.map((nfts) => (
            <li key={nfts.id}>
              <div className="name">Name<h5 style={{ color: "Yellow" }}>{nfts.name}</h5></div>
              <div className="symbol"> Symbol {" "}
               <h5 style={{ color: "Yellow" }}>{nfts.symbol}</h5> 
               </div>
              <div className="rank"> <p>Currency {nfts.native_currency_symbol}</p></div>
              <div className="coinimage">
              <img height={50} src={nfts.thumb} alt="" />
          </div>
            </li>
          ))}
        </ul>
        </div>
        </>
      )}
    </div>
  );
}

export default Trending
