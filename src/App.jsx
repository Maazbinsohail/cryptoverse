import { Routes , Route } from 'react-router-dom'
import './App.css'
import Exchanges from './components/exchange/Exchanges'
import Coins from './components/coins/Coins'
import CoinDetails from './components/coindetails/CoinDetails'
import Trending from './components/trend/Trending'
import Nftlist from './components/detail/Nftlist'

function App() {


  return (
    <>
     <Routes>
     <Route path='/' element={<Exchanges />} />
     <Route path='/coins' element={<Coins/>} />
     <Route path='/coins/:id' element={<CoinDetails/>}/>
     <Route path='/trending' element={<Trending/>}/>
     <Route path='/details' element={<Nftlist/>}/>
   

     
     </Routes>
    
    </>
  )
}

export default App
