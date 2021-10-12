import React,{useState,useEffect,useRef} from 'react'
import '../admission/FormPrint.css'
import Logo from '../../assets/img/logo.png'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { fetchSemesterSlip } from '../../store/utils/ssoApi'
import { useReactToPrint } from 'react-to-print';
import { getTargetGroup } from '../../store/utils/util'

const PaperReceipt = () => {
    const { sso } = useSelector(state=>state)
    const { modal } = sso
    const [ data, setData ] = useState({})
    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });
    

    useEffect(()=>{
      //handlePrint()
      //loadGrades()
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
           {/* PAYMENT RECEIPT */}
           <div style={{marginTop:'40px'}}/>
           <section>
                <h1 className="h1title fore">AFRICAN UNIVERSITY COLLEGE OF COMMUNICATIONS, ACCRA</h1>
                <h3 className="h3title">DIRECTORATE OF FINANCE</h3>
                <h1 className="h2title" style={{fontSize:'25px',marginTop:'10px',paddingTop:'10px'}}>OFFICIAL RECEIPT</h1>
                
                <img src={Logo} style={{height:'90px', width:'90px',position:'relative',top:'-75px',left: '90px', margin:'0px auto -55px'}}/>
                <div className="separator"></div>
                <h4 className="h3title">PAYMENT OF ACADEMIC FEES - {data.refno}</h4><hr/>
                <div className="title-cover">
                    <div className="title-group">
                       <span className="h2title"><b>PAYMENT DATE</b><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment(data.paydate).format('LL').toUpperCase()}</b></span><br/>
                       <span className="h2title"><b>PAYMENT AMNT</b><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.currency} {data.amount}</b></span><br/>
                       <span className="h2title"><b>PAYMENT MODE</b><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.paytype}</b></span><br/>
                       <span className="h2title"><b>REFERENCE NO</b><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.reference}</b></span><br/>
                       <span className="h2title"><b>STUDENT REF</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.refno} </span><br/>
                    </div>
                </div>
                <hr/>
                <h4 className="h3title fore">PAID AMOUNT : {data.currency} {data.amount}</h4>
                <div className="separator"></div>
            </section>
             
             
            <hr/><br/><br/>

            <section>
                <h1 className="h1title fore">AFRICAN UNIVERSITY COLLEGE OF COMMUNICATIONS, ACCRA</h1>
                <h3 className="h3title">DIRECTORATE OF FINANCE</h3>
                <h1 className="h2title" style={{fontSize:'25px',marginTop:'10px',paddingTop:'10px'}}>OFFICIAL RECEIPT</h1>
                
                <img src={Logo} style={{height:'90px', width:'90px',position:'relative',top:'-75px',left: '90px', margin:'0px auto -55px'}}/>
                <div className="separator"></div>
                <h4 className="h3title">PAYMENT OF ACADEMIC FEES - {data.refno}</h4><hr/>
                <div className="title-cover">
                    <div className="title-group">
                       <span className="h2title"><b>PAYMENT DATE</b><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment(data.paydate).format('LL').toUpperCase()}</b></span><br/>
                       <span className="h2title"><b>PAYMENT AMNT</b><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.currency} {data.amount}</b></span><br/>
                       <span className="h2title"><b>PAYMENT MODE</b><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.paytype}</b></span><br/>
                       <span className="h2title"><b>REFERENCE NO</b><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.reference}</b></span><br/>
                       <span className="h2title"><b>STUDENT REF</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.refno} </span><br/>
                    </div>
                </div>
                <hr/>
                <h4 className="h3title fore">PAID AMOUNT : {data.currency} {data.amount}</h4>
                <div className="separator"></div>
            </section>

        </content>
    </div>
    </div>
    </> 
    )
}

export default PaperReceipt
