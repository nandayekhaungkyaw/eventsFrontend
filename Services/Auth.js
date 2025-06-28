import axios from "axios";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { AuthGet, EventGet } from "./EventFetching";


export async function login(email, password) {
  try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password }, { headers: { 'Content-Type': 'application/json' } });
    Cookies.set('token', response.data.access_token);
    console.log(response.data)
    toast.success(response.data.message);
  
  
    return response.data; 
  }catch (error) {
    console.error('Login Error:', error);
    toast.error(error.response.data.message);
    throw error; // rethrow so caller can handle if needed
  }
  // return only the data part
}

export async function EventPOstAuth(url,data) {
    
      try {
    const response = await axios.post(`${url}`,data,{headers:{'Content-Type': 'application/json','Authorization': `Bearer ${Cookies.get('token')}`}});
   toast.success(response.data.message);
    return response.data; // return only the data part
    
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error.response.data.message);
    throw error; // rethrow so caller can handle if needed
  }
  
}

export async function ImagePostAuth(url, data) {
  try {
    const response = await axios.post(`${url}`, data, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
        // DO NOT set 'Content-Type'
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error?.response?.data?.message || 'Error');
    throw error;
  }
}
export async function AuthDelete(url, id) {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/${url}/${id}`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
    toast.success(response.data.message);

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error?.response?.data?.message || 'Error');
    throw error;
  }
}

export async function AuthUpdate(url,id,data) {
    console.log(data)
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/${url}/${id}`, 
       JSON.stringify(data),
     {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
     
    });
    toast.success(response.data.message);
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error?.response?.data?.message || 'Error');
    throw error;
  }
}

export async function OrderConfirm(id){

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/order/${id}/confirm`, 
       {},
     {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
     
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error?.response?.data?.message || 'Error');
    throw error;
  }
}

   export async function RelatedMutate (url,set){
      const fetched = await AuthGet(`${import.meta.env.VITE_API_URL}/${url}`);
      set(fetched)
  }

     export async function RelatedMutateNormal (url,set){
      const fetched = await EventGet(`${import.meta.env.VITE_API_URL}/${url}`);
      set(fetched)
  }
export async function StoreOrder() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/order/saveRecord`,
      {}, // no data body needed
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error?.response?.data?.message || 'Error');
    throw error;
  }
}
