import React,{useState,useEffect,useRef} from 'react'
import '../admission/FormPrint.css'
import Logo from '../../assets/img/logo.png'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { fetchSemesterSlip } from '../../store/utils/ssoApi'
import { useReactToPrint } from 'react-to-print';

const PaperRegList = () => {
    const { sso } = useSelector(state=>state)
    const { modal } = sso
    const [ regdata, setRegData ] = useState([])
    const [ session, setSession ] = useState({})
    
    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });
    
    useEffect(() => {
        modal.content.session && setSession({...modal.content.session});
        modal.content.regdata && setRegData([...modal.content.regdata]);
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
                <h3 className="h3title">LIST OF REGISTERED STUDENTS ({regdata && regdata.length})</h3>
                <img src={Logo} style={{height:'90px', width:'90px',position:'relative',top:'-75px',left: '90px', margin:'0px auto -55px'}}/>
                <hr className="divider"/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="tdtitle" align="left">INDEX NUMBER</td>
                            <td className="tdtitle" align="left">STUDENT NAME</td>
                            <td className="tdtitle" align="center">COURSES</td>
                            <td className="tdtitle" align="left">TIME</td>
                        </tr>
                        { regdata && regdata.length > 0 ?
						regdata.map((row) =>
                        <tr class="tbody">
                            <td align="left">{row.indexno}</td>
                            <td align="left">{row.fname} {row.mname} {row.lname}</td>
                            <td align="center">{row.course_count}</td>
                            <td align="left">{moment(row.created_at).format('LLL').toUpperCase()}</td>
                        </tr>
                          ) : null }
                    </tbody>
              </table>
              <hr className="divider"/>
              
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

export default PaperRegList
