import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchStudentDataAIS, postStudentDataAIS, loadAISHelpers, resetAccount, generateMail, stageAccount, fetchRegDataAIS, fetchSemesterSlip, fetchSemesterSlipAIS, fetchRegListAIS, fetchMountListAIS, loadAMSHelpers, postDebtorsReportAIS, } from '../../../../store/utils/ssoApi';
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
import Loader from '../../../../assets/img/loaderm.gif'
import { jsonToExcel } from '../../../../store/utils/admissionUtil';

// COMPONENT -VOUCHERS
const Registrations = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const [session, setSession] = useState()
   const [ activity,setActivity ] = useState({})
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(1);
   const open = Boolean(anchorEl);
   const [ helper,setHelper ] = useState({ programs:[],majors:[] });
    
   
   const title = () => {
     switch(view){
       //case 'list': return `REGISTRATION LOGS - ${session && session.title}`;
       case 'list': return `REGISTRATIONS`;
       case 'backlog': return `BACKLOG REGISTRATION FORM`;
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'backlog': return <Backlog/>;
     } 
   }

   const helperData = async() => {
        const hps = await loadAMSHelpers()
        console.log(hps)
        if(hps.success){
          setHelper(hps.data)
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
          let dt = { title: `LIST OF ALL REGISTERED STUDENTS ( ${rt.data.regdata.length} )`, content: { regdata:rt.data.regdata, session:rt.data.session }, size:'md', show:true, page:'reglist' }
          dispatch(setModal(dt));
        } else{  
          alert(rt.msg.toUpperCase())
          //dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) 
        }
        setActivity({...activity,reg:false})
        setRef(null);
    }

    const viewRegListByLevel = async (e,level) => {
        e.preventDefault()
        
        setActivity({...activity,[`reg${level}`]:true })
        const query = `?level=${level}`
        const rt = await fetchRegListAIS(query)
        console.log(rt)
        if(rt.success){
          let dt = { title: `LIST OF REGISTERED STUDENTS - LEVEL ${level} ( ${rt.data.regdata.length} )`, content: { regdata:rt.data.regdata, session:rt.data.session }, size:'md', show:true, page:'reglist' }
          dispatch(setModal(dt));
        } else{ 
          alert(rt.msg.toUpperCase())
          //dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'}))
        }
        setActivity({...activity,[`reg${level}`]:false})
        setRef(null);
    }

    const viewRegListByMajor = async (e,major_id,major_name) => {
        e.preventDefault()
        setActivity({...activity,[`regm${major_id}`]:true})
        const query = `?major_id=${major_id}`
        const rt = await fetchRegListAIS(query)
        console.log(rt)
        if(rt.success){
          let dt = { title: `LIST OF REGISTERED STUDENTS - ${major_name} ( ${rt.data.regdata.length} )`, content: { regdata:rt.data.regdata, session:rt.data.session }, size:'md', show:true, page:'reglist' }
          dispatch(setModal(dt));
        } else{ 
          alert(rt.msg.toUpperCase())
          //dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'}))
        }
        setActivity({...activity,[`regm${major_id}`]:false})
        setRef(null);
    }

    const viewRegListByProgram = async (e,prog_id,prog_name) => {
        e.preventDefault()
        setActivity({...activity,[`regp${prog_id}`]:true})
        const query = `?prog_id=${prog_id}`
        const rt = await fetchRegListAIS(query)
        console.log(rt)
        if(rt.success){
          let dt = { title: `LIST OF REGISTERED STUDENTS - ${prog_name} ( ${rt.data.regdata.length} )`, content: { regdata:rt.data.regdata, session:rt.data.session }, size:'md', show:true, page:'reglist' }
          dispatch(setModal(dt));
        } else{ 
          alert(rt.msg.toUpperCase())
          //dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'}))
        }
        setActivity({...activity,[`regp${prog_id}`]:false})
        setRef(null);
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
        setRef(null);
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
       helperData()
       loadRegList()
       handleClose()
    },[])
  
   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Link to="/app/ais?mod=registrations&view=backlog" className="badge badge-light-alt badge-warning badge-sm btn-icon text-dark"><em className="fa fa-lg fa-upload"></em>&nbsp;<b>BACKLOG</b></Link>
                
                {/*<Link to="#" className="btn btn-light-alt btn-sm btn-icon mr-2" onClick={viewMountList}>{ !activity.mount ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>MOUNTED COURSES</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/> <b>LOADING ...</b>&nbsp;&nbsp;</>}</Link>*/}
                {/*<Link to="#" className="btn btn-danger-alt btn-sm btn-icon ml-2" onClick={viewRegList}>{ !activity.reg ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>REGISTERED STUDENTS</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/> <b>LOADING ...</b>&nbsp;&nbsp;</>}</Link>*/}
                <Button id={`basic-button1`} variant="contained" color='warning' aria-controls={`basic-menu1`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == 1 ? 'true' : undefined} onClick={(e) => handleClick(e,1)}><b>REPORT SHEETS</b>&nbsp;&nbsp;<i className="fa fa-bars"></i></Button>
                <Menu id={`basic-menu1`} anchorEl={anchorEl} open={ref && ref == 1} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button1`}}> 
                  <MenuItem onClick={viewMountList}>{ !activity.mount ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>ALL MOUNTED COURSES</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={viewRegList}>{ !activity.reg ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>REGISTERED STUDENTS</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <Divider/>
                  <center><b style={{color:'#ED6C02'}}>LEVELS</b></center>
                  <Divider/>
                  <MenuItem onClick={(e) => viewRegListByLevel(e,100)}>{ !activity.reg100 ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> REGISTERED - YEAR 1 </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={(e) => viewRegListByLevel(e,200)}>{ !activity.reg200 ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> REGISTERED - YEAR 2 </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={(e) => viewRegListByLevel(e,300)}>{ !activity.reg300 ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> REGISTERED - YEAR 3 </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={(e) => viewRegListByLevel(e,400)}>{ !activity.reg400 ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> REGISTERED - YEAR 4 </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <Divider/>
                  <center><b style={{color:'#ED6C02'}}>PROGRAMS</b></center>
                  <Divider/>
                  { helper && helper.programs.map((row,i) => 
                    <MenuItem onClick={(e) => viewRegListByProgram(e,row.id,row.short)}>{ !activity['regp'+row.id] ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> REGISTERED - {row.code} </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  )}
                   <Divider/>
                  <center><b style={{color:'#ED6C02'}}>MAJORS</b></center>
                  <Divider/>
                  { helper && helper.majors.map((row,i) => 
                    <MenuItem onClick={(e) => viewRegListByMajor(e,row.id,row.title)}>{ !activity['regm'+row.id] ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> REGISTERED - {row.title.substring(0,17)}. </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  )}

                  
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


  const viewSlip = async (session_id,indexno,i) => {
    setActivity({...activity,[`slip${i}`]:true})
    const rt = await fetchSemesterSlipAIS (session_id,indexno)
    if(rt.success){
      let dt = { content: {regdata:rt.data.regdata,user:rt.data.user}, size:'md', show:true, page:'regslip' }
      dispatch(setModal(dt));
    }else{  dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
    setRef(null);
    setActivity({...activity,[`slip${i}`]:false})
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
                          { regs.map((row,i) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                                <span className="lead tnx-id">
                                  <img src={`https://portal.aucc.edu.gh/api/photos/?tag=${row.refno}`} style={{width:'30px',height:'35px',marginRight:'5px',verticalAlign:'middle'}}/>  {row.indexno}
                                </span>
                            </td>
                            <td className="data-col w-25">
                                <span className="lead token-amount">{row.fname && row.fname.toUpperCase()} {row.mname && row.mname.toUpperCase()} {row.lname && row.lname.toUpperCase()}</span>
                            </td>
                            <td className="data-col">
                                <span className="lead amount-pay">{row.session_name && row.session_name.toUpperCase()}</span>
                                {parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.stream == 'MAIN' ? 'MAIN & SEPTEMBER STREAM':'JANUARY STREAM'} </small>`)}
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{row.course_count}</span></td>
                            <td className="data-col"><span className="lead amount-pay">{moment(row.created_at).format('LLL').toUpperCase()}</span></td>
                            <td className="data-col">
                               <Button id={`basic-button${row.indexno}`} variant="contained" color='warning' aria-controls={`basic-menu${row.indexno}`} onClick={(e) => viewSlip(row.session_id,row.indexno,i)}>{ !activity['slip'+i] ? <i className="fa fa-id-card"></i> : <img src={Loader} style={{height:'20px',margin:'0 auto'}}/>} </Button>
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

// COMPONENT - REPORT
const Backlog = ({recid}) => {
  const [ loading,setLoading ] = useState(false);
  const [ helper,setHelper ] = useState({ programs:[],majors:[]});
  const history = useHistory();
  const dispatch = useDispatch();
  const { sso } = useSelector(state => state)
  const { register, handleSubmit, setValue, getValues, formState : { errors } } = useForm();
  
  const onSubmit = async sdata => {
    const res = await postDebtorsReportAIS(sdata);
    //const res = { success: false}
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
     if(cm) history.push('/app/ais?mod=debtors&view=list')
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

                     
                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="defer_status" className="input-item-label">ASSESSMENT SEMESTER</label>
                              <select {...register("defer_status")} className="input-bordered">
                                 <option value={'1'} selected >YEAR 1, SEMESTER 1</option>
                                 <option value={'2'} selected >YEAR 1, SEMESTER 2</option>
                                 <option value={'3'} selected >YEAR 2, SEMESTER 1</option>
                                 <option value={'4'} selected >YEAR 2, SEMESTER 2</option>
                                 <option value={'5'} selected >YEAR 3, SEMESTER 1</option>
                                 <option value={'6'} selected >YEAR 3, SEMESTER 2</option>
                                 <option value={'7'} selected >YEAR 4, SEMESTER 1</option>
                                 <option value={'8'} selected >YEAR 4, SEMESTER 2</option>
                              </select>
                          </div>
                      </div>

                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="type" className="input-item-label">REGISTRATION TYPE</label>
                              <select {...register("type")} className="input-bordered">
                                 {/*<option value={0} selected>PRINT & PDF</option>*/}
                                 <option value={1} selected>SPECIAL</option>
                                 <option value={1} selected>BACKLOG</option>
                                 <option value={1} selected>RESIT</option>
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



export default Registrations
