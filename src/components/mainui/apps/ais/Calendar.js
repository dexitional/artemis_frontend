import React,{ useState,useEffect,useRef } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchStudentDataAIS, postStudentDataAIS, loadAISHelpers, resetAccount, generateMail, stageAccount, fetchSheetDataAIS, loadAssessment, saveAssessment, publishAssessment, certifyAssessment, uncertifyAssessment, loadCourselist, assignSheet, unassignSheet, fetchHRStaffHRS, fetchMetaDataAIS, fetchMountListAIS, postMetaDataAIS, fetchCalDataAIS, postCalDataAIS, activateCalendar, stageSheet, } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentPage, setDatabox, setModal, setVouchers, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import Pager from '../../Pager';
//import { Button, Menu, MenuItem } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import parse from 'html-react-parser'
import moment from 'moment';
import { excelToJson, getStudyMode, jsonToExcel } from '../../../../store/utils/admissionUtil';
import { CSVLink,CSVDownload } from "react-csv";
import { Divider } from '@mui/material';
import Loader from '../../../../assets/img/loaderm.gif'


// COMPONENT - Scoresheet
const Calendar = ({view,data,recid}) => {
   
   const [ activity,setActivity ] = useState({})
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(1);
   const open = Boolean(anchorEl);
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'ACADEMIC CALENDAR';
       case 'add': return 'NEW CALENDAR';
       case 'edit': return 'EDIT CALENDAR';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'add': return <Form recid={recid}/>;
        case 'edit': return <Form recid={recid}/>;
     } 
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
  

   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Link to="/app/ais?mod=calendar&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>NEW CALENDAR</b></Link>&nbsp;
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
   const [ cal, setCal ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const [ activity,setActivity ] = useState({})
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(null);
   const open = Boolean(anchorEl);
   const [ page, setPage ] = React.useState(1);
   const [ count, setCount ] = React.useState(0);
   const [ keyword, setKeyword ] = React.useState('');
   const [ isLoading, setIsLoading ] = React.useState(false);
   const [ newId, setNewId ] = React.useState(null);
   const importRef = useRef(null)

   const handleClick = (e,id) => {
      setAnchorEl(e.currentTarget);
      setRef(id);
   };
   const handleClose = () => {
      setAnchorEl(null);
      setRef(null);
   };

   const editProfile = (id) => {
      const url = `/app/ais?mod=calendar&view=edit&recid=${id}`;
      history.push(url);
   }

   const setDefault = async (sno) => {
        const res = await activateCalendar(sno);
        if(res.success){
          fetchMetaData()
          dispatch(updateAlert({show:true,message:`CALENDAR ACTIVATED !`,type:'success'}))
        }else{
          dispatch(updateAlert({show:true,message:`ACTIVATION FAILED !`,type:'error'}))
        }
        setRef(null);
    }

    const setSchoresheet = async (sid) => {
        setActivity({...activity,[`cal${sid}`]:true})
        const res = await stageSheet(sid);
        console.log(res)
        if(res.success){
          fetchMetaData()
          dispatch(updateAlert({show:true,message:`SCORESHEETS STAGED !`,type:'success'}))
        }else{
          dispatch(updateAlert({show:true,message:`ACTIVATION FAILED !`,type:'error'}))
        }
        setActivity({...activity,[`cal${sid}`]:false})
        setRef(null);
    }

    const deleteProfile = async (sno) => {
        const res = await fetchHRStaffHRS(sno);
        if(res.success){
          // setActivity({...activity,reg:true})
          const title = `Kobby`
          let dz = { title:title, content:{ ...res.data, photo:`https://portal.aucc.edu.gh/api/photos?tag=${res.data['staff_no']}`}, size:'md', show:true, page:'miniprofile' };
          dispatch(setModal(dz));
        }else{
          dispatch(updateAlert({show:true,message:`PROFILE NOT FOUND!`,type:'error'}))
        }
    }

    
    const viewMiniProfile = async (sno) => {
        const res = await fetchHRStaffHRS(sno);
        if(res.success){
          // setActivity({...activity,reg:true})
          const title = `Kobby`
          let dz = { title:title, content:{ ...res.data, photo:`https://portal.aucc.edu.gh/api/photos?tag=${res.data['staff_no']}`}, size:'md', show:true, page:'miniprofile' };
          dispatch(setModal(dz));
        }else{
          dispatch(updateAlert({show:true,message:`PROFILE NOT FOUND!`,type:'error'}))
        }
    }
   
    const restoreMetaData = () => {
       sso.databox.cal && setCal([ ...sso.databox.cal ]);
    }

    const fetchMetaData = async () => {
        var query = ``;
        if(page >= 1) query += `?page=${page-1}`
        if(keyword != '') query += `&keyword=${keyword}`
        const res = await fetchCalDataAIS(query);
        if(res.success){
            setIsLoading(false)
            setCal([...res.data.data]);// Page Data
            setCount(res.data.totalPages)// Total Pages
        }
    }
   
    const onSearchChange = async (e) => {
        setKeyword(e.target.value)
        setPage(1)
        if(e.target.value == '') fetchMetaData()
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
        fetchMetaData()
    }

   

    useEffect(() => {
      restoreMetaData()
    },[])

    useEffect(() => {
      dispatch(updateDatabox({cal}));
    },[cal])

    useEffect(() => {
      fetchMetaData()
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
                    <>
                    <table className="admin-tnx dataTable no-footer  table-responsive" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col" rowspan="1" colspan="1">CID</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">CALENDAR NAME</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">REGISTRATION INFO</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">LECTURES INFO</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">EXAMS & ENTRY INFO</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { cal.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                                { row.id }
                            </td>
                            <td className="data-col w-25">
                                <small className="lead token-amount"><b>{row.title}</b></small>  
                                {row.tag ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.tag == 'MAIN' ? 'MAIN & SEPTEMBER STREAM':'SUB  JANUARY STREAM'}</small>`) : null }
                                { row.default == 1 ? <><br/><span className="badge badge-sm badge-outline badge-success text-dark" style={{maxWidth:'auto',lineHeight:'10px'}}><b>DEFAULT</b></span></>: null }
                            </td>
                            
                            <td className="data-col w-25">
                                { row.cal_register_start ? parse(`<small style="font-weight:bolder;word-break:break-word">OPENS: ${ moment(row.cal_register_start).format('LL').toUpperCase()}</small><br/>`) : null }
                                { row.cal_register_start ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">CLOSES: ${ moment(row.cal_register_end).format('LL').toUpperCase()}</small><br/>`) : null }
                                { row.cal_register_hold == 1 ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">STATUS: HALTED</small><br/>`) : null }
                            </td>
                            <td className="data-col">
                                { row.cal_lecture_start ? parse(`<small style="font-weight:bolder;word-break:break-word">STARTS: ${ moment(row.cal_lecture_start).format('LL').toUpperCase()}</small><br/>`) : null }
                                { row.cal_lecture_end ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">ENDS: ${ moment(row.cal_lecture_end).format('LL').toUpperCase()}</small><br/>`) : null }
                            </td>
                            <td className="data-col">
                                { row.cal_exam_start ? parse(`<small style="font-weight:bolder;word-break:break-word">EXAMS STARTS: ${ moment(row.cal_exam_start).format('LL').toUpperCase()}</small><br/>`) : null }
                                { row.cal_entry_start ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">ENTRY STARTS: ${ moment(row.cal_entry_start).format('LL').toUpperCase()}</small><br/>`) : null }
                                { row.cal_entry_end ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">ENTRY STARTS: ${ moment(row.cal_entry_end).format('LL').toUpperCase()}</small><br/>`) : null }
                                { row.cal_allow_sheets ? parse(`<small style="color:#555;font-weight:bolder;word-break:break-word">DEADLINE ENTRIES: ${row.cal_allow_sheets == 0 ? 'DISABLED':'ENABLED'}</small><br/>`) : null }
                                
                            </td>
                            <td className="data-col">
                                <>
                                <Button id={`basic-button${row.id}`} variant="contained" color={(row.status == 1 && row.default == 1) ? 'success':(row.default == 0 && row.status == 1 ? 'warning':'error')} aria-controls={`basic-menu${row.id}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={ref && ref == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                    {/*<MenuItem onClick={handleClose}>VIEW PROFILE</MenuItem>*/}
                                   <MenuItem onClick={() => editProfile(row.id)}>EDIT CALENDAR</MenuItem>
                                    <MenuItem onClick={() => setDefault(row.id)}>SET AS DEFAULT</MenuItem>
                                    <MenuItem onClick={() => setSchoresheet(row.id)}>{ !activity['cal'+row.id] ? <>STAGE SHEETS</> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/> STAGING ...</>}</MenuItem>
                                    {/*<MenuItem onClick={() => deleteProfile(row.id)}>DELETE CALENDAR</MenuItem>*/}
                                  </Menu>
                                </>
                            </td>   
                          </tr>
                          ) || <tr><td>No Data Loaded!</td></tr>}
                        </tbody>
                    </table>
                    </>
                    :
                    <div style={{ display:'flex', width:'100%', height:'16.5vw', justifyContent:'right', alignItems:'center' }}><h4 style={{textAlign:'center'}}>LOADING ...</h4></div>
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
    const [ helper,setHelper ] = useState({ programs:[],majors:[], departments:[], courses:[] });
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      const sentToServer = { id: data.id, cal_orient_start:data.cal_orient_start, cal_orient_end:data.cal_orient_end, cal_register_start:data.cal_register_start, cal_register_end:data.cal_register_end, cal_lecture_start:data.cal_lecture_start, cal_lecture_end:data.cal_lecture_end, cal_entry_start:data.cal_entry_start, cal_entry_end:data.cal_entry_end, academic_year:data.academic_year, academic_sem:data.academic_sem, cal_register_hold:data.cal_register_hold, status:data.status, tag:data.tag, title:data.title }
      console.log(data); 
      console.log(sentToServer); 
      const res = await postCalDataAIS(sentToServer);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`CALENDAR SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/ais?mod=calendar&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.cal.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'cal_register_start' || d == 'cal_register_end' || d == 'cal_lecture_start' || d == 'cal_lecture_end' || d == 'cal_exam_start' || d == 'cal_exam_end' || d == 'cal_entry_start' || d == 'cal_entry_end' || d == 'cal_orient_start' || d == 'cal_orient_end') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              return setValue(d,dt[d])
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
       if(cm) history.push('/app/ais?mod=calendar&view=list')
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
                                <label htmlFor="title" className="input-item-label">CALENDAR TITLE</label>
                                <input {...register("title", { required: 'Please enter Calendar Title !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="tag" className="input-item-label">CALENDAR STREAM</label>
                                <select {...register("tag", { required: 'Please choose Calendar Stream !' })} className="input-bordered">
                                  <option value={''} selected disabled>--CHOOSE--</option>
                                  <option value={'MAIN'}>MAIN & SEMPTEMBER</option>
                                  <option value={'SUB'}>SUB & JANUARY</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="academic_year" className="input-item-label">ACADEMIC YEAR</label>
                                <input {...register("academic_year", { required: 'Please enter Academic Year !' })} className="input-bordered" type="text"/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="academic_sem" className="input-item-label">ACADEMIC SEMESTER</label>
                                <input {...register("academic_sem", { required: 'Please enter Academic Semester !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_register_start" className="input-item-label">REGISTRATION START DATE</label>
                                <input {...register("cal_register_start", { required: 'Please provide registration start date !' })}  className="input-bordered" type="date"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_register_end" className="input-item-label">REGISTRATION END DATE</label>
                                <input {...register("cal_register_end", { required: 'Please provide registration end date !' })}  className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_orient_start" className="input-item-label">ORIENTATION START DATE</label>
                                <input {...register("cal_orient_start", { required: 'Please provide orientation start date !' })}  className="input-bordered" type="date"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_orient_end" className="input-item-label">ORIENTATION END DATE</label>
                                <input {...register("cal_orient_end", { required: 'Please provide orientation end date !' })}  className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_lecture_start" className="input-item-label">LECTURES START DATE</label>
                                <input {...register("cal_lecture_start", { required: 'Please provide lecture start date !' })}  className="input-bordered" type="date"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_lecture_end" className="input-item-label">LECTURES END DATE</label>
                                <input {...register("cal_lecture_end")}  className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_exam_start" className="input-item-label">EXAMS START DATE</label>
                                <input {...register("cal_exam_start")}  className="input-bordered" type="date"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_exam_end" className="input-item-label">EXAMS END DATE</label>
                                <input {...register("cal_exam_end")}  className="input-bordered" type="date"/></div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_entry_start" className="input-item-label">ENTRY START DATE</label>
                                <input {...register("cal_entry_start", { required: 'Please provide entry start date !' })}  className="input-bordered" type="date"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_entry_end" className="input-item-label">ENTRY END DATE</label>
                                <input {...register("cal_entry_end", { required: 'Please provide entry end date !' })}  className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_register_hold" className="input-item-label">REGISTRATION ACTIVITY STATUS</label>
                                <select {...register("cal_register_hold", { required: 'Please choose Registration Status !' })} className="input-bordered">
                                  <option value={''} selected disabled>--CHOOSE--</option>
                                  <option value={'0'}>ENABLED</option>
                                  <option value={'1'}>DISABLED</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="cal_allow_sheets" className="input-item-label">SCORESHEET ENTRIES</label>
                                <select {...register("cal_allow_sheets", { required: 'Please choose Scoresheet Entries !' })} className="input-bordered">
                                  <option value={''} selected disabled>--CHOOSE--</option>
                                  <option value={'1'}>ENABLED</option>
                                  <option value={'0'}>DISABLED</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="status" className="input-item-label">CALENDAR STATUS</label>
                                <select {...register("status", { required: 'Please choose Calendar Status !' })} className="input-bordered">
                                  <option value={''} selected disabled>--CHOOSE--</option>
                                  <option value={'1'}>ENABLED</option>
                                  <option value={'0'}>DISABLED</option>
                                </select>
                            </div>
                        </div>

                        
                        {/*BC46W3M8 */}



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


export default Calendar
