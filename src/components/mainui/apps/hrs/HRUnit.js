import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postHRUnitDataHRS, loadHRSHelpers, deleteHRUnitDataHRS, fetchHRUnitDataHRS, updateHRUnitHead } from '../../../../store/utils/ssoApi';
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
const HRUnit = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'HRS UNITS';
       case 'add': return 'ADD UNIT';
       case 'edit': return 'EDIT UNIT';
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
                <Link to="/app/hrs?mod=hrsunit&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD UNIT</b></Link>
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
   const [ hrunit, setHRUnit ] = useState([])
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

   const editUnit = (id) => {
      const url = `/app/hrs?mod=hrsunit&view=edit&recid=${id}`;
      history.push(url);
   }

   const delUnit = async (id) => {
      const cm = window.confirm('DELETE UNIT ?')
      if(cm) {
        const resp = await deleteHRUnitDataHRS(id)
        if(resp.success){
          const ss = hrunit.filter(s => s.id != id)
          setHRUnit([...ss ])
          dispatch(updateAlert({show:true,message:`PROFILE ID: ${id} DELETED !`,type:'success'}))
        }else{
          dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        }
      }
   }

   const updateHead = async (id) => {
    const cm = window.prompt('Please Provide Staff Number !')
    if(cm) {
      const resp = await updateHRUnitHead(id,cm)
      if(resp.success){
        const ss = hrunit.filter(s => s.id != id)
        setHRUnit([...ss ])
        dispatch(updateAlert({show:true,message:`HEAD UPDATED TO STAFF NUMBER: ${cm} !`,type:'success'}))
      }else{
        dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
      }
    }
 }

  
   
  const restoreHRUnitData = () => {
    sso.databox.hrunit && setHRUnit([...sso.databox.hrunit]);
  }


   const fetchHRUnitData = async () => {
      var query = ``;
      if(page >= 1) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      const res = await fetchHRUnitDataHRS(query);
      if(res.success){
          setIsLoading(false)
          setHRUnit([...res.data.data]);// Page Data
          setCount(res.data.totalPages)// Total Pages
      }
   }
   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     setPage(1)
     if(e.target.value == '') fetchHRUnitData()
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
    fetchHRUnitData()
  }

   useEffect(() => {
     restoreHRUnitData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({hrunit}));
   },[hrunit])

   useEffect(() => {
     fetchHRUnitData()
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
                                <th className="data-col w-25" rowspan="1" colspan="1">UNIT NAME</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">UNIT CATEGORY</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">UNIT PARENT</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">UNIT HEAD</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { hrunit.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                              <span className="lead tnx-id">
                                {row.title && row.title.toUpperCase()}
                                {row.code ? parse(`<br/><small style="color:#b76117;font-weight:bolder;padding-left:15px">-- ${row.code.toUpperCase()} </small>`) : null }
                              </span>
                            </td>
                            <td className="data-col w-25">
                                <span className="lead token-amount">{row.type }</span>
                                {row.level ? parse(`<br/><small style="color:#b76117;font-weight:bolder;padding-left:15px">-- ${ row.level == 2 ? (row.type == 'NON-ACADEMIC' ? 'SECTION & DIVISION':'SCHOOL & FACULTY') : (row.type == 'NON-ACADEMIC' ? 'UNIT':'DEPARTMENT') } </small>`) : null }
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{row.school && row.school.toUpperCase() || row.title && row.title.toUpperCase() }</span></td>
                            <td className="data-col">
                              <span className="lead tnx-id">
                                {row.head_name}
                                {row.head_no ? parse(`<br/><small style="color:#b76117;font-weight:bolder;padding-left:35px">-- ${row.head_no} </small>`) : null }
                              </span>
                            </td>
                            <td className="data-col">
                                <>
                                <Button id={`basic-button${row.id}`} variant="contained" color='warning' aria-controls={`basic-menu${row.id}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.id ? 'true' : undefined} onClick={(e) => handleClick(e,row.id)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.id}`} anchorEl={anchorEl} open={ref && ref == row.id} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.id}`}}>
                                    {/*<MenuItem onClick={handleClose}>VIEW PROFILE</MenuItem>*/}
                                    <MenuItem onClick={() => editUnit(row.id)}>EDIT UNIT</MenuItem>
                                    <MenuItem onClick={() => delUnit(row.id)}>DELETE UNIT</MenuItem>
                                    <MenuItem onClick={() => updateHead(row.id) }>UPDATE HEAD</MenuItem>
                                     {/*<MenuItem onClick={handleClose}>VIEW TRANSCRIPT</MenuItem>
                                    <MenuItem onClick={handleClose}>VIEW STATEMENT</MenuItem>
                                    */}
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
    const [ helper,setHelper ] = useState({ parents:[],schools:[],depts:[] });
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    const [ inps,setInps] = useState({})
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      const res = await postHRUnitDataHRS(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`UNIT SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/hrs?mod=hrsunit&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.hrunit.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              //if(d == 'dob') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              return setValue(d,dt[d])
          })
        } 
    }

    const helperData = async() => {
        const hp = await loadHRSHelpers()
        console.log(hp)
        if(hp.success){
          setHelper(hp.data)
        } 
    }

    const cancelForm = (e) => {
       e.preventDefault();
       const cm = window.confirm('Cancel Form ?')
       if(cm) history.push('/app/hrs?mod=hrsunit&view=list')
    }
  
    useEffect(()=>{
      helperData();
      formData();
    },[])

    useEffect(()=>{
      setInps({...getValues()})
    },[getValues()])
  

    return (
		<div className="card-innr">
            	<form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        { (errors.title || errors.dob || errors.apply_end )  &&
                        <div className="col-md-12">
                            <div className="alert alert-danger text-danger font-weight-bolder">
                               { errors.title && <small><b>**  {errors.title.message.toUpperCase()}<br/></b></small>}
                            </div>
                        </div>
                        }
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="title" className="input-item-label">UNIT TITLE</label>
                                <input  {...register("title", { required: 'Please enter Unit Title !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="code" className="input-item-label">UNIT CODE</label>
                                <input  {...register("code")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="type" className="input-item-label">UNIT TYPE</label>
                                <select {...register("type")} className="input-bordered">
                                   <option value={'ACADEMIC'}>ACADEMIC</option>
                                   <option value={'NON-ACADEMIC'}>NON-ACADEMIC</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                              <label htmlFor="level" className="input-item-label">UNIT CATEGORY</label>
                                <select {...register("level")} className="input-bordered">
                                   <option value={'2'}>SCHOOL/FACULTY/SECTION/DIVISION</option>
                                   <option value={'3'}>DEPARTMENT/UNIT</option>
                                </select>
                            </div>
                        </div>
                        
                        
                        { getValues("level") == 3 &&
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="lev2_id" className="input-item-label">{ getValues("type") == 'ACADEMIC' ? 'SCHOOL & FACULTY':'SECTION & DIVISION'}</label>
                                <select {...register("lev2_id")} className="input-bordered">
                                  <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.schools.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        }

                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="location" className="input-item-label">LOCATION & ADDRESS</label>
                                <input {...register("location")} className="input-bordered" type="text"/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="head" className="input-item-label">UNIT HEAD</label>
                                <input {...register("head")} className="input-bordered" type="number"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="active" className="input-item-label">STATUS</label>
                                <select {...register("active")} className="input-bordered">
                                  <option value={''} disabled selected>--CHOOSE--</option>
                                   <option value={'0'}>INACTIVE</option>
                                   <option value={'1'}>ACTIVE</option>
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


export default HRUnit
