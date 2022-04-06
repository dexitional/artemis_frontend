import React,{useState,useEffect,useRef} from 'react'
import '../admission/FormPrint.css'
import Logo from '../../assets/img/logo.png'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { fetchSemesterSlip } from '../../store/utils/ssoApi'
import { useReactToPrint } from 'react-to-print';

const PaperMountList = () => {
    const { sso } = useSelector(state=>state)
    const { modal } = sso
    const [ data, setData ] = useState([])
    const [ session, setSession ] = useState({})
    
    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });
    
    useEffect(() => {
        modal.content.session && setSession({...modal.content.session});
        modal.content.data && setData([...modal.content.data]);
        console.log(modal.content)
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
                <h2 className="h2title">{session.title}</h2>
                <h3 className="h3title">MOUNTED COURSES FOR REGISTRATION [ {data && data.length} GROUPS ]</h3>
                <img src={Logo} style={{height:'90px', width:'90px',position:'relative',top:'-75px',left: '90px', margin:'0px auto -55px'}}/>
                <hr className="separator"/>

                { data && data.length > 0 ?
						data.map((row) =>
                <>
                <div className="title-cover">
                    <div className="title-group">
                       <span><b>PROGRAMME</b> : &nbsp;&nbsp;&nbsp;<b className="fore">{row.program_name}</b></span><br/>
                       <span><b>MAJOR</b>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em className="fore">{row.major_name || '--NONE--'}</em></span><br/>
                       <span><b>MIN CREDIT</b>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{row.min_credit}   </span><br/>
                    
                    </div>
                    <div className="title-group">
                       <span><b>YEAR</b> : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="fore" style={{fontSize:'13px'}}>{Math.ceil(row.semester/2)}</b></span><br/>
                       <span><b>SEMESTER</b>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{session.academic_sem}   </span><br/>
                       <span><b>MAX CREDIT</b>: &nbsp;&nbsp;{row.max_credit}   </span><br/>
                    </div>
                </div><br/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="codetitle" align="left">Course code</td>
                            <td className="tdtitle" align="left">Course name</td>
                            <td className="codetitle" align="center">Credits</td>
                            <td className="codetitle" align="center">Type</td>
                        </tr>
                        { row.data && row.data.length > 0 ?
						row.data.map((rec) =>
                        <tr class="tbody">
                            <td align="left">{rec.course_code}</td>
                            <td align="left">{rec.course_title && rec.course_title.toUpperCase()}</td>
                            <td align="center">{rec.credit}</td>
                            <td align="center">{rec.type == 'E' ? 'Elective':'Core'}</td>
                        </tr>
                        ) : null }
                         
                    </tbody>
              </table>
              <hr className="separator"/>
              </>

              ) : null }





              
              <div className="title-cover">
                    <div className="title-group">
                       <span>------------------------------------------</span><br/>
                       <center className="sub">Registration Officer</center><br/>
                    </div>
                    <div className="title-group">
                       <span>------------------------------------------</span><br/>
                       <center className="sub">Academic Director</center><br/>
                    </div>
              </div>
             
            </section>

           <br/><br/>
          

        </content>
    </div>
    </div>
    </> 
    )
}

export default PaperMountList
