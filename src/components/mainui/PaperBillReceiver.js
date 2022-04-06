import React,{useState,useEffect,useRef} from 'react'
import '../admission/FormPrint.css'
import Logo from '../../assets/img/logo.png'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print';

const PaperBillReceivers = () => {
    const { sso } = useSelector(state=>state)
    const { modal } = sso
    const [ data, setData ] = useState([])
    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });
    
    useEffect(() => {
        modal.content && setData([...modal.content.data ]);
        console.log(modal.content)
	},[])

	
    return (
    <>
    <div className="row">
        <div className="Box small-12 columns" style={{width:'900px', margin:'0px auto',float:'none',overflow:'hidden'}}>
            <div className="small-12 columns u-pr-0 right">
                <button onClick={handlePrint} className="Button u-floatRight u-mb-2">&nbsp;&nbsp;Print&nbsp;&nbsp;</button>
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
                <h3 className="h3title">BILL RECEIPIENTS ({data && data.length})</h3>
                <img src={Logo} style={{height:'90px', width:'90px',position:'relative',top:'-75px',left: '90px', margin:'0px auto -55px'}}/>
                <hr className="divider"/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="codetitle" align="left">STUDENT ID</td>
                            <td className="tdtitle" align="left">FULL NAME</td>
                            <td className="tdtitle" align="left">PROGRAM</td>
                            <td className="tdtitle" align="left">YEAR GROUP</td>
                            <td className="tdtitle" align="left">INDEX NUMBER</td>
                            
                        </tr>
                        { data && data.length > 0 ?
						data.map((row) =>
                        <tr class="tbody">
                            <td align="left">{row.refno}</td>
                            <td align="left">{row.name && row.name.toUpperCase()} </td>
                            <td align="left">{row.program_name && row.program_name.toUpperCase()}</td>
                            <td align="left">{row.year_group && 'YEAR '+row.year_group}</td>
                            <td align="left">{row.indexno}</td>
                        </tr>
                          ) : null }
                    </tbody>
              </table>
              <hr className="divider"/>
            </section>
          <br/><br/>
        </content>
    </div>
    </div>
    </> 
    )
}

export default PaperBillReceivers
