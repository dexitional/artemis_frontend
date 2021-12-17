import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { generateIndexNo, deletePayment, fetchPaymentFMS, fetchPaymentsFMS, loadFMSHelpers, postPaymentFMS, fetchOtherPaymentsFMS, moveToFees, fetchVoucherSalesFMS, resendVoucherBySms } from '../../../../store/utils/ssoApi';
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




// COMPONENT - FEES PAYMENTS
const VoucherSales = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'VOUCHER SALES';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
     } 
   }
  


   return (
    <div className="content-area card">
     <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                {/*<Link to="/app/fms?mod=othertrans&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD PAYMENT</b></Link>*/}
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
   const [ vsales, setVsales ] = useState([])
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [pid, setPid] = React.useState(null);
   const open = Boolean(anchorEl);
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   
   const restorePayments = () => {
      sso.databox.vsales && setVsales([...sso.databox.vsales]);
   }


   const viewPayment = async (id) => {
      const bl = await fetchPaymentFMS(id)
      if(bl.success){
        const content = { title:'Official Receipt', data: bl && bl.data[0] }
        let dz = { content, size:'md', show:true, page:'payment' }
        dispatch(setModal(dz));
        setPid(null);
      }
    }

    const resendVoucher = async (serial) => {
         const resp = await resendVoucherBySms({serial})
        if(resp.success){
           dispatch(updateAlert({show:true,message:`VOUCHER SENT!`,type:'success'}))
           setTimeout(()=>{
              history.push(`/app/fms?mod=vsales&view=list`)
           },2000)
        }else{
           dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        }
      setPid(null);
     
    }

  
   const fetchPayments = async () => {
     var query = ``;
     if(page >= 1) query += `?page=${page-1}`
     if(keyword != '') query += `&keyword=${keyword}`
     const res = await fetchVoucherSalesFMS(query);
     console.log(res.data.data)
     if(res.success){
        setIsLoading(false)
        setVsales([...res.data.data]);// Page Data
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
     dispatch(updateDatabox({vsales}));
   },[vsales])

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
                                <th className="data-col center" rowspan="1" colspan="1">AMOUNT</th>
                                <th className="data-col w-25 center" rowspan="1" colspan="1">PAYMENT TYPE</th>
                                <th className="data-col w-25 center" rowspan="1" colspan="1">REFERENCE</th>
                                <th className="data-col w-25 center" rowspan="1" colspan="1">PAYMENT INFO</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { vsales.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                              <span className="lead tnx-id">{moment(row.transdate).format('DD-MMM-YYYY').toUpperCase()}</span>
                            </td>
                            <td className="data-col center"><span className="lead amount-pay">{row.currency ? parse(`<b style="color:#b76117;font-weight:bolder">${row.currency} </b>`) : null }{row.amount }</span></td>
                            <td className="data-col center"><span className="lead amount-pay">{row.transtitle }</span></td>
                            <td className="data-col center">
                                <small className="lead token-amount">{row.name && row.name.toUpperCase()}</small>
                                {row.buyer_phone ? parse(`<small style="color:#b76117;font-weight:bolder">  -- ${row.buyer_phone} </small>`) : null }
                            </td>
                            <td className="data-col center">
                                <small className="lead token-amount">TRANS ID: {row.transtag}</small>
                                {row.serial ? parse(`<small style="color:#b76117;font-weight:bolder"> SERIAL: ${row.serial} </small>`) : null }
                            </td>
                            <td className="data-col">
                                <>
                                  <Button id={`basic-button${row.id}`} variant="contained" color={row.sms_code == 1000 ? 'success':'warning'} aria-controls={`basic-menu${row.id}`} aria-haspopup="true" aria-expanded={anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={pid && pid == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                    <MenuItem onClick={()=> viewPayment(row.id)}>VIEW RECEIPT</MenuItem>
                                    { row.sms_code > 1000 && <MenuItem onClick={()=> resendVoucher(row.serial)}>RE-SEND VOUCHER</MenuItem>}
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




export default VoucherSales
