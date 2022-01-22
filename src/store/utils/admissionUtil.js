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
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Employment from '../../pages/admission/steps/Employment';



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

export const getProgram = (id,data) => {
   const row = data && data.find(row => row.id == id)
   if(row) return `${row.program_name.toUpperCase()} ${row.major_name ? '( '+row.major_name.toUpperCase()+' )':''}`;
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

export const getAdmissionGroupTitle = (id) => {
  const row = helperData.admissionGroups.find(row => row.stage_id == id)
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
  
  if(applicant.employment) data.data.employment = applicant.employment
  if(applicant.qualification) data.data.qualification = applicant.qualification
  if(applicant.referee) data.data.referee = applicant.referee
  console.log(data)
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
    case 'employment': return <Employment/>
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

export const getStudyMode = (mode) => {
  var resp;
  switch(mode){
    case 'M': resp = 'Morning';break;
    case 'A': resp = 'Afternoon';break;
    case 'E': resp = 'Evening';break;
    case 'W': resp = 'Weekend';break;
    default: resp = '--NONE--';break;
  }
  return resp;
} 

export const getCountryTitle = (code,countries) => {
  const row = countries.find(row => row.code_name == code)
  if(row) return row['title'];
  return null;
}

export const getGradeWeight = (grade) => {
  const row = helperData.grades.find(row => row.id == grade)
  if(row) return row['weight'];
  return null;
} 

export const getGradeValue = (subjects,dataset) => {
    var core = [],coreRequired = [],elective = [], core_val = 0, elective_val = 0,grade_value = 0;
    if(subjects && subjects.length > 0){
      for(var ro of subjects){
        var row = {...ro }
        row.weight = getGradeWeight(row.grade) || 0    
        const sj = dataset.find(dt => dt.id == row.subject)
        if(sj && sj.isCore) core.push(row)
        if(sj && (sj.isCore && sj.isRequired)) coreRequired.push(row)
        if(sj && !sj.isCore) elective.push(row)
      }
      if(coreRequired.length == 3){
        core_val = coreRequired.reduce((ac,val) => ac+val.weight,0) || 0
      }else{
        if(core.length > 0){
          core = core.sort((a, b) => a.weight - b.weight);
          var mcore = []
          for(var i = 0; i < core.length;i++){
            if(i < 3) mcore.push(core[i])
          }
          if(mcore.length > 0) core_val = mcore.reduce((ac,val) => ac+val.weight,0) || 0
        }
      }
      if(elective.length > 0){
        elective = elective.sort((a, b) => a.weight - b.weight);
        var melect = []
        for(var i = 0; i < elective.length;i++){
           if(i < 3) melect.push(elective[i])
        }
        if(melect.length > 0) elective_val = melect.reduce((ac,val) => ac+val.weight,0)
      }
      if(subjects.length >= 7 && elective.length >= 3 && core.length >= 3){
        grade_value = core_val+elective_val;
      }else{
        return 0;
      }
    }
    return grade_value;
} 

/*
export const getGradeByTotal = (total,schemeData) => {
  const scheme = JSON.parse(schemeData)
  let grade;
  if(scheme && scheme.length > 0){
    for(let s of scheme){
      if(!total || total == '' || typeof total == NaN) total = 0
      if(total >= s.min && total <= s.max){
         grade = s.grade;
         break;
      }
    }
  }
  if(grade) return grade;
  return 'N/A';
} 
*/

export const getGradeByTotal = (num,schemeData) => {
  const grades = JSON.parse(schemeData)
  if(num == null || num == '' || typeof num == NaN) num = 0
  const vs = grades && grades.find(row => row.min <= num && num <= row.max)
  return (vs && vs.grade) || 'F';
}



export const jsonToExcel = (csvData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

export const excelToJson = (fileName,callback) => {
    const reader = new FileReader();
    var responseData;
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      
      /* Convert array of arrays */
      //const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const data = XLSX.utils.sheet_to_json(ws);
      return callback(data)
      
    };
    reader.readAsBinaryString(fileName);
}


