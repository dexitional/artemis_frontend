import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, loadAMSHelpers, sellVoucher, } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentPage, setModal, setVouchers } from '../../../../store/admission/ssoSlice';
import Pager from '../../Pager';


// COMPONENT -VOUCHERS
const Vouchers = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'VOUCHERS';
       case 'add': return 'GENERATE VOUCHERS';
       case 'edit': return 'EDIT VOUCHER';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'add': return <Form recid={recid}/>;
        case 'edit': return <Form recid={recid}/>;
     } 
   }
  
   const showModal = async (e,id) => {
      e.preventDefault()
      const resp = await fetchVouchers(`?sell_type=${id}`)
      if(resp.success){
        var sub_title;
        switch(id){
          case 0 : sub_title = `GENERAL VOUCHERS`; break;
          case 1 : sub_title = `MATURED VOUCHERS`; break;
          case 2 : sub_title = `INTERNATIONAL VOUCHERS`; break;
          default : sub_title = `GENERAL VOUCHERS`; break;
        }
        const meta = { main_title:"ADMISSION VOUCHERS",sub_title, head:['SERIAL','PIN','GROUP','SOLD TO','VENDOR NAME'], field:['serial','pin','group_title','applicant_name','vendor_name'], data: resp.data.data }
        let dt = { content: meta, size:'md', show:true, page:'table' }
        dispatch(setModal(dt));
      }
      
   } 

   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Link to="/app/ams?mod=vouchers&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>GENERATE VOUCHERS</b></Link>
                <Link onClick={(e) => showModal(e,1)} className="btn btn-dark-alt btn-sm btn-icon ml-1"><em className="fa fa-sm fa-book"></em>&nbsp;&nbsp;<b>MATURED</b></Link>
                <Link onClick={(e) => showModal(e,2)} className="btn btn-dark-alt btn-sm btn-icon ml-1"><em className="fa fa-sm fa-book"></em>&nbsp;&nbsp;<b>INTERNATIONAL</b></Link>
                <Link onClick={(e) => showModal(e,0)} className="btn btn-dark-alt btn-sm btn-icon ml-1"><em className="fa fa-sm fa-book"></em>&nbsp;&nbsp;<b>OTHERS</b></Link>
            </div> : null
           }
	   </h3>
        {content()}
	</div>
   )
}

