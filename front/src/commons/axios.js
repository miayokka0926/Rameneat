import _axios from 'axios';
// base url
const axios = (baseUrl) => {
    const instance = _axios.create({
        baseURL:baseUrl || 'http://localhost:3000'
    })
    return instance;
}

export{ axios };
export default axios();