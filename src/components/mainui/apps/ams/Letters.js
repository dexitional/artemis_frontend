import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { deleteLetter, fetchLetters, loadAMSHelpers, postLetter, setDefaultLetter } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setDatabox, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import ReactHtml from 'html-react-parser'


const Letters = ({view,data,recid}) => {
   const title = () => {
     switch(view){
       case 'list': return 'LETTER TEMPLATES';
       case 'add': return 'CREATE NEW TEMPLATE';
       case 'edit': return 'EDIT TEMPLATE';
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
                <Link to="/app/ams?mod=letters&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>CREATE TEMPLATE</b></Link>
            </div> : null
           }
	   </h3>
        {content()}
	</div>
   )
}


const List = () => {

   const [ letters, setLetters ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();

   const fetchLetterData = async () => {
      const res = await fetchLetters();
      if(res.success) setLetters([...res.data]);
   }

   const restoreLetterData = () => {
      sso.databox.letters && setLetters([ ...sso.databox.letters ]);
   }
   const deleteRecord = async (e,id) => {
      e.preventDefault()
      const cm = window.confirm('Delete record ?')
      if(cm) {
        const resp = await deleteLetter(id)
        if(resp.success){
           const ss = letters.filter(s => s.id != id)
           setLetters([...ss ])
        }else{
           alert('ACTION FAILED!')
        }
      }
   }

   const setDefault = async (e,id) => {
     e.preventDefault()
     const cm = window.confirm('Set Default ?')
     if(cm) {
        const resp = await setDefaultLetter(id)
        if(resp.success){
            const ss = letters.map(s => {
                if(s.id == id){
                    let sx = {...s }
                    sx.status = 1
                    return sx;
                }else{
                    let sx = {...s }
                    sx.status = 0
                    return sx;
                }
            })
            setLetters([...ss])
        }else{
            alert('ACTION FAILED!')
        }
     }
   }

   useEffect(() => {
     restoreLetterData()
     fetchLetterData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({letters}));
   },[letters])


   
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
                                <th className="data-col w-25" rowspan="1" colspan="1">TEMPLATE TITLE</th>
                                <th className="data-col w-50" rowspan="1" colspan="1">SIGNATORY</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { letters.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col"><span className="lead tnx-id"># {row.id}</span></td>
                            <td className="data-col"><span className="lead token-amount">{row.title && row.title.toUpperCase()}</span></td>
                            <td className="data-col"><span className="lead amount-pay">{ReactHtml(row.signatory)}</span></td>
                            <td className="data-col">
                                { row.status == 0 ? <Link className={`badge badge-sm ${row.status == 0 ? 'badge-success text-white' : 'badge-dark badge-outline text-dark'}`} onClick={ e => setDefault(e,row.session_id)}><b>SET DEFAULT</b></Link>: <span className="badge badge-sm badge-outline badge-dark text-dark"><b>DEFAULT</b></span>}
                                <Link className={`badge badge-sm badge-success text-white`} to={`/app/ams?mod=letters&view=edit&recid=${row.id}`}><b><em className="ti ti-pencil"></em></b></Link>
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
    const [ helper,setHelper ] = useState({ letters:[], calendars:[] });
    const dispatch = useDispatch()
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      const res = await postLetter(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`TEMPLATE SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/ams?mod=letters&view=list')
         },2000)
         
      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`SAVED FAILED !`,type:'error'}))
      }
    }

    const formData = () => {
        const dt = sso.databox.letters.find( r => r.id == recid )
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
       if(cm) history.push('/app/ams?mod=letters&view=list')
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
                                <input {...register("title", { required: 'Please enter template title !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="title" className="input-item-label">SIGNATORY</label>
                                <input {...register("signatory", { required: 'Please enter signatory info !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-12">
                            <div className="input-item input-with-label">
                                <label htmlFor="template" className="input-item-label">TEMPLATE CONTENT</label>
                                <textarea {...register("template", { required: 'Please provide template content !' })} className="input-bordered"/></div>
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


export default Letters
