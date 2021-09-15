import React,{useState,useEffect,useRef} from 'react'
import '../admission/FormPrint.css'
import Logo from '../../assets/img/logo.png'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { fetchSemesterSlip } from '../../store/utils/ssoApi'
import { useReactToPrint } from 'react-to-print';

const PaperSlip = () => {
    const { sso } = useSelector(state=>state)
    const { user } = sso
    const [ courses, setCourses ] = useState([])
    const printRef = useRef();

    const loadSemesterSlip = async () => {
		const res = await fetchSemesterSlip(user.user.session_id,user.user.indexno)
		if(res.success){
		   if(res.data.length > 0){
			  setCourses([...res.data])
              console.log(res.data)
		   }
        }
	}

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });
    

    useEffect(() => {
	  loadSemesterSlip()
      //handlePrint()
	},[])

	
    return (
    <>
    <div className="row">
        <div className="Box small-12 columns" style={{width:'900px', margin:'0px auto',float:'none',overflow:'hidden'}}>
            <div className="small-12 columns u-pr-0 right">
                <button onClick={handlePrint} className="Button u-floatRight u-mb-2">&nbsp;&nbsp;Print Registration Slip&nbsp;&nbsp;</button>
            </div>
        </div>
     </div>
    <div className="print" ref={printRef}>
    <div className="cover">
       <content>
           {/* REGISTRATION SLIP */}
           <div style={{marginTop:'40px'}}/>
           <section>
                <h1 className="h1title fore">AFRICAN UNIVERSITY COLLEGE OF COMMUNICATIONS, ACCRA</h1>
                <h2 className="h2title">{user.user.program_name && user.user.program_name.toUpperCase()}</h2>
                <h3 className="h3title">{`${user.user.session_name} REGISTRATION`}</h3>
                <img src={Logo} style={{height:'90px', width:'90px',position:'relative',top:'-75px',left: '90px', margin:'0px auto -55px'}}/>
                <hr className="divider"/>
                <div className="title-cover">
                    <div className="title-group">
                       <span>Name: {user.user.lname && user.user.lname.toUpperCase()}, {`${user.user.fname} ${user.user.mname || ''}`}</span><br/>
                       <span>Student ID: {user.user.refno}</span><br/>
                       <span>Index Number: {user.user.indexno && user.user.indexno.toUpperCase()}</span><br/>
                       <span>Option: {user.user.session && (user.user.session == 'M'?'Morning':(user.user.session == 'E' ? 'Evening':'Weekend')) || 'Morning'}</span><br/>
                    </div>
                    <div className="title-group">
                       <span>Programme: {user.user.program_name && user.user.program_name.toUpperCase()}</span><br/>
                       <span>Major: { user.user.major_name || 'None'}</span><br/>
                       <span>Year: {Math.ceil(user.user.semester/2)}</span><br/>
                       <span>Date/time printed: {moment().format('DD-MMM-YYYY HH:MM A')}</span><br/>
                    </div>
                </div>
                <hr className="divider"/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="codetitle" align="center">Course code</td>
                            <td className="tdtitle" align="left">Course name</td>
                            <td align="center">Credits</td>
                            <td></td>
                        </tr>
                        { courses && courses.length > 0 ?
						courses.map((row) =>
                        <tr class="tbody">
                            <td align="center">{row.course_code && row.course_code.toUpperCase()}</td>
                            <td>{row.course_name && row.course_name.toUpperCase()}</td>
                            <td align="center">{row.credit}</td>
                            <td>{row.score_type && row.score_type == 'R' ? 'Resit':''}</td>
                        </tr>
                         ) : null }
                    </tbody>
              </table>
              <hr className="divider"/>
              <div className="title-cover">
                    <div className="title-group">
                       <b>Total Courses registered:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{courses.length}<br/>
                    </div>
                    <div className="title-group">
                       <b>Total Credits registered:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{courses.reduce((acc,row)=> acc+row.credit,0)}<br/>
                    </div>
              </div><br/>
              <div className="title-cover">
                    <div className="title-group">
                       <span>--------------------------------------------------</span><br/>
                       <span className="sub">Student's Signature</span><br/>
                    </div>
                    <div className="title-group">
                       <span>--------------------------------------------------</span><br/>
                       <span className="sub">Academic Supervisor/ Registration Officer</span><br/>
                    </div>
              </div>
              <h3 className="ftitle" style={{display:'none'}}>REGISTRATION IS ONLY VALID AFTER BIOMETRIC VERIFICATION</h3>
              <br/><br/><div className="separator"></div>
            </section>


            <section>
                <h1 className="h1title fore">AFRICAN UNIVERSITY COLLEGE OF COMMUNICATIONS, ACCRA</h1>
                <h2 className="h2title">{user.user.program_name && user.user.program_name.toUpperCase()}</h2>
                <h3 className="h3title">{`${user.user.session_name} REGISTRATION`}</h3>
                <hr className="divider"/>
                <div className="title-cover">
                    <div className="title-group">
                       <span>Name: {user.user.lname && user.user.lname.toUpperCase()}, {`${user.user.fname} ${user.user.mname || ''}`}</span><br/>
                       <span>Student ID: {user.user.refno}</span><br/>
                       <span>Index Number: {user.user.indexno && user.user.indexno.toUpperCase()}</span><br/>
                       <span>Option: {user.user.session && (user.user.session == 'M'?'Morning':(user.user.session == 'E' ? 'Evening':'Weekend')) || 'Morning'}</span><br/>
                    </div>
                    <div className="title-group">
                       <span>Programme: {user.user.program_name && user.user.program_name.toUpperCase()}</span><br/>
                       <span>Major: { user.user.major_name || 'None'}</span><br/>
                       <span>Year: {Math.ceil(user.user.semester/2)}</span><br/>
                       <span>Date/time printed: {moment().format('DD-MMM-YYYY HH:MM A')}</span><br/>
                    </div>
                </div>
                <hr className="divider"/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="codetitle" align="center">Course code</td>
                            <td className="tdtitle" align="left">Course name</td>
                            <td align="center">Credits</td>
                            <td></td>
                        </tr>
                        { courses && courses.length > 0 ?
						courses.map((row) =>
                        <tr class="tbody">
                            <td align="center">{row.course_id && row.course_id.toUpperCase()}</td>
                            <td>{row.course_name && row.course_name.toUpperCase()}</td>
                            <td align="center">{row.credit}</td>
                            <td>{row.score_type && row.score_type == 'R' ? 'Resit':''}</td>
                        </tr>
                         ) : null }
                    </tbody>
              </table>
              <hr className="divider"/>
              <div className="title-cover">
                    <div className="title-group">
                       <b>Total Courses registered:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{courses.length}<br/>
                    </div>
                    <div className="title-group">
                       <b>Total Credits registered:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{courses.reduce((acc,row)=> acc+row.credit,0)}<br/>
                    </div>
              </div><br/>
              <div className="title-cover">
                    <div className="title-group">
                       <span>--------------------------------------------------</span><br/>
                       <span className="sub">Student's Signature</span><br/>
                    </div>
                    <div className="title-group">
                       <span>--------------------------------------------------</span><br/>
                       <span className="sub">Academic Supervisor/ Registration Officer</span><br/>
                    </div>
              </div>
              <h3 className="ftitle" style={{display:'none'}}>REGISTRATION IS ONLY VALID AFTER BIOMETRIC VERIFICATION</h3>
              <br/><br/><div className="separator"></div>
            </section>

        </content>
    </div>
    </div>
    </> 
    )
}

export default PaperSlip
