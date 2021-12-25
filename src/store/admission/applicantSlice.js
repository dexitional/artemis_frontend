import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
export const applicantSlice  = createSlice({
   name: 'applicant',
   initialState: {
       user: { photo: "" },
       stage_id: '',
       apply_type: '', //Wassce-ssce / diploma
       grade_value: 0,
       class_value: 0,
       flag_submit: 0,
       group_id: '',
       sell_type: 0,
       flag_admit: 0,
       profile:   { profile_id:'' },
       guardian:  { guardian_id:'' },
       education: [{ education_id:'' }],
       result:    [{ result_id: `${moment().unix()}-sess` }],
       grade:     [],
       choice:    [],
       document:  [],
       referee:   [{ referee_id:'' }],
       qualification: [{ qualification_id:'' }],
       employment: [{ employment_id:'' }],
       notification:  [
         {title:'Welcome ', content:'<p>We are happy to notify you that you have successfully started application procedure.<br/>Please feel free to contact support if challenges encountered. Thank you! </p>',created_at: moment('27-06-2021','DD-MM-YYYY').fromNow(), excerpt:'We happy to notify you that you have successfully started application procedure.', receiver:' cherished applicant'},
       ],
       admission: {
         letter: {},
         fee: {},
         status: '',
         acceptance: '',
       },
       account: { 
         username: '',
         password: '',
         email: '',
         student_id: '',
         index_no: '',
         portal_url: '',
         email_url: '',
       }
       
   },
   reducers: {
      setStage: (state, { payload }) => {
        state.stage_id = payload
      },
      setApplyMode: (state, { payload }) => {
        state.apply_type = payload
      },
      setSubmitStatus: (state, { payload }) => {
        state.flag_submit = payload
      },
      setAdmitStatus: (state, { payload }) => {
        state.flag_admit = payload
      },
      setGradeValue: (state, { payload }) => {
        state.grade_value = payload
      },
      setClassValue: (state, { payload }) => {
        state.class_value = payload
      },
      setUser: (state, { payload }) => {
        state.user = payload
      },
      updateUser: (state, { payload }) => {
        state.user = {...state.user, ...payload }
      },
      setProfile: (state, { payload }) => {
        state.profile = payload
      },
      updateProfile: (state, { payload }) => {
        state.profile = {...state.profile, ...payload }
      },
      setGuardian: (state, { payload }) => {
        state.guardian = payload
      },
      updateGuardian: (state, { payload }) => {
        state.guardian = {...state.guardian, ...payload }
      },
      setEducation: (state, { payload }) => {
        state.education = payload
      },
      addEducation: (state, { payload }) => {
        state.education.push(payload)
      },
      delEducation: (state, { payload }) => {
        state.education = state.education.filter( (row,i) => i !== payload )
      },
      setResult: (state, { payload }) => {
        state.result = [...payload]
      },
      addResult: (state, { payload }) => {
        state.result.push(payload)
      },
      delResult: (state, { payload }) => {
        state.result = state.result.filter( (row,i) => i !== payload )
      },
      setGrade: (state, { payload }) => {
        state.grade = [...payload]
      },
      addGrade: (state, { payload }) => {
        state.grade.push(payload)
      },
      delGrade: (state, { payload }) => {
        state.grade = state.grade.filter( (row,i) => i !== payload )
      },
      setChoice: (state, { payload }) => {
        state.choice = [...payload]
      },
      addChoice: (state, { payload }) => {
        state.choice.push(payload)
      },
      delChoice: (state, { payload }) => {
        state.choice = state.choice.filter( (row,i) => i !== payload )
      },
      setDocument: (state, { payload }) => {
        state.document = [...payload]
      },
      addDocument: (state, { payload }) => {
        state.document.push(payload)
      },
      delDocument: (state, { payload }) => {
        state.document = state.document.filter( (row,i) => i !== payload )
      },
      setReferee: (state, { payload }) => {
        state.referee = payload
      },
      addReferee: (state, { payload }) => {
        state.referee.push(payload)
      },
      delReferee: (state, { payload }) => {
        state.referee = state.referee.filter( (row,i) => i !== payload )
      },
      setQualification: (state, { payload }) => {
        state.qualification = payload
      },
      addQualification: (state, { payload }) => {
        state.qualification.push(payload)
      },
      delQualification: (state, { payload }) => {
        state.qualification = state.qualification.filter( (row,i) => i !== payload )
      },
      setEmployment: (state, { payload }) => {
        state.employment = payload
      },
      addEmployment: (state, { payload }) => {
        state.employment.push(payload)
      },
      delEmployment: (state, { payload }) => {
        state.employment = state.employment.filter( (row,i) => i !== payload )
      },
      setNotification: (state, { payload }) => {
        state.notification = payload
      },
      setAdmission: (state, { payload }) => {
        state.admission = payload
      },
      updateAdmission: (state, { payload }) => {
        state.admission = {...state.admission, payload }
      },
      setAccount: (state, { payload }) => {
        state.account = payload
      },
      setGroupID: (state, { payload }) => {
        state.group_id = payload
      },
      setSellType: (state, { payload }) => {
        state.sell_type = payload
      },
      updateAccount: (state, { payload }) => {
        state.account = {...state.account, payload }
      }
   }
})

export const { 
  setStage,setApplyMode,setSubmitStatus,setAdmitStatus,setProfile,setGuardian,setEducation,addEducation,delEducation,setResult,addResult,delResult,
  setChoice,addChoice,delChoice,setDocument,addDocument,delDocument,setReferee,addReferee,delReferee,setQualification,addQualification,
  delQualification,setNotification,setAdmission,updateAdmission,setAccount,updateAccount,updateProfile,updateGuardian,setUser,updateUser,
  setGrade,addGrade,delGrade,setGradeValue,setClassValue,setEmployment,addEmployment,delEmployment,setGroupID,setSellType
} = applicantSlice.actions;

export default applicantSlice.reducer;