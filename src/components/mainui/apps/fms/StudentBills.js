import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { deleteBill, fetchBillFMS, fetchBillReceiversFMS, fetchBillsFMS, loadFMSHelpers, postBillFMS, revokeBillFMS, revokeStBillFMS, sendBillFMS } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentPage, setDatabox, setModal, setVouchers, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import Pager from '../../Pager';
//import { Button, Menu, MenuItem } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import parse from 'html-react-parser'
import moment from 'moment';
import {getTargetGroup} from '../../../../store/utils/util'





// COMPONENT -VOUCHERS
const StudentBills = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'STUDENT BILLS';
       case 'add': return 'ADD BILL';
       case 'edit': return 'EDIT BILL';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'add': return <Form recid={recid}/>;
        case 'edit': return <Form recid={recid}/>;
     } 
   }
  
   return (
    <div className="content-area card">
     <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Link to="/app/fms?mod=studentbills&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD BILL</b></Link>
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
   const [ bills, setBills ] = useState([])
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [bid, setBid] = React.useState(null);
   const open = Boolean(anchorEl);
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   
   const restoreBills = () => {
      sso.databox.bills && setBills([...sso.databox.bills]);
   }

   const delBill = async (id) => {
      const cm = window.confirm('DELETE BILL ?')
      if(cm) {
        const resp = await deleteBill(id)
        if(resp.success){
           const ss = bills.filter(s => s.bid != id)
           setBills([...ss ])
           dispatch(updateAlert({show:true,message:`BILL ID: ${id} DELETED !`,type:'success'}))
        }else{
           dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        }
      }
   }

  const editBill = async (id) => {
    history.push(`/app/fms?mod=studentbills&view=edit&recid=${id}`)
  }

  const postBill = async (id) => {
    const bl = await sendBillFMS({id})
    if(bl.success){
      dispatch(updateAlert({show:true,message:`BILL POSTED INTO STUDENT ACCOUNTS !`,type:'success'}))
      const ss = bills.map(s => {
         if(s.bid == id) return {...s,post_status:1 }
         return s
      })
      setBills([...ss ])
      setBid(null);
    }else{
      dispatch(updateAlert({show:true,message:`${bl.msg.toUpperCase()}`,type:'error'}))
    }
  }

  const revokeBill = async (id) => {
    const bl = await revokeBillFMS({id})
    if(bl.success){
      const ss = bills.map(s => {
        if(s.bid == id) return {...s,post_status:1 }
        return s
      })
      setBid(null);
      setBills([...ss ])
      dispatch(updateAlert({show:true,message:`BILL REMOVED FROM STUDENT ACCOUNTS !`,type:'success'}))
      fetchBills()
     
    }else{
      dispatch(updateAlert({show:true,message:`${bl.msg.toUpperCase()}`,type:'error'}))
    }
  }


  const revokeStBill = async (id) => {
    const getInp = window.prompt("Please enter Student Reference Number or Student ID!")
    if(getInp && getInp != ''){
        const bl = await revokeStBillFMS({id,refno:getInp})
        if(bl.success){
          dispatch(updateAlert({show:true,message:`BILL REMOVED FROM STUDENT ACCOUNT !`,type:'success'}))
          setBid(null);
        }else{
          dispatch(updateAlert({show:true,message:`${bl.msg.toUpperCase()}`,type:'error'}))
        }
    }
  }


  const viewBill = async (id) => {
    const bl = await fetchBillFMS(id)
    if(bl.success){
      const content = { title:'Student Bill', items:bl.data.items ,data:bl.data.data}
      let dz = { content, size:'md', show:true, page:'bill' }
      dispatch(setModal(dz));
      setBid(null);
    }else{
       // Error occurred
    }
  }

  const receiverBill = async (id) => {
    const bl = await fetchBillReceiversFMS(id)
    console.log(bl)
    if(bl.success){
      const content = { title:'Bill Receipients', data:bl.data }
      let dz = { content, size:'md', show:true, page:'billreceivers' }
      dispatch(setModal(dz));
      setBid(null);
    }else{
       // Error occurred
       dispatch(updateAlert({show:true,message:`NO RECEIPIENTS FOUND !`,type:'error'}))
    }
  }


   const fetchBills = async () => {
      var query = ``;
      if(page >= 1) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      const res = await fetchBillsFMS(query);
      if(res.success){
        setIsLoading(false)
        setBills([...res.data.data]);// Page Data
        setCount(res.data.totalPages)// Total Pages
      }
   }
   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     setPage(1)
     if(e.target.value == '') fetchBills()
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
    
    fetchBills()
  }

  const handleClick = (e,id) => {
    setAnchorEl(e.currentTarget);
    setBid(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setBid(null);
  };

   useEffect(() => {
     restoreBills()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({bills}));
   },[bills])

   useEffect(() => {
     fetchBills()
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
                                <th className="data-col w-25" rowspan="1" colspan="1">BILL TITLE </th>
                                <th className="data-col w-50 center" rowspan="1" colspan="1">TARGET GROUP</th>
                                <th className="data-col w-25 center" rowspan="1" colspan="1">AMOUNT</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { bills.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                              <span className="lead tnx-id" style={{ fontSize:'13px'}}> {row.narrative} <small className="input-item-label"><b>( {row.session_tag == 'MAIN' ? 'SEPT/MAIN STREAM':'JAN/SUB STREAM'} - SESSION ID: {row.session_id} )</b></small>
                              {row.tag ? parse(`<br/><small style="color:#b76117;font-weight:bolder"> -- ${row.tag.toUpperCase()} </small>`) : null } 
                              {row.bid ? parse(` <small style="color:#555;font-weight:bolder"> -- BILL ID: ${row.bid}</small>`) : null }
                              </span>
                            </td>
                            <td className="data-col center">
                                { row.post_type == 'GH' &&  <>
                                  <span className="lead token-amount">{row.program_name}</span>
                                  {row.group_code ? parse(`<small style="color:#b76117;font-weight:bolder">  ${getTargetGroup(row.group_code) && getTargetGroup(row.group_code).toUpperCase()} </small>`) : null }
                                </>}
                                { row.post_type == 'INT' && <>
                                  <span className="lead token-amount">INTERNATIONAL STUDENTS</span> 
                                  {row.group_code ? parse(`<small style="color:#b76117;font-weight:bolder">  ${getTargetGroup(row.group_code) && getTargetGroup(row.group_code).toUpperCase()} </small>`) : null }
                                  {row.program_name ? parse(`<br/><small style="color:#666;font-weight:bolder">--  ${row.program_name && row.program_name.toUpperCase()} --</small>`) : null }
                                </>}
                            </td>
                            <td className="data-col center"><span className="lead amount-pay">{row.currency ? parse(`<b style="color:#b76117;font-weight:bolder">${row.currency} </b>`) : null }{row.amount }</span></td>
                            <td className="data-col">
                                <>
                                  <Button id={`basic-button${row.bid}`} variant="contained" color={row.post_status > 0 ? 'success':'warning'} aria-controls={`basic-menu${row.bid}`} aria-haspopup="true" aria-expanded={anchorEl && anchorEl == row.bid ? 'true' : undefined} onClick={(e) => handleClick(e,row.bid)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.bid}`} anchorEl={anchorEl} open={bid && bid == row.bid} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.bid}`}}>
                                    <MenuItem onClick={()=> viewBill(row.bid)}>VIEW BILL</MenuItem>
                                    <MenuItem onClick={()=> editBill(row.bid)}>EDIT BILL</MenuItem>
                                    { row.post_status == 1 && <MenuItem onClick={()=> receiverBill(row.bid)}>RECEIPIENTS</MenuItem> }
                                    { row.post_status == 1 && <MenuItem onClick={()=> revokeBill(row.bid)}>REVOKE BILL</MenuItem> }
                                    { row.post_status == 1 && <MenuItem onClick={()=> revokeStBill(row.bid)}>REVOKE STUDENT</MenuItem> }
                                    {/* row.post_status == 0 && <MenuItem onClick={()=> postBill(row.bid)}>POST BILL</MenuItem> */}
                                    {/* row.post_status == 0 && <MenuItem onClick={()=> postBill(row.bid)}>POST BILL</MenuItem> */}
                                    
                                    { row.post_status == 0 && <MenuItem onClick={()=> delBill(row.bid)}>DELETE BILL</MenuItem>}
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
    const [ helper,setHelper ] = useState({ programs:[],sessions:[],bankacc:[] });
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    
    const onSubmit = async data => {
      console.log(data)
      data.bid = parseInt(recid) || 0;
      const res = await postBillFMS(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`BILL SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/fms?mod=studentbills&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.bills.find( r => r.bid == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'prog_id') return setValue(d,parseInt(dt[d]))
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
       if(cm) history.push('/app/fms?mod=studentbills&view=list')
    }
  
    useEffect(()=>{
      helperData();
      formData();
    },[])
  

    return (
    <div className="card-innr">
              <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        { (errors.title || errors.apply_start || errors.apply_end )  &&
                        <div className="col-md-12">
                            <div className="alert alert-danger text-danger font-weight-bolder">
                               { errors.quantity && <small><b>**  {errors.quantity.message.toUpperCase()}<br/></b></small>}
                            </div>
                        </div>
                        }
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="narrative" className="input-item-label">BILL TITLE</label>
                                <input {...register("narrative", { required: 'Please Bill Title !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="tag" className="input-item-label">BILL UNIQUE TAG</label>
                                <input {...register("tag", { required: 'Please enter tag !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="institute_email" className="input-item-label">BILL AMOUNT</label>
                                <input {...register("amount", { required: 'Please enter Bill amount !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="discount" className="input-item-label">BILL DISCOUNT <small>( * required for admissions * )</small></label>
                                <input {...register("discount")} className="input-bordered" type="text"/></div>
                        </div>


                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="currency" className="input-item-label">BILL CURRENCY </label>
                                <select {...register("currency")} className="input-bordered">
                                   <option value={'GHC'}>GHC</option>
                                   <option value={'USD'}>USD</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="bankacc_id" className="input-item-label">ATTACHED PAYMENT ACCOUNT <small>( * required for admissions * )</small></label>
                                <select {...register("bankacc_id")} className="input-bordered">
                                  <option value="" disabled selected>--NONE--</option>
                                  {helper && helper.bankacc.map( row => 
                                    <option value={row.id}>{row.account_name && row.account_name.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="post_type" className="input-item-label">STUDENT CATEGORY</label>
                                <select {...register("post_type")} className="input-bordered">
                                   <option value={'GH'}>GHANAIAN STUDENT</option>
                                   <option value={'INT'}>INTERNATIONAL STUDENT</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="prog_id" className="input-item-label">BILL TARGET PROGRAMME</label>
                                <select {...register("prog_id")} id="prog_id" className="input-bordered">
                                  <option value="" disabled selected>--NONE--</option>
                                  {helper && helper.programs.map( row => 
                                    <option value={row.id} selected={ getValues('prog_id') == row.id}>{row.short && row.short.toUpperCase()} </option>
                                  )}
                                </select>
                            </div>
                        </div>

                       
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="group_code" className="input-item-label">BILL TARGET GROUP CODE</label>
                                <input {...register("group_code", { required: 'Please enter Group code !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="discount_code" className="input-item-label">BILL DISCOUNT GROUP CODE</label>
                                <input {...register("discount_code", { required: 'Please enter Discount Group code !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="session_id" className="input-item-label">ACADEMIC SESSION</label>
                                <select {...register("session_id")} className="input-bordered">
                                  <option value="" disabled>--NONE--</option>
                                  {helper && helper.sessions.map( row => 
                                    <option value={row.id} selected={ getValues('session_id') == row.id} >{ row.title+' - '+(row.tag == 'MAIN' ? 'SEPT/MAIN STREAM':'JAN/SUB STREAM') }</option>
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="currency" className="input-item-label">PUBLISH STATUS </label>
                                <select {...register("post_status")} className="input-bordered">
                                   <option value={1}>PUBLISHED</option>
                                   <option value={0}>UNPUBLISHED</option>
                                </select>
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


export default StudentBills
