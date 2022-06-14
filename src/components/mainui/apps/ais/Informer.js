import React,{ useState,useEffect,useRef } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchStudentDataAIS, postStudentDataAIS, loadAISHelpers, resetAccount, generateMail, stageAccount, fetchSheetDataAIS, loadAssessment, saveAssessment, publishAssessment, certifyAssessment, uncertifyAssessment, loadCourselist, assignSheet, unassignSheet, fetchHRStaffHRS, fetchMetaDataAIS, fetchMountListAIS, postMetaDataAIS, fetchInformerDataAIS, postInformerDataAIS, } from '../../../../store/utils/ssoApi';
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
const Informer = ({view,data,recid}) => {
   
   const [ activity,setActivity ] = useState({})
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(1);
   const open = Boolean(anchorEl);
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'INFORMER';
       case 'add': return 'ADD MESSAGE';
       case 'edit': return 'EDIT MESSAGE';
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
                <Link to="/app/ais?mod=informer&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>NEW MESSAGE</b></Link>&nbsp;
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
   const [ informer, setInformer ] = useState([])
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
      const url = `/app/ais?mod=informer&view=edit&recid=${id}`;
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
   
    const restoreInformerData = () => {
       sso.databox.informer && setInformer([ ...sso.databox.informer ]);
    }

    const fetchInformerData = async () => {
        var query = ``;
        if(page >= 1) query += `?page=${page-1}`
        if(keyword != '') query += `&keyword=${keyword}`
        const res = await fetchInformerDataAIS(query);
        if(res.success){
            setIsLoading(false)
            setInformer([...res.data.data]);// Page Data
            setCount(res.data.totalPages)// Total Pages
        }
    }
   
    const onSearchChange = async (e) => {
        setKeyword(e.target.value)
        setPage(1)
        if(e.target.value == '') fetchInformerData()
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
        fetchInformerData()
    }

    useEffect(() => {
      restoreInformerData()
    },[])

    useEffect(() => {
      dispatch(updateDatabox({informer}));
    },[informer])

    useEffect(() => {
      fetchInformerData()
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
                                <th className="data-col w-25" rowspan="1" colspan="1">TITLE</th>
                                <th className="data-col" rowspan="1" colspan="1">REFERENCE</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">RECEIVER</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">CREATED ON</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">SEND STATUS</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { informer.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col w-25">
                                <small className="lead token-amount">{row.title.toUpperCase()} </small>  
                            </td>
                            <td className="data-col">
                                <small className="lead token-amount">{row.refcode.toUpperCase()} </small>
                            </td>
                            <td className="data-col w-25">
                                <small className="lead token-amount">{row.receiver} </small>
                            </td>
                            <td className="data-col w-25">
                                {row.created_at ? parse(`<small style="font-weight:bolder;word-break:break-word">${moment(row.created_at).format('LL').toUpperCase()}</small>`) : null }
                            </td>
                            <td className="data-col w-25">
                              <small style={{color:'#b76117',fontWeight:'bolder',wordBreak:'break-word'}}>{ row.send_status == 1 ? 'PUSHED & RECEIVED' : 'NOT SENT' }</small>
                              {row.send_at ? parse(`<small style="font-weight:bolder;word-break:break-word">${moment(row.send_at).format('LL').toUpperCase()}</small>`) : null }
                            </td>
                            <td className="data-col">
                                {row.send_status == 0 && <>
                                <Button id={`basic-button${row.id}`} variant="contained" color={(row.status == 1 && row.send_status == 1) ? 'success':(row.status == 1 && row.send_status == 0 ? 'warning':'error')} aria-controls={`basic-menu${row.id}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={ref && ref == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                    {/*<MenuItem onClick={handleClose}>VIEW PROFILE</MenuItem>*/}
                                    <MenuItem onClick={() => editProfile(row.id)}>EDIT MESSAGE</MenuItem>
                                  </Menu>
                                </>  || parse(`<small style="font-weight:bolder;word-break:break-word">DISPATCHED</small>`)}
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
      const sentToServer = { id: data.id, refcode:data.refcode, title:data.title, title:data.title, message:data.message, receiver:data.receiver, status:data.status }
      console.log(data); 
      console.log(sentToServer); 
      const res = await postInformerDataAIS(sentToServer);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`MESSAGE SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/ais?mod=informer&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.informer.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'created_at' || d == 'sent_at') return setValue(d,moment(dt[d]).format('YYYY-MM-DD HH:mm:ss'))
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
       if(cm) history.push('/app/ais?mod=informer&view=list')
    }
  
    useEffect(()=>{
      //helperData();
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
                                <label htmlFor="title" className="input-item-label">TITLE</label>
                                <input  {...register("title", { required: 'Please enter Title !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="refcode" className="input-item-label">LETTER REFERENCE NO.</label>
                                <input  {...register("refcode", { required: 'Please enter Letter reference No !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="message" className="input-item-label">MESSAGE</label>
                                <textarea  {...register("message", { required: 'Please enter Message' })} className="input-bordered"/></div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="receiver" className="input-item-label">ASSIGNED GROUP/RECEIPIENTS</label>
                                <select {...register("receiver")} className="input-bordered">
                                   <option value="ALL">BOTH STUDENTS & STAFF</option>
                                   <option value="STUDENT">ALL STUDENTS (ACTIVE ONLY)</option>
                                   <option value="UNDERGRAD">UNDERGRADUATE STUDENTS (ACTIVE ONLY)</option>
                                   <option value="POSTGRAD">POSTGRADUATE STUDENTS (ACTIVE ONLY)</option>
                                   <option value="STAFF">STAFF (ALL STAFF)</option>
                                   <option value="HEAD">HEADS OF DEPARTMENTS</option>
                                   <option value="DEAN">DEANS OF SCHOOLS</option>
                                   <option value="ASSESOR">ASSESSORS/LECTURERS</option>
                                   <option value="FRESHER">ADMITTED FRESHERS</option>
                                   <option value="APPLICANT">ADMISSION APPLICANTS</option>
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


export default Informer
