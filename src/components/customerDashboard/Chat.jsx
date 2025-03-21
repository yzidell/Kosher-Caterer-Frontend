/* eslint-disable no-useless-concat */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import {FaList} from 'react-icons/fa'

import { add_friend, messageClear, send_message_to_seller, updateMessage } from '../../store/reducers/chatReducer';

import toast from 'react-hot-toast';
import Moment from 'moment/moment';

import config from '../../config';

import io from 'socket.io-client'

//get sellerid from webSiteOrigin - encodeURIComponent(webSiteOrigin)

//socket has to be last STR_BACKEND_URL
///const socket = io(localHostName)//backend
const socket = io(config.STR_BACKEND_URL)

const Chat = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL

    const {userInfo } = useSelector(state => state.auth)
    const {fb_messages, currentFd, my_friends, successMessage } = useSelector(state => state.chat)
    const { seller } = useSelector(state => state.seller)

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1    
    const sellerImage = seller.sellerImage
    const sellerCompanyName = seller.shopName
    const sellerChatStatus = seller.isVisibleSiteChatOnline

    //console.log('sellerImage ', sellerImage)
    
    const scrollRef = useRef()
    const dispatch = useDispatch()
    //const {sellerId} = useParams()
    
    let {chatTopic} = useParams()
    chatTopic = chatTopic !== '' ? 'I Have A Question About ' + chatTopic : ''
    //console.log' : ''
    //console.log(chatTopic)

    const [text, setText] = useState(chatTopic) // useState('')
    const [receiverMessage, setReceiverMessage] = useState('')
    const [activeSeller, setActiveSeller] = useState([]) //lecture 412
    const [show, setShow] = useState(false)
    
    //console.log(sellerId)receiverId
    //react call function every 10 seconds
    // const myFunction = () => {
    //     console.log('Function called!');
    // if (customerId) {
    //     //console.log(currentCustomer)
    //     dispatch(get_customer_messages(customerId))
    //fb_messages updated 
    //updateMessage
    // }
    //};

    // useEffect(() => {
    //     const intervalId = setInterval(myFunction, 10000); // 10000 milliseconds = 10 seconds
    //     // Clear the interval on component unmount
    //     return () => clearInterval(intervalId);
    //   }, []);

    useEffect(() => {
        //socket.emit('add_user', userInfo.id, userInfo) //shows green dot active customer on seller dashboard
    },[])

    useEffect(() => {
        dispatch(add_friend({
            sellerId: sellerId || "",
            userId: userInfo.id
        }))
    },[sellerId])
    
    const send_message_to_seller_local = () => {
        //alert(text)
        if (text) {
           //toast.success(successMessage) 
            dispatch(send_message_to_seller({
                userId: userInfo.id,
                text,
                sellerId,
                name: userInfo.name 
            }))
            setText('')
            socket.emit('add_user', userInfo.id, userInfo) //sets active user
            //alert(socket.id)
            //console.log(socket)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          send_message_to_seller_local()
        }
    };

    useEffect(() => {
        socket.on('seller_message', msg => {
            //alert(msg.message)
            setReceiverMessage(msg)
            //alert('socket.id ' + socket.id) //works seller to customer
            //alert(receiverMessage.message)
        })
        socket.on('activeSeller', (sellers) => {
            setActiveSeller(sellers)
        })
        //console.log(activeSeller)
    },[])

    useEffect(() => {
        if (successMessage) {
            //console.log(fb_messages[fb_messages.length - 1])
            socket.emit('send_customer_message', fb_messages[fb_messages.length - 1]) //works
            //alert(socket.id)
            dispatch(messageClear())
        }
    },[successMessage])

    useEffect(() => {
        //alert('chat sellerId: ' + sellerId)
        if (receiverMessage) {
            //alert(socket.id)
            //alert('chat FE receiverMessage socket.id ' + socket.id)
            //alert('receiverMessage', receiverMessage.message)
            if (sellerId === receiverMessage.senderId && userInfo.id === receiverMessage.receiverId) {
                //customer is logged on
                toast.success(receiverMessage.senderName + "\n" + "Sent A Message")
                dispatch(updateMessage(receiverMessage))
            } else {
                toast.success(receiverMessage.senderName + "\n" + "Sent A Message")
                dispatch(messageClear())
            }
        }
    },[receiverMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth'})
    },[fb_messages])

    return (
        <div className='bg-white p-3 border rounded-md'
            style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
            <div className='w-full flex'>
            <div className={`w-[220px] mr-4 border rounded-lg md-lg:absolute bg-white md-lg:h-full -left-[350px] 
                ${show ? '-left-0' : '-left-[350px]'}`} style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <div className='flex justify-center gap-3 items-center text-xl h-[50px]'
                        style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                        <span><AiOutlineMessage /></span>
                        <span>Messages</span>
                    </div>
                    <div className='w-full flex flex-col py-1 h-[200px] pr-3'
                        style={{color:sellerPrimaryColor1}}>
                        {
                            my_friends.map((f,i) => 
                                <Link to={`/customerDashboard/chat/${f.fdId}`} key={i}  
                                    className={`flex gap-2 justify-start items-center pl-2 py-[5px]`} >
                                    <div className='w-[30px] h-[30px] rounded-full relative'>
                                        {
                                            activeSeller.some(c => c.sellerId === f.fdId ) && 
                                                <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div> 
                                            //<img className='rounded-full' src={f.image} alt="" />
                                        } 
                                        <img className='rounded-full' src={sellerImage} alt="" />
                                    </div>
                                    <span className='text-[16px]'>{sellerCompanyName}</span>
                                    {
                                        //<span className='text-[14px]'>{f.name}</span>
                                    }
                                </Link> 
                            )
                        }
                    </div>
                </div>
                <div className='w-[calc(100%-230px)] md-lg:w-full'>
                    {//activeSeller
                    }
                    {
                        currentFd ?
                        <div className='w-full h-full'>
                            <div className='flex justify-between gap-3 items-center text-xl h-[20px] mb-2'
                                style={{color:sellerPrimaryColor1}}>
                                <div className='flex gap-2'>
                                    <div className='w-[30px] h-[30px] rounded-full relative'>
                                        {
                                        activeSeller.some(c => c.sellerId === currentFd.fdId) && 
                                            <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                                        }
                                        <img className='rounded-full' src={sellerImage} alt="" />
                                        {/*<img className='rounded-full' src={currentFd.image} alt="" />*/}
                                    </div>
                                    <span>{sellerCompanyName} (We Are {sellerChatStatus})</span>
                                    {/*<span>{currentFd.name}</span>*/}
                                </div>
                                <div onClick={()=> setShow(!show)} 
                                    className='w-[35px] h-[35px] hidden md-lg:flex cursor-pointer rounded-sm 
                                    justify-center items-center text-white'
                                    style={{backgroundColor:sellerPrimaryColor1}}>
                                    <FaList/>
                                </div>
                            </div>
                            <div className='h-[260px] w-full border bg-slate-100 p-3 rounded-md' 
                                style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                                <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
                                    {
                                        fb_messages.map((m, i) => {
                                            if (currentFd?.fdId !== m.receiverId) { //seller messages src={`${config.STR_FRONTEND_URL}/images/admin.png`}
                                                return(
                                                    <div ref={scrollRef} key={i} className='w-full flex gap-2 justify-start items-center text-[14px]'>
                                                        <img className='w-[30px] h-[30px] rounded-full' src={`${sellerImage}`} alt="admin" />
                                                        <div className='p-2 bg-purple-500 text-white rounded-lg'>
                                                            {m.message}
                                                            <div className='text-sm'>
                                                                {Moment(m.updatedAt).format('M/DD/yyyy h:mm a')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else { //customer messages
                                                return(
                                                    <div ref={scrollRef} key={i} className='w-full flex gap-2 justify-end items-center text-[14px]'>
                                                        <img className='w-[30px] h-[30px]' src={`${sellerFrontendURL}/images/user.png`} alt="userpng" />
                                                        <div className='p-2 bg-cyan-500 text-white rounded-lg'>
                                                            <span>{m.message}</span>
                                                            <div className='text-sm'>
                                                                {Moment(m.updatedAt).format('M/DD/yyyy h:mm a')}
                                                            </div>
                                                        </div>
                                                    </div> 
                                                )
                                            }
                                        })
                                    }
                                    {
                                        //     <div className='w-full flex gap-2 justify-start items-center text-[14px]'>

                                        //     <img className='w-[30px] h-[30px]' src="http://localhost:3000/images/user.png" alt="" />
                                        //     <div className='p-2 bg-purple-500 text-white rounded-md'>
                                        //         <span>weewewewewewewe</span>
                                        //     </div>
                                        // </div>

                                        //     <div  className='w-full flex gap-2 justify-end items-center text-[14px]'>
                                        //     <img className='w-[30px] h-[30px] ' src="http://localhost:3000/images/user.png" alt="" />
                                        //     <div className='p-2 bg-cyan-500 text-white rounded-md'>
                                        //         <span>ewwwwwwwww</span>
                                        //     </div>
                                        // </div> 

                                    }
                                </div>
                            </div>
                            <div className='flex p-2 justify-between items-center w-full'>
                                <div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full'>
                                    <label className='cursor-pointer' htmlFor=""><AiOutlinePlus /></label>
                                    <input className='hidden' type="file" />
                                </div>
                                <div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
                                    <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} 
                                        type="text" placeholder='input message' 
                                        className='w-full rounded-full h-full outline-none p-3' />
                                    <div className='text-2xl right-2 top-2 absolute cursor-auto'>
                                        <span><GrEmoji /></span>
                                    </div>
                                </div>
                                <div className='w-[40px] p-2 justify-center items-center rounded-full'>
                                    <div onClick={send_message_to_seller_local} className='text-2xl cursor-pointer'>
                                        <IoSend />
                                    </div>
                                </div>
                            </div>
                        </div> 
                        : 
                        <div  onClick={() => setShow(true)} 
                            className='w-full h-[400px] flex justify-center items-center text-lg font-bold text-slate-600'>
                            <span>Select Seller</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Chat;
