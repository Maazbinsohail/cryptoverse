import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import axios from 'axios'
import { Baseurl } from '../urls/Baseurl'
import { useParams } from 'react-router-dom'
import './CoinDetail.css'
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline} from "react-icons/io5";
  import CoinChart from '../coinchart/CoinChart'
import Header from '../header/Header'

const CoinDetails = () => {
  const [coin, setCoin] = useState([])
  const [loading, setLoadong] = useState(true)
  const {id} = useParams()
  const [currency, setCurrency]=useState('pkr')
  const currencySymbol = currency ==='pkr' ? 'Rs': '$'
  const profit = coin.market_data?.price_change_percentage_24h > 0
  useEffect(() => {
    const getCoinData = async () => {
       try {
         const {data} = await axios.get(`${Baseurl}/coins/${id}`)
         console.log(data)
         setCoin(data)
         setLoadong(false)
       } catch (error) {
         console.log(error)
         setLoadong(false)
        
       }
    }
    getCoinData()
  }, [])
  return (
   <>
   <Header />
   {loading ? (
    <Loader />
  ) :(<> 
    
    <div className="coindetail">
    <div className="coininfo">
    <div className="btn">
          <button onClick={() => setCurrency("pkr")}>PKR</button>
          <button onClick={() => setCurrency("usd")}>USD</button>
          
          </div>
          <div className="time">
          {coin.last_updated}
          </div>
          <div className="coinimage">
          <img height={100} src={coin.image.large} alt="" />
          </div>
          <div className="coinname">
           {coin.name}
          </div>
          <div className="coinprice">
           {currencySymbol}{coin.market_data.current_price['usd']}
          </div>
          <div className="coinprofit">
          {profit ? <BiSolidUpArrow color="green" /> : <BiSolidDownArrow  color="red"/>} 
          {coin.market_data.price_change_percentage_24h} %
          </div>
          <div className="marketcap">
           <IoPulseOutline color='orange'/>
           {" "}
           # {coin.market_cap_rank}
          </div>
          <div className="coindescription">
          <p>{coin.description['en'].split('.')[0]} </p>
          </div>
    
    </div>
    <CoinChart currency={currency} />
    </div>
    
    
    
    
    </>)}
   </>
  )
}

export default CoinDetails
