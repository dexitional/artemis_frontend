import React,{ Fragment, useEffect,useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import AdminLayout from '../../components/admission/AdminLayout'
import { setApplyMode, setEducation, setStage, updateUser } from '../../store/admission/applicantSlice'
import { setActiveStep, setIsAllowed, setMeta, setPrevStep } from '../../store/admission/stepSlice'
import { getApplyTypeTitle, getStageTitle, getStepData, sortMeta } from '../../store/utils/admissionUtil';
import { helperData } from '../../store/utils/helperData';
import { loadAMSHelpers } from '../../store/utils/ssoApi';

const Admin = () => {
     
    const { step,applicant } = useSelector(state => state)
    const dispatch = useDispatch();
    const stageRef = useRef();
    const [group,setGroup] = useState({});
    const [ helper,setHelper ] = useState({ session:{},programs:[],majors:[],stages:[],applytypes:[] });
    const history = useHistory();
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(group.stage_id !== '' && group.apply_type !== ''){
           const cm = window.confirm('Proceed to Application Session?')
           if(cm){
             // Refactor Form Meta
             const at = applicant.apply_type;
             var meta;
             var defaultMeta = step.defaultMeta;
             if(at == '1'){ // WASSCE/SSCE/GCE APPLICANT
                meta = defaultMeta.filter(r => !['referee','qualification','employment','document'].includes(r.tag))
                dispatch(setMeta([...sortMeta(meta)]))
             
            }else if(at == '2'){ // DIPLOMA/DEGREE (UG) APPLICANT
                meta = defaultMeta.filter(r => !['referee','qualification','employment','result'].includes(r.tag))
                dispatch(setMeta([...sortMeta(meta)]))
             
             }else if(at == '3'){ // MATURED APPLICANT
                meta = defaultMeta.filter(r => !['referee','qualification','employment','education','result'].includes(r.tag))
                dispatch(setMeta([...sortMeta(meta)]))
             }else if(at == '4'){ // IB/IGCSE/GCSE APPLICANT
                meta = defaultMeta.filter(r => !['referee','qualification','employment'].includes(r.tag))
                dispatch(setMeta([...sortMeta(meta)]))
             }else if(at == '5'){ // DEGREE/OTHERS (PG) APPLICANT
                meta = defaultMeta.filter(r => !['qualification','result'].includes(r.tag))
                dispatch(setMeta([...sortMeta(meta)]))
             }else{
                 console.log("No condition matched!")
             }
             // Reset Institute Type in Education tag
             if(applicant.education.length > 0){
               var education = [...applicant.education];
               var mx = [];
               for(var m = 0; m < education.length; m++){
                  if(education[m].institute_type != ''){
                    //education[m].institute_type = '';
                    let x = {...education[m]};
                    x.institute_type = applicant.apply_type == 2 ? '1':'2';
                    mx.push(x);
                  }
               }  dispatch(setEducation(mx))
             } 
             // Update Mode of Application Name
             dispatch(updateUser({...applicant.user, name: getStageTitle(group.stage_id)+' | '+getApplyTypeTitle(group.apply_type)}))
             // Set Access & Redirect
             dispatch(setIsAllowed(true));
             // Set Active Step to Start
             dispatch(setActiveStep(1));
             history.push('admission-session');
           }
        } return false;
    }

    const helperData = async() => {
        const hps = await loadAMSHelpers()
        console.log(hps)
        if(hps.success){
          setHelper(hps.data)
        } 
    }

    const onChange = (e) => {
       setGroup({ ...group, [e.target.name] : e.target.value });
    }

    const reviewForm = () => {
      const cm = window.confirm("Review Aplication Form")
      if(cm){
        history.push('/admission-print')
        dispatch(setPrevStep())
      }
     
    }

    const printForm = () => {
       const cm = window.confirm("Print Submitted Aplication Form")
       if(cm) history.push('/admission-print')
    }

    useEffect(() => {
       helperData()
       setGroup({ stage_id: applicant.stage_id, apply_type: applicant.apply_type });
       console.log(applicant.group_id)
    },[])

    useEffect(() => {
       dispatch(setStage(group.stage_id))
       dispatch(setApplyMode(group.apply_type))
    })


    return (
        <AdminLayout>
            <div className="row">
            
                <div className="small-12 columns">{/*<AlertBanner/>*/}</div>
                <div className="small-12 columns">
                
                    <div id="ember1330" className="ember-view">
                       <section className="bandwidth-meter">
                        <div className="Box">
                            <h3 className="heading">APPLICATION GUIDE<hr/></h3>
                            { applicant.stage_id && applicant.apply_type ?
                            <Fragment>
                            <p className="u-floatRight u-mb-2">COMPLETED <b>STEP {step.step}</b> out of <b>STEP {step.count}</b></p>
                            <div id="ember1331" className="bandwidth-meter-calculated-tooltip u-ml-1 tooltip-wrap multiline ember-view"/>
                             <p className="u-mb-2"></p>
                            <div className="bandwidth-meter-graph u-mb-2">
                                <div className="bandwidth-meter-used" style={applicant.flag_submit <= 0 ? {background:'rgb(183 97 23)', width: `${((step.step/step.count)*100)}`} : { background:'green', width: `${((step.step/step.count)*100)}`}}/>
                                <div className="bandwidth-meter-graph-tooltip tooltip-wrap multiline ember-view">
                                    <span className="bandwidth-meter-graph-tooltip-target" />
                                </div>
                            </div>
                            <p><b>Current Step is <span style={applicant.flag_submit <= 0 ? {color:'rgb(183 97 23)'} : {color:'green'}}>{getStepData(step,step.step) && getStepData(step,step.step).title}</span> .</b> <em>( Application submitted! You can review and edit before deadline for final submission !  )</em></p><hr/>
                            
                            {applicant.flag_submit > 0 &&
                            <section className="Box">
                            <div className="row">
                            {/*
                            <div className="small-12 columns">
                                <div className="small-8 columns u-pl-0">
                                    <h3 className="u-mb-1">Visit Application Review</h3>
                                    <p className="u-mb-4">Revise your application and make any changes where necessary.<br/><small><b>Changes can not be made to application past the Admission Deadline.</b></small></p>
                                </div>
                                <div className="small-4 columns u-pr-0">
                                    <button onClick={reviewForm} className="Button u-floatRight u-mb-3">&nbsp;<span className="Icon--edit" />&nbsp;&nbsp;Review Application Form&nbsp;&nbsp;</button>
                                </div>
                            </div><hr style={{border:'1px solid #ccc'}}/>
                            */}
                            <div className="small-12 columns">
                                <div className="small-8 columns u-pl-0">
                                    <h3 className="u-mb-1">Print Out Application</h3>
                                    <p className="u-mb-2">Get application printout for endorsement or personal submission.<br/><small><b>Changes can not be made to application past the Admission Deadline.</b></small></p>
                                </div>
                                <div className="small-4 columns u-pr-0">
                                    <button onClick={printForm} className="Button u-floatRight u-mb-2">&nbsp;<i className="fa fa-print" />&nbsp;&nbsp;Print Application Form&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                </div>
                            </div>
                            </div>
                            </section> }
                            </Fragment>: null }
                           {/* */}
                            <div className="bandwidth-faq">
                                <div role="button" className="bandwidth-faq-question"><b>HOW DOES THIS APPLICATION PROCEDURE WORK ?</b></div>
                                <div className="bandwith-faq-answer">
                                    <p>The application process requires of an applicant to upload a passport size photo which meets the requirements below:
                                      <ul>
                                        <li><b>Photo format</b>:   Standard Passport-Sized Picture of <b>JPEG</b> format</li>
                                        <li><b>Size of passport photo</b>:  <b>2 inches x 2 inches</b> dimensions and image size not exceeding <b>500KB</b> (Kilobytes)</li>
                                        <li><b>Color</b>: Must be in color, no black and white images are allowed</li>
                                        <li><b>Head position</b>: Face camera directly (straight)</li>
                                        <li><b>Background:</b> White plain background</li>
                                        <li><b>Glasses</b>: No sunglasses allowed, only daily wearable glasses</li>
                                        <li><b>Headgear</b>: None, except for religious purposes</li>
                                      </ul>
                                    </p>
                                    <p>Applicant is expected to <b>Configure application mode</b> for an appropriate representation of choices. Please scroll below to choose mode of application and click on "<b>Begin enrolment procedure</b>" to start.</p>
                                    <p>Follow on to fill out your personal details, guardian information, educational records, exams results, programme choice(s) and upload supporting documents to complete the process. 
                                    <a id="ember2287" className="aurora-a bandwidth-meter-heading-link is-community-link bandwidth-meter-heading-link ember-view" target="_blank" href="#" rel="noopener noreferrer">Please check admission requirements for eligibility</a>      
                                    </p>
                                    <p>
                                      <ul>
                                        <li><b><small>Applicants with SSSCE / WASSCE Results will have to provide results details such as; Month and Year of Exam, Candidate Number and Subjects with their respective grades.</small></b></li>
                                        <li><b><small>Applicants preparing for May / June {new Date().getFullYear()} WASSCE Exam will have to provide their Candidate Number for that exam.</small></b></li>
                                        <li><b><small>Diploma to Degree Applicants You will need the Name of University / Institution attended, Award or Qualification obtained, Month and Year of Award and Class obtained.</small></b></li>
                                      </ul>
                                    </p>  
                                    <p> 
                                        <b>ALL APPLICANTS</b> are to <b>print two (2) copies</b> of their application form:
                                           <ol>
                                               <li>One copy for submission alongside other relevant documents <b>( including Certificates )</b>.</li>
                                               <li>The other copy for personal review.</li>
                                           </ol> 
                                       
                                     
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/*  ENROLMENT */}
                        <ul role="tablist" className="Tabs"/>
                        <div className="Tabs-content Tabs-content--box">
                            <div role="tabpanel" className="Tabs-pane is-active">
                                <h3 className="u-mb-3 heading">Configure Application Mode</h3>
                                <p>To start your application procedure, you are required to choose <b>admission group</b> and <b>application type</b> for your defined application form.</p>
                                <div id="ember1380" className="paypal-form ember-view">
                                    <form method="post" onSubmit={onSubmit} id="ember1385" className="ember-view">
                                        <div>

                                           {helper && helper.session.apply_freeze == 0 && 
                                           <div className="row">
                                                <div className="small-5 columns">
                                                    <div className="select-wrapper FloatLabel">
                                                        <div className="Select" >
                                                            <select name="stage_id" onChange={onChange} value={applicant.stage_id} className="select aurora-select">
                                                                <option value="" selected>-- Choose Admission Group -- </option>
                                                                { helper && helper.stages.map((hp) => hp.status == 1 && applicant.group_id == hp.group_id ?
                                                                  <option value={parseInt(hp.stage_id)}>{hp.title.toUpperCase()}</option> : null
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="small-4 columns">
                                                    <div className="select-wrapper FloatLabel">
                                                        <div className="Select" >
                                                            <select name="apply_type" onChange={onChange} value={applicant.apply_type} className="select aurora-select">
                                                                <option value="" selected>-- Choose Application Type --</option>
                                                                { helper && helper.applytypes.map((hp) => 
                                                                <Fragment>
                                                                  {  hp.status == 1 && hp.stages.includes(parseInt(applicant.stage_id)) ? <option value={parseInt(hp.type_id)}>{hp.title}</option> : null }
                                                                </Fragment>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="small-3 columns">
                                                    <button type="submit" className="Button  Button--fullWidth Button--green">
                                                        <span className="Button--text">{applicant.stage_id && applicant.apply_type ? 'GOTO APPLICATION' : 'BEGIN ENROLMENT'} </span>
                                                    </button>
                                                </div>
                                            </div>
                                            }


                                            {/* MAINTENANCE NOTE */}
                                            { helper && helper.session.apply_freeze == 1 && 
                                            <div className="row">
                                                <div className="small-12 columns">
                                                    <h2 className="text-danger"> * SYSTEM UNDER MAINTENANCE - APPLICATIONS SHALL RESUME SHORTLY !! </h2>
                                                </div>
                                            </div>
                                            }

                                        </div>
                                    </form>
                                    <p className="small u-textAlignCenter u-grey">
                                        <b>* It takes just few minutes to complete your application processes, Good luck!.</b>
                                    </p>


                                </div>
                            </div>
                           
                        </div>
                
                    </section>
                    </div>
                
                </div>
            </div> 
        </AdminLayout>
    )
}

export default Admin
