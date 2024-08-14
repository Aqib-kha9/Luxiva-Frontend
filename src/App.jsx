import React from 'react'
import AppContext from './context/AppContext'
import { useContext } from 'react'
import ShowProduct from './components/product/ShowProduct'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductDetail from './components/product/ProductDetail'
import Navbar from './components/other/Navbar'
import SearchProduct from './components/product/SearchProduct'
import Register from './components/user/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/user/Login'
import Profile from './components/user/Profile'
import Cart from './components/other/Cart'
import Address from './components/other/Address'
import Checkout from './components/other/Checkout'

const App = () => {
  // let {data} = useContext(AppContext);
  return (
    <Router>
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<ShowProduct/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/product/search/:term' element={<SearchProduct/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/shipping' element={<Address/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>

      </Routes> 
    </Router>
  )
}

export default App