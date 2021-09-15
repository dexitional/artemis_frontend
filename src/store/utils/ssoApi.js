import useEffect from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const { REACT_APP_API_URL : API_URL } = process.env; 

export const verifySSOUser = async ({username,password}) => {
  const res = await axios.post(`${API_URL}/auth/sso`,{username,password});
  return res.data;
} 

// VENDORS ENDPOINT CALLS

export const fetchVendors = async () => {
  const res = await axios.get(`${API_URL}/ams/vendors`);
  return res.data;
} 

export const postVendor = async (data) => {
  const res = await axios.post(`${API_URL}/ams/vendors`,{...data});
  return res.data;
} 

export const deleteVendor = async (id) => {
  const res = await axios.delete(`${API_URL}/ams/vendors/${id}`);
  return res.data;
} 

// SESSIONS ENDPOINT CALLS

export const fetchSessions = async () => {
  const res = await axios.get(`${API_URL}/ams/sessions`);
  return res.data;
} 

export const postSession = async (data) => {
  const res = await axios.post(`${API_URL}/ams/sessions`,{...data});
  return res.data;
} 

export const deleteSession = async (id) => {
  const res = await axios.delete(`${API_URL}/ams/sessions/${id}`);
  return res.data;
} 

export const setDefaultSession = async (id) => {
  const res = await axios.put(`${API_URL}/ams/setsession/${id}`);
  return res.data;
} 

// VOUCHERS ENDPOINT CALLS

export const fetchVouchers = async (id,query = '') => {
  const res = await axios.get(`${API_URL}/ams/vouchers/${id}${query}`);
  return res.data;
} 

export const postVoucher = async (data) => {
  const res = await axios.post(`${API_URL}/ams/vouchers`,{...data});
  return res.data;
} 

export const deleteVoucher = async (id) => {
  const res = await axios.delete(`${API_URL}/ams/vouchers/${id}`);
  return res.data;
} 

export const recoverVoucher = async (data) => {
  const res = await axios.post(`${API_URL}/ams/recovervoucher`,{...data});
  return res.data;
} 


// APPLICANTS ENDPOINT CALLS

export const fetchApplicants = async (id,query = '') => {
  const res = await axios.get(`${API_URL}/ams/applicants/${id}${query}`);
  return res.data;
} 

export const  fetchApplicant = async (serial) => {
  const res = await axios.get(`${API_URL}/ams/applicant/${serial}`);
  return res.data;
} 


// STUDENT PORTAL ENDPOINT CALLS

export const fetchStudentData = async (refno) => {
  const res = await axios.get(`${API_URL}/student/fetchstudentdata/${refno}`);
  return res.data;
} 

export const postStudentProfile = async (data) => {
  const res = await axios.post(`${API_URL}/student/poststprofile`,{...data});
  return res.data;
} 

export const postPhoto = async (data) => {
  const res = await axios.post(`${API_URL}/student/postphoto`,{...data});
  return res.data;
} 

export const fetchSemesterSlip = async (session_id,indexno) => {
  const query = `?session_id=${session_id}&indexno=${indexno}`
  const res = await axios.get(`${API_URL}/student/semesterslip${query}`);
  return res.data;
} 

export const fetchSemesterReg = async (session_id,refno) => {
  const query = `?session_id=${session_id}&refno=${refno}`
  const res = await axios.get(`${API_URL}/student/semesterreg${query}`);
  return res.data;
} 

export const postSemesterReg = async (data) => {
  const res = await axios.post(`${API_URL}/student/semesterreg`,{...data});
  return res.data;
} 

export const fetchResults = async (indexno) => {
  const query = `?indexno=${indexno}`
  const res = await axios.get(`${API_URL}/student/allresults${query}`);
  return res.data;
} 

export const sendPhoto = async (refno,uri,group) => {
  var formData = new FormData()
  formData.append('tag',refno)
  formData.append('photo',uri)
  formData.append('group_id',group)
  console.log(formData)
  const res = await axios.post(`${API_URL}/ssophoto`,{tag:refno,photo:uri,group_id:group});
  return res.data;
} 








