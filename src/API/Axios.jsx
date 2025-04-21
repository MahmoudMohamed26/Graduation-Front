import axios from "axios";
import { baseURL2 } from "./Api";

export const Axios = axios.create({
    baseURL:  baseURL2 ,
    withCredentials: true,
})