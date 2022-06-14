import React,{ useCallback, useState,useEffect, Fragment} from 'react'
import PhotoImg from '../../../assets/img/add_photo.png';
import Session from '../Session';
import { useSelector,useDispatch } from 'react-redux'
import { setEmployment, delEmployment, addEmployment } from '../../../store/admission/applicantSlice';
import { helperData } from '../../../store/utils/helperData';

const Employment = () => {

    const { step,applicant } = useSelector(state => state)
    const dispatch = useDispatch();
    const required = ['employer_name','employer_address','job_title','job_description','start_month','start_year','end_month','end_year'];
    const [form,setForm] = useState({});
    const [ edurows,setEdurows ] = useState([{employment_id:''}]);

    
    const onChange = (e,id) => {
      let newrows = [...edurows];
      newrows[id] = {...newrows[id],[e.target.name] : e.target.value };
      setEdurows(newrows);
     
    }

    const years = () => {
      var yrs = [];
      for(var i = new Date().getFullYear();i >= 1980;i--){
          yrs.push(i)
      } return yrs;
    }

    
    const addRecord = (e) => {
        const cm = window.confirm(`Add Employment Record ${edurows.length+1} ?`)
        if(cm){
          const data = { education_id:''}
          setEdurows([...edurows,data ])
          dispatch(addEmployment(data))
          
        }
    }

    const delRecord = (id) => {
        const cm = window.confirm(`Remove Employment Record ${id+1} ?`)
        if(cm){
          setEdurows([...edurows.filter((r,i) => i !== id)])
          dispatch(delEmployment(id))
        }
    }
    
    const isDirty = useCallback((tag,i) => {
        const vs = required.find(row => row === tag);
        const ms = edurows[i][tag];
        if(vs){
            if(ms && ms !== ''){ return false;}
            else{ return true; }
        }   return false;
    },[edurows])

    useEffect(() => {
        setEdurows(applicant.employment)
    },[])

    useEffect(() => {
        console.log(edurows);
        dispatch(setEmployment(edurows))
    })


    return (
      <Session>
      <div className="row">
        {/* Employment Information */}
        <div className="small-12 columns" data-ref="guardian">
            <div className="u-textAlignCenter">
              <h2 className="u-mb-0 label-title">EMPLOYMENT HISTORY<hr /></h2>
            </div>
            {/* Employment Information */}
            <div className="row">
            
              { edurows.map((rec,i) => ( 
              <div className="small-12 columns u-textAlignLeft"  key={i}>
                  <div class="row" >
                      <div className="small-9 columns"><h4>EMPLOYMENT INFORMATION #{i+1}</h4></div>
                      <div className="small-3 columns"><button onClick={() => i === 0 ? addRecord() : delRecord(i) } class="Button Button--green" style={{height:'2em',lineHeight:'1.2em'}}><b>{i === 0 ? 'ADD NEW' : 'REMOVE'} </b></button></div>
                  </div><hr/>
                  <form autoComplete="off" id="ember1130" className="ember-view">
                    <div className="form--inline ">
                        <div>
                          <p className="u-ml-0 label-title">Name of Employer</p>
                          <div id="ember1133" className={ !edurows[i].employer_name ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                              <input type="text" name="employer_name" onChange={(e)=> onChange(e,i)}  value={edurows[i].employer_name} spellCheck="false" required placeholder="Enter Name of Employer" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('employer_name',i) ? <label className="FloatLabel-label">Employer cannot be blank</label> :'' }
                          </div>

                          <p className="u-ml-0 label-title">Employer's Address</p>
                          <div id="ember1133" className={ !edurows[i].employer_address ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                              <input type="text" name="employer_address" onChange={(e)=> onChange(e,i)}  value={edurows[i].employer_address} spellCheck="false" required placeholder="Enter Employer's address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('employer_address',i) ? <label className="FloatLabel-label">Employer address cannot be blank</label> :'' }
                          </div>

                          <p className="u-ml-0 label-title">Job Title</p>
                          <div id="ember1133" className={ !edurows[i].job_title ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                              <input type="text" name="job_title" onChange={(e)=> onChange(e,i)}  value={edurows[i].job_title} spellCheck="false" required placeholder="Enter Job Title" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('job_title',i) ? <label className="FloatLabel-label">Job title cannot be blank</label> :'' }
                          </div>

                          <p className="u-ml-0 label-title">Job Description</p>
                          <div id="ember1133" className={ !edurows[i].job_description ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                              <input type="text" name="job_description" onChange={(e)=> onChange(e,i)}  value={edurows[i].job_description} spellCheck="false" required placeholder="Enter Job description" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('job_description',i) ? <label className="FloatLabel-label">Job description cannot be blank</label> :'' }
                          </div>
                          <div className="start-cover flex-row">
                              <span>
                                <p className="u-ml-0 label-title">Start Month </p>
                                <div id="ember1133" className={ !edurows[i].start_month ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                    <select id="ember1134" name="start_month" onChange={(e)=> onChange(e,i)}  value={edurows[i].start_month} className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                        <option selected disabled>-- Select Month --</option>
                                        { helperData.months.map((hp) => 
                                            <option value={hp.id}>{hp.title}</option>
                                        )}
                                    </select>
                                </div>
                              </span>
                              <span>
                                <p className="u-ml-0 label-title"><b>Start Year</b> </p>
                                <div id="ember1133" className={ !edurows[i].start_year ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                    <select id="ember1134" name="start_year" onChange={(e)=> onChange(e,i)}  value={edurows[i].start_year} className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                       <option selected disabled>-- Select Year --</option>
                                       { years().map((yr,i) => 
                                          <option value={yr}>{yr}</option>
                                       )}
                                    </select>
                                </div>
                              </span>
                          </div>
                          <div className="end-cover flex-row">
                              <span>
                                <p className="u-ml-0 label-title">End Month </p>
                                <div id="ember1133" className={ !edurows[i].end_month ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                    <select id="ember1134" name="end_month" onChange={(e)=> onChange(e,i)}  value={edurows[i].end_month} className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                        <option selected disabled>-- Select Month --</option>
                                        <option value={0} disabled selected>Till Date</option>
                                        { helperData.months.map((hp) => 
                                            <option value={hp.id}>{hp.title}</option>
                                        )}
                                    </select>
                                </div>
                              </span>
                              <span>
                                <p className="u-ml-0 label-title">End Year </p>
                                <div id="ember1133" className={ !edurows[i].end_year ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                    <select id="ember1134" name="end_year" onChange={(e)=> onChange(e,i)}  value={edurows[i].end_year} className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                       <option selected disabled>-- Select Year --</option>
                                       <option value={1900} disabled selected>Till Date</option>
                                       { years().map((yr,i) => 
                                          <option value={yr}>{yr}</option>
                                       )}
                                    </select>
                                </div>
                              </span>
                          </div>
                        </div>
                       
                    </div>
                  </form>
              </div>
            ))}
            </div>
        </div>
      </div>
      </Session>
    )
}

export default Employment
