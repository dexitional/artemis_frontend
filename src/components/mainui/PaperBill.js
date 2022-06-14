import React,{useState,useEffect,useRef} from 'react'
import '../admission/FormPrint.css'
import Logo from '../../assets/img/logo.png'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { fetchSemesterSlip } from '../../store/utils/ssoApi'
import { useReactToPrint } from 'react-to-print';
import { getTargetGroup } from '../../store/utils/util'

const PaperBill = () => {
    const { sso } = useSelector(state=>state)
    const { modal } = sso
    const [ items, setItems ] = useState([])
    const [ data, setData ] = useState({})
    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });
    

    useEffect(()=>{
      //handlePrint()
      //loadGrades()
      setItems([...modal.content.items]);
      setData({...modal.content.data});
      console.log(modal)
    },[])

	
    return (
    <>
    <div className="row">
        <div className="Box small-12 columns" style={{width:'900px', margin:'0px auto',float:'none',overflow:'hidden'}}>
            <div className="small-12 columns u-pr-0 right">
                <button onClick={handlePrint} className="Button u-floatRight u-mb-2">&nbsp;&nbsp;Print &nbsp;&nbsp;</button>
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
                <h3 className="h3title">{data.narrative}</h3>
                <h2 className="h2title">{data.tag}</h2>
                
                <img src={Logo} style={{height:'90px', width:'90px',position:'relative',top:'-75px',left: '90px', margin:'0px auto -55px'}}/>
                <hr className="divider"/>
                <h4 className="h3title">STUDENT BILL</h4>
                <div className="title-cover">
                    <div className="title-group">
                       <span><b>BILL AMOUNT</b> : &nbsp;&nbsp;&nbsp;{data.currency} {data.amount}</span><br/>
                       <span><b>TARGET GROUP</b>: &nbsp;&nbsp;{data.program_name}  {getTargetGroup(data.group_code) && '( '+getTargetGroup(data.group_code).toUpperCase()+' )'} </span><br/>
                       <span><b>BILL TAG</b> : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BBA</span><br/>
                    </div>
                </div>
                <hr className="divider"/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="tdtitle" align="left">ITEM NAME </td>
                            <td align="center">ITEM AMOUNT</td>
                        </tr>
                        { items && items.length > 0 ?
						items.map((row) =>
                        <tr class="tbody">
                            <td align="left">{row.narrative}</td>
                            <td align="center">{data.currency}  {row.amount}</td>
                        </tr>
                        ) : null }
                      
                    </tbody>
              </table>
              <div className="separator"></div>
              <div className="title-cover">
                    <div className="title-group">
                       <b>TOTAL BILL AMOUNT : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.currency} {data.amount}</b>
                    </div>
              </div><hr/>
             
            </section>

        </content>
    </div>
    </div>
    </> 
    )
}

export default PaperBill
