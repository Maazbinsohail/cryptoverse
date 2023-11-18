import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Baseurl } from '../urls/Baseurl'
import { useParams } from 'react-router-dom'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loader from '../loader/Loader';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CoinChart({currency}) {
    const [chartdata, setChartData] = useState([])
    const {id } = useParams()
    const [days, setDays] = useState(1)
    const [loading, setLoadong] = useState(true)
    const CoinChartData = async () => {
       try {
         const {data} = await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
         setChartData(data.prices)
         setLoadong(false)

       } catch (error) {
         console.log(error)
       }
    }

    useEffect(() => {
        CoinChartData()
    },[currency, days, id])

    const myData = {
        labels: chartdata.map((value) => {
           const date = new Date(value[0])
           const time = date.getHours() > 12 ? `${date.getHours() - 12} : ${date.getMinutes()} PM` :
                                             `${date.getHours()} : ${date.getMinutes()} AM`
           return days === 1 ? time : date.toLocaleDateString()                                 
        }),
        datasets: [
            {
                label: ` Price In Recent Past Days ${days} in ${currency}`,
                data: chartdata.map((value) => {
                    return value[1]
                }),
                borderColor : 'orange',
                borderWidth : '3'
            }
        ]
    }
  return (
   <>
   {
    loading ? (
    <Loader />
  ) :( 

    <div>
      
        <Line data={myData} options={{
          elements:{
              point:{
                  radius:1, 
              }
          }
        }} style={{marginTop:"5rem", width:"60rem"}} />
  
  <div className='btn' style={{marginTop:"30px"}}>
               <button onClick={()=>setDays(1)} >24 hours</button>
               <button onClick={()=>setDays(30)}>1 Month</button>
               <button onClick={()=>setDays(365)}>1 Year</button>
             </div>
      </div>
  )
   }
   
   </>
  )
}

export default CoinChart
