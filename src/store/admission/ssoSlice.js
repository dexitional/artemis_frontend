import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
export const ssoSlice  = createSlice({
   name: 'sso',
   initialState: {
       user: {},
       reset:{},
       isLoggedIn: false,
       modal: { content: null, show: false, size: 'md', type: 'table' }, // Utility - Modals
       alert: { message: null, show: false, type: 'success' }, // Utility - Alert Message
       dialog: { title: null, content: null, button:null, url:null, show: false, type: 'success' }, // Utility - Dialog Message
       cuurentPage: 0, // Utility - Current Page
       groups:[],  // Helper - groups
       sessions:[], // AMS - sessions
       vendors:[], // AMS - vendors
       vouchers:[], // AMS - vouchers
       applicants:[], // AMS - applicants
       databox: []
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
      setReset: (state, { payload }) => {
        state.reset = payload
      },
      updateReset: (state, { payload }) => {
        state.reset = {...state.reset, ...payload }
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

      setDialog: (state, { payload }) => {
        state.dialog = payload
      },

      updateDialog: (state, { payload }) => {
        state.dialog = {...state.dialog, ...payload }
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

      setDatabox: (state, { payload }) => {
        state.databox = payload
      },

      updateDatabox: (state, { payload }) => {
        state.databox = {...state.databox, ...payload }
      },

      
   }
})

export const { setUser,updateUser,setIsLoggedIn,setCurrentPage,setGroups,setSessions,setVendors,setVouchers,setApplicants,setDatabox,updateDatabox,setModal,updateModal,setAlert,updateAlert,setDialog,updateDialog,setReset,updateReset } = ssoSlice.actions;

export default ssoSlice.reducer;