import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { deleteEntrance, fetchEntrance, loadEntrance, postEntrance } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setDatabox, updateDatabox } from '../../../../store/admission/ssoSlice';
import { helperData } from '../../../../store/utils/helperData';


const Entrance = ({view,data,recid}) => {
   const title = () => {
     switch(view){
       case 'list': return 'ENTRANCE EXAMS RESULTS';
       case 'add': return 'ADD RESULT';
       case 'edit': return 'EDIT RESULT';
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
                <Link to="/app/ams?mod=entrance&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD RESULT</b></Link>
            </div> : null
           }
	   </h3>
        {content()}
	</div>
   )
}


const List = () => {
   const [ entrance, setEntrance ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const fetchEntranceData = async () => {
      const res = await fetchEntrance();
      if(res.success) setEntrance([...res.data]);
   }
   const restoreEntranceData = () => {
      setEntrance([ ...sso.databox.entrance ]);
   }
   const deleteRecord = async (e,id) => {
      e.preventDefault()
      const cm = window.confirm('Delete record ?')
      if(cm) {
        const resp = await deleteEntrance(id)
        if(resp.success){
           const ss = entrance.filter(s => s.serial != id)
           setEntrance([...ss ])
        }else{
           alert('ACTION FAILED!')
        }
      }
   }
   const viewResult = async (e,id) => {
         e.preventDefault()
     
        const resp = await loadEntrance(id)
        console.log(resp);
        if(resp.success){
            //const ss = sess.filter(s => s !== id)
            const ss = entrance.map(s => {
                if(s.serial == id){
                    let sx = {...s }
                    sx.status = 1
                    return sx;
                }else{
                    let sx = {...s }
                    sx.status = 0
                    return sx;
                }
            })
            setEntrance([...ss])
            console.log(ss)
       
     }
   }

   useEffect(() => {
     restoreEntranceData()
     fetchEntranceData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({ entrance }));
   },[entrance])


   
   return (
    <div className="card-innr">
    <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-wrap">
                    <table className="data-table dt-filter-init admin-tnx dataTable no-footer" id="DataTables_Table_0">
                        <thead>
                            {/*
                            <tr className="data-item data-head" role="row">
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLICANT </th>
                                <th className="data-col" rowspan="1" colspan="1">AGE</th>
                                <th className="data-col" rowspan="1" colspan="1">TAKEN SUBJECTS</th>
                                <th className="data-col" rowspan="1" colspan="1">SUBMITTED ON</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>*/}
                            <tr className="data-item data-head" role="row">
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLICANT </th>
                                <th className="data-col" rowspan="1" colspan="1">SUBJECT</th>
                                <th className="data-col" rowspan="1" colspan="1">SCORE & GRADE</th>
                                <th className="data-col" rowspan="1" colspan="1">SUBMITTED ON</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { entrance.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col"><span className="lead token-amount">{ row.name && row.name.toUpperCase() }</span></td>
                            <td className="data-col"><span className="lead amount-pay">{ moment().diff(row.dob,'years') }</span></td>
                            <td className="data-col"><span className="lead user-info">{ row.subjects_taken }</span></td>
                            <td className="data-col"><span className="lead user-info">{ moment(row.created_at).format('ddd, MMM DD, YYYY').toUpperCase() }</span></td>
                            <td className="data-col d-flex">
                                <Link className={`badge badge-sm badge-dark badge-outline text-dark}`} onClick={ e => viewResult(e,row.serial) }><b>VIEW RESULTS</b></Link>
                                <Link className={`badge badge-sm badge-success text-white`} to={`/app/ams?mod=entrance&view=edit&recid=${row.serial}`}><b><em className="ti ti-pencil"></em></b></Link>
                                <Link className={`badge badge-sm badge-danger text-white`} onClick={ e => deleteRecord(e,row.serial)}><b><em className="ti ti-trash"></em></b></Link>
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
      data.id = parseInt(recid) || 0;
      console.log(data);
      const res = await postEntrance(data);
      if(res.success){
         // Do something if passed
         history.push('/app/ams?mod=entrance&view=list')
      } else{
         // Show error messages
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.entrance.find( r => r.id == recid )
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
       if(cm) history.push('/app/ams?mod=entrance&view=list')
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
                                <label htmlFor="title" className="input-item-label">APPLICANT ID / SERIAL NUMBER</label>
                                <input {...register("serial", { required: 'Please enter serial !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="title" className="input-item-label">MARKS OBTAINED</label>
                                <input {...register("score", { required: 'Please enter Score !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="subject_id" className="input-item-label">SUBJECT TAKEN</label>
                                <select {...register("subject_id")} className="input-bordered">
                                  <option value="" disabled selected>--NONE--</option>
                                  {helperData && helperData.subjects.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
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


export default Entrance
