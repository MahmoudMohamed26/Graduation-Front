import axios from "axios";
import { baseURL2 } from "./Api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const token = cookie.get('token');

export const Axios = axios.create({
    baseURL:  baseURL2 ,
    headers: {
        Authorization: token,
    }
})