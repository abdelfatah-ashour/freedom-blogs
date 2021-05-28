/* eslint-disable sort-imports */
import Axios from "axios";
import { API } from "./KEYS.js";

export default Axios.create({
    baseURL: `${API}`,
    withCredentials: true,
});
