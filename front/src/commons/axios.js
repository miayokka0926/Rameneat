import _axios from 'axios';
// base url
const axios = baseUrl => {
    const instance = _axios.create({
        baseURL:"https://rameneat.herokuapp.com/" || 'http://localhost:3000'
    })
    return instance;
}

export{ axios};
export default axios();