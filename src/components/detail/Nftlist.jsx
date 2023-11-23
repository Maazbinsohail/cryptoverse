import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import Loader from '../loader/Loader';
import axios from 'axios';
import './Nftlist.css'

function Nftlist() {
  const [loading, setLoading] = useState(true);
  const [globalData, setGlobalData] = useState({});

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/global');
        const data = response.data;
        console.log(data);
        setGlobalData(data);
      } catch (error) {
        console.error('Error fetching global data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []); 

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div>
            <h2 style={{ textAlign: 'center', marginTop: '40px', color: 'orange' }}>Global Data</h2>
            <div className='card'>
              <ul>
                <li>
                  <div className="crypto">
                    <strong>Active Cryptocurrencies:</strong> {globalData.data?.active_cryptocurrencies}
                  </div>
                </li>
                <li>
                  <div className="crypto">
                    <strong>Ended Icos<br/> </strong>  {globalData.data?.ended_icos}
                  </div>
                </li>
                <li>
                  <div className="crypto">
                    <strong>Total Market Cap (USD):</strong> {globalData.data?.total_market_cap?.usd.toFixed(2)}
                  </div>
                </li>
                <li>
                  <div className="crypto">
                    <strong>Total 24h Volume 
                    {""}
                    </strong> 
                  
                    (USD) {globalData.data?.market_cap_change_percentage_24h_usd.toFixed(2)}
                  </div>
                </li>
                <li>
                  <div className="crypto">
                    <strong>Bitcoin Dominance:</strong> {globalData.data?.market_cap_percentage?.btc.toFixed(2)}%
                  </div>
                </li>
                <li>
                  <div className="crypto">
                    <strong>Ethereum Dominance:</strong> {globalData.data?.market_cap_percentage?.eth.toFixed(2)}%
                  </div>
                </li>
                <li>
                  <div className="crypto">
                    <strong>Ongoing Icos <br/> </strong> {globalData.data?.ongoing_icos}%
                  </div>
                </li>
                <li>
                  <div className="crypto">
                    <strong>Markets: <br/> </strong> {globalData.data?.markets}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Nftlist;
