import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { generateIndexNo, deletePayment, fetchPaymentFMS, fetchPaymentsFMS, loadFMSHelpers, postPaymentFMS, fetchStudentData, postFinanceReport, loadAISHelpers } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentPage, setDatabox, setModal, setVouchers, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import Pager from '../../Pager';
//import { Button, Menu, MenuItem } from '@material-ui/core';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import parse from 'html-react-parser'
import moment from 'moment';
import {getTargetGroup} from '../../../../store/utils/util'
import Loader from '../../../../assets/img/loaderm.gif'
import { jsonToExcel } from '../../../../store/utils/admissionUtil';



// COMPONENT - FEES PAYMENTS
const FeePayments = ({view,data,recid}) => {
   
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(1);
   const open = Boolean(anchorEl);
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'FEE PAYMENTS';
       case 'add': return 'ADD PAYMENT';
       case 'edit': return 'EDIT PAYMENT';
       case 'period': return (recid == "fees" ? "FEES PAYMENT REPORT":(recid == "others" ? " OTHER PAYMENTS REPORTS" : " VOUCHER SALES REPORT"));
       case 'eligible': return 'EXAMS ELIGIBILITY REPORT';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'add': return <Form recid={recid}/>;
        case 'edit': return <Form recid={recid}/>;
        case 'period': return <PeriodReport recid={recid}/>;
        case 'eligible': return <BuildReport recid={recid}/>;
     } 
   }
  

   const genIndex = async (e) => {
      e.preventDefault()
      const inp = window.prompt('Enter Student Reference Number');
      if(inp){
        const refno = inp.trim();
        const resp = await generateIndexNo({refno})
        try{
          if(resp.success){
            dispatch(updateAlert({show:true,message:`INDEX NUMBER & AUCC EMAIL GENERATED !`,type:'success'}))
            alert(`STUDENT INDEX NUMBER : ${resp.data.indexno}\n\nAUCC EMAIL : ${resp.data.indexno} `)
          }else{
            dispatch(updateAlert({show:true,message:resp.msg.toUpperCase(),type:'error'}))
          }
        }catch(e){
          dispatch(updateAlert({show:true,message:e.toString(),type:'error'}))
        }
      }else{
        alert('Please provide a valid Student Reference Number')
      }
  }

  // lOAD REPORTS
  const generateReport = async (e,type) => {
    e.preventDefault();
    const res = await postFinanceReport({type});
    console.log(res)
    if(res.success){
      return jsonToExcel(res.data,res.fileName)
    }else {
      dispatch(updateAlert({ show:true, message:`NO DATA !`, type:'error' }))
    }
  }

  const handleClick = (e,id) => {
    setAnchorEl(e.currentTarget);
    setRef(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setRef(null);
  };

  useEffect(()=>{
    handleClose()
  },[])

   return (
    <div className="content-area card">
     <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
              <Link to="/app/fms?mod=feestrans&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD PAYMENT</b></Link>
              <Link to="#" onClick={genIndex} className="btn btn-light-alt btn-sm btn-icon ml-2"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>GENERATE INDEX NUMBER</b></Link>
              &nbsp;
              <Button id={`basic-button1`} variant="contained" color='warning' aria-controls={`basic-menu1`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == 1 ? 'true' : undefined} onClick={(e) => handleClick(e,1)}><b>REPORT SHEETS</b>&nbsp;&nbsp;<i className="fa fa-bars"></i></Button>
              <Menu id={`basic-menu1`} anchorEl={anchorEl} open={ref && ref == 1} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button1`}}> 
                <MenuItem> <Link to="#" onClick={(e) => generateReport(e,'admitted')}><b>ADMITTED STUDENTS REPORT</b></Link></MenuItem>
                <MenuItem><Link to="#"  onClick={(e) => generateReport(e,'advance')}><b>ADVANCE PAYMENT REPORT</b></Link></MenuItem>
                <MenuItem> <Link to="/app/fms?mod=feestrans&view=eligible"><b>EXAMINATION ELIGIBILITY REPORT</b></Link></MenuItem>
                <MenuItem> <Link to="/app/fms?mod=feestrans&view=period&recid=fees"><b>FEES PAYMENT REPORT</b></Link></MenuItem>
                <MenuItem> <Link to="/app/fms?mod=feestrans&view=period&recid=others"><b>OTHER PAYMENT REPORT</b></Link></MenuItem>
                <MenuItem> <Link to="/app/fms?mod=feestrans&view=period&recid=voucher"><b>VOUCHER SALES REPORT</b></Link></MenuItem>
                <Divider/>
              </Menu>
            </div> : null
           }
     </h3>
        {content()}
  </div>
   )
}

// COMPONENT - LIST
const List = () => {
   
   const [ page, setPage ] = React.useState(1);
   const [ count, setCount ] = React.useState(0);
   const [ keyword, setKeyword ] = React.useState('');
   const [ isLoading, setIsLoading ] = React.useState(false);
   const history = useHistory()
   const [ payments, setPayments ] = useState([])
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [pid, setPid] = React.useState(null);
   const open = Boolean(anchorEl);
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   
   const restorePayments = () => {
      sso.databox.payments && setPayments([...sso.databox.payments]);
   }

   const delPayment = async (id) => {
      const cm = window.confirm('DELETE PAYMENT ?')
      if(cm) {
        const resp = await deletePayment(id)
        if(resp.success){
           const ss = payments.filter(s => s.id != id)
           setPayments([...ss ])
           dispatch(updateAlert({show:true,message:`PAYMENT ID: ${id} DELETED !`,type:'success'}))
        }else{
           dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        }
      }
   }

  const editPayment = async (id) => {
    history.push(`/app/fms?mod=feestrans&view=edit&recid=${id}`)
  }

  const postPayment = async (id) => {
    //const bl = await sendPaymentFMS({id})
    const bl = { success:false,data:null,msg:'Error'}
    if(bl.success){
      dispatch(updateAlert({show:true,message:`PAYMENT SAVED INTO STUDENT ACCOUNTS !`,type:'success'}))
      const ss = payments.map(s => {
         //if(s.id == id) return {...s,post_status:1 }
         return s
      })
      setPayments([...ss ])
      setPid(null);
      
    }else{
      dispatch(updateAlert({show:true,message:`${bl.msg.toUpperCase()}`,type:'error'}))
    }
  }

  const viewPayment = async (id) => {
    const bl = await fetchPaymentFMS(id)
    if(bl.success){
      const content = { title:'Official Receipt', data: bl && bl.data[0] }
      let dz = { content, size:'md', show:true, page:'payment' }
      dispatch(setModal(dz));
      setPid(null);
    }else{
       // Error occurred
    }
  }

   const fetchPayments = async () => {
      var query = ``;
      if(page >= 1) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      const res = await fetchPaymentsFMS(query);
      if(res.success){
        setIsLoading(false)
        setPayments([...res.data.data]);// Page Data
        setCount(res.data.totalPages)// Total Pages
      }
   }

   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     setPage(1)
     if(e.target.value == '') fetchPayments()
   }

  const onPageChange = async (e) => {
    var vs = parseInt(e.target.value)
    vs = Math.max(1,vs)
    vs = Math.min(count,vs)
    setPage(vs)
    setIsLoading(true)
  }

  const onPageClick = async (event,value) => {
    setIsLoading(true)
    setPage(value);
  }
   
  const onSubmitSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    fetchPayments()
  }

  const handleClick = (e,id) => {
    setAnchorEl(e.currentTarget);
    setPid(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setPid(null);
  };

   useEffect(() => {
     restorePayments()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({payments}));
   },[payments])

   useEffect(() => {
     fetchPayments()
     dispatch(setCurrentPage(page))
   },[page])

   return (
    <div className="card-innr">
      <Pager count={count} page={page} onPageChange={onPageChange} onPageClick={onPageClick} keyword={keyword} onSearchChange={onSearchChange} onSubmitSearch={onSubmitSearch} isLoading={isLoading} />
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">  
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-wrap ">
                    { !isLoading ? 
                    <table className="admin-tnx dataTable no-footer  table-responsive" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col w-25" rowspan="1" colspan="1">RECEIPT DATE </th>
                                <th className="data-col w-25 center" rowspan="1" colspan="1">RECEIPT AMOUNT</th>
                                <th className="data-col w-25 center" rowspan="1" colspan="1">STUDENT NAME</th>
                                <th className="data-col w-25 center" rowspan="1" colspan="1">PAYMENT INFO</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { payments.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                              <span className="lead tnx-id">
                                {moment(row.transdate).format('DD-MMM-YYYY').toUpperCase()} 
                              </span>
                            </td>
                            <td className="data-col center"><span className="lead amount-pay">{row.currency ? parse(`<b style="color:#b76117;font-weight:bolder">${row.currency} </b>`) : null }{row.amount }</span></td>
                            <td className="data-col center">
                                <span className="lead token-amount">{row.name && row.name.toUpperCase()}</span>
                                {row.refno ? parse(`<small style="color:#b76117;font-weight:bolder">  -- ${row.refno} </small>`) : null }
                            </td>
                            <td className="data-col center">
                                {/*<small className="lead token-amount">REF: {row.reference}</small>*/}
                                <small className="lead token-amount">TRANS ID: {row.transtag}</small>
                                {row.paytype ? parse(`<small style="color:#b76117;font-weight:bolder"> PAY MODE: ${row.paytype} </small>`) : null }
                                {row.feetype ? parse(`<br/><small class="token-amount"> PAY TAG: ${row.feetype} </small>`) : null }
                                {row.tag ? parse(`<br/><small style="color:#b76117;font-weight:bolder"> SETTLEMENT: ${row.tag} </small>`) : null }
                            </td>
                            
                            <td className="data-col">
                                <>
                                  <Button id={`basic-button${row.id}`} variant="contained" color={row.post_status > 0 ? 'success':'warning'} aria-controls={`basic-menu${row.id}`} aria-haspopup="true" aria-expanded={anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={pid && pid == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                    <MenuItem onClick={()=> viewPayment(row.id)}>VIEW RECEIPT</MenuItem>
                                    <MenuItem onClick={()=>editPayment(row.id)}>EDIT PAYMENT</MenuItem>
                                    <MenuItem onClick={()=> delPayment(row.id)}>DELETE PAYMENT</MenuItem>
                                  </Menu>
                                </>


                            </td>   
                          </tr>
                          )}
                        </tbody>
                    </table>
                    :
                    <div style={{display:'flex',width:'100%',height:'16.5vw',justifyContent:'right',alignItems:'center'}}><h4 style={{textAlign:'center'}}>LOADING ...</h4></div>
                    }
                </div>
            </div>
        </div>
      </div>
    </div>
   )
}

// COMPONENT - FORM
const Form = ({recid}) => {
    const [ loading,setLoading ] = useState(false);
    const [ helper,setHelper ] = useState({ programs:[],bankacc:[] });
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit, setValue, getValues, formState : { errors } } = useForm();
    
    
    const onSubmit = async data => {
      console.log(data)
      data.id = parseInt(recid) || 0;
      
      const res = await postPaymentFMS(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`PAYMENT SAVED !`,type:'success'}))
         setTimeout(() => {
           history.push('/app/fms?mod=feestrans&view=list')
         },2000)
      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`${res.msg.toUpperCase()}`,type:'error'}))
         alert(`${res.msg.toUpperCase()}`)
      }
    }


    const onChange = async data => {
      const refno = data.target.value;
      if(data.target.name == 'refno' && data.target.value.length >= 8){
        const res = await fetchStudentData(refno);
        console.log(res)
        if(res.success){
          const st = res.data;
          //dispatch(updateAlert({show:true,message:`PAYMENT SAVED !`,type:'success'}))
          alert(`STUDENT NAME:   ${st.name}${st.refno ? '\nSTUDENT ID:          '+st.refno:''}${st.indexno ? '\nINDEX NUMBER:    '+st.indexno:''}\nPROGRAM:             ${st.program_name}${st.major_name ? '\nMAJOR:                  '+st.major_name:''}${st.semester ? '\nYEAR:                      '+Math.ceil(st.semester/2):''}${st.doa ? '\nADMITTED ON:      '+moment(st.doa).format('MMMM YYYY').toUpperCase():''}${st.complete_status ? '\nSTATUS :                '+(st.complete_status == 0 ? 'ACTIVE STUDENT':'COMPLETED STUDENT'):''}`)
        }
      }
      
    }

    const formData = () => {
        const dt = sso.databox.payments.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'transdate') return setValue(d,moment(dt[d]).format('YYYY-MM-DD HH:mm:ss'))
              return setValue(d,dt[d])
          })
        } 
    }

    const helperData = async() => {
        const hp = await loadFMSHelpers()
        console.log(hp)
        if(hp.success){
          setHelper(hp.data)
        } 
    }

    const cancelForm = (e) => {
       e.preventDefault();
       const cm = window.confirm('Cancel Form ?')
       if(cm) history.push('/app/fms?mod=feestrans&view=list')
    }
  
    useEffect(()=>{
      helperData();
      formData();
    },[])

   
  

    return (
    <div className="card-innr">
              <form onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
                    <div className="row">
                        { (errors.refno || errors.amount || errors.paydate || errors.reference )  &&
                        <div className="col-md-12">
                            <div className="alert alert-danger text-danger font-weight-bolder">
                               { errors.refno && <small><b>**  {errors.refno.message.toUpperCase()}<br/></b></small>}
                               { errors.amount && <small><b>**  {errors.amount.message.toUpperCase()}<br/></b></small>}
                               { errors.transdate && <small><b>**  {errors.transdate.message.toUpperCase()}<br/></b></small>}
                               { errors.reference && <small><b>**  {errors.reference.message.toUpperCase()}<br/></b></small>}
                               { errors.transtag && <small><b>**  {errors.transtag.message.toUpperCase()}<br/></b></small>}
                            </div>
                        </div>
                        }
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="narrative" className="input-item-label">STUDENT REFERENCE ID</label>
                                <input {...register("refno", { required: 'Please Student Reference ID!' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="transdate" className="input-item-label">TRANSACTION RECEIPT DATE & TIME <em><small>( YYYY-MM-DD HH:mm:ss )</small></em></label>
                                <input {...register("transdate", { required: 'Please Enter Payment Receipt Date!' })} className="input-bordered" type="datetime"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="tag" className="input-item-label">RECEIPT AMOUNT</label>
                                <input {...register("amount", { required: 'Please Enter Receipt Amount!' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="currency" className="input-item-label">RECEIPT CURRENCY </label>
                                <select {...register("currency")} className="input-bordered">
                                   <option value={'GHC'}>GHC</option>
                                   <option value={'USD'}>USD</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="bankacc_id" className="input-item-label">SETTLEMENT ACCOUNT</label>
                                <select {...register("bankacc_id")} className="input-bordered">
                                  <option value="" disabled selected>--NONE--</option>
                                  {helper && helper.bankacc.map( row => 
                                    <option value={row.id}>{row.tag && row.tag.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        {/*
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="paytype" className="input-item-label">MODE OF PAYMENT </label>
                                <select {...register("paytype")} className="input-bordered">
                                   <option value={'BANK'}>CASH AT BANK</option>
                                   <option value={'SCHOLAR'}>SCHOLARSHIP</option>
                                   <option value={'MOMO'}>MTN MOMO</option>
                                   <option value={'ATMONEY'}>AIRTEL-TIGO CASH</option>
                                   <option value={'VODACASH'}>VODAFONE CASH</option>
                                </select>
                            </div>
                        </div>
                        */}

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="feetype" className="input-item-label">PAYMENT TAG </label>
                                <select {...register("feetype")} className="input-bordered">
                                   <option value={''} selected>--CHOOSE--</option>
                                   <option value={'NORMAL'} selected>NORMAL PAYMENT</option>
                                   <option value={'SCHOLARSHIP'}>SCHOLARSHIP</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                              <label htmlFor="transtag" className="input-item-label">BANK TRANSACTION ID</label>
                              <input {...register("transtag", { required: 'Please Enter Bank Transaction ID!' })} className="input-bordered" type="text"/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                              <label htmlFor="reference" className="input-item-label">TRANSACTION REFERENCE NOTE</label>
                              <input {...register("reference", { required: 'Please Enter Transaction Reference!' })} className="input-bordered" type="text"/>
                            </div>
                        </div>
                        

                       
                    </div>

                    <div className="gaps-1x"></div>

                    <div className="d-sm-flex justify-content-between align-items-center">
                        <span>
                        <button className="btn btn-dark" type="submit">
                            <i className="fa fa-save "></i>&nbsp;&nbsp;<b>SAVE</b>
                        </button>&nbsp;&nbsp;
                        <Link to="#" onClick={cancelForm} className="btn btn-white text-dark">
                            <i className="fa fa-times"></i>&nbsp;&nbsp;<b>CANCEL</b>
                        </Link>
                        </span>
                    </div>

                </form>
          
    </div>
      )
}


// COMPONENT - REPORT
const PeriodReport = ({ recid }) => {
  const [ loading,setLoading ] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { sso } = useSelector(state => state)
  const { register, handleSubmit, setValue, getValues, formState : { errors } } = useForm();
  
  const onSubmit = async sdata => {
    const res = await postFinanceReport({ type: recid, ...sdata });
    console.log(res)
    if(res.success){
      return jsonToExcel(res.data,res.fileName)
    }else {
      dispatch(updateAlert({ show:true, message:`NO DATA !`, type:'error' }))
    }
  }

  const onChange = async data => {
    if(data){
      const dk = Object.keys(data);
      dk.forEach( d => {
        return setValue(d,data[d])
      })
    } 
  }

  const cancelForm = (e) => {
     e.preventDefault();
     const cm = window.confirm('Cancel Form ?')
     if(cm) history.push('/app/fms?mod=feestrans&view=list')
  }

  return (
         <div className="card-innr">
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleSubmit(onChange)}>
                  <div className="row">
                        { (errors.startdate)  &&
                        <div className="col-md-12">
                            <div className="alert alert-danger text-danger font-weight-bolder">
                              { errors.startdate && <small><b>**  {errors.startdate.message.toUpperCase()}<br/></b></small>}
                            </div>
                        </div>
                        }
                        
                     
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <label htmlFor="startdate" className="input-item-label">START PERIOD</label>
                            <input {...register("startdate", { required: 'Please Enter Start Date!' })} className="input-bordered" type="date"/>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <label htmlFor="endate" className="input-item-label">END PERIOD</label>
                            <input {...register("endate", { required: 'Please Enter End Date!' })} className="input-bordered" type="date"/>
                          </div>
                        </div>
                  </div>

                  <div className="gaps-1x"></div>

                  <div className="d-sm-flex justify-content-between align-items-center">
                      <span>
                      <button className="btn btn-dark" type="submit">
                          <i className="fa fa-chart-bar "></i>&nbsp;&nbsp;<b>GENERATE REPORT</b>
                      </button>&nbsp;&nbsp;
                      <Link to="#" onClick={cancelForm} className="btn btn-white text-dark">
                          <i className="fa fa-times"></i>&nbsp;&nbsp;<b>CANCEL</b>
                      </Link>
                      </span>
                  </div>

            </form>
          </div>
    )
 }



  // COMPONENT - ELIGIBILITY REPORT
  const BuildReport = ({ recid }) => {
    const [ loading,setLoading ] = useState(false);
    const [ helper,setHelper ] = useState({ programs:[],majors:[]});
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit, setValue, getValues, formState : { errors } } = useForm();
    
    const onSubmit = async sdata => {
      //const res = await postDebtorsReportAIS(sdata);
      const res = { success: false}
      const { type,prog_id,year_group,major_id,gender } = sdata
      console.log(sdata)
      console.log(res)
      if(res.success){
        // Do something if passed
        const mdata = res.data;
        if(type == 1){
            var fileName = '',data = [];
            if(mdata && mdata.length > 0){
              for(var row of mdata){
                const ds = { 'STUDENT ID':row.refno,'INDEX_NUMBER':row.indexno,'STUDENT_NAME':row.name && row.name.toUpperCase(),'YEAR':Math.ceil(row.semester/2),'GENDER':(row.gender == 'M' ? 'MALE':(row.gender == 'F' ? 'FEMALE':'')),'PHONE':row.phone,'PROGRAM':row.program_name,'MAJOR':row.major_name,'STUDY MODE':row.session,'DATE OF ADMISSION': moment(row.doa).format('MM/YYYY'), DEBT:`${row.entry_group == 'GH'?'GHC':'USD'} ${row.transact_account}`, 'PARDON STATUS':row.flag_fees_pardon == 1 ? 'PARDONED':'' }
                data.push(ds)
              }
              if(prog_id) fileName += `DEBTORS_${row.program_name}`
              if(!prog_id) fileName += `ALL_DEBTORS`
              if(major_id) fileName += `_${row.major_name}`
              if(year_group) fileName += `_YEAR_${Math.ceil(row.semester/2)}`
              if(gender) fileName += `_${(row.gender == 'M' ? 'MALE':(row.gender == 'F' ? 'FEMALE':''))}`
              return jsonToExcel(data,fileName)
            }else{ 
              dispatch(updateAlert({ show:true, message:`NO DATA !`, type:'error' }))
            }
        
          }else{

        }
        

      } else{
        // Show error messages
        dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        alert("ACTION FAILED!")
      }
    }

    const onChange = async data => {
      if(data){
        const dk = Object.keys(data);
        dk.forEach( d => {
            return setValue(d,data[d])
        })
      } 
    }

    

    const helperData = async() => {
        const hp = await loadAISHelpers()
        console.log(hp)
        if(hp.success){
          setHelper(hp.data)
        } 
    }

    const cancelForm = (e) => {
      e.preventDefault();
      const cm = window.confirm('Cancel Form ?')
      if(cm) history.push('/app/fms?mod=debtors&view=list')
    }

    useEffect(()=>{
      helperData();
    },[])


    return (
    <div className="card-innr">
              <form onSubmit={handleSubmit(onSubmit)} onChange={handleSubmit(onChange)}>
                    <div className="row">
                        { (errors.prog_id)  &&
                        <div className="col-md-12">
                            <div className="alert alert-danger text-danger font-weight-bolder">
                              { errors.quantity && <small><b>**  {errors.quantity.message.toUpperCase()}<br/></b></small>}
                            </div>
                        </div>
                        }
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="prog_id" className="input-item-label">PROGRAMME OF STUDY</label>
                                <select {...register("prog_id")} className="input-bordered">
                                  <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.programs.map( row => 
                                    <option value={row.id}>{row.short && row.short.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="major_id" className="input-item-label">MAJOR & SPECIALIZATION</label>
                                <select {...register("major_id")} className="input-bordered">
                                <option value="" disabled selected>ALL</option>
                                  { helper && helper.majors.map( row => 
                                    getValues('prog_id') == row.prog_id ? <option value={row.id} data-prog={row.prog_id}>{row.title && row.title.toUpperCase()}</option> : null 
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="year_group" className="input-item-label">TARGET YEAR GROUP</label>
                                <select {...register("year_group")} className="input-bordered">
                                  <option value="" disabled selected>ALL</option>
                                  { [1,2,3,4,5,6].includes(parseInt(getValues('prog_id'))) ? <option value={1}>YEAR 1</option> : null }
                                  { [1,2,3,4,5,6].includes(parseInt(getValues('prog_id'))) ? <option value={2}>YEAR 2</option> : null }
                                  { [1,2].includes(parseInt(getValues('prog_id'))) ? <option value={3}>YEAR 3</option> : null }
                                  { [1,2].includes(parseInt(getValues('prog_id'))) ? <option value={4}>YEAR 4</option> : null }
                                </select>
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="session" className="input-item-label">ASSESSMENT SESSION </label>
                                <select {...register("session")} className="input-bordered">
                                  <option value="" disabled selected>ALL</option>
                                  <option value={'M'}>MORNING</option>
                                  <option value={'E'}>EVENING</option>
                                  <option value={'W'}>WEEKEND</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="gaps-1x"></div>

                    <div className="d-sm-flex justify-content-between align-items-center">
                      <span>
                        <button className="btn btn-dark" type="submit">
                          <i className="fa fa-chart-bar "></i>&nbsp;&nbsp;<b>GENERATE REPORT</b>
                        </button>&nbsp;&nbsp;
                        <Link to="#" onClick={cancelForm} className="btn btn-white text-dark">
                          <i className="fa fa-times"></i>&nbsp;&nbsp;<b>CANCEL</b>
                        </Link>
                      </span>
                    </div>

                </form>
          
    </div>
      )
  }

  export default FeePayments
