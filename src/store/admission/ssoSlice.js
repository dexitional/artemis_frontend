import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
export const ssoSlice  = createSlice({
   name: 'sso',
   initialState: {
       user: {},
       isLoggedIn: false,
       modal: { content: null, show: false, size: 'md', type: 'table' }, // Utility - Modals
       alert: { message: null, show: false, type: 'success' }, // Utility - Alert Message
       cuurentPage: 0, // Utility - Current Page
       groups:[],  // Helper - groups
       sessions:[], // AMS - sessions
       vendors:[], // AMS - vendors
       vouchers:[], // AMS - vouchers
       applicants:[], // AMS - applicants
   },
   reducers: {
      setUser: (state, { payload }) => {
        state.user = payload
      },
      updateUser: (state, { payload }) => {
        state.user = {...state.user, ...payload }
      },
      setIsLoggedIn: (state, { payload }) => {
        state.isLoggedIn = payload
      },

      setCurrentPage: (state, { payload }) => {
        state.currentPage = payload
      },

      setModal: (state, { payload }) => {
        state.modal = payload
      },

      updateModal: (state, { payload }) => {
        state.modal = {...state.modal, ...payload }
      },

      setAlert: (state, { payload }) => {
        state.alert = payload
      },

      updateAlert: (state, { payload }) => {
        state.alert = {...state.alert, ...payload }
      },

      setGroups: (state, { payload }) => {
        state.groups = payload
      },

      setSessions: (state, { payload }) => {
        state.sessions = payload
      },

      setVendors: (state, { payload }) => {
        state.vendors = payload
      },

      setVouchers: (state, { payload }) => {
        state.vouchers = payload
      },

      setApplicants: (state, { payload }) => {
        state.vouchers = payload
      },

      
   }
})

export const { setUser,updateUser,setIsLoggedIn,setCurrentPage,setGroups,setSessions,setVendors,setVouchers,setApplicants,setModal,updateModal,setAlert,updateAlert } = ssoSlice.actions;

export default ssoSlice.reducer;