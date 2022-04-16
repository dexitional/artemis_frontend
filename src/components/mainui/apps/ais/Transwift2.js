import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { deleteDefer, fetchDefer, loadAMSHelpers, postDefer, approveDefer, loadAISHelpers, loadFMSHelpers, resumeDefer } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setDatabox, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import parse from 'html-react-parser'


const Transwift = ({view,data,recid}) => {
   const title = () => {
     switch(view){
       case 'list': return 'TRANSWIFT REQUEST';
       case 'add': return 'NEW REQUEST';
       case 'edit': return 'EDIT REQUEST';
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
            <div className="d-inline-block print-btn d-none">
                <Link to="/app/ais?mod=transwift&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD REQUEST</b></Link>
            </div> : null
           }
	   </h3>
        {content()}
	</div>
   )
}


const List = () => {

   const [ transwift, setTranswift ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const { user } =  sso;

   const fetchTransData = async () => {
      const res = await fetchTranswift();
      if(res.success) setTranswift([...res.data]);
   }

   const restoreTData = () => {
      sso.databox.deferment && setDeferment([ ...sso.databox.deferment ]);
   }

   const deleteRecord = async (e,id) => {
      e.preventDefault()
      const cm = window.confirm('Delete record ?')
      if(cm) {
        const resp = await deleteDefer(id)
        if(resp.success){
          dispatch(updateAlert({show:true,message:`RECORD DELETED !`,type:'success'}))
          fetchDeferData()
        }else{
          alert('ACTION FAILED!')
        }
      }
   }

   const approveDeferment = async (e,id,sno) => {
     e.preventDefault()
     const cm = window.confirm('Approve Request ?'+sno)
     if(cm) {
        const resp = await approveDefer(id,sno)
        if(resp.success){
          dispatch(updateAlert({show:true,message:`REQUEST APPROVED !`,type:'success'}))
          fetchDeferData()
        }else{
          alert('ACTION FAILED!')
        }
     }
   }

   const resumeDeferment = async (e,id,sno) => {
    e.preventDefault()
    const cm = window.confirm('Resume Academics ?'+sno)
    if(cm) {
       const resp = await resumeDefer(id,sno)
       if(resp.success){
         dispatch(updateAlert({show:true,message:`ACADEMICS RESUMPTION ACTIVATED !`,type:'success'}))
         fetchDeferData()
       }else{
         alert('ACTION FAILED!')
       }
    }
  }

   useEffect(() => {
     restoreDeferData()
     fetchDeferData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({transwift}));
   },[deferment])


   
   return (
    <>
    <div className="card-innr">
    <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-wrap">
                    <table className="data-table dt-filter-init admin-tnx  dataTable no-footer">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col" rowspan="1" colspan="1">ID </th>
                                <th className="data-col w-25" rowspan="1" colspan="1">STUDENT</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">REASON</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">DEFERMENT INFO</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { deferment.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col"><span className="lead tnx-id"># {row.id}</span></td>
                            <td className="data-col w-25">
                              <small style={{color:'#b76117',fontWeight:'bolder',wordBreak:'break-word'}}>{ row.name }</small>
                              { row.indexno ? parse(`<br/><small style="font-weight:bolder;word-break:break-word">${row.indexno.toUpperCase()}</small>`) : null }
                            </td>
                            <td className="data-col w-25">
                              <small style={{color:'#333',fontWeight:'bolder',wordBreak:'break-word'}}>{ row.reason && row.reason.toUpperCase() }</small>
                            </td>
                            <td className="data-col w-25">
                              <small style={{color:'#b76117',fontWeight:'bolder',wordBreak:'break-word'}}>STATUS: { row.verified == 0 ? 'NOT APPROVED': (row.verified == 1 ? 'APPROVED':'RESUMED') }</small>
                              {row.verified == 1 ? parse(`<br/><small style="font-weight:bolder;word-break:break-word">APPROVED ON: ${row.verified_at && row.verified_at.toUpperCase() }</small>`) : null }
                              {row.verified == 2 ? parse(`<br/><small style="font-weight:bolder;word-break:break-word">RESUMED ON: ${row.resumed_at && row.resumed_at.toUpperCase() }</small>`) : null }
                            </td>
                            <td className="data-col">
                                { row.verified == 0 && <Link className={`badge badge-sm ${row.verified == 0 ? 'badge-success text-white' : 'badge-success badge-outline text-success'}`} onClick={ e => approveDeferment(e,row.id,user.user.staff_no)}><b>APPROVE</b></Link> }
                                { row.verified == 1 && <span className="badge badge-sm badge-outline badge-dark text-dark"><b>APPROVED</b></span>}
                                { row.verified == 1 && <Link className={`badge badge-sm ${row.verified == 1 ? 'badge-success text-white' : 'badge-success badge-outline text-success'}`} onClick={ e => resumeDeferment(e,row.id,user.user.staff_no)}><b>RESUME</b></Link> }
                                { row.verified == 2 && <span className="badge badge-sm badge-outline badge-dark text-dark"><b>RESUMED</b></span>}
                                <Link className={`badge badge-sm badge-success text-white`} to={`/app/ais?mod=deferment&view=edit&recid=${row.id}`}><b><em className="ti ti-pencil"></em></b></Link>
                                <Link className={`badge badge-sm badge-danger text-white`} onClick={ e => deleteRecord(e,row.id)}><b><em className="ti ti-trash"></em></b></Link>
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
    </>
   )
}

const Form = ({recid}) => {
    
    const [ form,setForm ] = useState({});
    const [ loading,setLoading ] = useState(false);
    const history = useHistory();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    const [ helper,setHelper ] = useState({ sessions:[] });
    const dispatch = useDispatch()
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      delete data.name;
      if(data.start_period == 'Invalid date' || data.start_period == '') data.start_period = null
      if(data.start_period == 'Invalid date' || data.end_period == '') data.end_period = null
      if(data.verified_at == 'Invalid date' || data.verified_at == '') data.verified_at = null
      
      const res = await postDefer(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`REQUEST SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/ais?mod=deferment&view=list')
         },2000)
         
      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`SAVED FAILED !`,type:'error'}))
      }
    }

    const formData = () => {
        const dt = sso.databox.deferment.find( r => r.id == recid )
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'start_period' || d == 'end_period' || d == 'verified_at' || d == 'created_at') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              return setValue(d,dt[d])
          })
        } 
    }

    const cancelForm = (e) => {
       e.preventDefault();
       const cm = window.confirm('Cancel Form ?')
       if(cm) history.push('/app/ais?mod=deferment&view=list')
    }

    const helperData = async() => {
        const hps = await loadFMSHelpers()
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
                                <label htmlFor="session_id" className="input-item-label">ACADEMIC CALENDAR/SESSION</label>
                                <select {...register("session_id")} className="input-bordered">
                                <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.sessions.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="reason" className="input-item-label">DEFERMENT REASON</label>
                                <input {...register("reason", { required: 'Please enter Reason for Deferment !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="refno" className="input-item-label">STUDENT REFERENCE ID</label>
                                <input {...register("refno", { required: 'Please enter Student Reference Number !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="indexno" className="input-item-label">INDEX NUMBER</label>
                                <input {...register("indexno", { required: 'Please enter Index Number !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="semester" className="input-item-label">DEFERMENT YEAR & SEMESTER</label>
                              <select {...register("semester")} className="input-bordered">
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
                                <label htmlFor="period" className="input-item-label">DEFERMENT PERIOD (YEARS)</label>
                                <input {...register("period", { required: 'Please enter Deferment Years !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="start_period" className="input-item-label">DEFERMENT START PERIOD</label>
                                <input {...register("start_period", { required: 'Please enter Deferment Start Period !' })} className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="end_period" className="input-item-label">DEFERMENT END PERIOD</label>
                                <input {...register("end_period", { required: 'Please enter Deferment End Period !' })} className="input-bordered" type="date"/></div>
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


export default Transwift
