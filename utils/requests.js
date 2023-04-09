import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { BASE_URL } from './index'




 

  export const Profile_Patch= async(pin,user)=>{


        axios.defaults.headers.common['Authorization']=`Bearer ${user.signature}`
       const response= await axios.patch(`${BASE_URL}customer/profile`,{
           lat:pin.latitude,
            lng:pin.longitude
        })
      
   return response
        
    }
    export const GetUserProfile= async(user)=>{
              axios.defaults.headers.common['Authorization']=`Bearer ${user.signature}`
             const response= await axios.get(`${BASE_URL}customer/profile`)
             return response.data       
    }
    export const CreateOrder=async (user)=>{
        axios.defaults.headers.common['Authorization']=`Bearer ${user.signature}`
        const response= await axios.post(`${BASE_URL}customer/create-order`)
        return response.data
    }
    export const GetOrderById=async (id)=>{
        
        const response= await axios.get(`${BASE_URL}admin/order/${id}`)
        return response.data
    }
    export const GetPlugById=async (id)=>{
        
        const response= await axios.get(`${BASE_URL}admin/plug/${id}`)
        console.log(response.data);
        return response.data
    }
    export const MpesaPay=async (amount,phone)=>{
        console.log(phone,amount);
        const response= await axios.post(`${BASE_URL}payments/stkpush`,{
            amount,
            phone
        })
       
        return response.data
    }
    export const GetUserOrders=async (user)=>{
        // axios.defaults.headers.common['Authorization']=`Bearer ${user.signature}`
        const response= await axios.get(`${BASE_URL}admin/orders`)
        
       const userOrders= response.data.filter(o=>{
          return  o.customerId.toLowerCase().includes(user.email.toLowerCase())
        })
        return userOrders
    }
    
  

      
    export const Cart=async (user,items)=>{
    if(user.signature!==null||undefined){
        axios.defaults.headers.common['Authorization']=`Bearer ${user.signature}`
        const response= await axios.post(`${BASE_URL}customer/cart`,items)
        console.log("At cart res+++++++++++++",response.data);
     
    }
  }
 
  export const Signup= async( email,phone,password,items)=>{

    const response = await axios.post(`${BASE_URL}customer/signup`, {
        email,
        phone,
        password
    })            
    if(response?.data?.signature){
        Cart(response.data,items)
    }

   return response 
  }
  export const Login= async( email,password,items)=>{
try{

    const response = await axios.post(`${BASE_URL}customer/login`, {
        email,
        password
    })
    // if(response?.data?.signature){
    //     Cart(response.data,items)
    // }
    return response 
}
catch(err){
console.log(err);
}
    
  }