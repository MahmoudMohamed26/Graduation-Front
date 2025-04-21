import axios from "axios";
import { baseURL } from "./Api";

export const Axios = axios.create({
    baseURL:  baseURL ,
    withCredentials: true,
})