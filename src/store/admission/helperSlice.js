import { createSlice } from '@reduxjs/toolkit'

export const helperSlice  = createSlice({
   name: 'helper',
   initialState: {
       religions: [],
       countries: [],
       banks:     [],
       subjects:  [],
       grades:    [],
       classes:   [],
       exam_types:[],
       stages:    [],
       programs:  []
   },
   reducers: {
      setReligions: (state, { payload }) => {
        state.religions = payload
      },
      setCountries: (state, { payload }) => {
        state.countries = payload
      },
      setBanks: (state, { payload }) => {
        state.banks = payload
      },
      setExamTypes: (state, { payload }) => {
        state.exam_types = payload
      },
      setSubjects: (state, { payload }) => {
        state.subjects = payload
      },
      setGrades: (state, { payload }) => {
        state.grades = payload
      },
      setClasses: (state, { payload }) => {
        state.classes = payload
      },
      setPrograms: (state, { payload }) => {
        state.programs = payload
      }
   }
})

export const { setReligions,setCountries,setBanks,setExamTypes,setSubjects,setGrades,setClasses,setPrograms } = helperSlice.actions;
export default helperSlice.reducer;