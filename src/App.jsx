/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, lazy } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import './App.css';
import Home from './pages/Home';
import Shops from './pages/Shops';
import SellerPackages from './pages/SellerPackages';
import SampleMenus from './pages/SampleMenus';
import Cart from './pages/Cart';
import EventDetails from './pages/EventDetails';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryShop from './pages/CategoryShop';
import MainIngredientShop  from './pages/MainIngredientShop';
import SearchProducts from './pages/SearchProducts';
import Payment from './pages/Payment';
import CustomerDashboard from './pages/CustomerDashboard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/customerDashboard/Index';
import Orders from './components/customerDashboard/Orders';
import EventDetailsCustomerDashboard from './components/customerDashboard/EventDetailsCustomerDashboard';
import ChangePassword from './components/customerDashboard/ChangePassword';
import Wishlist from './components/customerDashboard/Wishlist';
import MyProfile from './components/customerDashboard/MyProfile';
import OrderDetails from './components/customerDashboard/OrderDetails';
import Chat from './components/customerDashboard/Chat';
import ConfirmOrder from './pages/ConfirmOrder';
import AboutUs from './pages/AboutUs';

import { get_category, get_mainIngredient } from './store/reducers/homeReducer';
import { get_seller_by_frontEndURL } from './store/reducers/sellerReducer';

import config from './config';

function App() {
  const sellerFrontendURL = config.STR_FRONTEND_URL

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_category(sellerFrontendURL))
    dispatch(get_mainIngredient(sellerFrontendURL))
    dispatch(get_seller_by_frontEndURL(sellerFrontendURL))
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/shops' element={<Shops/>} />
        <Route path='/sellerPackages' element={<SellerPackages/>} />
        <Route path='/sampleMenus' element={<SampleMenus/>} />
        <Route path='/aboutUs' element={<AboutUs/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/eventDetails' element={<EventDetails />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/productsCategory?' element={<CategoryShop />} />
        <Route path='/productsMainIngredient?' element={<MainIngredientShop />} />
        <Route path='/products/search?' element={<SearchProducts/>} />
        <Route path='/product/details/:slug' element={<Details/>} /> 
        <Route path='/order/confirm?' element={<ConfirmOrder/>} /> 
        
        <Route path='/customerDashboard' element={<ProtectUser />}>
          <Route path='' element={<CustomerDashboard/>}>
            <Route path='' element={<Index/>} />
            <Route path='myProfile' element={<MyProfile/>} />
            <Route path='myOrders' element={<Orders/>} /> 
            <Route path='eventDetailsCustomerDashboard' element={<EventDetailsCustomerDashboard/>} /> 
            <Route path='changePassword' element={<ChangePassword/>} />
            <Route path='myWishlist' element={<Wishlist/>} /> 
            <Route path='order/details/:orderId' element={<OrderDetails/>} /> 
            <Route path='chat' element={<Chat/>} /> 
            <Route path='chat/:chatTopic' element={<Chat/>} />

          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
//<Route path='chat/:sellerId' element={<Chat/>} />           
export default App;
