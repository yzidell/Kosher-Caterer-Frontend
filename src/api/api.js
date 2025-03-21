/* eslint-disable no-unused-vars */
import axios from "axios";
import config from "../config";
//const local = 'http://localhost:5000'
//for reducers

const production = ''

const api = axios.create({
    //baseURL : `${local}/api`
    baseURL : `${config.STR_BACKEND_URL}/api`
})

//console.log('api file')
//console.log(localHostName)

export default api
