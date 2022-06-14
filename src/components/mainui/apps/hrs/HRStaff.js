import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { fetchHRStaffDataHRS, deleteHRStaffDataHRS, postHRStaffDataHRS, loadHRSHelpers, stageAccountHRS, generateMailHRS, resetAccountHRS, fetchActiveStListHRS, upgradeRole, revokeRole } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentPage, setDatabox, setModal, setVouchers, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import Pager from '../../Pager';
//import { Button, Menu, MenuItem } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import parse from 'html-react-parser'
import moment from 'moment';
import Loader from '../../../../assets/img/loaderm.gif'


// COMPONENT -VOUCHERS
const HRStaff = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const [ activity,setActivity ] = useState({})
   const [ helper,setHelper ] = useState({ roles:[] });
   
   const title = () => {
     switch(view){
       case 'list': return 'HRS STAFF';
       case 'add': return 'ADD STAFF';
       case 'edit': return 'EDIT STAFF';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'add': return <Form recid={recid}/>;
        case 'edit': return <Form recid={recid}/>;
     } 
   }

   const viewActiveStList = async (e) => {
      e.preventDefault()
      setActivity({...activity,stactive:true})
      const rt = await fetchActiveStListHRS();
      if(rt.success){
        let dt = { content: rt.data, size:'md', show:true, page:'staffactive' }
        dispatch(setModal(dt));
      } else{  dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
      setActivity({...activity,stactive:false})
   }

   const viewRoles = async (e) => {
      e.preventDefault()
      //let dt = { content: helper && helper.roles, size:'md', show:true, page:'table' }
      //dispatch(setModal(dt));
      var output = ``;
      if(helper && helper.roles){
        for(let r of helper.roles){
          output += `${r.arole_id} - ${r.role_name} ( ${r.app_name} )\n`
        }
        alert(output)
      }
   }

   const helperData = async() => {
      const hp = await loadHRSHelpers()
      if(hp.success){
        setHelper(hp.data)
      } 
   }

    
   useEffect(()=>{
     helperData();
   },[])
  
   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Link to="#" className="btn btn-warning btn-sm mr-2 text-dark" onClick={viewRoles}><b>USER ROLES</b>&nbsp;&nbsp;</Link>
                <Link to="#" className="btn btn-warning-alt btn-sm btn-icon mr-2 text-dark" onClick={viewActiveStList}>{ !activity.stactive ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>ACTIVE STAFF</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/> <b>LOADING ...</b>&nbsp;&nbsp;</>}</Link>
                <Link to="/app/hrs?mod=hrstaff&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD STAFF</b></Link>
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
   const [ hrstaff, setHRStaff ] = useState([])
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

   const editProfile = (id) => {
      const url = `/app/hrs?mod=hrstaff&view=edit&recid=${id}`;
      history.push(url);
   }

   const delProfile = async (id) => {
      const cm = window.confirm('DELETE PROFILE ?')
      if(cm) {
        const resp = await deleteHRStaffDataHRS(id)
        if(resp.success){
          const ss = hrstaff.filter(s => s.id != id)
          setHRStaff([...ss ])
          dispatch(updateAlert({show:true,message:`PROFILE ID: ${id} DELETED !`,type:'success'}))
        }else{
          dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        }
      }
   }

   const stageAccess = async (staffno) => {
      const rt = await stageAccountHRS(staffno)
      if(rt.success){
        dispatch(updateAlert({show:true,message:`User access created !`,type:'success'}))
        alert(`${rt.data}`)
        // Account Reset Successfully!
      }else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
      setRef(null);
   }

   const genMail = async (staffno) => {
      const rt = await generateMailHRS(staffno)
      if(rt.success){
        dispatch(updateAlert({show:true,message:`Account email generated !`,type:'success'}))
        alert(`${rt.data}`)
        // Account Reset Successfully!
      }else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
      setRef(null);
   }



  const resetAccess = async (staffno) => {
    const rt = await resetAccountHRS(staffno)
    if(rt.success){
       dispatch(updateAlert({show:true,message:`Account has been reset !`,type:'success'}))
       alert(`${rt.data}`)
      // Account Reset Successfully!
    }else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
    setRef(null);
  }


  const addRole = async (uid) => {
    var role = window.prompt('Enter APP ROLE ID!')
    if(role && role.trim()){
      const rt = await upgradeRole(uid,role)
      if(rt.success){
        dispatch(updateAlert({show:true,message:`PRIVILEGE GRANTED!`,type:'success'}))
      }else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
    }else{
      dispatch(updateAlert({show:true,message:'PROVIDE APP ROLE ID FOR ACCESS PRIVILEGE!',type:'error'}))
    }
    setRef(null);
  }

  const deleteRole = async (uid) => {
    var role = window.prompt('Enter APP ROLE ID !')
    if(role && role.trim()){
      const rt = await revokeRole(uid,role)
      if(rt.success){
        dispatch(updateAlert({show:true,message:`PRIVILEGE REVOKED!`,type:'success'}))
      }else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
    }else{
      dispatch(updateAlert({show:true,message:'PROVIDE APP ROLE ID FOR ACCESS DENIAL!',type:'error'}))
    }
    setRef(null);
  }

   
  const restoreHRStaffData = () => {
    sso.databox.hrstaff && setHRStaff([...sso.databox.hrstaff]);
  }


   const fetchHRStaffData = async () => {
      var query = ``;
      if(page >= 1) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      const res = await fetchHRStaffDataHRS(query);
      if(res.success){
          setIsLoading(false)
          setHRStaff([...res.data.data]);// Page Data
          setCount(res.data.totalPages)// Total Pages
      }
   }
   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     setPage(1)
     if(e.target.value == '') fetchHRStaffData()
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
    fetchHRStaffData()
  }

   useEffect(() => {
     restoreHRStaffData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({hrstaff}));
   },[hrstaff])

   useEffect(() => {
     fetchHRStaffData()
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
                                <th className="data-col" rowspan="1" colspan="1">STAFF NUMBER</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">FULL NAME</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">DESIGNATION</th>
                                <th className="data-col" rowspan="1" colspan="1">CONTACT</th>
                                <th className="data-col" rowspan="1" colspan="1">UNIT</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { hrstaff.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                                   <span className="lead tnx-id">
                                     <img src={`https://portal.aucc.edu.gh/api/photos/?tag=${row.staff_no}`} style={{width:'30px',height:'35px',marginRight:'5px',verticalAlign:'middle'}}/>{row.staff_no}
                                     {row.staff_no ? parse(`<br/><small style="color:#b76117;font-weight:bolder;padding-left:35px">-- ${row.staff_no} </small>`) : null }
                                   </span>
                            </td>
                            <td className="data-col w-25">
                                <span className="lead token-amount">{row.title && row.title.toUpperCase()} {row.name && row.name.toUpperCase()}</span>
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{row.designation && row.designation.toUpperCase() } {row.major_name ? parse(`<br/><small style="color:#b76117;font-weight:bolder">( ${row.major_name.toUpperCase()} )</small>`) : null }</span></td>
                            <td className="data-col">
                                <span className="lead tnx-id"> {row.phone}</span>
                                {row.inst_mail ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.inst_mail}</small>`) : null }
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{(row.unit_name && row.unit_name.toUpperCase()) || '--NONE--' } </span></td>
                            <td className="data-col">
                                <>
                                <Button id={`basic-button${row.staff_no}`} variant="contained" color='warning' aria-controls={`basic-menu${row.staff_no}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.staff_no ? 'true' : undefined} onClick={(e) => handleClick(e,row.staff_no)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.staff_no}`} anchorEl={anchorEl} open={ref && ref == row.staff_no} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.staff_no}`}}>
                                    {/*<MenuItem onClick={handleClose}>VIEW PROFILE</MenuItem>*/}
                                    <MenuItem onClick={() => editProfile(row.id)}>EDIT PROFILE</MenuItem>
                                    <MenuItem onClick={() => resetAccess(row.staff_no)}>RESET PASSWORD</MenuItem>
                                    { !row.inst_mail && <MenuItem onClick={() => genMail(row.staff_no)}>GENERATE EMAIL</MenuItem>}
                                    { !row.uid && <MenuItem onClick={() => stageAccess(row.staff_no)}>STAGE ACCESS</MenuItem> }
                                    { row.uid && <MenuItem onClick={() => addRole(row.uid)}>ADD ROLE</MenuItem> }
                                    { row.uid && <MenuItem onClick={() => deleteRole(row.uid)}>REMOVE ROLE</MenuItem> }
                                    <MenuItem onClick={() => delProfile(row.id)}>DELETE PROFILE</MenuItem>
                                    {/*
                                    <MenuItem onClick={handleClose}>VIEW REGISTRATION</MenuItem>
                                    <MenuItem onClick={handleClose}>VIEW TRANSCRIPT</MenuItem>
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
    const [ helper,setHelper ] = useState({ units:[],jobs:[],regions:[],countries:[] });
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      const res = await postHRStaffDataHRS(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`PROFILE SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/hrs?mod=hrstaff&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.hrstaff.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'dob') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
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
       if(cm) history.push('/app/hrs?mod=hrstaff&view=list')
    }
  
    useEffect(()=>{
      helperData();
      formData();
    },[])
  

    return (
		<div className="card-innr">
            	<form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        { (errors.staff_no || errors.dob || errors.apply_end )  &&
                        <div className="col-md-12">
                            <div className="alert alert-danger text-danger font-weight-bolder">
                               { errors.staff_no && <small><b>**  {errors.staff_no.message.toUpperCase()}<br/></b></small>}
                               { errors.dob && <small><b>**  {errors.dob.message.toUpperCase()}<br/></b></small>}
                            </div>
                        </div>
                        }
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="job_id" className="input-item-label">DESIGNATION</label>
                                <select {...register("job_id")} className="input-bordered">
                                  <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.jobs.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="unit_id" className="input-item-label">ASSIGNED UNIT</label>
                                <select {...register("unit_id")} className="input-bordered">
                                <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.units.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="staff_no" className="input-item-label">INSTITUTIONAL STAFF NO</label>
                                <input  {...register("staff_no", { required: 'Please enter Staff No !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="ssnit" className="input-item-label">SSNIT NUMBER</label>
                                <input  {...register("ssnit")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="paddress" className="input-item-label">NIA CARD NUMBER</label>
                                <input {...register("paddress")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="inst_mail" className="input-item-label">INSTITUTIONAL EMAIL</label>
                                <input {...register("inst_mail")} className="input-bordered" type="email"/></div>
                        </div>

                       <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="gender" className="input-item-label">GENDER</label>
                                <select {...register("gender")} className="input-bordered">
                                   <option value={'M'}>MALE</option>
                                   <option value={'F'}>FEMALE</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="fname" className="input-item-label">FIRST NAME</label>
                                <input {...register("fname", { required: 'Please enter first name !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="mname" className="input-item-label">MIDDLE NAME</label>
                                <input {...register("mname")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="lname" className="input-item-label">LAST NAME</label>
                                <input {...register("lname", { required: 'Please enter Last name !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="dob" className="input-item-label">DATE OF BIRTH</label>
                                <input {...register("dob", { required: 'Please Date of Birth !' })} className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="birth_place" className="input-item-label">PLACE OF BIRTH</label>
                                <input {...register("birth_place")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="phone" className="input-item-label">PHONE NUMBER</label>
                                <input {...register("phone", { required: 'Please enter phone !' })} maxlength="10" className="input-bordered" type="tel"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="email" className="input-item-label">PERSONAL EMAIL</label>
                                <input {...register("email")} className="input-bordered" type="email"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="address" className="input-item-label">PERSONAL ADDRESS</label>
                                <input {...register("address")} className="input-bordered" type="text"/></div>
                        </div>

                       


                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="mstatus" className="input-item-label">MARITAL STATUS</label>
                                <select {...register("mstatus")} className="input-bordered">
                                  <option value={''} disabled selected>--CHOOSE--</option>
                                   <option value={'MARRIED'}>MARRIED</option>
                                   <option value={'SINGLE'}>SINGLE</option>
                                   <option value={'WIDOWED'}>WIDOWED</option>
                                   <option value={'DIVORCED'}>DIVORCED</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="hometown" className="input-item-label">HOMETOWN</label>
                                <input {...register("hometown")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="region_id" className="input-item-label">REGION</label>
                                <select {...register("region_id")} className="input-bordered">
                                  <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.regions.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="country_id" className="input-item-label">COUNTRY</label>
                                <select {...register("country_id")} className="input-bordered">
                                <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.countries.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="emergency_contact" className="input-item-label">EMERGENCY PHONE NUMBER</label>
                                <input {...register("emergency_contact")} maxlength="10" className="input-bordered" type="tel"/></div>
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


export default HRStaff
