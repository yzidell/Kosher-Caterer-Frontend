/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/scope */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { get_customer_orders } from '../../store/reducers/orderReducer';

import Moment from 'moment';
import { currencyFormat } from '../CurrencyFormat';
        
const Orders = () => {
    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth)
    const { myOrders } = useSelector(state => state.order)
     
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    
    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false

    const [state, setState] = useState('all')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const { orderId } = useParams()
    
    useEffect(() => {
        dispatch(get_customer_orders({customerId:userInfo.id, status:state}))
        //dispatch(get_customer_orders(orderId))
    },[state])

    const redirect = (ord) => {
        let items = 0;
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
        <div className='border p-4 rounded-md'
            style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold' style={{color:sellerPrimaryColor1}}>My Orders</h2>
                <select value={state} onChange={(e) => setState(e.target.value)} 
                    className='outline-none px-3 py-1 border rounded-md' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <option value="all">--Order Status--</option>
                    <option value="placed">Placed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option className='hidden' value="warehouse">Warehouse</option>
                </select> 
            </div>

            <div className='pt-4'>
                <div className='relative overflow-x-auto rounded-md'>
                    <table className='w-full text-sm text-left' style={{color:sellerPrimaryColor1}}>
                        <thead className='text-xs uppercase' style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                            <tr>
                                <th scope='col' className='hidden px-3 py-2'>Order Id</th>
                                <th scope='col' className='px-3 py-1'>Date/Time</th>
                                <th scope='col' className={`${sellerBoolShowSitePayments ? 'px-3 py-1' : 'hidden'}`}>
                                    Price/Status
                                </th>
                                <th scope='col' className='px-3 py-2'>Order Status</th>
                                <th scope='col' className='px-3 py-2'>Action</th> 
                            </tr>
                        </thead>
                        <tbody>
                        {
                            myOrders.map((o,i) => 
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
    );
};

export default Orders;
