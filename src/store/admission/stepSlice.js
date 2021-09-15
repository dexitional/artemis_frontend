import { createSlice } from '@reduxjs/toolkit'

export const stepSlice  = createSlice({
   name: 'step',
   initialState: {
       count: 8,
       step:  1,
       meta: [
        { num: 1, title: 'Personal Information', tag: 'profile', canReview: true },
        { num: 2, title: 'Guardian Information', tag: 'guardian', canReview: true },
        { num: 3, title: 'Educational Background', tag: 'education', canReview: true },
        { num: 4, title: 'Exams Results', tag: 'result', canReview: true },
        { num: 5, title: 'Programme Choice', tag: 'choice', canReview: true },
        { num: 6, title: 'Supporting Document', tag: 'document', canReview: false },
        { num: 7, title: 'Review', tag: 'review', canReview: false },
        { num: 8, title: 'Completed', tag: 'complete', canReview: false },
       ], 
       defaultMeta: [
        { num: 1, title: 'Personal Information', tag: 'profile', canReview: true },
        { num: 2, title: 'Guardian Information', tag: 'guardian', canReview: true },
        { num: 3, title: 'Educational Background', tag: 'education', canReview: true },
        { num: 4, title: 'Exams Results', tag: 'result', canReview: true },
        { num: 5, title: 'Employment History', tag: 'employment', canReview: true },
        { num: 6, title: 'Other Qualification', tag: 'qualification', canReview: true },
        { num: 7, title: 'Referees', tag: 'referee', canReview: true },
        { num: 8, title: 'Programme Choice', tag: 'choice', canReview: true },
        { num: 9, title: 'Supporting Document', tag: 'document', canReview: false },
        { num: 10, title: 'Review', tag: 'review', canReview: false },
        { num: 11, title: 'Completed', tag: 'complete', canReview: false },
       ], 
       isAllowed: false,
       isLoggedIn: false,
       isModal: true
   },
   reducers: {
      setMeta: (state, { payload }) => {
        state.meta = payload
      },
      setStepCount: (state, { payload }) => {
        state.count = payload
      },
      setNextStep: state => {
        state.step = (state.step+1) <= (state.count+2) ? (state.step+1) : (state.count+2);
      },
      setPrevStep: state => {
        state.step = (state.step-1) >= 1 ? (state.step-1) : 1;
      },
      setActiveStep: (state, { payload }) => {
        state.step = payload
      },
      setIsAllowed: (state, { payload }) => {
        state.isAllowed = payload
      },
      setIsLoggedIn: (state, { payload }) => {
        state.isLoggedIn = payload
      },
      setIsModal: (state, { payload }) => {
        state.isModal = payload
      },
   }
})

export const { setMeta,setStepCount,setNextStep,setPrevStep,setActiveStep,setIsAllowed,setIsLoggedIn,setIsModal } = stepSlice.actions;
export default stepSlice.reducer;