// COMPONENT - LIST
const List = () => {

   const [ vouchs, setVouchs ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   
   const restoreVoucherData = () => {
      setVouchs([...sso.vouchers]);
   }

   const deleteRecord = async (e,id) => {
      e.preventDefault()
      const cm = window.confirm('DELETE VOUCHER ?')
      if(cm) {
        const resp = await deleteVoucher(id)
        if(resp.success){
           const ss = vouchs.filter(s => s.serial != id)
           setVouchs([...ss ])
           alert(`VOUCHER SERIAL: ${id} DELETED !`)
        }else{
           alert('ACTION FAILED!')
        }
      }
   }

   const getType = (dt) => {
       var ot;
       switch(dt.sell_type){
         case 0 : ot = `${dt.group_name} (${dt.group_id})`; break;
         case 1 : ot = `Matured (${dt.group_id})`; break;
         case 2 : ot = `International (${dt.group_id})`; break;
         default : ot = dt.group_name; break;
       }return ot;
   }

   const recover = async (e,serial) => {
      e.preventDefault();
      const email = window.prompt('Please Enter Receipient Email Address!')
      if(email && email.trim() != ''){
        // Send to server for recovery mail template
        const resp = await recoverVoucher({serial,email})
        if(resp.success) alert('VOUCHER SENT BY MAIL!') 
      }
   }

   const sell = async (e,serial) => {
      e.preventDefault();
      const name = window.prompt('Please Enter Name of Buyer!')
      if(name && name.trim() != ''){
        const phone = window.prompt('Please Enter Phone Number of Buyer!')
        if(phone && phone.trim() != '' && phone.length == 10){
          const resp = await sellVoucher ({serial,name,phone})
          console.log(resp)
          if(resp.success){
            const message = `VOUCHER SOLD TO ${name}, DETAILS ARE :\n\nSERIAL: ${resp.data.serial}\nPIN: ${resp.data.pin}`
            alert(message)
            fetchVoucherData()
          }
        }else{
          alert('Please Enter 10-digit Phone Number')
        }
      }else{
        alert('Please Provide Buyer Full Name')
      }
   }

   // Search & Pagination
   const [ page, setPage ] = React.useState(1);
   const [ count, setCount ] = React.useState(0);
   const [ keyword, setKeyword ] = React.useState('');
   const [ isLoading, setIsLoading ] = React.useState(false);

   const fetchVoucherData = async () => {
      var query = ``;
      if(page >= 1) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      const res = await fetchVouchers(query);
      if(res.success){
          setIsLoading(false)
          setVouchs([...res.data.data]);// Page Data
          setCount(res.data.totalPages)// Total Pages
      }
      
   }
   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     setPage(1)
     if(e.target.value == '') fetchVoucherData()
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
    fetchVoucherData()
  }

   // End
   useEffect(() => {
     restoreVoucherData()
   },[])

   useEffect(() => {
     dispatch(setVouchers([...vouchs]));
   },[vouchs])

   useEffect(() => {
     fetchVoucherData()
     dispatch(setCurrentPage(page))
   },[page])

   return (
    <div className="card-innr">
      <Pager count={count} page={page} onPageChange={onPageChange} onPageClick={onPageClick} keyword={keyword} onSearchChange={onSearchChange} onSubmitSearch={onSubmitSearch} isLoading={isLoading} />
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">  
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-wrap">
                    { !isLoading ? 
                    <table className="data-table dt-filter-init admin-tnx dataTable no-footer" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col" rowspan="1" colspan="1">VOUCHER SERIAL </th>
                                <th className="data-col w-25" rowspan="1" colspan="1">VOUCHER GROUP</th>
                                <th className="data-col" rowspan="1" colspan="1">BUYER INFO</th>
                                <th className="data-col" rowspan="1" colspan="1">VENDOR NAME</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { vouchs.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col"><span className="lead tnx-id"># {row.serial}</span></td>
                            <td className="data-col">
                                <span className="lead token-amount">{getType(row) && getType(row).toUpperCase() }</span>
                               
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{row.applicant_name && row.applicant_name.toUpperCase() }</span></td>
                            <td className="data-col"><span className="lead amount-pay">{row.vendor_name && row.vendor_name.toUpperCase() }</span></td>
                            <td className="data-col d-flex">
                                { row.sold_at ? <small className="badge badge-sm badge-outline badge-dark text-dark"><b>SOLD</b></small> : null }
                                { row.used_at ? <small className="badge badge-sm badge-outline badge-dark text-dark"><b>USED</b></small> : null }
                                { !row.sold_at ? <Link className={`badge badge-sm badge-success text-dark`} onClick={ e => sell(e,row.serial)}><b><em className="ti ti-sms"></em> SELL</b></Link> : null }
                                <Link className={`badge badge-sm badge-warning text-dark`} onClick={ e => recover(e,row.serial)}><b><em className="ti ti-sms"></em> RECOVER</b></Link>
                                <Link className={`badge badge-sm badge-danger text-white`} onClick={ e => deleteRecord(e,row.serial)}><b><em className="ti ti-trash"></em></b></Link>
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
    const [ helper,setHelper ] = useState({ vendors:[] });
    const history = useHistory();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit, formState : { errors } } = useForm();
    
    const onSubmit = async data => {
      const dt = sso.sessions.find(r => r.session_id == 1)
      if(data.quantity == 0) return
      if(dt){
           data.session_id = parseInt(dt.session_id)
           data.created_by = sso.user.user.inst_mail
      }
      const res = await postVoucher(data);
      if(res.success){
         // Do something if passed
         history.push('/app/ams?mod=vouchers&view=list')
      } else{
         // Show error messages
         alert("ACTION FAILED!")
      }
    }

    const helperData = async() => {
        const hp = await loadAMSHelpers()
        console.log(hp)
        if(hp.success){
          setHelper(hp.data)
        } 
    }


    const cancelForm = (e) => {
       e.preventDefault();
       const cm = window.confirm('Cancel Form ?')
       if(cm) history.push('/app/ams?mod=vouchers&view=list')
    }

    useEffect(()=>{
      helperData();
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
                                <label htmlFor="group_id" className="input-item-label">ADMISSION GROUP</label>
                                <select {...register("group_id")} className="input-bordered">
                                   <option value="UG">UNDERGRADUATE PROGRAMS</option>
                                   <option value="PG">POSTGRADUATE PROGRAMS</option>
                                   <option value="DP">DIPLOMA PROGRAMS</option>
                                   <option value="CP">CERTIFICATE PROGRAMS</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="sell_type" className="input-item-label">SELL CATEGORY</label>
                                <select {...register("sell_type")} className="input-bordered">
                                   <option value={0}>DEFAULT</option>
                                   <option value={1}>MATURED</option>
                                   <option value={2}>INTERNATIONAL</option>
                                </select>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="vendor_id" className="input-item-label">VENDOR</label>
                                <select {...register("vendor_id")} className="input-bordered">
                                    <option value={''} selected disabled>--CHOOSE--</option>
                                  {helper && helper.vendors.map( row => 
                                    <option value={row.vendor_id}>{row.vendor_name && row.vendor_name.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="quantity" className="input-item-label">QUANTITY</label>
                                <input defaultValue={0} {...register("quantity", { required: 'Please enter quantity !' })} className="input-bordered" type="number"/></div>
                        </div>
                    </div>

                    <div className="gaps-1x"></div>

                    <div className="d-sm-flex justify-content-between align-items-center">
                        <span>
                        <button className="btn btn-dark" type="submit">
                            <i className="fa fa-save "></i>&nbsp;&nbsp;<b>GENERATE</b>
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


export default Vouchers
