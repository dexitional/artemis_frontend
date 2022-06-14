import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { deleteEntrance, fetchEntrance, loadEntrance, postEntrance } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setCurrentPage, setDatabox, setModal, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import { helperData } from '../../../../store/utils/helperData';
import { getSubject } from '../../../../store/utils/admissionUtil';


const Entrance = ({view,data,recid}) => {
   const title = () => {
     switch(view){
       case 'list': return 'ENTRANCE EXAMS RESULTS';
       case 'add': return 'ADD ENTRANCE RESULT';
       case 'edit': return 'EDIT ENTRANCE RESULT';
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
       var query = ``;
       if(page >= 1) query += `?page=${page-1}`
       if(keyword != '') query += `&keyword=${keyword}`
       const res = await fetchEntrance(query);
       if(res.success){
           setIsLoading(false)
           setEntrance([...res.data.data]);// Page Data
           setCount(res.data.totalPages)// Total Pages
       }
   }

   const restoreEntranceData = () => {
      sso.databox.entrance && setEntrance([ ...sso.databox.entrance ]);
   }

   const deleteRecord = async (e,id) => {
      e.preventDefault()
      const cm = window.confirm('Delete record ?')
      if(cm) {
        const resp = await deleteEntrance(id)
        if(resp.success){
            // Do something if passed
          dispatch(updateAlert({show:true,message:`ENTRANCE RESULTS DELETED !`,type:'success'}))
          setTimeout(() => {
            const ss = entrance.filter(s => s.id != id)
            setEntrance([...ss ])
          },2000)
        }else{
           alert('ACTION FAILED!')
        }
      }
   }
   const viewResult = async (e,serial) => {
        e.preventDefault()
        const resp = await loadEntrance(serial)
        if(resp.success){
          //setActivity({...activity,reg:true})
          const title = `Kobby`
          let dz = { title:title, content:{ data:resp.data, photo:`https://portal.aucc.edu.gh/api/photos?tag=${resp.data['staff_no']}`}, size:'md', show:true, page:'entranceslip' };
          dispatch(setModal(dz));
        }else{
          dispatch(updateAlert({show:true,message:`STATEMENT NOT FOUND!`,type:'error'}))
        }
        
   }

   useEffect(() => {
     restoreEntranceData()
   },[])


   useEffect(() => {
     fetchEntranceData()
     dispatch(setCurrentPage(page))
   },[page])


   useEffect(() => {
      dispatch(updateDatabox({ entrance }));
   },[entrance])


    // Search & Pagination
    const [ page, setPage ] = React.useState(1);
    const [ count, setCount ] = React.useState(0);
    const [ keyword, setKeyword ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);
 
   
    const onSearchChange = async (e) => {
      setKeyword(e.target.value)
      setPage(1)
      if(e.target.value == '') fetchEntranceData()
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
     fetchEntranceData()
   }
 
    
   return (
    <div className="card-innr">
    <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-wrap">
                    <table className="data-table dt-filter-init admin-tnx dataTable no-footer" id="DataTables_Table_0">
                        <thead>
                            
                            <tr className="data-item data-head" role="row">
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLICANT </th>
                                <th className="data-col" rowspan="1" colspan="1">SUBJECT</th>
                                <th className="data-col center" rowspan="1" colspan="1">GRADING</th>
                                <th className="data-col" rowspan="1" colspan="1">SUBMITTED ON</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { entrance.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col"><span className="lead token-amount">{ row.name && row.name.toUpperCase() } <br/><small className="input-item-label"><b>-- APPLICANT: {row.serial} </b></small></span></td>
                            <td className="data-col"><span className="lead amount-pay">{ getSubject(row.subject_id) && getSubject(row.subject_id).toUpperCase() }</span></td>
                            <td className="data-col center"><span className="lead user-info">{ row.score }</span><small className="input-item-label"><b> {row.grade} </b></small></td>
                            <td className="data-col"><span className="lead user-info">{ moment(row.created_at).format('ddd, MMM DD, YYYY').toUpperCase() }</span></td>
                            <td className="data-col">
                                <Link className={`badge badge-sm badge-dark badge-outline text-dark}`} onClick={ e => viewResult(e,row.serial) }><b>RESULTS</b></Link>
                                <Link className={`badge badge-sm badge-success text-white`} to={`/app/ams?mod=entrance&view=edit&recid=${row.id}`}><b><em className="ti ti-pencil"></em></b></Link>
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
   )
}

const Form = ({recid}) => {
    
    const [ form,setForm ] = useState({});
    const [ loading,setLoading ] = useState(false);
    const history = useHistory();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    const dispatch = useDispatch()
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      const dt = { serial:data.serial, score:data.score, grade:data.grade, subject_id:data.subject_id, session_id:data.session_id, id:data.id }
      const res = await postEntrance(dt);
      if(res.success){
          // Do something if passed
          dispatch(updateAlert({show:true,message:`ENTRANCE RESULTS SAVED !`,type:'success'}))
          setTimeout(() => {
            history.push('/app/ams?mod=entrance&view=list')
          },2000)
          
      } else{
          // Show error messages
          dispatch(updateAlert({show:true,message:`SAVED FAILED !`,type:'error'}))
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
                                <label htmlFor="title" className="input-item-label">APPLICANT ID</label>
                                <input {...register("serial", { required: 'Please enter serial !' })} className="input-bordered" type="text"/></div>
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

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="score" className="input-item-label">SCORE OBTAINED</label>
                                <input {...register("score", { required: 'Please enter Score !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="grade" className="input-item-label">GRADING</label>
                                <select {...register("grade")} className="input-bordered">
                                  <option value="" disabled selected>--NONE--</option>
                                  <option value='FAIL'>FAIL</option>
                                  <option value='PASS'>PASS</option>
                                  <option value='DISTINCTION'>DISTINCTION</option>
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
