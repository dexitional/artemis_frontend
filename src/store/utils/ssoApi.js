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

export const fetchSemesterSlipAIS = async (session_id,indexno) => {
  const query = `?session_id=${session_id}&indexno=${indexno}`
  const res = await axios.get(`${API_URL}/student/semregslip${query}`);
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

export const sendPhoto = async (refno,uri,group,lock) => {
  var formData = new FormData()
  formData.append('tag',refno)
  formData.append('photo',uri)
  formData.append('group_id',group)
  console.log(formData)
  const res = await axios.post(`${API_URL}/ssophoto`,{tag:refno,photo:uri,group_id:group,lock});
  return res.data;
} 


// SSO & USER ENDPOINTS

export const sendOtp = async (data) => {
  const res = await axios.post(`${API_URL}/reset/sendotp`,{...data});
  return res.data;
} 


export const verifyOtp = async (data) => {
  const res = await axios.post(`${API_URL}/reset/verifyotp`,{...data});
  return res.data;
} 

export const sendPwd = async (data) => {
  const res = await axios.post(`${API_URL}/reset/sendpwd`,{...data});
  return res.data;
} 


/* AIS APP ENDPOINTS */

// STUDENTS
export const fetchStudentDataAIS = async (query = '') => {
  const res = await axios.get(`${API_URL}/ais/students${query}`);
  return res.data;
} 

export const postStudentDataAIS = async (data) => {
  const res = await axios.post(`${API_URL}/ais/students`,{...data});
  return res.data;
} 

export const resetAccount = async (refno) => {
  const res = await axios.get(`${API_URL}/ais/resetpwd/${refno}`);
  return res.data;
} 

export const generateMail = async (refno) => {
  const res = await axios.get(`${API_URL}/ais/genmail/${refno}`);
  return res.data;
} 

export const stageAccount = async (refno) => {
  const res = await axios.get(`${API_URL}/ais/setupaccess/${refno}`);
  return res.data;
} 

// REGISTRATIONS
export const fetchRegDataAIS = async (query = '') => {
  const res = await axios.get(`${API_URL}/ais/regdata${query}`);
  return res.data;
} 

export const fetchRegListAIS = async () => {
  const res = await axios.get(`${API_URL}/ais/reglist`);
  return res.data;
} 

export const fetchMountListAIS = async () => {
  const res = await axios.get(`${API_URL}/ais/regmount`);
  return res.data;
} 


/* FMS APP ENDPOINTS */

// BILLS  
export const fetchBillsFMS = async (query = '') => {
  const res = await axios.get(`${API_URL}/fms/sbills${query}`);
  return res.data;
} 

export const fetchBillFMS = async (id) => {
  const res = await axios.get(`${API_URL}/fms/sbills/${id}`);
  return res.data;
} 

export const postBillFMS = async (data) => {
  const res = await axios.post(`${API_URL}/fms/sbills`,{...data});
  return res.data;
} 

export const sendBillFMS = async (data) => {
  const res = await axios.post(`${API_URL}/fms/sendbill`,{...data});
  return res.data;
} 

export const deleteBill = async (id) => {
  const res = await axios.delete(`${API_URL}/fms/sbills/${id}`);
  return res.data;
} 


// FEE PAYMENTS  
export const fetchPaymentsFMS = async (query = '') => {
  const res = await axios.get(`${API_URL}/fms/feestrans${query}`);
  return res.data;
} 

export const fetchPaymentFMS = async (id) => {
  const res = await axios.get(`${API_URL}/fms/feestrans/${id}`);
  return res.data;
} 

export const postPaymentFMS = async (data) => {
  const res = await axios.post(`${API_URL}/fms/feestrans`,{...data});
  return res.data;
} 

export const sendPaymentFMS = async (data) => {
  const res = await axios.post(`${API_URL}/fms/sfeestrans`,{...data});
  return res.data;
} 

export const deletePayment = async (id) => {
  const res = await axios.delete(`${API_URL}/fms/feestrans/${id}`);
  return res.data;
} 

export const generateIndexNo = async (data) => {
  const res = await axios.post(`${API_URL}/fms/genindexno`,{...data});
  return res.data;
} 



/* HRS APP ENDPOINTS */

// HRS STAFF
export const fetchHRStaffDataHRS = async (query = '') => {
  const res = await axios.get(`${API_URL}/hrs/hrstaff${query}`);
  return res.data;
} 

export const postHRStaffDataHRS = async (data) => {
  const res = await axios.post(`${API_URL}/hrs/hrstaff`,{...data});
  return res.data;
} 

export const deleteHRStaffDataHRS = async (id) => {
  const res = await axios.delete(`${API_URL}/hrs/hrstaff/${id}`);
  return res.data;
} 

export const resetAccountHRS = async (staffno) => {
  const res = await axios.get(`${API_URL}/hrs/resetpwd/${staffno}`);
  return res.data;
} 

export const generateMailHRS = async (staffno) => {
  const res = await axios.get(`${API_URL}/hrs/genmail/${staffno}`);
  return res.data;
} 

export const stageAccountHRS = async (staffno) => {
  const res = await axios.get(`${API_URL}/hrs/setupaccess/${staffno}`);
  return res.data;
} 

// ADMIN - HELPERS

export const loadFMSHelpers = async () => {
  const res = await axios.get(`${API_URL}/fms/helpers`);
  return res.data;
} 

export const loadAISHelpers = async () => {
  const res = await axios.get(`${API_URL}/ais/helpers`);
  return res.data;
} 

export const loadHRSHelpers = async () => {
  const res = await axios.get(`${API_URL}/hrs/helpers`);
  return res.data;
} 



