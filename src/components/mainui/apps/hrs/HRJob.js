import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { fetchHRJobDataHRS, deleteHRJobDataHRS, postHRJobDataHRS, loadHRSHelpers, deleteJobDataHRS, fetchJobDataHRS, postJobDataHRS } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentPage, setDatabox, setModal, setVouchers, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import Pager from '../../Pager';
//import { Button, Menu, MenuItem } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import parse from 'html-react-parser'
import moment from 'moment';

// COMPONENT -VOUCHERS
const HRJob = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'HRS DESIGNATIONS';
       case 'add': return 'ADD JOB';
       case 'edit': return 'EDIT JOB';
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
                <Link to="/app/hrs?mod=hrsjob&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD JOB</b></Link>
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
   const [ hrsjob, setHRJob ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(null);
   const open = Boolean(anchorEl);
   const [ page, setPage ] = React.useState(1);
   const [ count, setCount ] = React.useState(0);
   const [ keyword, setKeyword ] = React.useState('');
   const [ isLoading, setIsLoading ] = React.useState(false);

   const handleClick = (e,id) => {
      setAnchorEl(e.currentTarget);
      setRef(id);
   };
   const handleClose = () => {
      setAnchorEl(null);
      setRef(null);
   };

   const editJob = (id) => {
      const url = `/app/hrs?mod=hrsjob&view=edit&recid=${id}`;
      history.push(url);
   }

   const delJob = async (id) => {
      const cm = window.confirm('DELETE JOB ?')
      if(cm) {
        const resp = await deleteJobDataHRS(id)
        if(resp.success){
          const ss = hrsjob.filter(s => s.id != id)
          setHRJob([...ss ])
          dispatch(updateAlert({show:true,message:`JOB ID: ${id} DELETED !`,type:'success'}))
        }else{
          dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        }
      }
   }


   
  const restoreHRJobData = () => {
    sso.databox.hrsjob && setHRJob([...sso.databox.hrsjob]);
  }


   const fetchHRJobData = async () => {
      var query = ``;
      if(page >= 1) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      const res = await fetchJobDataHRS(query);
      if(res.success){
          setIsLoading(false)
          setHRJob([...res.data.data]);// Page Data
          setCount(res.data.totalPages)// Total Pages
      }
   }
   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     setPage(1)
     if(e.target.value == '') fetchHRJobData()
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
    fetchHRJobData()
  }

   useEffect(() => {
     restoreHRJobData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({hrsjob}));
   },[hrsjob])

   useEffect(() => {
     fetchHRJobData()
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
                    <table className="admin-tnx dataTable no-footer  table-responsive" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col w-50" rowspan="1" colspan="1">DESIGNATION</th>
                                <th className="data-col w-50" rowspan="1" colspan="1">CATEGORY</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { hrsjob.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                                <span className="lead tnx-id">
                                {row.title && row.title.toUpperCase()}
                                </span>
                            </td>
                            <td className="data-col w-25">
                                <span className="lead token-amount">{row.type}</span>
                            </td>
                            <td className="data-col">
                                <>
                                <Button id={`basic-button${row.id}`} variant="contained" color='warning' aria-controls={`basic-menu${row.id}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={ref && ref == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                    {/*<MenuItem onClick={handleClose}>VIEW PROFILE</MenuItem>*/}
                                    <MenuItem onClick={() => editJob(row.id)}>EDIT JOB</MenuItem>
                                    <MenuItem onClick={() => delJob(row.id)}>DELETE JOB</MenuItem>
                                  </Menu>
                                </>


                            </td>   
                          </tr>
                          )}
                        </tbody>
                    </table>
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
    const [ helper,setHelper ] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      const res = await postJobDataHRS(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`DESIGNATION SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/hrs?mod=hrsjob&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.hrsjob.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              return setValue(d,dt[d])
          })
        } 
    }

    const cancelForm = (e) => {
       e.preventDefault();
       const cm = window.confirm('Cancel Form ?')
       if(cm) history.push('/app/hrs?mod=hrsjob&view=list')
    }
  
    useEffect(()=>{
      formData();
    },[])
  

    return (
		<div className="card-innr">
            	<form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        { (errors.title || errors.type)  &&
                        <div className="col-md-12">
                            <div className="alert alert-danger text-danger font-weight-bolder">
                               { errors.title && <small><b>**  {errors.title.message.toUpperCase()}<br/></b></small>}
                               { errors.type && <small><b>**  {errors.type.message.toUpperCase()}<br/></b></small>}
                            </div>
                        </div>
                        }
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                               <label htmlFor="title" className="input-item-label">JOB TITLE</label>
                               <input  {...register("title", { required: 'Please enter job designation !' })} className="input-bordered" type="text"/>
                            </div>
                        </div>

                       <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="type" className="input-item-label">JOB CATEGORY</label>
                                <select {...register("type")} className="input-bordered">
                                   <option value={'ACADEMIC'}>ACADEMIC</option>
                                   <option value={'NON-ACADEMIC'}>NON-ACADEMIC</option>
                                </select>
                            </div>
                        </div>

                       
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="active" className="input-item-label">STATUS</label>
                                <select {...register("active")} className="input-bordered">
                                   <option value={'1'}>ACTIVE</option>
                                   <option value={'0'}>INACTIVE</option>
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


export default HRJob
