/* eslint-disable no-unused-vars */
import axios from "axios";
import config from "../config";
const local = config.STR_BACKEND_URL //'http://localhost:5000'
//for reducers

const production = config.STR_BACKEND_URL_PROD

let api_url = ''
let mode = 'pro' //'dev'

if (mode === 'pro') {
    api_url = production
} else {
    api_url = local
}

const api = axios.create({
    baseURL : `${api_url}/api`
    //baseURL : `${local}/api`
    //baseURL : `${config.STR_BACKEND_URL}/api`
})

//console.log('api file')
//console.log(localHostName)

export default api
