/* eslint-disable no-unused-vars */
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/index';
import { Toaster } from 'react-hot-toast';
//https://react-hot-toast.com/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
  <Suspense>
  <App /> 
  <Toaster
    gutter={14}
    toastOptions={{
      duration: 2500,
      removeDelay: 1000,
      position : 'top-right',
      style : {
        background : '#283046',
        color : 'white',
        margin: '6px'
      }
    }} 
  />
  </Suspense>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
