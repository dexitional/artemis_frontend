import React,{ useState,useEffect,useRef } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchStudentDataAIS, postStudentDataAIS, loadAISHelpers, resetAccount, generateMail, stageAccount, fetchSheetDataAIS, loadAssessment, saveAssessment, publishAssessment, certifyAssessment, uncertifyAssessment, loadCourselist, assignSheet, unassignSheet, fetchHRStaffHRS, fetchMetaDataAIS, fetchMountListAIS, postMetaDataAIS, } from '../../../../store/utils/ssoApi';
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
const Curriculum = ({view,data,recid}) => {
   
   const [ activity,setActivity ] = useState({})
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(1);
   const open = Boolean(anchorEl);
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'CURRICULUM';
       case 'add': return 'ADD CURRICULUM';
       case 'edit': return 'EDIT CURRICULUM';
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
                <Link to="/app/ais?mod=curriculum&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>NEW CURRICULUM</b></Link>&nbsp;
                <Link to="#" onClick={viewMountList} className="btn btn-warning btn-sm btn-icon text-dark"><em className="fa fa-sm fa-print"></em>&nbsp;&nbsp;<b>PRINT</b></Link>
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
   const [ curri, setCurri ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
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
      const url = `/app/ais?mod=curriculum&view=edit&recid=${id}`;
      history.push(url);
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
       sso.databox.curri && setCurri([ ...sso.databox.curri ]);
    }

    const fetchMetaData = async () => {
        var query = ``;
        if(page >= 1) query += `?page=${page-1}`
        if(keyword != '') query += `&keyword=${keyword}`
        const res = await fetchMetaDataAIS(query);
        if(res.success){
            setIsLoading(false)
            setCurri([...res.data.data]);// Page Data
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
      dispatch(updateDatabox({curri}));
    },[curri])

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
                                <th className="data-col w-25" rowspan="1" colspan="1">COURSE NAME</th>
                                <th className="data-col" rowspan="1" colspan="1">COURSE INFO</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">PROGRAM</th>
                                <th className="data-col" rowspan="1" colspan="1">GROUP</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">TAUGHT BY (DEPT)</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { curri.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col w-25">
                                <small className="lead token-amount">{row.course_name} </small>  
                                {row.course_code ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.course_code}  <em> ( ${row.credit} credits )</em></small>`) : null }
                            </td>
                            <td className="data-col w-25">
                                <small className="lead token-amount">{row.calendar} </small>
                                {parse(`<small style="font-weight:bolder;word-break:break-word">${row.semester%2 == 0 ? 'SECOND SEMESTER':'FIRST SEMESTER'} COURSE</small>`)}
                                {parse(`<br/><small style="color:#b76117;font-weight:bolder;word-break:break-word"> -- ${row.type == 'C' ? 'COMPULSORY COURSE': (row.type == 'E' ? 'ELECTIVE COURSE':' TYPE NOT SET --')} </small>`)}
                            </td>
                            <td className="data-col w-25">
                                <small className="lead token-amount">{row.program_name} </small>
                                {row.major_name ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.major_name}</small><br/>`) : null }
                            </td>
                            <td className="data-col">
                                {row.semester ? parse(`<small style="font-weight:bolder;word-break:break-word">YEAR ${Math.ceil(row.semester/2)}</small>`) : null }
                            </td>
                            <td className="data-col"><small style={{color:'#b76117',fontWeight:'bolder',wordBreak:'break-word'}}>{ row.unit_name || 'NOT SET' }</small></td>
                            <td className="data-col">
                                <>
                                <Button id={`basic-button${row.id}`} variant="contained" color={(row.flag_assessed == 1 && row.flag_certified == 1) ? 'success':(row.flag_assessed == 1 && row.flag_certified == 0 ? 'warning':'error')} aria-controls={`basic-menu${row.id}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={ref && ref == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                    {/*<MenuItem onClick={handleClose}>VIEW PROFILE</MenuItem>*/}
                                    <MenuItem onClick={() => editProfile(row.id)}>EDIT CURRICULUM</MenuItem>
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
      const sentToServer = { id: data.id, unit_id:data.unit_id, course_id:data.course_id, lock:data.lock, prog_id:data.prog_id, major_id:data.major_id, status:data.status, semester:data.semester, type:data.type }
      console.log(data); 
      console.log(sentToServer); 
      const res = await postMetaDataAIS(sentToServer);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`CURRICULUM SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/ais?mod=curriculum&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.curri.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'semester' || d == 'status') return setValue(d,parseInt(dt[d]))
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
       if(cm) history.push('/app/ais?mod=curriculum&view=list')
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
                                <label htmlFor="unit_id" className="input-item-label">DEPARTMENT</label>
                                <select {...register("unit_id")} className="input-bordered">
                                  <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.departments.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="course_id" className="input-item-label">COURSE NAME</label>
                                <select {...register("course_id")} className="input-bordered">
                                  <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.courses.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()} - ( {row.course_code} ) </option>
                                  )}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="prog_id" className="input-item-label">PROGRAM</label>
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
                                <label htmlFor="major_id" className="input-item-label">MAJOR</label>
                                <select {...register("major_id")} className="input-bordered">
                                <option value="" selected>-- NO MAJOR --</option>
                                  {helper && helper.majors.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()} ({row.code && row.code.toUpperCase()})</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="semester" className="input-item-label">ASSIGNED GROUP & PERIOD</label>
                                <select {...register("semester")} className="input-bordered">
                                   <option value={1}>YEAR 1, FIRST SEMESTER</option>
                                   <option value={2}>YEAR 1, SECOND SEMESTER</option>
                                   <option value={3}>YEAR 2, FIRST SEMESTER</option>
                                   <option value={4}>YEAR 2, SECOND SEMESTER</option>
                                   <option value={5}>YEAR 3, FIRST SEMESTER</option>
                                   <option value={6}>YEAR 3, SECOND SEMESTER</option>
                                   <option value={7}>YEAR 4, FIRST SEMESTER</option>
                                   <option value={8}>YEAR 4, SECOND SEMESTER</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="type" className="input-item-label"> COURSE TYPE</label>
                                <select {...register("type")} className="input-bordered">
                                  <option value={null} disabled>-- CHOOSE --</option>
                                   <option value={'C'}>COMPULSORY (CORE)</option>
                                   <option value={'E'}>ELECTIVE</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="lock" className="input-item-label">REGISTRATION LOCK</label>
                                <select {...register("lock")} className="input-bordered">
                                  <option value={null} disabled>-- CHOOSE --</option>
                                   <option value={1}>MUST-REGISTER COURSE</option>
                                   <option value={0}>OPTIONAL COURSE</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="status" className="input-item-label">STATUS</label>
                                <select {...register("status")} className="input-bordered">
                                  <option value={null} disabled>-- CHOOSE --</option>
                                   <option value={1}>ENABLED</option>
                                   <option value={2}>DISABLED</option>
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


export default Curriculum
