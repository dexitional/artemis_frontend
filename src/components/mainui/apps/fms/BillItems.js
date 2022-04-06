import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { addToBillFMS, deleteBill, deleteBillItem, fetchBillFMS, fetchBillItemsFMS, fetchBillsFMS, loadFMSHelpers, postBillFMS, postBillItemFMS, revokeBillFMS, revokeStBillFMS, sendBillFMS } from '../../../../store/utils/ssoApi';
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





// COMPONENT - BILL ITEMS
const BillItems = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'BILL ITEMS';
       case 'add': return 'ADD ITEM';
       case 'edit': return 'EDIT ITEM';
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
                <Link to="/app/fms?mod=billitems&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD BILL ITEM</b></Link>
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
   const [ items, setItems ] = useState([])
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [bid, setBid] = React.useState(null);
   const open = Boolean(anchorEl);
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   
   const restoreBills = () => {
      sso.databox.items && setItems([...sso.databox.items]);
   }

   const delItem = async (id) => {
      const cm = window.confirm('DELETE ITEM ?')
      if(cm) {
        const resp = await deleteBillItem(id)
        if(resp.success){
           const ss = items.filter(s => s.bid != id)
           setItems([...ss ])
           dispatch(updateAlert({show:true,message:`ITEM ID: ${id} DELETED !`,type:'success'}))
        }else{
           dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        }
      }
   }

   const editItem = async (id) => {
      history.push(`/app/fms?mod=billitems&view=edit&recid=${id}`)
   }


    const addToBill = async (id) => {

      const Inp = window.prompt("Provide Bill ID to attach Item!")
      if(Inp && Inp != ''){
        const resp = await addToBillFMS({id,bid:Inp})
        if(resp.success){
           dispatch(updateAlert({show:true,message:`ITEM ID: ${id} DELETED !`,type:'success'}))
           setTimeout(()=>{
              history.push(`/app/fms?mod=billitems&view=list`)
           },2000)
        }else{
           dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        }
     }
      
    }

    const fetchBills = async () => {
        var query = ``;
        if(page >= 1) query += `?page=${page-1}`
        if(keyword != '') query += `&keyword=${keyword}`
        const res = await fetchBillItemsFMS(query);
        if(res.success){
          setIsLoading(false)
          setItems([...res.data.data]);// Page Data
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
      dispatch(updateDatabox({items}));
    },[items])

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
                                <th className="data-col w-25" rowspan="1" colspan="1">ITEM TITLE </th>
                                <th className="data-col w-50 center" rowspan="1" colspan="1">ACADEMIC SESSION</th>
                                <th className="data-col w-25 center" rowspan="1" colspan="1">AMOUNT</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { items.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                              <span className="lead tnx-id"> {row.narrative} 
                                {row.bid ? parse(`<br/><small style="color:#b76117;font-weight:bolder"> -- BILL IDs: ${row.bid.toUpperCase()} </small>`) : null } 
                              </span>
                            </td>
                            <td className="data-col center">
                                <span className="lead token-amount">{row.academic_year ?row.academic_year+' ACADEMIC YEAR':''}</span>
                                {row.tag ? parse(`<small style="color:#b76117;font-weight:bolder"> -- TAG: ${row.tag.toUpperCase()} </small>`) : null } 
                            </td>
                            <td className="data-col center"><span className="lead amount-pay">{row.currency ? parse(`<b style="color:#b76117;font-weight:bolder">${row.currency} </b>`) : null }{row.amount }</span></td>
                            <td className="data-col">
                                <>
                                  <Button id={`basic-button${row.id}`} variant="contained" color={row.bid ? 'success':'warning'} aria-controls={`basic-menu${row.bid}`} aria-haspopup="true" aria-expanded={anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={bid && bid == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                    <MenuItem onClick={()=> addToBill(row.id)}>ATTACH TO BILL</MenuItem>
                                    <MenuItem onClick={()=> editItem(row.id)}>EDIT ITEM </MenuItem>
                                    <MenuItem onClick={()=> delItem(row.id)}>DELETE ITEM</MenuItem>
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
    const [ helper,setHelper ] = useState({ programs:[],sessions:[]});
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      console.log(data)
      const res = await postBillItemFMS(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`ITEM SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/fms?mod=billitems&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.items.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
             //if(d == 'dob') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
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
       if(cm) history.push('/app/fms?mod=billitems&view=list')
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
                                <label htmlFor="narrative" className="input-item-label">ITEM TITLE</label>
                                <input {...register("narrative", { required: 'Please Item Title !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="tag" className="input-item-label">ITEM TAG</label>
                                <input {...register("tag", { required: 'Please enter tag !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="institute_email" className="input-item-label">ITEM AMOUNT</label>
                                <input {...register("amount", { required: 'Please enter Item amount !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="currency" className="input-item-label">ITEM CURRENCY </label>
                                <select {...register("currency")} className="input-bordered">
                                   <option value="" disabled selected>--NONE--</option>
                                   <option value={'GHC'}>GHC</option>
                                   <option value={'USD'}>USD</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="session_id" className="input-item-label">ACADEMIC SESSION</label>
                                <select {...register("session_id")} className="input-bordered">
                                  <option value="GHC" disabled selected>--NONE--</option>
                                  {helper && helper.sessions.map( row => 
                                    <option value={row.id}>{row.title}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        
                      
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="status" className="input-item-label">PUBLISH STATUS </label>
                                <select {...register("status")} className="input-bordered">
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


export default BillItems
