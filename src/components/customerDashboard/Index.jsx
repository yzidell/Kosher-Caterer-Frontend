/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/scope */
/* eslint-disable no-unused-vars */
import React, { useEffect }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdOutlineRestaurantMenu } from "react-icons/md";

import { get_customer_dashboard_index_data } from '../../store/reducers/customerDashboardReducer';

import Moment from 'moment';
import { currencyFormat } from '../CurrencyFormat';

const Index = () => {
    const { userInfo } = useSelector(state => state.auth)
    const { seller } = useSelector(state => state.seller)
    const { recentOrders, totalOrder, pendingOrder, cancelledOrder } = useSelector(state => state.customerDashboard)

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1    
    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_customer_dashboard_index_data(userInfo.id))
    },[])

    const redirect = (ord) => {
        let items = 0;
        //console.log(ord.products.length)
        for (let i = 0; i < ord.products.length; i++) {
            items = ord.products[i].quantity + items; 
        }
        navigate('/payment',{
            state: {
                price: ord.price,
                items,
                orderId: ord._id 
            }
        }) 
    }

    return (
        <div>
            <div className='grid grid-cols-3 md:grid-cols-1 gap-5'>
                <div className='flex justify-center items-center p-3 border rounded-md gap-5'
                    style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <div className='w-[90px] h-[60px] border-2 rounded-full flex justify-center items-center text-xl'
                        style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                        <span className='text-[32px]'>
                            <MdOutlineRestaurantMenu/>
                        </span>
                        <span className='text-[32px]'>
                            <RiShoppingCart2Fill />
                        </span>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <h2 className='text-3xl font-bold'>{totalOrder}</h2>
                        <span>Orders</span>
                    </div>     
                </div>
                <div className='flex justify-center items-center p-3 border rounded-md gap-5'
                    style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <div className='w-[90px] h-[60px] border-2 rounded-full flex justify-center items-center text-xl'
                        style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                        <span className='text-[32px]'>
                            <MdOutlineRestaurantMenu/>
                        </span>
                        <span className='text-[32px]'>
                            <RiShoppingCart2Fill />
                        </span>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <h2 className='text-3xl font-bold'>{pendingOrder}</h2>
                        <span>Pending Orders</span>
                    </div>     
                </div>

                <div className='flex justify-center items-center p-3 border rounded-md gap-5'
                    style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <div className='w-[90px] h-[60px] border-2 rounded-full flex justify-center items-center text-xl'
                        style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                        <span className='text-[32px]'>
                            <MdOutlineRestaurantMenu/>
                        </span>
                        <span className='text-[32px]'>
                            <RiShoppingCart2Fill />
                        </span>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <h2 className='text-3xl font-bold'>{cancelledOrder}</h2>
                        <span>Cancelled Orders</span>
                    </div>     
                </div> 

            </div>
            <div className='border p-3 mt-2 rounded-md'
                style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                <h2 className='text-xl font-bold'>Recent Orders</h2>
                <div className='pt-2'>
                    <div className='relative overflow-x-auto rounded-md'>
                        <table className='w-full text-sm text-left' style={{color:sellerPrimaryColor1}}>
                            <thead className='text-xs uppercase bg-gray-200' 
                                style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                <tr>
                                    <th scope='col' className='hidden px-3 py-1'>Order Id</th>
                                    <th scope='col' className='px-3 py-1'>Date/Time</th>
                                    <th scope='col' className={`${sellerBoolShowSitePayments ? 'px-3 py-1' : 'hidden'}`}>
                                        Price/Status
                                    </th>
                                    <th scope='col' className='px-3 py-1'>Order Status</th>
                                    <th scope='col' className='px-3 py-1'>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                            {  
                                recentOrders.map((o,i) => 
                                    <tr key={i} className='border' 
                                        style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                                        <td scope='row' className='hidden px-3 py-2 font-medium whitespace-nowrap'>#{o._id}</td>
                                        <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>
                                            {Moment(o.date).format('MM/DD/yyyy h:mm a')}
                                        </td> 
                                        <td scope='row' className={`${sellerBoolShowSitePayments ? 'px-3 py-2 font-medium whitespace-nowrap' : 'hidden'}`}>
                                            {currencyFormat.format(o.price)}/{o.payment_status }
                                        </td>
                                        <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>{o.delivery_status}</td>
                                        <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>
                                            <Link to={`/customerDashboard/order/details/${o._id}`}>
                                                <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>
                                                    View
                                                </span>
                                            </Link>
                                            {
                                                o.payment_status !== 'paid' && sellerBoolShowSitePayments &&
                                                    <span onClick={() => redirect(o)} className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded cursor-pointer'>
                                                        Pay Now
                                                    </span> 
                                             }
                                        </td> 
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
