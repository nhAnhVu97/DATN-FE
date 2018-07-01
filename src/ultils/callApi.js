
import axios from 'axios';

export default function apiCaller(endpoint, method = "GET", data) {
    return axios({
        url: endpoint,
        method: method,
        data: data,
    })
}
