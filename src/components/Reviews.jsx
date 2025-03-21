/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RatingReact from 'react-rating'

import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

import { customer_review, get_reviews, messageClear, get_product_details } from '../store/reducers/homeReducer';

import Rating from './Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';

import toast from 'react-hot-toast';
import Moment from 'moment';

const Reviews = ({product}) => {
    const {userInfo } = useSelector(state => state.auth)
    const {successMessage, reviews, rating_review, totalReviews  } = useSelector(state => state.home)
    const { seller } = useSelector(state => state.seller)
    
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    
    const dispatch = useDispatch()
    const reviewsPerPage = 4
    const [parPage, setParPage] = useState({reviewsPerPage})//10
    const [pageNumber, setPageNumber] = useState(1)

    const [myRating, setMyRating] = useState('')
    const [myReview, setMyReview] = useState('')

    
    const review_submit = (e) => {
        e.preventDefault()
        const obj = {
            name: userInfo.name,
            review: myReview,
            rating : myRating,
            productId: product._id
        }
        dispatch(customer_review(obj))
        //console.log(obj)
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage) 
            dispatch(get_reviews({
                productId: product._id,
                pageNumber
            }))
            dispatch(get_product_details(product._id))
            setMyRating('')
            setMyReview('')
            dispatch(messageClear())
        }  
    },[successMessage])

    useEffect(() => {
        if (product._id) {
            dispatch(get_reviews({
                productId: product._id,
                pageNumber
            }))
        }
    },[pageNumber,product])

    //w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16
    return (
        <div>
            <div className='mt-8'>
                <div className='w-full mb-1 py-1 px-3 border font-bold text-md' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                    {product.name} Reviews (Overview)
                </div>
                <div className='flex gap-10 md-lg:flex-col border p-1'>
                    <div className='flex flex-col gap-2 justify-start items-start py-4'>
                        <div style={{color:sellerPrimaryColor1}}>
                            <span className='text-6xl font-semibold'>{product.rating}</span>
                            <span className='text-3xl font-semibold'>/5</span>
                        </div>
                        <div className='flex text-3xl'>
                            <Rating ratings={product.rating} />
                        </div>
                        <p className='text-sm font-semibold' 
                            style={{color:sellerPrimaryColor1}}>{totalReviews} Reviews</p>
                    </div>
                    <div className='flex gap-2 flex-col py-4'>
                        <div className='flex justify-start items-center gap-5'>
                            <div className='text-md flex gap-1 w-[93px]'>
                                <RatingTemp rating={5} />
                            </div>
                            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                                <div style={{ width: `${Math.floor(( 100 * (rating_review[0]?.sum || 0)) / totalReviews )}%` }}  
                                    className='h-full bg-[#Edbb0E] w-[60%]'> 
                                </div> 
                            </div>
                            <p className='text-sm w-[0%]' style={{color:sellerPrimaryColor1}}>
                                {rating_review[0]?.sum }
                            </p>
                        </div>
                        <div className='flex justify-start items-center gap-5'>
                            <div className='text-md flex gap-1 w-[93px]'>
                                <RatingTemp rating={4} />
                            </div>
                            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                                <div style={{ width: `${Math.floor(( 100 * (rating_review[1]?.sum || 0)) / totalReviews )}%` }} 
                                    className='h-full bg-[#Edbb0E] w-[70%]'> 
                                </div> 
                            </div>
                            <p className='text-sm w-[0%]' style={{color:sellerPrimaryColor1}}>
                                {rating_review[1]?.sum }
                            </p>
                        </div>
                        <div className='flex justify-start items-center gap-5'>
                            <div className='text-md flex gap-1 w-[93px]'>
                                <RatingTemp rating={3} />
                            </div>
                            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                                <div style={{ width: `${Math.floor(( 100 * (rating_review[2]?.sum || 0)) / totalReviews )}%` }} 
                                    className='h-full bg-[#Edbb0E] w-[40%]'> 
                                </div> 
                            </div>
                            <p className='text-sm w-[0%]' style={{color:sellerPrimaryColor1}}>
                                {rating_review[2]?.sum }
                            </p>
                        </div>
                        <div className='flex justify-start items-center gap-5'>
                            <div className='text-md flex gap-1 w-[93px]'>
                                <RatingTemp rating={2} />
                            </div>
                            <div 
                                className='w-[200px] h-[14px] bg-slate-200 relative'>
                                <div style={{ width: `${Math.floor(( 100 * (rating_review[3]?.sum || 0)) / totalReviews )}%` }} 
                                    className='h-full bg-[#Edbb0E] w-[30%]'> 
                                </div> 
                            </div>
                            <p className='text-sm w-[0%]' style={{color:sellerPrimaryColor1}}>
                                {rating_review[3]?.sum }
                            </p>
                        </div>
                        <div className='flex justify-start items-center gap-5'>
                            <div className='text-md flex gap-1 w-[93px]'>
                                <RatingTemp rating={1} />
                            </div>
                            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                                <div style={{ width: `${Math.floor(( 100 * (rating_review[4]?.sum || 0)) / totalReviews )}%` }} 
                                    className='h-full bg-[#Edbb0E] w-[10%]'> 
                                </div> 
                            </div>
                            <p className='text-sm w-[0%]' style={{color:sellerPrimaryColor1}}>
                                {rating_review[4]?.sum }
                            </p>
                        </div>
                        <div className='flex justify-start items-center gap-5'>
                            <div className='text-md flex gap-1 w-[93px]'>
                                <RatingTemp rating={0} />
                            </div>
                            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                                <div className='h-full bg-[#Edbb0E] w-[0%]'> 
                                </div> 
                            </div>
                            <p className='text-sm w-[0%]' style={{color:sellerPrimaryColor1}}>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className='text-md font-semibold py-1 px-3 border mt-2 mb-2' 
                style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                {product.name} - ({totalReviews}) Reviews From Customers
            </h2>
            <div className='flex flex-col gap-2 pb-4'>
                {
                    reviews.map((r,i) => 
                        <div key={i} className='flex flex-col gap-1 border p-1' 
                            style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-1 text-xl'>
                                    <RatingTemp rating={r.rating} />
                                </div>
                                <span className='text-md pr-1'>
                                    {Moment(r.date).format('M/DD/yyyy')}
                                </span>
                            </div>
                            <span className='pl-1'>From: {r.name}</span>
                            <p className='pl-3'>{r.review}</p>
                        </div>
                    )
                }
                <div className='flex justify-end'>
                    {
                        //reviewsPerPage
                        totalReviews > reviewsPerPage && 
                            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber}  
                                totalItems={totalReviews} parPage={parPage} showItem={Math.floor(totalReviews / 2)} />
                                
                        // <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItems={10} 
                        //     parPage={parPage} showItem={Math.floor(10 / 3)} />
                    }
                </div>
            </div>
            <div> 
                {
                    userInfo ? 
                        <div className='flex flex-col gap-3 border-none'>
                            <div className='flex gap-1'>
                                <RatingReact 
                                    onChange={(e) => setMyRating(e)}
                                    initialRating={myRating}
                                    emptySymbol={<span className='text-4xl' style={{color:sellerPrimaryColor1}}><CiStar/></span>}
                                    fullSymbol={<span className='text-[#Edbb0E] text-4xl'><FaStar/></span>} 
                                /> 
                            </div> 
                            <form onSubmit={review_submit}>
                                <textarea value={myReview} onChange={(e) => setMyReview(e.target.value)} 
                                    required name="" id="" cols="30" rows="5" placeholder='Please Leave A Review' 
                                    className='border outline-0 p-3 w-full'></textarea>
                                    <div className='mt-2 mb-2'>
                                        <button className='py-1 px-5 rounded-lg text-white'
                                            style={{backgroundColor:sellerPrimaryColor1}}>
                                            Submit Your Review
                                        </button>
                                    </div>
                            </form>
                        </div> 
                    : 
                        <div>
                            <Link to='/login' className='py-2 px-4 mb-2 rounded-lg text-white'
                                style={{backgroundColor:sellerPrimaryColor1}}>
                                Please Login Or Register
                            </Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Reviews;
