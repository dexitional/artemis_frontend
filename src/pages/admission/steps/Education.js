import React,{ useCallback, useState,useEffect, Fragment} from 'react'
import PhotoImg from '../../../assets/img/add_photo.png';
import Session from '../Session';
import { useSelector,useDispatch } from 'react-redux'
import { addEducation, setEducation,delEducation } from '../../../store/admission/applicantSlice';
import { helperData } from '../../../store/utils/helperData';

const Education = () => {

    const { step,applicant } = useSelector(state => state)
    const dispatch = useDispatch();
    const required = ['institute_type','institute_name','fname','mstatus','dob','gender','citizen_country','resident_country','home_region','religion','present_occupation','work_place','bond_status','disabled','phone','email','pobox_address','resident_address'];
    const [form,setForm] = useState({});
    const [ edurows,setEdurows ] = useState([{id:''}]);

    /*
    const onChange = useCallback((e) => {
        setForm({...form,[e.target.name] : e.target.value })
        //dispatch(setEducation(edurows))
    },[form])
    */

    const onChange = (e,id) => {
        let newrows = [...edurows];
        newrows[id] = {...newrows[id],[e.target.name] : e.target.value };
        setEdurows(newrows);
       
    }

    const years = () => {
       var yrs = [];
       for(var i = new Date().getFullYear();i >= 1920;i--){
           yrs.push(i)
       } return yrs;
    }

    const onSubmit = (e) => {
        alert("Submitted");
    }

    const addRecord = (e) => {
        const cm = window.confirm(`Add Educational Record ${edurows.length+1} ?`)
        if(cm){
          const data = { education_id:''}
          setEdurows([...edurows,data ])
          dispatch(addEducation(data))
          
        }
    }

    const delRecord = (id) => {
        const cm = window.confirm(`Remove Educational Record ${id+1} ?`)
        if(cm){
          setEdurows([...edurows.filter((r,i) => i !== id)])
          dispatch(delEducation(id))
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
        setEdurows(applicant.education)
    },[])

    useEffect(() => {
        console.log(edurows);
        dispatch(setEducation(edurows))
    })



    return (
        <Session>
        <div className="row">
            {/* Educational  Information */}
            <div className="small-12 columns" data-ref="education">
                <div className="u-textAlignCenter">
                    <h2 className="u-mb-0 label-title">
                        EDUCATIONAL BACKGROUND<hr />
                    </h2>
                </div>
                <div className="row">
                   { edurows.map((rec,i) => ( 
                      
                    <div key={i} className="small-12 columns u-textAlignLeft">
                        <div class="row" >
                           <div className="small-9 columns"><h4>EDUCATION {i+1}</h4></div>
                           <div className="small-3 columns"><button onClick={() => i === 0 ? addRecord() : delRecord(i) } class="Button Button--green" style={{height:'2em',lineHeight:'1.2em'}}><b>{i === 0 ? 'ADD NEW' : 'REMOVE'} </b></button></div>
                        </div><hr/>
                        <form autoComplete="off" id="ember1130" className="ember-view">
                        <div className="form--inline ">
                            <div className="institute1" data-ref="inst1">
                                <p className="u-ml-0 label-title">Institution Type</p>
                                <div id="ember1133" className={ !edurows[i].institute_type ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                    <select name="institute_type" onChange={(e)=> onChange(e,i)} defaultValue="" value={edurows[i].institute_type} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                      <option value="" selected disabled>-- Choose Type --</option>
                                      { helperData.instituteType.map((hp) => 
                                      <Fragment>
                                         { [2,5].includes(parseInt(applicant.apply_type)) && hp.id == 1 ? <option value={hp.id}>{hp.title}</option> : null } 
                                         { [1,4].includes(parseInt(applicant.apply_type)) && hp.id == 2 ? <option value={hp.id}>{hp.title}</option> : null } 
                                       </Fragment> 
                                       )}
                                    </select>
                                    { isDirty('institute_type',i) ? <label className="FloatLabel-label">Please select institution type</label> :'' }
                                </div>

                                <p className="u-ml-0 label-title">Institution Name</p>
                                <div id="ember1133" className={ !edurows[i].institute_name ? "fleet-name-input is-required ember-view" : (isDirty('institute_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                    <input type="text" name="institute_name" onChange={(e)=> onChange(e,i)}  value={edurows[i].institute_name} spellCheck="false" required placeholder="Enter Name of Institution" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                    { isDirty('institute_name',i) ? <label className="FloatLabel-label">Institution name cannot be blank</label> :'' }
                                </div>
                                
                                { edurows[i].institute_type ?
                                <Fragment>
                                <p className="u-ml-0 label-title">Certificate Type </p>
                                <div id="ember1133" className={ !edurows[i].cert_type ? "fleet-name-input is-required ember-view" : (isDirty('cert_type',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>
                                    <select name="cert_type" onChange={(e)=> onChange(e,i)}  value={edurows[i].cert_type} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view aurora-select ">
                                       <option selected disabled>-- Choose Type --</option>
                                       { helperData.certType.map((hp) =>
                                           edurows[i].institute_type && edurows[i].institute_type == hp.instituteType ? <option value={hp.id}>{hp.title}</option>: null 
                                       )}
                                    </select>
                                    { isDirty('cert_type',i) ? <label className="FloatLabel-label">Please select certificate type</label> :'' }
                                </div>
                                 </Fragment> : ''}
                                { edurows[i].institute_type && edurows[i].institute_type == 1 ?
                                <Fragment>
                                <p className="u-ml-0 label-title">Programme Pursued  / Awarded Certificate</p>
                                <div id="ember1133" className={ !edurows[i].cert_name ? "fleet-name-input is-required ember-view" : (isDirty('cert_name',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                    <input type="text" name="cert_name" onChange={(e)=> onChange(e,i)}  value={edurows[i].cert_name} spellCheck="false" required placeholder="Enter Programme pursued" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                    { isDirty('cert_name',i) ? <label className="FloatLabel-label">programme cannot be blank</label> :'' }
                                </div>

                                <p className="u-ml-0 label-title">Awarded Class </p>
                                <div id="ember1133" className={ !edurows[i].cert_name ? "fleet-name-input is-required ember-view" : (isDirty('cert_name',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>
                                    <select name="cert_class" onChange={(e)=> onChange(e,i)}  value={edurows[i].cert_class} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Class awarded --</option>
                                    { helperData.awardClass.map((hp) => 
                                        <option value={hp.id}>{hp.title}</option>
                                    )}
                                    </select>
                                </div>

                                <div className="start-cover flex-row">
                                    <span style={{width:'25%'}}>
                                        <p className="u-ml-0 label-title">Start Month </p>
                                        <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                                            <select name="cert_startmonth" onChange={(e)=> onChange(e,i)}  value={edurows[i].cert_startmonth} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                                <option selected disabled>-- Select Month --</option>
                                                { helperData.months.map((hp) => 
                                                    <option value={hp.id}>{hp.title}</option>
                                                )}
                                            </select>
                                        </div>
                                    </span>
                                    <span style={{width:'25%'}}>
                                        <p className="u-ml-0 label-title">Start Year </p>
                                        <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                                            <select name="cert_startyear" onChange={(e)=> onChange(e,i)}  value={edurows[i].cert_startyear} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                                <option selected disabled>-- Select Year --</option>
                                                { years().map((yr,i) => 
                                                    <option value={yr}>{yr}</option>
                                                )}
                                            </select>
                                        </div>
                                    </span>
                               
                                    <span style={{width:'25%'}}>
                                        <p className="u-ml-0 label-title">End Month </p>
                                        <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                                            <select name="cert_endmonth" onChange={(e)=> onChange(e,i)} value={edurows[i].cert_endmonth} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                                <option selected disabled>-- Select Month --</option>
                                                { helperData.months.map((hp) => 
                                                    <option value={hp.id}>{hp.title}</option>
                                                )}
                                            </select>
                                        </div>
                                    </span>

                                    <span style={{width:'25%'}}>
                                        <p className="u-ml-0 label-title">End Year </p>
                                        <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                                            <select name="cert_endyear"onChange={(e)=> onChange(e,i)} value={edurows[i].cert_endyear} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                                <option selected disabled>-- Select Year --</option>
                                                { years().map((yr,i) => 
                                                    <option value={yr}>{yr}</option>
                                                )}
                                            </select>
                                        </div>
                                    </span>
                                </div>
                                </Fragment> : ''}

                                {/* Secondary */}
                                { edurows[i].institute_type && edurows[i].institute_type == 2 ?
                                <Fragment>
                                <p className="u-ml-0 label-title">Aggregate Obtained <em><small><b>( ** Awaiting students should enter zero(0) **)</b></small></em></p>
                                <div id="ember1133" className={ !edurows[i].cert_grade ? "fleet-name-input is-required ember-view" : (isDirty('cert_grade',i) ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                    <input type="text" name="cert_grade" onChange={(e)=> onChange(e,i)} value={edurows[i].cert_grade} spellCheck="false" placeholder="Enter Aggregate obtained" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                    { isDirty('cert_grade',i) ? <label className="FloatLabel-label">Total aggregate cannot be blank</label> :'' }
                                </div>

                                <div className="start-cover flex-row">
                                   <span style={{width:'50%'}}>
                                        <p className="u-ml-0 label-title">End Month </p>
                                        <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                                            <select id="ember1134" name="cert_month" onChange={(e)=> onChange(e,i)} value={edurows[i].cert_month} className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                                <option selected disabled>-- Select Month --</option>
                                                { helperData.months.map((hp) => 
                                                    <option value={hp.id}>{hp.title}</option>
                                                )}
                                            </select>
                                        </div>
                                    </span>

                                    <span style={{width:'50%'}}>
                                        <p className="u-ml-0 label-title">End Year </p>
                                        <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                                            <select name="cert_year" onChange={(e)=> onChange(e,i)} value={edurows[i].cert_year} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                                <option selected disabled>-- Select Year --</option>
                                                { years().map((yr,i) => 
                                                    <option value={yr}>{yr}</option>
                                                )}
                                            </select>
                                        </div>
                                    </span>
                                    
                                </div>
                                </Fragment> : '' } 
                            
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

export default Education
