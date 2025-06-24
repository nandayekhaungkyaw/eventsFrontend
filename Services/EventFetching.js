import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

// Create a simple API service function
export async function EventGet(url) {
  try {
    const response = await axios.get(`${url}`);
    toast.success(response.data.message);
    return response.data.data; // return only the data part
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error.response.data.message);
    throw error; // rethrow so caller can handle if needed
  }
}

export async function CategoryGet(url) {
    
      try {
    const response = await axios.get(`${url}`);
    return response.data.data; // return only the data part
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error.response.data.message);
    throw error; // rethrow so caller can handle if needed
  }
}


export async function EventImageGet(url) {
    
      try {
    const response = await axios.get(`${url}`);
    return response.data.data; // return only the data part
  } catch (error) {
    console.error('API Error:', error);
    throw error; // rethrow so caller can handle if needed
  }
}

export async function OrderPost(url,data) {
    
      try {
    const response = await axios.post(`${url}`,data,{headers:{'Content-Type': 'application/json'}});
    return response.data; // return only the data part
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error.response.data.message);
    throw error; // rethrow so caller can handle if needed
   
  }
    
}

export async function  AuthGet(url) {
    
      try {
    const response = await axios.get(`${url}`,{headers:{'Content-Type': 'application/json','Authorization': `Bearer ${Cookies.get('token')}`}});
toast.success(response.data.message);
    return response.data.data; // return only the data part
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error.response.data.message);
    throw error; // rethrow so caller can handle if needed
  }
  
}


