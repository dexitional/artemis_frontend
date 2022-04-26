import React,{ useState,useEffect,useRef, useCallback } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchStudentDataAIS, postStudentDataAIS, loadAISHelpers, resetAccount, generateMail, stageAccount, fetchSheetDataAIS, loadAssessment, saveAssessment, publishAssessment, certifyAssessment, uncertifyAssessment, loadCourselist, assignSheet, unassignSheet, fetchHRStaffHRS, } from '../../../../store/utils/ssoApi';
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
import PagerStream from '../../PagerStream';

// COMPONENT - Scoresheet
const Scoresheets = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'SCOREHEETS';
       case 'add': return 'ADD SCORESHEET';
       case 'edit': return 'EDIT SCORESHEET';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'add': return <Form recid={recid}/>;
        case 'edit': return <Form recid={recid}/>;
        case 'assess': return <ScoreForm recid={recid}/>;
     } 
   }
  
  

   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                {/*<Link to="/app/ais?mod=scoreheets&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD SCORESHEET</b></Link>*/}
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
   const [ role, setRole ] = useState(null)
   const [ sheets, setSheets ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(null);
   const open = Boolean(anchorEl);
   const [ page, setPage ] = React.useState(1);
   const [ count, setCount ] = React.useState(0);
   const [ keyword, setKeyword ] = React.useState('');
   const [ sel, setSel ] = React.useState(null);
   const [ isLoading, setIsLoading ] = React.useState(false);
   const [ newId, setNewId ] = React.useState(null);
   const importRef = useRef(null)
   const { user }  = sso;
   console.log(user);

   const handleClick = (e,id) => {
      setAnchorEl(e.currentTarget);
      setRef(id);
   };
   const handleClose = () => {
      setAnchorEl(null);
      setRef(null);
   };

   const editProfile = (id) => {
      const url = `/app/ais?mod=scoresheets&view=edit&recid=${id}`;
      history.push(url);
   }

   const fillSheet = (id) => {
      const url = `/app/ais?mod=scoresheets&view=assess&recid=${id}`;
      history.push(url);
   }

   const exportSheet = async (id) => {
        const rt = await loadAssessment(id)
        const dt = sso.databox.sheets.find( r => r.id == id )
        var fileName,data = [];
        if(rt.success){
          if(rt.data && rt.data.length > 0){
            for(var row of rt.data){
              const ds = {'INDEX_NUMBER':row.indexno,'STUDENT_NAME':row.name.toUpperCase(),'CLASS_SCORE_(30/40)':row.class.value,'EXAM_SCORE_(70/60)':row.exam.value,'TOTAL_SCORE_(100)':(parseInt(row.class.value)+parseInt(row.exam.value)), 'COURSE_CODE':dt.course_code, 'COURSE_ID': dt.course_id, 'CALENDAR_ID':dt.session_id}
              data.push(ds)
            }
          }

          setRef(null);
          fileName = `${dt.course_name}_${dt.course_code}_${dt.program_name}_YR${Math.ceil(dt.semester/2)}`
          return jsonToExcel(data,fileName)
         
        }else{ dispatch(updateAlert({show:true,message:`NO REGISTRATION DATA FOR ASSESSMENT!`,type:'error'})) }
        setRef(null);
    }

    const importTrigger = async (id) => {
      importRef.current.click()
      setNewId(id)
      setRef(null);
    }

    const importSheet = async (e) => {
        const file = e.target.files[0]
        if(file && (file.type.match('application/vnd.openxmlformats-officedocument.*') || file.type.match('text/csv'))){
          const error_count = 0, dataToServer = {};
          excelToJson(file,async (data) => {
              console.log(data)
              if(data && data.length > 0){
                  for(var r of data){
                     dataToServer[`${r['CALENDAR_ID']}_${r['COURSE_ID']}_${r['INDEX_NUMBER']}_c`] = r['CLASS_SCORE_(30/40)']
                     dataToServer[`${r['CALENDAR_ID']}_${r['COURSE_ID']}_${r['INDEX_NUMBER']}_e`] = r['EXAM_SCORE_(70/60)']
                  }

                  const res = await saveAssessment(dataToServer);
                  if(res.success){
                     dispatch(updateAlert({show:true,message:`ASSESSMENT IMPORTED !`,type:'success'}))
                  } else{
                     dispatch(updateAlert({show:true,message:`IMPORT FAILED!`,type:'error'}))
                  }
              }
          })

        }else{
          dispatch(updateAlert({show:true,message:`PLEASE CHOOSE EXCEL ( .XLSX ) FILE ONLY !`,type:'error'}))
        }
    }

    const certifySheet = async (id,sno) => {
       const ok = window.confirm('PUBLISH ASSESSMENT SHEET?')
       if(ok){
          const res = await certifyAssessment(id,sno);
          if(res.success){
            const newsheets = sso.databox.sheets.map((sh) =>{
                if(sh.id == id) return { ...sh,flag_certified:1 }
                return sh
            })
            setSheets([...newsheets]);
            dispatch(updateAlert({show:true,message:`SHEET PUBLISHED !`,type:'success'}))
          }else{
            dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
          }
       }
    }

    const uncertifySheet = async (id) => {
      const ok = window.confirm('UNPUBLISH ASSESSMENT SHEET?')
      if(ok){
         const res = await uncertifyAssessment(id);
         if(res.success){
           const newsheets = sso.databox.sheets.map((sh) =>{
               if(sh.id == id) return { ...sh,flag_certified:0 }
               return sh
           })
           setSheets([...newsheets]);
           dispatch(updateAlert({show:true,message:`SHEET UNPUBLISHED !`,type:'success'}))
         }else{
           dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         }
      }
   }

    const publishSheet = async (id,sno) => {
       const ok = window.confirm('SUBMIT ASSESSMENT SHEET?')
       if(ok){
          const rt = await loadAssessment(id)
          if(rt.success && rt.data.length > 0){
              const res = await publishAssessment(id,sno);
              if(res.success){
                  const newsheets = sso.databox.sheets.map((sh) =>{
                      if(sh.id == id) return { ...sh,flag_assessed:1 }
                      return sh
                  })
                  setSheets([...newsheets]);
                  dispatch(updateAlert({show:true,message:`SHEET SUBMITTED !`,type:'success'}))
              }else{
                  dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
              }
          }else{
            dispatch(updateAlert({show:true,message:`NO REGISTRATION DATA FOUND!`,type:'error'}))
          }
          
       }
    }


    const viewScores = async (id) => {
        const dt = sso.databox.sheets.find( r => r.id == id )
        const res = await loadAssessment(id);
        if(res.success && dt){
          //setActivity({...activity,reg:true})
          const title = `${dt && dt.course_name.toUpperCase()} ( ${dt && dt.course_code} )`
          let dz = { title:title, content:{ data:res.data, header:dt }, size:'md', show:true, page:'courseres' };
          //let dt = { title: `LIST OF ALL REGISTERED STUDENTS ( ${rt.data.regdata.length} )`, content: { regdata:rt.data.regdata, session:rt.data.session }, size:'md', show:true, page:'course_result' }
          dispatch(setModal(dz));
        }else{
          dispatch(updateAlert({show:true,message:`NO ASSESSMENT DATA !`,type:'error'}))
        }
        //setActivity({...activity,reg:false})
        setRef(null);
    }


    const viewClass = async (id) => {
        const dt = sso.databox.sheets.find( r => r.id == id )
        const res = await loadCourselist(id);
        if(res.success && dt){
          //setActivity({...activity,reg:true})
          const title = `${dt && dt.course_name.toUpperCase()} ( ${dt && dt.course_code} )`
          let dz = { title:title, content:{ data:res.data, header:dt }, size:'md', show:true, page:'classlist' };
          //let dt = { title: `LIST OF ALL REGISTERED STUDENTS ( ${rt.data.regdata.length} )`, content: { regdata:rt.data.regdata, session:rt.data.session }, size:'md', show:true, page:'course_result' }
          dispatch(setModal(dz));
        }else{
          dispatch(updateAlert({show:true,message:`NO CLASS DATA !`,type:'error'}))
        }
        //setActivity({...activity,reg:false})
        setRef(null);
    }


    const assignNewSheet = async (id) => {
        const inp = window.prompt(`PLEASE PROVIDE THE STAFF NUMBER OF ASSESSOR!`)
        if(inp){
            const res = await assignSheet({id,sno:inp});
            if(res.success){
               fetchSheetData()
               dispatch(updateAlert({show:true,message:`SHEET ASSIGNED TO ASSESSOR!`,type:'success'}))
            }else{
               dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
            }
        }
        //setActivity({...activity,reg:false})
        setRef(null);
    }


    const claimSheet = async (id) => {
        const inp = window.prompt(`PLEASE PROVIDE THE STAFF NUMBER OF ASSESSOR!`)
        if(inp){
            const res = await unassignSheet({id,sno:inp});
            if(res.success){
              fetchSheetData()
              dispatch(updateAlert({show:true,message:`SHEET CLAIMED FROM ASSESSOR!`,type:'success'}))
            }else{
              dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
            }
        }
        //setActivity({...activity,reg:false})
        setRef(null);
    }

    
    const viewMiniProfile = async (sno) => {
        const res = await fetchHRStaffHRS(sno);
        //var res = { success: true}
        if(res.success){
          //setActivity({...activity,reg:true})
          const title = `Kobby`
          let dz = { title:title, content:{ ...res.data, photo:`https://portal.aucc.edu.gh/api/photos?tag=${res.data['staff_no']}`}, size:'md', show:true, page:'miniprofile' };
          dispatch(setModal(dz));
        }else{
          dispatch(updateAlert({show:true,message:`PROFILE NOT FOUND!`,type:'error'}))
        }
    }
   
    const restoreSheetData = () => {
       sso.databox.sheets && setSheets([...sso.databox.sheets]);
    }

    const fetchSheetData =  useCallback(async () => {
      var query = ``;
      if(page >= 1) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      if(sel != '') query += `&stream=${sel}`
      if(role) query += `&role=${role}`
      //alert(query)
      const res = await fetchSheetDataAIS(query);
      if(res.success){
          setIsLoading(false)
          setSheets([...res.data.data]);// Page Data
          setCount(res.data.totalPages)// Total Pages
          setSel(res.data.data[0].session_id) // Set New Stream from Result
      }else{
          setIsLoading(false)
          setSheets([]);// Page Data
          setCount(1)// Total Pages
      }
    },[sel,sheets])


    const getAcademicRole = () => {
      if(user.roles.length > 0){
        const m = user.roles.find( r => ['ais dean','ais hod'].includes(r.role_name.toLowerCase()))
        setRole(m && m.role_meta || null)
      }
    }
   
   const onSearchChange = async (e) => {
      setKeyword(e.target.value)
      setPage(1)
      if(e.target.value == '') fetchSheetData()
   }

   const onSelectChange = async (e) => {
      setSel(e.target.value)
      setPage(1)
      if(e.target.value == '') fetchSheetData()
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
      setTimeout(() => {
        fetchSheetData()
      },100)
      
   }

   useEffect(() => {
     restoreSheetData()
     getAcademicRole()
   },[])  

   useEffect(() => {
     dispatch(updateDatabox({sheets}));
   },[sheets])

   useEffect(() => {
     fetchSheetData()
     dispatch(setCurrentPage(page))
   },[page,sel])


   

   return (
    <div className="card-innr">
      <PagerStream count={count} page={page} onPageChange={onPageChange} onPageClick={onPageClick} keyword={keyword} onSearchChange={onSearchChange} onSubmitSearch={onSubmitSearch} isLoading={isLoading} sel={sel} onSelectChange={onSelectChange}  />
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">  
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-wrap ">
                    { !isLoading ? 
                    <>
                    <input type="file" name="import" ref={importRef}  onChange={importSheet} style={{display:'none'}}/>
                    <table className="admin-tnx dataTable no-footer  table-responsive" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col w-25" rowspan="1" colspan="1">COURSE</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">GROUP</th>
                                <th className="data-col" rowspan="1" colspan="1">ASSESSOR</th>
                                <th className="data-col" rowspan="1" colspan="1">DEPARTMENT</th>
                                <th className="data-col" rowspan="1" colspan="1">CALENDAR</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { sheets.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col w-25">
                                <small className="lead token-amount">{row.course_name} </small>  
                                {row.course_code ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.course_code}  <em> ( ${row.credit} credits )</em></small>`) : null }
                            </td>
                            <td className="data-col w-25">
                                <small className="lead token-amount">{row.program_name} </small>
                                {row.major_name ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.major_name}</small><br/>`) : null }
                                {row.semester ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">YEAR ${Math.ceil(row.semester/2)}    <em> ( ${getStudyMode(row.session).toUpperCase()} CLASS )</em></small>`) : null }
                            
                            </td>
                            <td className="data-col">
                                <small className="lead tnx-id"> 
                                   { row.tag ? row.tag.split(',').map(r => <><button onClick={(e) => viewMiniProfile(r)} className="btn btn-xs text-white" style={{minWidth:'auto',lineHeight:'10px',backgroundColor:'#b76117'}}><b>{r}</b></button>&nbsp;</>) : 'NOT SET' }
                                </small>
                            </td>
                            <td className="data-col"><small style={{color:'#b76117',fontWeight:'bolder',wordBreak:'break-word'}}>{ row.unit_name || 'NOT SET' }</small></td>
                            <td className="data-col w-25">
                                <small className="lead token-amount">{row.calendar} </small>
                                {parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.stream == 'MAIN' ? 'MAIN & SEPTEMBER STREAM':'JANUARY STREAM'} </small>`)}
                            </td>
                            <td className="data-col">
                                <>
                                <Button id={`basic-button${row.id}`} variant="contained" color={(row.flag_assessed == 1 && row.flag_certified == 1) ? 'success':(row.flag_assessed == 1 && row.flag_certified == 0 ? 'warning':'error')} aria-controls={`basic-menu${row.id}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={ref && ref == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                    {/*<MenuItem onClick={handleClose}>VIEW PROFILE</MenuItem>*/}
                                    {/*<MenuItem onClick={() => editProfile(row.id)}>MANAGE SHEET</MenuItem>*/}
                                    <MenuItem onClick={() => assignNewSheet(row.id)}>ASSIGN SHEET</MenuItem>
                                    <MenuItem onClick={() => claimSheet(row.id)}>CLAIM SHEET</MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={() => viewScores(row.id)}>VIEW SCORES</MenuItem>
                                    <MenuItem onClick={() => viewClass(row.id)}>VIEW CLASS</MenuItem>
                                    { row.flag_assessed == 1 &&  (role && role.role_name && role.role_name.toLowerCase() == 'ais dean') && <Divider/>}
                                    {(row.flag_assessed == 1 && row.flag_certified == 0) &&  (role && role.role_name && role.role_name.toLowerCase() == 'ais dean') && <MenuItem onClick={() => certifySheet(row.id,user.user.staff_no)}>PUBLISH SCORES</MenuItem>}
                                    {(row.flag_assessed == 1 && row.flag_certified == 1 ) &&  (role && role.role_name && role.role_name.toLowerCase() == 'ais dean') && <MenuItem onClick={() => uncertifySheet(row.id)}>UNPUBLISH SCORES</MenuItem>}
                                    
                                    {row.flag_assessed == 0 && <MenuItem onClick={() => publishSheet(row.id,user.user.staff_no)}>SUBMIT SHEET</MenuItem>}
                                    
                                    { row.flag_assessed == 0 && <Divider/>}
                                    { row.flag_assessed == 0 && <MenuItem onClick={() => fillSheet(row.id)}>ASSESS SHEET</MenuItem> }
                                    { row.flag_assessed == 0 && <MenuItem onClick={() => exportSheet(row.id)}>EXPORT SHEET</MenuItem> }
                                    { row.flag_assessed == 0 && <MenuItem onClick={() => importTrigger(row.id)}>IMPORT SHEET</MenuItem> }
                                    
                                  </Menu>
                                </>


                            </td>   
                          </tr>
                          ) || <tr><td>No Data Loaded!</td></tr>}
                        </tbody>
                    </table>
                    </>
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
    const [ helper,setHelper ] = useState({ programs:[],majors:[]});
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      const res = await postStudentDataAIS(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`PROFILE SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/ais?mod=students&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.students.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'dob') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              if(d == 'doa') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              if(d == 'doc') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
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
       if(cm) history.push('/app/ais?mod=students&view=list')
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
                                <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.majors.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="refno" className="input-item-label">STUDENT ID</label>
                                <input  {...register("refno", { required: 'Please enter Student ID !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="indexno" className="input-item-label">INDEX NUMBER</label>
                                <input  {...register("indexno", { required: 'Please enter Index Number !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="semester" className="input-item-label">SEMESTER LEVEL</label>
                                <input {...register("semester", { required: 'Please enter semester !' })} className="input-bordered" type="number"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="institute_email" className="input-item-label">INSTITUTIONAL EMAIL</label>
                                <input {...register("institute_email")} className="input-bordered" type="email"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="session" className="input-item-label">STUDY MODE </label>
                                <select {...register("session")} className="input-bordered">
                                   <option value={'M'}>MORNING</option>
                                   <option value={'A'}>AFTERNOON</option>
                                   <option value={'E'}>EVENING</option>
                                   <option value={'W'}>WEEKEND</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="gender" className="input-item-label">GENDER</label>
                                <select {...register("gender")} className="input-bordered">
                                   <option value={'M'}>MALE</option>
                                   <option value={'F'}>FEMALE</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="fname" className="input-item-label">FIRST NAME</label>
                                <input {...register("fname", { required: 'Please enter first name !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="mname" className="input-item-label">MIDDLE NAME</label>
                                <input {...register("mname")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="lname" className="input-item-label">LAST NAME</label>
                                <input {...register("lname", { required: 'Please enter Last name !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="dob" className="input-item-label">DATE OF BIRTH</label>
                                <input {...register("dob", { required: 'Please enter date of birth !' })} className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="phone" className="input-item-label">PHONE NUMBER</label>
                                <input {...register("phone", { required: 'Please enter phone !' })} className="input-bordered" type="tel"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="email" className="input-item-label">PERSONAL EMAIL</label>
                                <input {...register("email")} className="input-bordered" type="email"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="address" className="input-item-label">PERSONAL ADDRESS</label>
                                <input {...register("address")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="guardian_name" className="input-item-label">GUARDIAN NAME</label>
                                <input {...register("guardian_name")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="guardian_phone" className="input-item-label">GUARDIAN PHONE</label>
                                <input {...register("guardian_phone")} className="input-bordered" type="tel"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="national_type" className="input-item-label">NATIONAL ID TYPE</label>
                                <select {...register("national_type")} className="input-bordered">
                                   <option value={'PASSPORT'}>NATIONAL PASSPORT</option>
                                   <option value={'DRIVERS'}>DRIVERS LICENCE</option>
                                   <option value={'VOTERS'}>VOTERS ID CARD</option>
                                   <option value={'NIA'}>GHANA NIA CARD</option>
                                   <option value={'SSNIT'}>SSNIT ID CARD</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="national_id" className="input-item-label">NATIONAL ID NUMBER</label>
                                <input {...register("national_id")} className="input-bordered" type="text"/></div>
                        </div>

                       
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="entry_group" className="input-item-label">STUDENT CATEGORY</label>
                                <select {...register("entry_group")} className="input-bordered">
                                   <option value={'GH'}>GHANAIAN STUDENT</option>
                                   <option value={'INT'}>INTERNATIONAL STUDENT</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="complete_status" className="input-item-label">COMPETED STATUS</label>
                                <select {...register("complete_status")} className="input-bordered">
                                   <option value={'0'}>STILL ACTIVE</option>
                                   <option value={'1'}>COMPLETED</option>
                                </select>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="defer_status" className="input-item-label">DEFERRED STATUS</label>
                                <select {...register("defer_status")} className="input-bordered">
                                   <option value={'0'}>NOT DEFERRED</option>
                                   <option value={'1'}>DEFFERRED</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="flag_profile_lock" className="input-item-label">PROFILE UPDATABLE?</label>
                                <select {...register("flag_profile_lock")} className="input-bordered">
                                   <option value={'0'}>NO</option>
                                   <option value={'1'}>YES</option>
                                </select>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="flag_photo_lock" className="input-item-label">PHOTO UPDATABLE?</label>
                                <select {...register("flag_photo_lock")} className="input-bordered">
                                   <option value={'0'}>NO</option>
                                   <option value={'1'}>YES</option>
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



// COMPONENT - FORM
const ScoreForm = ({recid}) => {
  const [ loading,setLoading ] = useState(false);
  const [ helper,setHelper ] = useState({ data:{}, assessment:[] });
  const history = useHistory();
  const dispatch = useDispatch();
  const { sso } = useSelector(state => state)
  const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
  
  const onSubmit = async data => {
      if(!Object.keys(data).length) {
        dispatch(updateAlert({show:true,message:`NO ASSESSMENT DATA FOUND!`,type:'error'}))
        return;
      }

      const res = await saveAssessment(data);
      if(res.success){
        dispatch(updateAlert({show:true,message:`ASSESSMENT SAVED !`,type:'success'}))
        setTimeout(() => {
            history.push(`/app/ais?mod=scoresheets&view=list&recid=${recid}`)
        },2000)
      } else{
        dispatch(updateAlert({show:true,message:`SAVE FAILED!`,type:'error'}))
      }
  }

  const onKeyUp = async data => {
      if(!Object.keys(data).length) {
        // Show error messages
        console.log(`NO ASSESSMENT DATA FOUND!`)
        return;
      }
      setTimeout(() => null,60000)
      const res = await saveAssessment(data);
      if(res.success){
          // Do something if passed
          console.log(`ASSESSMENT SAVED!`)
      } else{
          // Show error messages
          console.log(`SAVE FAILED!`)
      }
  }

  const sheetData = async() => {
      const hp = await loadAssessment(recid)
      const dt = sso.databox.sheets.find( r => r.id == recid )
      if(hp.success){
        // Load & Iterate Data for Students
        setHelper({ data:dt,assessment:hp.data })
        // Load Sheet Values
        hp.data.forEach( d => {
          setValue(d.class.name,d.class.value)
          setValue(d.exam.name,d.exam.value)
        })
      }else{
        setHelper({ data:dt,assessment:null })
      }
  }

  const cancelForm = (e) => {
     e.preventDefault();
     const cm = window.confirm('Cancel Form ?')
     if(cm) history.push('/app/ais?mod=scoresheets&view=list')
  }

  useEffect(()=>{
    sheetData();
  },[])


  return (
  <div className="card-innr">
            <h2>{helper.data && helper.data.course_code} | {helper.data && helper.data.course_name} {/*JSON.stringify(helper)*/}</h2><hr/>
            <h4>{helper.data && helper.data.program_name} | YEAR {helper.data && Math.ceil(helper.data.semester/2)} - {helper.data && getStudyMode(helper.data.session).toUpperCase()} CLASS | CALENDAR: {helper.data && helper.data.calendar} - {helper.data && helper.data.stream == 'MAIN' ? 'MAIN & SEPTEMBER STREAM': 'SUB & JANUARY STREAM'}</h4><hr/>
            <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onKeyUp)}>
                  <div className="row">
                      { (errors.title || errors.apply_start || errors.apply_end )  &&
                      <div className="col-md-12">
                          <div className="alert alert-danger text-danger font-weight-bolder">
                             {/* errors.quantity && <small><b>**  {errors.quantity.message.toUpperCase()}<br/></b></small> */}
                          </div>
                      </div>
                      }

                      { helper.assessment && helper.assessment.map( row => 
                      <>
                      <div className="col-md-2">
                          <img src={`https://portal.aucc.edu.gh/api/photos/?tag=${row.refno}`} alt="" style={{height:'80px'}}/>
                      </div>
                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label className="input-item-label">
                                <br/><span>{row.name}</span>
                                <br/><span style={{marginTop:'10px', color:'#666',fontStyle:'italic',display:'block'}}> -- {row.indexno}</span>
                              </label>
                          </div>
                      </div>
                      <div className="col-md-2">
                          <div className="input-item input-with-label">
                            {/* sessionID_courseID_indexno_class/exam letter_ */}
                              <label htmlFor={`${row.class.name}`} className="input-item-label">CLASS SCORE</label>
                              <input  {...register(`${row.class.name}`, { required: 'Please enter Class Score !' })} className="input-bordered" type="number" step="0.01" max={40} onKeyUp={(e) => e.currentTarget.value = (e.currentTarget.value > 40 ? 40 : e.currentTarget.value)}/>
                          </div>
                      </div>
                      <div className="col-md-2">
                          <div className="input-item input-with-label">
                              <label htmlFor={`${row.exam.name}`} className="input-item-label">EXAM SCORE</label>
                              <input  {...register(`${row.exam.name}`, { required: 'Please enter Exam Score !' })} className="input-bordered" type="number" step="0.01" max={60} onKeyUp={(e) => e.currentTarget.value = (e.currentTarget.value > 60 ? 60 : e.currentTarget.value)}/>
                          </div>
                      </div>
                      <hr/>
                      </>
                      
                      ) || <h3 className="center" role="row">NO REGISTRATION DATA FOR ASSESSMENT !</h3>}



                   </div>

                  <hr/>
                  <div className="d-sm-flex justify-content-between align-items-center">
                      <span>
                      <button className="btn btn-dark" type="submit">
                          <i className="fa fa-save "></i>&nbsp;&nbsp;<b>SAVE & EXIT</b>
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

export default Scoresheets
