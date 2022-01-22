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



const PaperDocs = () => {

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
     modal.content.data && setData([...modal.content.data]);
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
                    <h3 className="title-group">Applicant Submitted Documents</h3>
               </div>
           </div>
           <div className="right-head address">
                <address>
                    University Admissions Office<br/>
                    Private Mail Bag<br/>
                    AUCC-Ghana<br/><br/>
                    Tel:+233 3220 00001<br/>
                    Email: admissions@aucc.edu.gh<br/>
                    <span className="aurora-small">{moment().format('DD/MM/YYYY')}</span>
                </address>
           </div>
       </header>
       <content>
           <h3 className="center black d-none"> APPLICANT DOCUMENTS SUBMITTED</h3>
           <h3 className="red w50 ws-auto center d-none">Keep photocopies of all related documents, certificates & results.</h3>
           <section>
              { data && data.length > 0 ?
			    data.map((row,i) => 
               <table class="ptable">
                   <tr>
                       <td style={{ minWidth:'200px'}}><h3 className="title">{row.type || `DOCUMENT ${i+1}`}</h3></td>
                       <td colSpan={2}>&nbsp;</td>
                   </tr>
                   <tr>
                       <td colSpan={3} align='center'>
                          <iframe src={row.base64} height={1024} width={768} allowFullScreen />
                       </td>
                    </tr>
               </table>
               ) : null }
           </section>

        </content>
    </div>
    </div>
    </>
  )
}

export default PaperDocs
