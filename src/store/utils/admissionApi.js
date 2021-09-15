import useEffect from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const { REACT_APP_API_URL : API_URL } = process.env; 
//const { step } = useSelector();

export const verifyApplicant = async ({serial,pin}) => {
  const res = await axios.post(`${API_URL}/auth/applicant`,{serial,pin});
  return res.data;
} 

export const saveApplication = async (data) => {
  const res = await axios.post(`${API_URL}/admission/saveform`,data);
  return res.data;
} 

export const submitApplication = async (data) => {
  const res = await axios.post(`${API_URL}/admission/formstatus`,data);
  return res.data;
} 

export const convertPhoto = async (data) => {
  const res = await axios.post(`${API_URL}/admission/convertphoto`,{ base64:data });
  return res.data;
} 


