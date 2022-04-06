import React,{useEffect, useState,useRef} from 'react'
import '../admission/FormPrint.css'
import { useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import moment from 'moment'


const PaperTransDetail = () => {
    const { sso } = useSelector(state=>state)
    const { user,modal } = sso
    const [ fees, setFees ] = useState([])
    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });

    const calBal = (rows,index) => {
       var i = 0, sum  = 0, dt = [];
       for(var c of rows){
           if(i > index) break;
           dt.push(rows[i])
           i++;
       }
       sum = dt.reduce((acc,val) => acc+val.amount,0) || 0
       return sum.toFixed(2);
    }
    
    
    useEffect(() => {
      //handlePrint()
      setFees([...modal.content.fees]);
    },[])

    

    return (
    <div className="print" ref={printRef}>
    <div className="cover">
       <content>
            {/* RESEULT SLIP */}
             <section>
                <h1 className="h1title fore">AFRICAN UNIVERSITY COLLEGE OF COMMUNICATIONS, ACCRA</h1>
                <h2 className="h2title">{fees && fees.length > 0 ? fees[0].program_name.toUpperCase() : ''}</h2>
                <h3 className="h3title">TRANSACTION DETAILS: { fees && fees.length > 0  ?  (fees[0].lname+', ' || '')+(fees[0].fname || '')+' '+(fees[0].mname || '')+' ('+fees[0].refno+')':''}</h3><br/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="codetitle" align="center">Date</td>
                            {/*<td className="fintitle" align="center">Session</td>*/}
                            <td className="tdtitle">Narrative</td>
                            <td className="fintitle" align="center">Type</td>
                            <td className="fintitle" align="center">Amount</td>
                            <td className="fintitle" align="center">Balance</td>
                            <td className="codetitle" align="center">TransactID </td>
                        </tr>
                        { fees && fees.length > 0 ?
						  fees.map((row,i) =>
                            <tr class="tbody">
                                <td align="center">{moment(row.transdate).format('DD MMM YYYY')}</td>
                                {/*<td align="center">Sem 1, Year 1<br/>2020-2021</td>*/}
                                <td>{row.narrative && row.narrative.toUpperCase()}</td>
                                <td align="center">{ parseFloat(row.amount) < 0 && row.bill_id ? 'DISCOUNT': parseFloat(row.amount) > 0 ? 'BILL':'PAYMENT'}</td>
                                <td align="center">{row.currency} {Math.abs(row.amount).toFixed(2)}</td>
                                <td align="center" style={{ position:'relative'}}><span className={`${i == fees.length-1 ? (calBal(fees,i) > 0 ? 'text-danger badge badge-md':'text-success badge badge-md'):''}`}>{row.currency} {Math.abs(calBal(fees,i))}{ i == fees.length-1 ? <b style={{position:'absolute',display:'block',top:'1%',left:'40%',fontSize:'9px',padding:'0 10px',boxShadow:'0 0 2px #666',color:'black',borderRadius:'10px',background:'#fff'}}>{calBal(fees,i) <= 0 ? 'BALANCE':'DEBT'}</b>:''}</span></td>
                                <td align="center">{row.tid}</td>
                            </tr>
                        ) : null }
                    </tbody>
              </table>
             <div className="separator"></div>
            </section>


        </content>
    </div>
    </div>
    )
}

export default PaperTransDetail
