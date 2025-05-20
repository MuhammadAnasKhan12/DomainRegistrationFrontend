import axios from "axios";
import { useState } from "react";
import CryptoJS from "crypto-js";

const secretkey = "my top secret";

const encryptData = (data) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretkey).toString();
    return ciphertext;
  };
  


const apiInstance = axios.create({
    baseURL:"http://localhost:3000/api/",
    headers: {
        'Content-Type':"application/json",
    },
    timeout:10000,
    withCredentials:true,

}) ;

apiInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        console.log("Session Expired. Redirecting to Login page... ");
        window.location.href = "/"; 
    }
    return Promise.reject(error);
});

apiInstance.interceptors.request.use((config) => {
    console.log("Request Sent by apiInstance", config);
  
    if (
      config.method === 'post' || config.method === 'put'
    ) {
      if (config.data && config.headers['Content-Type'] === 'application/json') {
        config.data = {
          encryptedPayload: encryptData(config.data),
        };
      }
    }
  
    return config;
  }, (error) => {
    console.log("Request Error by apiInstance: ", error);
    return Promise.reject(error);
  });
  
axios.interceptors.response.use(
    (response) => {
      console.log('Response received by apiInstance:', response);
      return response;
    },
    (error) => {
      console.error('Response error by apiInstance:', error);
      return Promise.reject(error);
    }
  );

export default apiInstance;