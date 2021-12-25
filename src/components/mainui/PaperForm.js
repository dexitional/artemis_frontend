import React, { Fragment, useEffect, useRef, useState } from 'react'
import '../../components/admission/FormPrint.css';
import Logo from '../../assets/img/logo.png'
import Mark from '../../assets/img/watermark.jpg'
import { getMarital, getRegion, getStage, getTitle,getRelation,getCertType, getClass, getSitting, getProgram,getSubject, getGrade, getStageTitle, getApplyTypeTitle, getMonth } from '../../store/utils/admissionUtil';
import moment from 'moment'
import { useReactToPrint } from 'react-to-print';
import AdminLayout from '../admission/AdminLayout';
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { setPrevStep } from '../../store/admission/stepSlice'
import { loadAMSHelpers } from '../../store/utils/ssoApi';


const PaperForm = () => {

  const [ helpers,setHelpers ] = useState({ countries:[],adm_programs:[] });
  const { step,applicant } = useSelector(state => state);
  const dispatch = useDispatch()
  const printRef = useRef();
  const history = useHistory();
  const [ grades, setGrades ] = useState([]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const loadGrades = () => {
      const res = applicant.result;
      if(res && res.length > 0){
        var data = []
        for(var i = 0; i < res.length; i++){
          console.log(`${res[i].result_id}`)
          var dt = applicant.grade.filter( r => r.result_id == res[i].result_id)
          console.log(dt);
          if(dt.length > 0) data.push(dt);
        } setGrades([...data])
      }
  }
  
  const getData = (id,index) => {
    var dt = grades.filter( r => r.result_id == id)
    if(dt.length > 0){
      return dt[index];
    }
    return null;
  }
  
  const isTag = (tg) => {
     const tag = step.meta.find(t => t.tag == tg);
     if(tag) return true;
     return false;
  }

  const helperLoader = async() => {
    const hps = await loadAMSHelpers()
    if(hps.success){
        setHelpers(hps.data)
    } 
  }

  useEffect(()=>{
    //handlePrint()
    //loadGrades()
    helperLoader()
    setGrades([...applicant.grade]);
  },[])

  
  return (
     <>
     <div className="row">
        <div className="Box small-12 columns" style={{width:'900px', margin:'0px auto',float:'none',overflow:'hidden'}}>
            <div className="small-6 columns u-pl-0">
                <p className="u-mb-2 d-none"> <b>APPLICANT ID: {applicant.user.serial}</b> </p>
            </div>
            <div className="small-6 columns u-pr-0">
                <button onClick={handlePrint} className="Button u-floatRight u-mb-2">&nbsp;&nbsp;Print Form&nbsp;&nbsp;</button>
            </div>
        </div>
     </div>
     
     <div ref={printRef}>
     <div className="fade-bg" style={{ background:` center 75% / 650px 650px no-repeat url(${Mark})`}}></div>
     <div className="cover">
       <header>
           <div className="left-head">
               <img src={Logo} className="logo"/>
               <div className="left-cover">
                    <h2><span style={{fontSize:'27.5px',color:'#b76117',letterSpacing:'0.07em'}}>AFRICAN UNIVERSITY</span><br/>COLLEGE OF COMMUNICATIONS</h2>
                    <h3 className="title-group">{applicant.user.group_name} Online Application Form</h3>
               </div>
           </div>
           <div className="right-head address">
               {/*
                <address>
                    School of Graduate Studies<br/>
                    Private Mail Bag<br/>
                    University Post Office<br/>
                    Kumasi-Ghana<br/><br/>

                    Tel:+233 3220 60331<br/>
                    Fax:+233 3220 60137<br/>
                    Email: graduatestudies@knust.edu.gh<br/><br/>
                    <span className="small">30/10/2020</span>
                </address>
                */}
                <address>
                    Academic Affairs Office<br/>
                    University Post Office<br/>
                    Private Mail Bag<br/>
                    AUCC-Ghana<br/><br/>
                    Tel:+233 3220 00001<br/>
                    Email: admissions@aucc.edu.gh<br/>
                    <span className="aurora-small">{moment().format('DD/MM/YYYY')}</span>
                </address>
           </div>
       </header>
       <content>
           <h3 className="center black d-none"> Please Indicate Your Envelope Number At The Back Of Your EMS Envelope</h3>
           <h3 className="red w50 ws-auto center">Add photocopies of all related documents, certificates & results Keep a copy of this printout for any future enquiry.</h3>
           <section >
               <table class="ptable">
                   {/* Personal */}
                   <tr>
                       <td style={{ minWidth:'200px'}}><h3 className="title">Personal Information</h3></td>
                       <td colSpan={2}>&nbsp;</td>
                   </tr>
                   <tr>
                       <td rowSpan={6}>
                           <img src={applicant.user.photo ? applicant.user.photo : Logo } style={{width:'192px',display:'block',marginRight:'25px'}} />
                       </td>
                       <td className="shead">Applicant ID:</td>
                       <td className="sbody">{applicant.user.serial}</td>
                   </tr>
                   <tr>
                       <td className="shead">Admission Group:</td>
                       <td className="sbody"><small><b>{getStageTitle(applicant.stage_id) && getStageTitle(applicant.stage_id).toUpperCase()}</b></small></td>
                   </tr>
                   <tr>
                       <td className="shead">Application Type:</td>
                       <td className="sbody"><small><b>{getApplyTypeTitle(applicant.apply_type) && getApplyTypeTitle(applicant.apply_type).toUpperCase()}</b></small></td>
                   </tr>
                  <tr>
                       <td colSpan={2}><hr/></td>
                  </tr>
                  <tr>
                       <td className="shead">Title:</td>
                       <td className="sbody">{getTitle(applicant.profile.title)}</td>
                   </tr>
                   <tr>
                       <td className="shead">Surname:</td>
                       <td className="sbody">{applicant.profile.lname && applicant.profile.lname.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td rowSpan={['7','8'].includes(applicant.stage_id) ? '11':'9'}></td>
                       <td className="shead">Other Names:</td>
                       <td className="sbody">{applicant.profile.fname && applicant.profile.fname.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Date of Birth:</td>
                       <td className="sbody">{applicant.profile.dob && moment(applicant.profile.dob).format('DD MMMM, YYYY').toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Gender:</td>
                       <td className="sbody">{applicant.profile.gender == 'M' ? 'MALE':'FEMALE'}</td>
                   </tr>
                   <tr>
                       <td className="shead">Marital Status:</td>
                       <td className="sbody">{applicant.profile.mstatus && getMarital(applicant.profile.mstatus).toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Home Region:</td>
                       <td className="sbody">{getRegion(applicant.profile.home_region)}</td>
                   </tr>
                  <tr>
                       <td className="shead">Phone Number:</td>
                       <td className="sbody">{applicant.profile.phone}</td>
                   </tr>
                   <tr>
                       <td className="shead">Email Address:</td>
                       <td className="sbody">{applicant.profile.email && applicant.profile.email.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Postal Address:</td>
                       <td className="sbody">{applicant.profile.pobox_address && applicant.profile.pobox_address.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Residential Address:</td>
                       <td className="sbody">{applicant.profile.resident_address && applicant.profile.resident_address.toUpperCase()}</td>
                   </tr>
                   { ['7','8'].includes(applicant.stage_id) ? 
                   <Fragment>
                   <tr>
                       <td className="shead">Present Occupation:</td>
                       <td className="sbody">{applicant.profile.present_occupation && applicant.profile.present_occupation.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Place of Work:</td>
                       <td className="sbody">{applicant.profile.work_place && applicant.profile.work_place.toUpperCase()}</td>
                   </tr>
                   </Fragment> : null }

                    {/* Guardian */}
                   <tr><td colSpan="3"><hr/></td></tr>
                   <tr>
                       <td colSpan={2}><h3 className="title"> Parental/Guardian/Next of Kin Information</h3></td>
                       <td>&nbsp;</td>
                   </tr>
                   <tr>
                       <td rowSpan={6} className="shead">
                           &nbsp;
                       </td>
                       <td className="shead">Name:</td>
                       <td className="sbody">{applicant.guardian.title && getTitle(applicant.guardian.title).toUpperCase()} {(applicant.guardian.fname && applicant.guardian.fname.toUpperCase())+' '+(applicant.guardian.lname && applicant.guardian.lname.toUpperCase())}</td>
                   </tr>
                   <tr>
                       <td className="shead">Relation to Applicant:</td>
                       <td className="sbody">{getRelation(applicant.guardian.relation) && getRelation(applicant.guardian.relation).toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Occupation:</td>
                       <td className="sbody">{applicant.guardian.occupation && applicant.guardian.occupation.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Phone Number:</td>
                       <td className="sbody">{applicant.guardian.phone}</td>
                   </tr>
                   <tr>
                       <td className="shead">Email Address:</td>
                       <td className="sbody">{applicant.guardian.email && applicant.guardian.email.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Address:</td>
                       <td className="sbody">{applicant.guardian.address && applicant.guardian.address.toUpperCase()}</td>
                   </tr>
               </table>
           </section>

           <section>
               <table class="ptable">
                 
                  { isTag('education') ? 
                   <Fragment>
                  <tr><td colSpan="4"><hr/></td></tr>
                  <tr>
                       <td colSpan="3"><h3 className="title"> Educational Background</h3></td>
                       <td>&nbsp;</td>
                   </tr>
                   
                   {/* Education */}
                   <tr><td colSpan="4">&nbsp;</td></tr>
                   { applicant.education.map((row,i) => 
                   <Fragment key={i}>
                   {row.institute_type == 1 ?
                   <Fragment>
                   <tr>
                      <td colSpan="4">
                          <h3 className="black"><u>University or College Award Information</u></h3>
                      </td>
                  </tr>
                  <tr>
                       <td className="sbody">Institution</td>
                       <td className="sbody">Degree Obtained</td>
                       <td className="sbody">Degree Class</td>
                       <td className="sbody">Duration</td>
                   </tr>
                   <tr>
                       <td className="shead">{row.institute_name && row.institute_name.toUpperCase()}</td>
                       <td className="shead">{row.cert_name && row.cert_name.toUpperCase()} ({getCertType(row.cert_type) && getCertType(row.cert_type)['title']})</td>
                       <td className="shead">{getClass(row.cert_class) && getClass(row.cert_class)['title'].toUpperCase()}</td>
                       <td className="shead">{row.cert_startmonth && moment(`${row.cert_startmonth}-${row.cert_startyear}`,'M-YYYY').format('MMMM, YYYY').toUpperCase()} - {moment(`${row.cert_endmonth}-${row.cert_endyear}`,'M-YYYY').format('MMMM, YYYY').toUpperCase()}</td>
                   </tr>
                   </Fragment> :
                   <Fragment>
                   <tr>
                      <td colSpan="4">
                          <h3 className="black"><u>Secondary Education Certificate Information</u></h3>
                      </td>
                  </tr>
                  <tr>
                       <td className="sbody">Institution</td>
                       <td className="sbody">Certificate Awarded</td>
                       <td className="sbody">Certificate Aggregate</td>
                       <td className="sbody">Month/Year Completed</td>
                   </tr>
                   <tr>
                       <td className="shead">{row.institute_name && row.institute_name.toUpperCase()}</td>
                       <td className="shead">{getCertType(row.cert_type) && getCertType(row.cert_type)['title']}</td>
                       <td className="shead">{row.cert_grade}</td>
                       <td className="shead">{row.cert_month && moment(`${row.cert_month}-${row.cert_year}`,'M-YYYY').format('MMMM YYYY').toUpperCase()}</td>
                   </tr>
                   </Fragment> }
    
                   </Fragment>
                   )}

                   </Fragment> : null
                   }

                   {/* Referee */ }
                   { isTag('referee') ? 
                   <Fragment>
                   <tr><td colSpan="4">&nbsp;</td></tr>
                   <tr>
                      <td colSpan="4">
                          <h3 className="black"><u>Names and Addresses of Two Academic Referees</u></h3>
                      </td>
                   </tr>
                   <tr>
                       <td colSpan="2" className="sbody">Referee Name</td>
                       <td colSpan="2" className="sbody">Referee Address</td>
                   </tr>
                   { applicant.referee.map((row,i) => 
                   <tr key={i}>
                       <td colSpan="2" className="shead">{getTitle(row.title)} {row.fname} {row.lname}</td>
                       <td align="left" colSPan="2" className="shead">{row.address} - ({row.phone})</td>
                   </tr>
                    )}
                   </Fragment> : null }
                   {/*

                   {/* Qualification }
                   <tr><td colSpan="4">&nbsp;</td></tr>
                   <tr>
                      <td colSpan="4">
                          <h3 className="black"><u>Other Educational Qualifications</u></h3>
                      </td>
                   </tr>
                  <tr>
                       <td className="sbody">Qualification</td>
                       <td colSpan="2" className="sbody">Awarding Institution</td>
                       <td className="sbody">Date Awarded</td>
                   </tr>
                   <tr>
                       <td className="shead">BACHELOR OF SCIENCE</td>
                       <td colSpan="2" className="shead">KWAME NKRUMAH UNIVERSITY OF SCIENCE AND TECHNOLOGY</td>
                       <td className="shead">August, 2012</td>
                   </tr>
                  */}

                   {/* Employment */}
                   { isTag('employment') ? 
                   <Fragment>
                   <tr><td colSpan="4">&nbsp;</td></tr>
                   <tr><td colSpan="4"><hr/></td></tr>
                   <tr>
                       <td colSpan="3"><h3 className="title">  Work Experience Information</h3></td>
                       <td>&nbsp;</td>
                   </tr>
                   <tr>
                       <td className="sbody">Employer Name</td>
                       <td className="sbody">Job Title</td>
                       <td className="sbody">Employer Address</td>
                       <td className="sbody">Duration</td>
                   </tr>
                  { applicant.employment.map((row,i) => 
                   <tr>
                       <td className="shead">{row.employer_name}</td>
                       <td className="shead">{row.job_title}</td>
                       <td className="shead">{row.employer_address}</td>
                       <td className="shead">{ getMonth(row.start_month).title }, {row.start_year} - { (!row.end_month && !row.end_year) ? 'Till Date':`${getMonth(row.start_month).title}, ${row.end_year}`}</td>
                   </tr>
                    )}
                   </Fragment> : null }
                   


                   {/* Result */}
                   { isTag('result') ? 
                   <Fragment>
                   <tr><td colSpan="4">&nbsp;</td></tr>
                   <tr><td colSpan="4"><hr/></td></tr>
                   <tr>
                       <td colSpan="3"><h3 className="title">  Examination Results Information</h3></td>
                       <td>&nbsp;</td>
                   </tr>
                   { applicant.result.map((row,i) => 
                   <Fragment key={i}>
                   <tr>
                      <td colSpan="4">
                          <h3 className="black"><u>Results {i+1}</u></h3>
                      </td>
                   </tr>
                   <tr>
                       <td className="sbody">Exams Type</td>
                       <td className="shead">{getCertType(row.exam_type) && getCertType(row.exam_type)['title']}</td>
                       <td className="sbody">Subject</td>
                       <td className="sbody">Grade</td>
                   </tr>
                   <tr>
                       <td className="sbody">Exams Year</td>
                       <td className="shead">{row.exam_year}</td>
                       <td className="shead">{getData(row.result_id,0) && getSubject(getData(row.result_id,0).subject).toUpperCase()}</td>
                       <td className="shead">{getData(row.result_id,0) && getGrade(getData(row.result_id,0).grade)}</td>
                   </tr>
                   <tr>
                       <td className="sbody">Exams Sitting</td>
                       <td className="shead">{getSitting(row.exam_sitting)}</td>
                       <td className="shead">{getData(row.result_id,1) && getSubject(getData(row.result_id,1).subject).toUpperCase()}</td>
                       <td className="shead">{getData(row.result_id,1) && getGrade(getData(row.result_id,1).grade)}</td>
                   </tr>
                   <tr>
                       <td className="sbody">Index Number</td>
                       <td className="shead">{row.index_number}</td>
                       <td className="shead">{getData(row.result_id,2) && getSubject(getData(row.result_id,2).subject).toUpperCase()}</td>
                       <td className="shead">{getData(row.result_id,2) && getGrade(getData(row.result_id,2).grade)}</td>
                   </tr>
                   <tr>
                       <td className="sbody">{getData(row.result_id,6) || getData(row.result_id,7) && 'Subject'}</td>
                       <td className="sbody">{getData(row.result_id,6) || getData(row.result_id,7) && 'Grade'}</td>
                       <td className="shead">{getData(row.result_id,3) && getSubject(getData(row.result_id,3).subject).toUpperCase()}</td>
                       <td className="shead">{getData(row.result_id,3) && getGrade(getData(row.result_id,3).grade)}</td>
                   </tr>
                   <tr>
                       <td className="shead">{getData(row.result_id,6) && getSubject(getData(row.result_id,6).subject).toUpperCase()}</td>
                       <td className="shead">{getData(row.result_id,6) && getGrade(getData(row.result_id,6).grade)}</td>
                       <td className="shead">{getData(row.result_id,4) && getSubject(getData(row.result_id,4).subject).toUpperCase()}</td>
                       <td className="shead">{getData(row.result_id,4) && getGrade(getData(row.result_id,4).grade)}</td>
                   </tr>
                   <tr>
                       <td className="shead">{getData(row.result_id,7) && getSubject(getData(row.result_id,7).subject).toUpperCase()}</td>
                       <td className="shead">{getData(row.result_id,7) && getGrade(getData(row.result_id,7).grade)}</td>
                       <td className="shead">{getData(row.result_id,5) && getSubject(getData(row.result_id,5).subject).toUpperCase()}</td>
                       <td className="shead">{getData(row.result_id,5) && getGrade(getData(row.result_id,5).grade)}</td>
                   </tr>
                   <tr><td colSpan="4">&nbsp;</td></tr>
                   </Fragment>

                   )}
                   </Fragment> : null }

                    {/* Choice */}
                    <tr><td colSpan="4"><hr/></td></tr>
                   <tr>
                       <td colSpan="3"><h3 className="title"> University Enrollment Information</h3></td>
                       <td>&nbsp;</td>
                   </tr>
                   { applicant.choice.map((row,i) =>
                   <tr>
                       <td className="shead">&nbsp;&nbsp;&nbsp;Program Choice {i+1}: </td>
                       <td colSpan="4" className="sbody">{getProgram(row.option_id,helpers.adm_programs) && getProgram(row.option_id,helpers.adm_programs).toUpperCase()}</td>
                   </tr>
                   )}



                   {/* Declaration */}
                   <tr><td colSpan="4">&nbsp;</td></tr>
                   <tr><td colSpan="4"><br/></td></tr>
   
               </table>
           </section>
        </content>
    </div>
    </div>
    </>
  )
}

export default PaperForm
