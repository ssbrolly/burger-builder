import axios from 'axios';


//Custom Instance
const instance = axios.create({
    baseURL: 'https://react-burgerbuilder-fdc09.firebaseio.com'
});

export default instance;