import React,{ useState,useEffect,useRef } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { loadAISHelpers,fetchHRStaffHRS,fetchMountListAIS, fetchProgchangeDataAIS, postProgchangeDataAIS, approveProgchange } from '../../../../store/utils/ssoApi';
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
const Progchange = ({view,data,recid}) => {
   
   const [ activity,setActivity ] = useState({})
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(1);
   const open = Boolean(anchorEl);
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'PROGRAM CHANGE';
       case 'add': return 'ADD REQUEST';
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
                <Link to="/app/ais?mod=progchange&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>NEW REQUEST</b></Link>&nbsp;
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
   const [ progchange, setProgchange ] = useState([])
   const { sso } = useSelector(state => state)
   const { user } = sso
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

   const approveRequest = async (id) => {
      const res = await approveProgchange(id,user.user.staff_no);
      console.log(id,user.user.staff_no)
      if(res.success){
        // setActivity({...activity,reg:true})
        fetchProgchangeData()
        dispatch(updateAlert({show:true,message:`REQUEST APPROVED!`,type:'success'}))
      }else{
        dispatch(updateAlert({show:true,message:`REQUEST NOT APPROVED!`,type:'error'}))
      }
 };

   

   const editProfile = (id) => {
      const url = `/app/ais?mod=progchange&view=edit&recid=${id}`;
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
   
    const restoreProgchangeData = () => {
       sso.databox.progchange && setProgchange([ ...sso.databox.progchange ]);
    }

    const fetchProgchangeData = async () => {
        var query = ``;
        if(page >= 1) query += `?page=${page-1}`
        if(keyword != '') query += `&keyword=${keyword}`
        const res = await fetchProgchangeDataAIS(query);
        console.log()
        if(res.success){
            setIsLoading(false)
            setProgchange([...res.data.data]);// Page Data
            setCount(res.data.totalPages)// Total Pages
        }else{
            setIsLoading(false)
            setProgchange([]);// Page Data
            setCount(1)// Total Pages
        }
    }
   
    const onSearchChange = async (e) => {
        setKeyword(e.target.value)
        setPage(1)
        if(e.target.value == '') fetchProgchangeData()
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
        fetchProgchangeData()
    }

    useEffect(() => {
      restoreProgchangeData()
    },[])

    useEffect(() => {
      dispatch(updateDatabox({progchange}));
    },[progchange])

    useEffect(() => {
      fetchProgchangeData()
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
                                <th className="data-col w-25" rowspan="1" colspan="1">STUDENT INFO</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">CURRENT INFO</th>
                                <th className="data-col" rowspan="1" colspan="1">NEW INFO</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">APPROVAL STATUS</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">REQUEST DATE</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { progchange.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col w-25">
                              <small style={{color:'#b76117',fontWeight:'bolder',wordBreak:'break-word'}}>{ row.name }</small>
                              {row.refno ? parse(`<br/><small style="font-weight:bolder;word-break:break-word">${row.refno.toUpperCase()}</small>`) : null }
                            </td>
                            <td className="data-col w-25">
                              <small style={{color:'#b76117',fontWeight:'bolder',wordBreak:'break-word'}}>{ row.program_cname && row.program_cname.toUpperCase()}</small>
                              {row.major_cname ? parse(`<br/><small style="font-weight:bolder;word-break:break-word">${row.major_cname && row.major_cname.toUpperCase()}</small>`) : null }
                              {row.current_indexno ? parse(`<br/><small style="font-weight:bolder;word-break:break-word">INDEX NO: ${row.current_indexno.toUpperCase()}</small>`) : null }
                              {row.current_semester ? parse(`<br/><small style="font-weight:bolder;word-break:break-word;color:#b76117">YEAR: ${Math.ceil(row.current_semester/2)}</small>`) : null }
                            </td>
                            <td className="data-col w-25">
                              <small style={{color:'#b76117',fontWeight:'bolder',wordBreak:'break-word'}}>{ row.program_nname && row.program_nname.toUpperCase()}</small>
                              {row.new_indexno ? parse(`<br/><small style="font-weight:bolder;word-break:break-word">INDEX NO: ${row.new_indexno.toUpperCase()}</small>`) : null }
                              {row.new_semester ? parse(`<br/><small style="font-weight:bolder;word-break:break-word;color:#b76117">YEAR: ${Math.ceil(row.new_semester/2)}</small>`) : null }
                            </td>
                            <td className="data-col w-25">
                              <small style={{fontWeight:'bolder',wordBreak:'break-word'}}>{ row.approved_status == 1 ? 'APPROVED' : 'NOT APPROVED' }</small>
                            </td>
                            <td className="data-col w-25">
                              {row.created_at ? parse(`<small style="font-weight:bolder;word-break:break-word">${moment(row.created_at).format('LL').toUpperCase()}</small>`) : null }
                            </td>
                            <td className="data-col">
                                 { row.approved_status == 0 && <>
                                <Button id={`basic-button${row.id}`} variant="contained" color={(row.status == 1 && row.send_status == 1) ? 'success':(row.status == 1 && row.send_status == 0 ? 'warning':'error')} aria-controls={`basic-menu${row.id}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={ref && ref == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                 <MenuItem onClick={() => approveRequest(row.id)}>APPROVE REQUEST</MenuItem>
                                 <MenuItem onClick={() => editProfile(row.id)}>EDIT REQUEST</MenuItem>
                                </Menu>
                                </> || parse(`<small style="font-weight:bolder;word-break:break-word;color:#b76117">COMPLETED</small>`)}
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
    const [ helper,setHelper ] = useState({ programs:[],majors:[] });
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      const sentToServer = { id: data.id, refno:data.refno, current_indexno:data.current_indexno, current_prog_id:data.current_prog_id, current_major_id:data.current_major_id, current_semester:data.current_semester,new_prog_id:data.new_prog_id, remarks:data.remarks, status:data.status }
      console.log(data); 
      console.log(sentToServer); 
      const res = await postProgchangeDataAIS(sentToServer);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`REQUEST SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/ais?mod=progchange&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.progchange.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'created_at' || d == 'approved_at') return setValue(d,moment(dt[d]).format('YYYY-MM-DD HH:mm:ss'))
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
       if(cm) history.push('/app/ais?mod=progchange&view=list')
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
                                <label htmlFor="refno" className="input-item-label">STUDENT REFERENCE NUMBER (ID)</label>
                                <input  {...register("refno", { required: 'Please enter Student ID !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="current_indexno" className="input-item-label">STUDENT INDEX NUMBER</label>
                                <input  {...register("current_indexno", { required: 'Please enter Student Index Number !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="current_prog_id" className="input-item-label">CURRENT PROGRAM</label>
                                <select {...register("current_prog_id")} className="input-bordered">
                                <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.programs.map( row => 
                                    <option value={row.id}>{row.short && row.short.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="current_major_id" className="input-item-label">CURRENT MAJOR</label>
                                <select {...register("current_major_id")} className="input-bordered">
                                <option value="" selected>-- NO MAJOR --</option>
                                  {helper && helper.majors.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()} ({row.code && row.code.toUpperCase()})</option>
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="current_semester" className="input-item-label">CURRENT YEAR & SEMSTER</label>
                                <select {...register("current_semester")} className="input-bordered">
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
                                <label htmlFor="new_prog_id" className="input-item-label">PREFFERED OR NEW PROGRAM</label>
                                <select {...register("new_prog_id")} className="input-bordered">
                                <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.programs.map( row => 
                                    <option value={row.id}>{row.short && row.short.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="input-item input-with-label">
                                <label htmlFor="remarks" className="input-item-label">REMARKS AND REASON</label>
                                <textarea  {...register("remarks", { required: 'Please enter Reason & Remarks' })} className="input-bordered"/></div>
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


export default Progchange
