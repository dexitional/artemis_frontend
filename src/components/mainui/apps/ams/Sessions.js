import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { deleteSession, fetchSessions, postSession, setDefaultSession } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setSessions } from '../../../../store/admission/ssoSlice';


const Sessions = ({view,data,recid}) => {
   const title = () => {
     switch(view){
       case 'list': return 'ADMISSION SESSIONS';
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


   
   return (
    <div className="card-innr">
    <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
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
            </div>
        </div>
    </div>
    </div>
   )
}

const Form = ({recid}) => {
    
    const [ form,setForm ] = useState({});
    const [ loading,setLoading ] = useState(false);
    const history = useHistory();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    const onSubmit = async data => {
      data.session_id = parseInt(recid) || 0;
      console.log(data);
      const res = await postSession(data);
      if(res.success){
         // Do something if passed
         history.push('/app/ams?mod=sessions&view=list')
      } else{
         // Show error messages
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.sessions.find( r => r.session_id == recid )
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'apply_start' || d == 'apply_end') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              return setValue(d,dt[d])
          })
        } 
    }

    const cancelForm = (e) => {
       e.preventDefault();
       const cm = window.confirm('Cancel Form ?')
       if(cm) history.push('/app/ams?mod=sessions&view=list')
    }
  
    useEffect(()=>{
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
                                   <option value={0}>Disabled</option>
                                   <option value={1}>Enabled</option>
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


export default Sessions
