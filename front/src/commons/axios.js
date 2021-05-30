import _axios from 'axios';
// base url
const axios = baseUrl => {
    const instance = _axios.create({
        baseURL:"https://pacific-spire-87195.herokuapp.com/" || 'http://localhost:3000'
    })
    return instance;
}

export{ axios};
export default axios();