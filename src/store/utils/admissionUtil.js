import React, { Component }  from 'react';
import useEffect from 'react';
import StepLabel from '../../components/admission/StepLabel';
import Complete from '../../pages/admission/Complete';
import Review from '../../pages/admission/Plate2';
import Choice from '../../pages/admission/steps/Choice';
import Document from '../../pages/admission/steps/Document';
import Education from '../../pages/admission/steps/Education';
import Guardian from '../../pages/admission/steps/Guardian';
import Profile from '../../pages/admission/steps/Profile';
import Qualification from '../../pages/admission/steps/Qualification';
import Referee from '../../pages/admission/steps/Referee';
import Result from '../../pages/admission/steps/Result';
import { helperData } from '../utils/helperData'


export const getReligion = (id) => {
  const row = helperData.religions.find(row => row.id == id)
  if(row) return row['title'];
  return null;
} 

export const getRegion = (id) => {
  const row = helperData.regions.find(row => row.id == id)
  if(row) return row['title'];
  return null;
} 

export const getMarital = (id) => {
  const row = helperData.marital.find(row => row.id == id)
  if(row) return row['title'];
  return null;
} 

export const getCountry = (id,helper) => {
  return helper.countries.find(row => row.country_id == id)
} 

export const getBank = (id,helper) => {
   return helper.banks.find(row => row.bank_id == id)
}

export const getStage = (id) => {
   const row = helperData.stages.find(row => row.stage_id == id)
   if(row) return row['title'];
   return null;
} 

export const getProgram = (id) => {
   const row = helperData.programs.find(row => row.id == id)
   if(row) return row['short'];
   return null;
} 

export const getTitle = (id) => {
   const row =  helperData.titles.find(row => row.id == id)
   if(row) return row['title'];
   return null;
} 

export const getRelation = (id) => {
  const row =  helperData.relatives.find(row => row.id == id)
  if(row) return row['title'];
   return null;
} 

export const getMonth = (id) => {
  return helperData.months.find(row => row.id == id)
} 

export const getCertType = (id) => {
  return helperData.certType.find(row => row.id == id)
} 

export const getClass = (id) => {
  return helperData.awardClass.find(row => row.id == id)
} 

export const getCertName = (id) => {
  const row = helperData.certType.find(row => row.id == id)
  if(row) return row['title'];
  return null;
} 

export const getSubject = (id) => {
  const row = helperData.subjects.find(row => row.id == id)
  if(row) return row['title'];
  return null;
} 

export const getGrade = (id) => {
  const row = helperData.grades.find(row => row.id == id)
  if(row) return row['title'];
  return null;
} 

export const getSitting = (id) => {
  const row = helperData.sitting.find(row => row.id == id)
  if(row) return row['title'];
  return null;
} 

export const getDocument = (id) => {
  const row = helperData.documents.find(row => row.id == id)
  if(row) return row['title'];
  return null;
} 

export const getStageTitle = (id) => {
  const row = helperData.stages.find(row => row.stage_id == id)
  if(row) return row['title'];
  return null;
} 

export const getApplyTypeTitle = (id) => {
  const row = helperData.applyType.find(row => row.type_id == id)
  if(row) return row['title'];
  return null;
}

export const getStepData = (step,num) => {
   const currentMeta = step.meta.find( row => row.num === num );
   if(currentMeta) return currentMeta;
   return null;
}

export const dbData = (applicant,meta) => {
  var data = {};
  data.data = {};
  data.serial = applicant.user.serial
  data.grade_value = applicant.grade_value
  data.class_value = applicant.class_value
  data.meta = meta
  data.stage_id = applicant.stage_id
  data.apply_type = applicant.apply_type
  data.photo = applicant.user.photo
  data.flag_submit = applicant.flag_submit

  if(applicant.profile) data.data.profile = applicant.profile
  if(applicant.guardian) data.data.guardian = applicant.guardian
  if(applicant.education) data.data.education = applicant.education
  if(applicant.result) data.data.result = applicant.result
  if(applicant.grade) data.data.grade = applicant.grade
  if(applicant.document) data.data.document = applicant.document
  if(applicant.choice) data.data.choice = applicant.choice
  
  //if(applicant.employment) data.data.employment = applicant.employment
  //if(applicant.qualification) data.data.qualification = applicant.qualification
  //if(applicant.referee) data.data.referee = applicant.referee
  
  return data;

} 

export const sortMeta = (meta) => {
   var m = meta.map((r,i) => {
      let x = {...r}
      x.num = i+1;
      return x;
   })
   return m
} 

export const isReviewStep = (step) => {
  const currentStep = step.step;
  const review = step.meta.find( row => row.tag == 'review' );
  const stepMeta = step.meta.find( row => row.num == currentStep );
  return stepMeta.num == review.num ? true : false;
}

export const isCompleteStep = (step) => {
  const currentStep = step.step;
  const review = step.meta.find( row => row.tag == 'complete' );
  const stepMeta = step.meta.find( row => row.num == currentStep );
  return stepMeta.num == review.num ? true : false;
}

export const LoadStepPage = ({step}) => {
  const currentStep = step.step;
  const stepMeta = step.meta.find( row => row.num === currentStep );
  switch(stepMeta.tag){
    case 'profile': return <Profile/>
    case 'guardian': return <Guardian/>
    case 'education': return <Education/>
    case 'result': return <Result/>
    case 'choice': return <Choice/>
    case 'document': return <Document/>
    case 'qualification': return <Qualification/>
        //case 'employment': return <Employment/>
    case 'referee': return <Referee/>
    case 'review': return <Review/>
    case 'complete': return <Complete/>
    default: return <Profile/>
  }
} 

export const loadStepLabel = (step) => {
    const currentStep = step.step;
    const prevStep = (currentStep - 1) >= 1 ? (currentStep - 1) : (currentStep + 1)
    const nextStep = (prevStep > currentStep) ? (prevStep + 1) : ((currentStep + 1) <= step.count ? (currentStep + 1) : (prevStep.step - 1 ));
    const currentMeta = step.meta.find( row => row.num === currentStep );
    const prevMeta = step.meta.find( row => row.num === prevStep );
    const nextMeta = step.meta.find( row => row.num === nextStep );
    const meta = [{...prevMeta, active: false},{...currentMeta, active: true}]
    if(currentStep !== step.count) meta.push({...nextMeta, active: false});
    meta.sort((a,b) => a.num - b.num );

    return <StepLabel meta={meta}/>
} 

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null){
      return undefined;
    } return JSON.parse(serializedState);
  } catch (err) {
    console.log(err)
    return undefined;
  }
}; 

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // ignore write errors
  }
};


export const convertBase64 = (file) => {
   return new Promise((resolve, reject) => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => resolve(fileReader.result)
     fileReader.onerror = error => reject(error)
   })
};

