import { configureStore } from '@reduxjs/toolkit'
import applicantSlice from './admission/applicantSlice'
import helperSlice from './admission/helperSlice'
import ssoSlice from './admission/ssoSlice'
import stepSlice from './admission/stepSlice'
import { loadState, saveState } from './utils/admissionUtil'

const state = loadState();
const config = {
  reducer : {
    helper : helperSlice,
    applicant : applicantSlice,
    step : stepSlice,
    sso : ssoSlice
  } 
}
if(state) config.preloadedState = state.state;

const store = configureStore(config)
store.subscribe(() => saveState({ state: store.getState() }));

export default store;
