import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { deleteSession, fetchSessions, loadAMSHelpers, postSession, setDefaultSession } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setSessions, updateAlert } from '../../../../store/admission/ssoSlice';
import PaperLetter from '../../PaperLetter';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../TabPanel';
import Box from '@mui/material/Box';


const Utilities = ({view,data,recid}) => {
   
    const title = () => {
     switch(view){
       case 'list': return 'ADMISSION UTILITIES';
       case 'add': return 'CREATE NEW SESSION';
       case 'edit': return 'EDIT SESSION';
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
                <Link to="/app/ams?mod=sessions&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>CREATE SESSION</b></Link>
            </div> : null
           }
	   </h3>
        {content()}
	</div>
   )
}


const List = () => {
   
   const [ sess, setSess ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const fetchSessionData = async () => {
      const res = await fetchSessions();
      if(res.success) setSess([...res.data]);
   }
   const restoreSessionData = () => {
      setSess([...sso.sessions]);
   }
   const deleteRecord = async (e,id) => {
      e.preventDefault()
      const cm = window.confirm('Delete record ?')
      if(cm) {
        const resp = await deleteSession(id)
        if(resp.success){
           const ss = sess.filter(s => s.session_id != id)
           setSess([...ss ])
        }else{
           alert('ACTION FAILED!')
        }
      }
   }
   const setDefault = async (e,id) => {
     e.preventDefault()
     const cm = window.confirm('Set Default ?')
     if(cm) {
        const resp = await setDefaultSession(id)
        if(resp.success){
            const ss = sess.map(s => {
                if(s.session_id == id){
                    let sx = {...s }
                    sx.status = 1
                    return sx;
                }else{
                    let sx = {...s }
                    sx.status = 0
                    return sx;
                }
            })
            setSess([...ss])
        }else{
            alert('ACTION FAILED!')
        }
     }
   }

   useEffect(() => {
     restoreSessionData()
     fetchSessionData()
   },[])

   useEffect(() => {
     dispatch(setSessions([...sess]));
   },[sess])


   const [value, setValue] = React.useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const a11yProps = (index) => {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
   }


   
   return (
    <>
    <div className="card-innr">
    <div className="dataTables_wrapper dt-bootstrap4 no-footer">

       

        <Box sx={{ width: '100%' }}>
            <Box sx={{ border: 1, borderColor: 'divider',backgroundColor:'#f58635', borderRadius:'5px' }}>
                <Tabs value={value} onChange={handleChange} aria-label="ADMISSION UTILITIES" textColor="secondary" indicatorColor="secondary" variant="scrollable" scrollButtons="auto">
                   <Tab label="FORM PRICES" {...a11yProps(0)} />
                   <Tab label="PROGRAMS" {...a11yProps(1)} />
                   <Tab label="SUBJECTS" {...a11yProps(2)} />
                   <Tab label="GRADES" {...a11yProps(3)} />
                   <Tab label="AWARDING CLASS" {...a11yProps(4)} />
                   <Tab label="APPLY TYPES" {...a11yProps(5)} />
                   <Tab label="ADMISSION GROUPS" {...a11yProps(6)} />
                   <Tab label="MODES" {...a11yProps(7)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div className="table-wrap">
                    <table className="data-table dt-filter-init admin-tnx dataTable no-footer" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col" rowspan="1" colspan="1">SESSION ID </th>
                                <th className="data-col w-25" rowspan="1" colspan="1">SESSION TITLE</th>
                                <th className="data-col" rowspan="1" colspan="1">APPLY START</th>
                                <th className="data-col" rowspan="1" colspan="1">APPLY END</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                                <th className="data-col" rowspan="1" colspan="1">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            { sess.map((row) => 
                            <tr className="data-item odd" role="row">
                            <td className="data-col"><span className="lead tnx-id"># {row.session_id}</span></td>
                            <td className="data-col"><span className="lead token-amount">{row.title && row.title.toUpperCase()}</span></td>
                            <td className="data-col"><span className="lead amount-pay">{moment(row.apply_start).format('ddd, MMM DD, YYYY').toUpperCase()}</span></td>
                            <td className="data-col"><span className="lead user-info">{moment(row.apply_end).format('ddd, MMM DD, YYYY').toUpperCase()}</span></td>
                            <td className="data-col d-flex">
                                { row.status == 0 ? <Link className={`badge badge-sm ${row.status == 0 ? 'badge-success text-white' : 'badge-dark badge-outline text-dark'}`} onClick={ e => setDefault(e,row.session_id)}><b>SET DEFAULT</b></Link>: <span className="badge badge-sm badge-outline badge-dark text-dark"><b>DEFAULT</b></span>}
                                <Link className={`badge badge-sm badge-success text-white`} to={`/app/ams?mod=sessions&view=edit&recid=${row.session_id}`}><b><em className="ti ti-pencil"></em></b></Link>
                                <Link className={`badge badge-sm badge-danger text-white`} onClick={ e => deleteRecord(e,row.session_id)}><b><em className="ti ti-trash"></em></b></Link>
                            </td>   
                            <td className="data-col">
                                {/*
                                <div className="relative d-inline-block">
                                    <a href="#" className="btn btn-light-alt btn-xs btn-icon toggle-tigger"><em className="ti ti-more-alt"></em></a>
                                    <div className="toggle-className dropdown-content dropdown-content-top-left">
                                        <ul className="dropdown-list">
                                            <li><a href="#"><em className="ti ti-eye"></em> View Leave form</a></li>
                                            <li><a href="#"><em className="ti ti-check-box"></em> Edit Leave Form</a></li>
                                            <li><a href="#"><em className="ti ti-na"></em> Cancel Leave</a></li>
                                            <li><a href="#"><em className="ti ti-trash"></em> Delete Leave</a></li>
                                        </ul>
                                    </div>
                                </div>
                                */}
                            </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>

    </div>
    </div>
    </>
   )
}

const Form = ({recid}) => {
    
    const [ form,setForm ] = useState({});
    const [ loading,setLoading ] = useState(false);
    const history = useHistory();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    const [ helper,setHelper ] = useState({ letters:[], calendars:[] });
    const dispatch = useDispatch()
    
    const onSubmit = async data => {
      data.session_id = parseInt(recid) || 0;
      console.log(data);
      const res = await postSession(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`SESSION SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/ams?mod=sessions&view=list')
         },2000)
         
      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`SAVED FAILED !`,type:'error'}))
      }
    }

    const formData = () => {
        const dt = sso.sessions.find( r => r.session_id == recid )
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'apply_start' || d == 'apply_end' || d == 'exam_start' || d == 'exam_end' || d == 'admission_date') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              return setValue(d,dt[d])
          })
        } 
    }

    const cancelForm = (e) => {
       e.preventDefault();
       const cm = window.confirm('Cancel Form ?')
       if(cm) history.push('/app/ams?mod=sessions&view=list')
    }

    const helperData = async() => {
        const hps = await loadAMSHelpers()
        console.log(hps)
        if(hps.success){
          setHelper(hps.data)
        } 
    }

  
    useEffect(()=>{
      helperData()
      formData();
    },[])


    return (
		<div className="card-innr">
            	<form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        { (errors.title || errors.apply_start || errors.apply_end )  &&
                        <div className="col-md-12">
                            <div className="alert alert-danger text-danger font-weight-bolder">
                               { errors.title && <small><b>**  {errors.title.message.toUpperCase()}<br/></b></small>}
                               { errors.apply_start && <small><b>**  {errors.apply_start.message.toUpperCase()}<br/></b></small>}
                               { errors.apply_end && <small><b>**  {errors.apply_end.message.toUpperCase()}</b></small>}
                            </div>
                        </div>
                        }
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="title" className="input-item-label">TITLE</label>
                                <input {...register("title", { required: 'Please enter session title !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="status" className="input-item-label">STATUS</label>
                                <select {...register("status", { required: 'Please provide status !' })} className="input-bordered">
                                   <option value={0}>DISABLED</option>
                                   <option value={1}>ENABLED</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="apply_start" className="input-item-label">APPLICATION OPENING DATE</label>
                                <input {...register("apply_start", { required: 'Please provide application open date !' })} className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="apply_end" className="input-item-label">APPLICATION CLOSE DATE</label>
                                <input {...register("apply_end", { required: 'Please provide application close date !' })}  className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="exam_start" className="input-item-label">ENTRANCE EXAM START DATE</label>
                                <input {...register("exam_start", { required: 'Please provide exams start date !' })}  className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="exam_end" className="input-item-label">ENTRANCE EXAM CLOSE DATE</label>
                                <input {...register("exam_end", { required: 'Please provide exams close date !' })}  className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="apply_freeze" className="input-item-label">HALT/FREEZE APPLICATION PROCEDURE</label>
                                <select {...register("apply_freeze", { required: 'Please choose status !' })} className="input-bordered">
                                   <option value={''} selected disabled>--CHOOSE--</option>
                                   <option value={0}>DISABLED</option>
                                   <option value={1}>ENABLED</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="admission_show" className="input-item-label">SHOW ADMISSION STATUS</label>
                                <select {...register("admission_show", { required: 'Please choose status !' })} className="input-bordered">
                                   <option value={''} selected disabled>--CHOOSE--</option>
                                   <option value={0}>DISABLED</option>
                                   <option value={1}>ENABLED</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="letter_id" className="input-item-label">ADMISSION LETTER TEMPLATE</label>
                                <select {...register("letter_id", { required: 'Please choose Letter template !' })} className="input-bordered">
                                   <option value={''} selected disabled>--CHOOSE--</option>
                                   { helper && helper.letters.map((row,i) => 
                                    <option value={row.id}>{row.title}</option>
                                   )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="admission_date" className="input-item-label">ADMISSION SESSION DATE</label>
                                <input {...register("admission_date", { required: 'Please provide admission session date !' })}  className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="letter_id" className="input-item-label">STARTING ACADEMIC SESSION/CALENDAR</label>
                                <select {...register("academic_session_id", { required: 'Please Academic Calendar !' })} className="input-bordered">
                                   <option value={''} selected disabled>--CHOOSE--</option>
                                   { helper && helper.calendars.map((row,i) => 
                                    <option value={row.id}>{row.title} - {row.tag == 'MAIN' ? 'SEPTEMBER & MAIN STREAM':'JANUARY & SUB STREAM'}</option>
                                   )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="voucher_index" className="input-item-label">VOUCHER START INDEX</label>
                                <input {...register("voucher_index", { required: 'Please enter voucher start index !' })} maxLength={8} minLength={8} className="input-bordered" type="text"/></div>
                        </div>
                    </div>

                    <div className="gaps-1x"></div>

                    <div className="d-sm-flex justify-content-between align-items-center">
                        <span>
                        <button className="btn btn-dark" type="submit">
                            <i className="fa fa-save "></i>&nbsp;&nbsp;<b>SAVE DATA</b>
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


export default Utilities
