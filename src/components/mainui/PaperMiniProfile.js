import React, { Fragment, useEffect, useRef, useState } from 'react'
import '../../components/admission/FormPrint.css';
import Logo from '../../assets/img/logo.png'
import Mark from '../../assets/img/watermark.jpg'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print';
import AdminLayout from '../admission/AdminLayout';
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getMarital, getRegion, getTitle } from '../../store/utils/admissionUtil';



const PaperMiniProfile = () => {

  const { sso } = useSelector(state=>state)
  const { user,modal } = sso
  const dispatch = useDispatch()
  const printRef = useRef();
  const history = useHistory();
  const [ data, setData ] = useState([]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });


  useEffect(()=>{
    //handlePrint()
    //loadGrades()
     modal.content && setData({...modal.content})
     console.log(modal.content)
  },[])

  
  return (
     <>
     <div className="row">
        <div className="Box small-12 columns" style={{width:'900px', margin:'0px auto',float:'none',overflow:'hidden'}}>
            <div className="small-6 columns u-pl-0">
                <p className="u-mb-2 d-none"> <b>STAFF NUMBER : 15666</b> </p>
            </div>
            <div className="small-6 columns u-pr-0">
                <button onClick={handlePrint} className="Button u-floatRight u-mb-2">&nbsp;&nbsp;Print&nbsp;&nbsp;</button>
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
                    <h3 className="title-group">Staff Profile Information</h3>
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
                    Human Resourse Office<br/>
                    University Post Office<br/>
                    Private Mail Bag<br/>
                    AUCC-Ghana<br/><br/>
                    Tel:+233 3220 00001<br/>
                    Email: hr@aucc.edu.gh<br/>
                    <span className="aurora-small">{moment().format('DD/MM/YYYY')}</span>
                </address>
           </div>
       </header>
       <content>
           <h3 className="center black d-none"> Please Indicate Your Envelope Number At The Back Of Your EMS Envelope</h3>
           <h3 className="red w50 ws-auto center d-none">Add photocopies of all related documents, certificates & results Keep a copy of this printout for any future enquiry.</h3>
           <section >
               <table class="ptable">
                   {/* Personal */}
                   <tr>
                       <td style={{ minWidth:'200px'}}><h3 className="title">Personal Information</h3></td>
                       <td colSpan={2}>&nbsp;</td>
                   </tr>
                   <tr>
                       <td rowSpan={6}>
                           <img src={data.photo ? data.photo : Logo } style={{height:'200px',display:'block'}} />
                       </td>
                       <td className="shead">University Staff Number:</td>
                       <td className="sbody">{ data.staff_no }</td>
                   </tr>
                   <tr>
                       <td className="shead">University Email Address:</td>
                       <td className="sbody"><small><b>{ data.inst_mail && data.inst_mail.toUpperCase()}</b></small></td>
                   </tr>
                   <tr>
                       <td className="shead">University Department:</td>
                       <td className="sbody"><small><b>{ data.unit_name && data.unit_name.toUpperCase() || '-- NONE --' }</b></small></td>
                   </tr>
                  <tr>
                       <td colSpan={2}><hr/></td>
                  </tr>
                  <tr>
                       <td className="shead">Title:</td>
                       <td className="sbody">{data.title && data.title.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Surname:</td>
                       <td className="sbody">{data.lname && data.lname.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td rowSpan={11}></td>
                       <td className="shead">Other Names:</td>
                       <td className="sbody">{data.fname && data.fname.toUpperCase()} {data.mname && data.mname.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Date of Birth:</td>
                       <td className="sbody">{data.dob && moment(data.dob).format('DD MMMM, YYYY').toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Gender:</td>
                       <td className="sbody">{data.gender == 'M' ? 'MALE':'FEMALE'}</td>
                   </tr>
                   <tr>
                       <td className="shead">Marital Status:</td>
                       <td className="sbody">{data.mstatus }</td>
                   </tr>
                   <tr>
                       <td className="shead">Home Town:</td>
                       <td className="sbody">{data.hometown}</td>
                   </tr>
                  <tr>
                       <td className="shead">Phone Number:</td>
                       <td className="sbody">{data.phone}</td>
                   </tr>
                   <tr>
                       <td className="shead">Email Address:</td>
                       <td className="sbody">{data.email && data.email.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">Postal Address:</td>
                       <td className="sbody">{data.address && data.address.toUpperCase()}</td>
                   </tr>
                   <tr>
                       <td className="shead">National ID No:</td>
                       <td className="sbody">{data.paddress && data.paddress.toUpperCase()}</td>
                   </tr>
                  

                    
               </table>
           </section>

        </content>
    </div>
    </div>
    </>
  )
}

export default PaperMiniProfile
