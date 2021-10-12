import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchStudentDataAIS, postStudentDataAIS, loadAISHelpers, resetAccount, generateMail, stageAccount, fetchRegDataAIS, fetchSemesterSlip, fetchSemesterSlipAIS, fetchRegListAIS, fetchMountListAIS, } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentPage, setDatabox, setModal, setVouchers, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import Pager from '../../Pager';
//import { Button, Menu, MenuItem } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import parse from 'html-react-parser'
import moment from 'moment';
import Loader from '../../../../assets/img/loaderm.gif'

// COMPONENT -VOUCHERS
const Registrations = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const [session, setSession] = useState()
   const [ activity,setActivity ] = useState({})
   const title = () => {
     switch(view){
       case 'list': return `REGISTRATION LOGS - ${session && session.title}`;
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
     } 
   }

   const loadRegList = async () => {
      const rt = await fetchRegListAIS()
      if(rt.success){
         setSession({...rt.data.session})
      }
   }

   const viewRegList = async (e) => {
      e.preventDefault()
      setActivity({...activity,reg:true})
      const rt = await fetchRegListAIS()
      if(rt.success){
        let dt = { content: { regdata:rt.data.regdata, session:rt.data.session }, size:'md', show:true, page:'reglist' }
        dispatch(setModal(dt));
      } else{  dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
      setActivity({...activity,reg:false})
    }

    const viewMountList = async (e) => {
      e.preventDefault()
      setActivity({...activity,mount:true})
      const rt = await fetchMountListAIS();
      if(rt.success){
        let dt = { content: { data:rt.data.data, session:rt.data.session }, size:'md', show:true, page:'regmount' }
        dispatch(setModal(dt));
      } else{  dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
      setActivity({...activity,mount:false})
    }

    useEffect(()=>{
       loadRegList()
    },[])
  
   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Link to="#" className="btn btn-light-alt btn-sm btn-icon ml-2" onClick={viewMountList}>{ !activity.mount ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>MOUNTED COURSES</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/> <b>LOADING ...</b>&nbsp;&nbsp;</>}</Link>
                <Link to="#" className="btn btn-danger-alt btn-sm btn-icon ml-2" onClick={viewRegList}>{ !activity.reg ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>REGISTERED STUDENTS</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/> <b>LOADING ...</b>&nbsp;&nbsp;</>}</Link>
            </div> : null
           }
	   </h3>
        {content()}
	</div>
   )
}

// COMPONENT - LIST
const List = () => {
   
   const history = useHistory()
   const [ regs, setRegs ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(null);
   const open = Boolean(anchorEl);
   const [ page, setPage ] = React.useState(1);
   const [ count, setCount ] = React.useState(0);
   const [ keyword, setKeyword ] = React.useState('');
   const [ isLoading, setIsLoading ] = React.useState(false);
   const [ activity,setActivity ] = useState({})

   const handleClick = (e,id) => {
      setAnchorEl(e.currentTarget);
      setRef(id);
   };
   const handleClose = () => {
      setAnchorEl(null);
      setRef(null);
   };


  const viewSlip = async (session_id,indexno) => {
    setActivity({...activity,slip:true})
    const rt = await fetchSemesterSlipAIS (session_id,indexno)
    if(rt.success){
      let dt = { content: {regdata:rt.data.regdata,user:rt.data.user}, size:'md', show:true, page:'regslip' }
      dispatch(setModal(dt));
    }else{  dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
    setRef(null);
    setActivity({...activity,reg:false})
  }

  const restoreRegData = () => {
    sso.databox.reg && setRegs([...sso.databox.reg]);
  }

  const fetchRegData = async () => {
      var query = ``;
      if(page >= 1) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      const res = await fetchRegDataAIS(query);
      if(res.success){
          setIsLoading(false)
          setRegs([...res.data.data]);// Page Data
          setCount(res.data.totalPages)// Total Pages
      }
   }
   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     setPage(1)
     if(e.target.value == '') fetchRegData()
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
    fetchRegData()
  }

   useEffect(() => {
     restoreRegData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({regs}));
   },[regs])

   useEffect(() => {
     fetchRegData()
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
                                <th className="data-col w-25" rowspan="1" colspan="1">INDEX NUMBER</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">STUDENT NAME</th>
                                <th className="data-col " rowspan="1" colspan="1">ACADEMIC SESSION</th>
                                <th className="data-col" rowspan="1" colspan="1">COURSES TAKEN</th>
                                <th className="data-col" rowspan="1" colspan="1">TIME REGISTERED</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { regs.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                                <span className="lead tnx-id">
                                  <img src={`https://portal.aucc.edu.gh/api/photos/?tag=${row.refno}`} style={{width:'30px',height:'35px',marginRight:'5px',verticalAlign:'middle'}}/>  {row.indexno}
                                </span>
                            </td>
                            <td className="data-col w-25">
                                <span className="lead token-amount">{row.fname && row.fname.toUpperCase()} {row.mname && row.mname.toUpperCase()} {row.lname && row.lname.toUpperCase()}</span>
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{row.session_name && row.session_name.toUpperCase()}</span></td>
                            <td className="data-col"><span className="lead amount-pay">{row.course_count}</span></td>
                            <td className="data-col"><span className="lead amount-pay">{moment(row.created_at).format('LLL').toUpperCase()}</span></td>
                            <td className="data-col">
                               <Button id={`basic-button${row.indexno}`} variant="contained" color='warning' aria-controls={`basic-menu${row.indexno}`} onClick={(e) => viewSlip(row.session_id,row.indexno)}>{ !activity.slip ? <i className="fa fa-id-card"></i> : <img src={Loader} style={{height:'20px',margin:'0 auto'}}/>} </Button>
                             </td>   
                          </tr>
                          )}
                        </tbody>
                    </table>
                    :  <div style={{display:'flex',width:'100%',height:'16.5vw',justifyContent:'right',alignItems:'center'}}><h4 style={{textAlign:'center'}}>LOADING ...</h4></div> }
                </div>
            </div>
        </div>
      </div>
    </div>
   )
}

export default Registrations
