import axios from "axios";

// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const fetchData = async (baseDomain) => {
  try {
    console.log(baseDomain); 
    const response = await axios.get(`${baseDomain}`);
    console.log(response.data);
    if(response.status===200) return  response.data
    else {
      if (response.status === 404) {
        throw new Error('Not Found');
      } else if (response.status === 500) {
        throw new Error('Server Error');
      } else {
        throw new Error('Network Error');
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
