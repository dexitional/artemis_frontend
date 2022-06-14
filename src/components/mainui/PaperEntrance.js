import React, { Fragment, useEffect, useRef, useState } from 'react'
import '../../components/admission/FormPrint.css';
import Logo from '../../assets/img/logo.png'
import Mark from '../../assets/img/watermark.jpg'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print';
import AdminLayout from '../admission/AdminLayout';
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getMarital, getRegion, getSubject, getTitle } from '../../store/utils/admissionUtil';



const PaperEntrance = () => {

  const { sso } = useSelector(state=>state)
  const { user,modal } = sso
  const dispatch = useDispatch()
  const printRef = useRef();
  const history = useHistory();
  const [ data, setData ] = useState([]);
  const [ photo, setPhoto ] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });


  useEffect(()=>{
    //handlePrint()
    //loadGrades()
     modal.content.data && setData({ ...modal.content.data })
     modal.content.photo && setPhoto({ ...modal.content.photo })
     
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
                    <h3 className="title-group">MATURED ENTRANCE EXAMS</h3>
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
                    Admissions Office<br/>
                    University Post Office<br/>
                    Private Mail Bag<br/>
                    AUCC-Ghana<br/><br/>
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
                       <td style={{ minWidth:'200px'}}><h3 className="title">RESULTS STATEMENT</h3></td>
                       <td colSpan={2}>&nbsp;</td>
                   </tr>
                   <tr>
                       <td rowSpan={11}>
                           <img src={modal.content.data[0].photo ? modal.content.data[0].photo : Logo } style={{height:'200px',display:'block'}} />
                       </td>
                       <td className="shead">CANDIDATE NUMBER :</td>
                       <td className="sbody">{modal.content.data && modal.content.data[0].serial}</td>
                   </tr>
                   <tr>
                       <td className="shead">CANDIDATE NAME :</td>
                       <td className="sbody"><small><b>{modal.content.data && modal.content.data[0].name}</b></small></td>
                   </tr>
                   <tr>
                       <td className="shead">EXAMS SESSION :</td>
                       <td className="sbody"><small><b>{modal.content.data && modal.content.data[0].title}</b></small></td>
                   </tr>
                   
                  <tr>
                       <td colSpan={2}><hr/></td>
                  </tr>
                  <tr>
                       <td colSpan={2}><h3 className="sbody center">SUBJECTS & GRADING</h3></td>
                  </tr>
                  <tr>
                       <td colSpan={2}><hr/></td>
                  </tr>
                  { modal.content.data && modal.content.data.map(row => 
                  <tr>
                       <td colSpan={2} className="shead"><small><b>{getSubject(row.subject_id) && getSubject(row.subject_id).toUpperCase()}</b> :  [ <b className="input-item-label">{row.score}</b> ] -- <b>{row.grade}</b> -- </small></td>
                   </tr>
                   )}
                  
                  

                    
               </table>
           </section>

        </content>
    </div>
    </div>
    </>
  )
}

export default PaperEntrance
