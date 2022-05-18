import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchStudentDataAIS, postStudentDataAIS, loadAISHelpers, resetAccount, generateMail, stageAccount, postStudentReportAIS, switchAccount, } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentPage, setDatabox, setIsLoggedIn, setModal, setUser, setVouchers, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import Pager from '../../Pager';
//import { Button, Menu, MenuItem } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import parse from 'html-react-parser'
import moment from 'moment';
import { jsonToExcel } from '../../../../store/utils/admissionUtil';

// COMPONENT -VOUCHERS
const Students = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'STUDENTS';
       case 'add': return 'ADD STUDENT';
       case 'edit': return 'EDIT STUDENT';
       case 'report': return 'STUDENT REPORT BUILDER';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'add': return <Form recid={recid}/>;
        case 'edit': return <Form recid={recid}/>;
        case 'report': return <Report recid={recid}/>;
     } 
   }
  
  

   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Link to="/app/ais?mod=students&view=report" className="badge badge-light-alt badge-warning badge-sm btn-icon text-dark"><em className="fa fa-lg fa-chart-bar"></em>&nbsp;<b>REPORT</b></Link>
                <Link to="/app/ais?mod=students&view=add" className="badge btn-danger badge-sm text-white"><em className="fa fa-sm fa-user-plus"></em>&nbsp;<b>ADD STUDENT</b></Link>
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
   const [ students, setStudents ] = useState([])
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
      const url = `/app/ais?mod=students&view=edit&recid=${id}`;
      history.push(url);
   }

   const viewProfile = async (id) => {
      const rt = sso.databox.students.find( r => r.id == id )
      if(rt){
        let dt = { content:rt, size:'md', show:true, page:'studprofile' }
        dispatch(setModal(dt));
        // Account Reset Successfully!
      }else{ dispatch(updateAlert({ show:true,message:rt.msg.toUpperCase(),type:'error' })) }
      setRef(null);

     // setActivity({...activity,[`slip${i}`]:true})
     
     // setActivity({...activity,[`slip${i}`]:false})
   }

   const stageAccess = async (refno) => {
      const rt = await stageAccount(refno)
      if(rt.success){
        dispatch(updateAlert({show:true,message:`User access created !`,type:'success'}))
        fetchStudentData()
        // Account Reset Successfully!
      }else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
      setRef(null);
   }

   const genMail = async (refno) => {
      const rt = await generateMail(refno)
      console.log(rt)
      if(rt.success){
        dispatch(updateAlert({show:true,message:`Account email generated !`,type:'success'}))
        alert(`${rt.data}`)
        // Account Reset Successfully!
      }else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
      setRef(null);
   }



  const resetAccess = async (refno) => {
    const rt = await resetAccount(refno)
    console.log(rt)
    if(rt.success){
       alert(`${rt.data}`)
       dispatch(updateAlert({show:true,message:`Account has been reset !`,type:'success'}))
      // Account Reset Successfully!
    }else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
    setRef(null);
  }

  const switchAccess = async (tag) => {
    const rt = await switchAccount(tag)
    if(rt.success){
       //dispatch(setUser(null))
       dispatch(updateAlert({show:true,message:`ACCESS GRANTED !`,type:'success'}))
       setTimeout(()=> {
            var rec = rt.data;
            rec.user.access = sso.user && sso.user.user.staff_no;
            // Set User Data
            dispatch(setUser(rec));
            // Goto Dashboard
            dispatch(setIsLoggedIn(true));
            // Reset Authentication Flag
            if(parseInt(rec.user.user_group) == 1){
              history.push('/student');  // Student Portal
            }else{
              history.push('/dash');  // Staff, NSS, Alumni, Others Portals
            }
       }, 2000)
      // Account Reset Successfully!
    }else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
    setRef(null);
  }

   
  const restoreStudentData = () => {
    sso.databox.students && setStudents([...sso.databox.students]);
  }


   const fetchStudentData = async () => {
      var query = ``;
      if(page >= 1) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      const res = await fetchStudentDataAIS(query);
      if(res.success){
          setIsLoading(false)
          setStudents([...res.data.data]);// Page Data
          setCount(res.data.totalPages)// Total Pages
      }
   }
   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     setPage(1)
     if(e.target.value == '') fetchStudentData()
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
    fetchStudentData()
  }

   useEffect(() => {
     restoreStudentData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({students}));
   },[students])

   useEffect(() => {
     fetchStudentData()
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
                    <table className="admin-tnx dataTable no-footer table-responsive" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col" rowspan="1" colspan="1">INDEX NUMBER</th>
                                <th className="data-col" rowspan="1" colspan="1">CONTACT</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">FULL NAME</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">PROGRAMME</th>
                                <th className="data-col" rowspan="1" colspan="1">LEVEL</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { students.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                                   <span className="lead tnx-id">
                                     <img src={`https://portal.aucc.edu.gh/api/photos/?tag=${row.refno}`} style={{width:'30px',height:'35px',marginRight:'5px',verticalAlign:'middle'}}/>{row.indexno}
                                     {row.refno ? parse(`<br/><small style="color:#b76117;font-weight:bolder;padding-left:35px">-- ${row.refno && row.refno.toString().toUpperCase()} </small>`) : null }
                                   </span>
                            </td>
                            <td className="data-col">
                                <span className="lead tnx-id"> {row.phone}</span>
                            </td>
                            <td className="data-col w-25">
                                <span className="lead token-amount">{row.fname && row.fname.toUpperCase()} {row.mname && row.mname.toUpperCase()} {row.lname && row.lname.toUpperCase()}</span>
                                {row.institute_email ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.institute_email}</small>`) : null }
                            
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{row.program_name && row.program_name.toUpperCase() } {row.major_name ? parse(`<br/><small style="color:#b76117;font-weight:bolder">( ${row.major_name.toUpperCase()} )</small>`) : null }</span></td>
                            <td className="data-col"><span className="lead amount-pay">{(row.complete_status == 0 ? (row.semester ? Math.ceil(row.semester/2)*100 : null) :'COMPLETED') || 'NOT UPDATED' }</span></td>
                            <td className="data-col">
                                <>
                                <Button id={`basic-button${row.refno}`} variant="contained" color={row.complete_status > 0 ? 'success':(row.complete_status == 0 ? 'error':'warning')} aria-controls={`basic-menu${row.refno}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.refno ? 'true' : undefined} onClick={(e) => handleClick(e,row.refno)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.refno}`} anchorEl={anchorEl} open={ref && ref == row.refno} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.refno}`}}>
                                    { row.uid && <MenuItem onClick={() => switchAccess(row.refno)}>GOTO PORTAL</MenuItem>}
                                    <MenuItem onClick={() => viewProfile(row.id)}>VIEW PROFILE</MenuItem>
                                    <MenuItem onClick={() => editProfile(row.id)}>EDIT PROFILE</MenuItem>
                                    <MenuItem onClick={() => resetAccess(row.refno)}>RESET PASSWORD</MenuItem>
                                    { !row.institute_email && <MenuItem onClick={() => genMail(row.refno)}>GENERATE EMAIL</MenuItem>}
                                    { !row.uid && <MenuItem onClick={() => stageAccess(row.refno)}>STAGE ACCESS</MenuItem> }
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
    const [ helper,setHelper ] = useState({ programs:[],majors:[]});
    const history = useHistory();
    const dispatch = useDispatch();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    const onSubmit = async data => {
      data.id = parseInt(recid) || 0;
      const res = await postStudentDataAIS(data);
      if(res.success){
         // Do something if passed
         dispatch(updateAlert({show:true,message:`PROFILE SAVED !`,type:'success'}))
         setTimeout(() => {
            history.push('/app/ais?mod=students&view=list')
         },2000)

      } else{
         // Show error messages
         dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.databox.students.find( r => r.id == recid )
        console.log(dt)
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'dob') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              if(d == 'doa') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              if(d == 'doc') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
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
       if(cm) history.push('/app/ais?mod=students&view=list')
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
                                <label htmlFor="prog_id" className="input-item-label">PROGRAMME OF STUDY</label>
                                <select {...register("prog_id")} className="input-bordered">
                                  <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.programs.map( row => 
                                    <option value={row.id}>{row.short && row.short.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="major_id" className="input-item-label">MAJOR & SPECIALIZATION</label>
                                <select {...register("major_id")} className="input-bordered">
                                <option value="" disabled selected>--CHOOSE--</option>
                                  {helper && helper.majors.map( row => 
                                    <option value={row.id}>{row.title && row.title.toUpperCase()}</option>
                                  )}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="refno" className="input-item-label">STUDENT ID</label>
                                <input  {...register("refno", { required: 'Please enter Student ID !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="indexno" className="input-item-label">INDEX NUMBER</label>
                                <input  {...register("indexno", { required: 'Please enter Index Number !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="semester" className="input-item-label">SEMESTER LEVEL</label>
                                <input {...register("semester", { required: 'Please enter semester !' })} className="input-bordered" type="number"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="institute_email" className="input-item-label">INSTITUTIONAL EMAIL</label>
                                <input {...register("institute_email")} className="input-bordered" type="email"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="session" className="input-item-label">STUDY MODE </label>
                                <select {...register("session")} className="input-bordered">
                                   <option value={'M'}>MORNING</option>
                                   <option value={'A'}>AFTERNOON</option>
                                   <option value={'E'}>EVENING</option>
                                   <option value={'W'}>WEEKEND</option>
                                </select>
                            </div>
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
                                <input {...register("dob", { required: 'Please enter date of birth !' })} className="input-bordered" type="date"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="phone" className="input-item-label">PHONE NUMBER</label>
                                <input {...register("phone", { required: 'Please enter phone !' })} className="input-bordered" type="tel"/></div>
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
                                <label htmlFor="guardian_name" className="input-item-label">GUARDIAN NAME</label>
                                <input {...register("guardian_name")} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="guardian_phone" className="input-item-label">GUARDIAN PHONE</label>
                                <input {...register("guardian_phone")} className="input-bordered" type="tel"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="national_type" className="input-item-label">NATIONAL ID TYPE</label>
                                <select {...register("national_type")} className="input-bordered">
                                   <option value={'PASSPORT'}>NATIONAL PASSPORT</option>
                                   <option value={'DRIVERS'}>DRIVERS LICENCE</option>
                                   <option value={'VOTERS'}>VOTERS ID CARD</option>
                                   <option value={'NIA'}>GHANA NIA CARD</option>
                                   <option value={'SSNIT'}>SSNIT ID CARD</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="national_id" className="input-item-label">NATIONAL ID NUMBER</label>
                                <input {...register("national_id")} className="input-bordered" type="text"/></div>
                        </div>

                       
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="entry_group" className="input-item-label">STUDENT CATEGORY</label>
                                <select {...register("entry_group")} className="input-bordered">
                                   <option value={'GH'}>GHANAIAN STUDENT</option>
                                   <option value={'INT'}>INTERNATIONAL STUDENT</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="complete_status" className="input-item-label">COMPETED STATUS</label>
                                <select {...register("complete_status")} className="input-bordered">
                                   <option value={'0'}>STILL ACTIVE</option>
                                   <option value={'1'}>COMPLETED</option>
                                </select>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="defer_status" className="input-item-label">DEFERRED STATUS</label>
                                <select {...register("defer_status")} className="input-bordered">
                                   <option value={'0'}>NOT DEFERRED</option>
                                   <option value={'1'}>DEFFERRED</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="flag_profile_lock" className="input-item-label">PROFILE UPDATABLE?</label>
                                <select {...register("flag_profile_lock")} className="input-bordered">
                                   <option value={'0'}>NO</option>
                                   <option value={'1'}>YES</option>
                                </select>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="flag_photo_lock" className="input-item-label">PHOTO UPDATABLE?</label>
                                <select {...register("flag_photo_lock")} className="input-bordered">
                                   <option value={'0'}>NO</option>
                                   <option value={'1'}>YES</option>
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


// COMPONENT - REPORT
const Report = ({recid}) => {
  const [ loading,setLoading ] = useState(false);
  const [ helper,setHelper ] = useState({ programs:[],majors:[]});
  const history = useHistory();
  const dispatch = useDispatch();
  const { sso } = useSelector(state => state)
  const { register, handleSubmit, setValue, getValues, formState : { errors } } = useForm();
  
  const onSubmit = async sdata => {
    const res = await postStudentReportAIS(sdata);
    const { type,prog_id,year_group,major_id,gender } = sdata
    console.log(sdata)
    console.log(res)
    if(res.success){
       // Do something if passed
       const mdata = res.data;
       if(type == 1){
          var fileName = '',data = [];
          if(mdata && mdata.length > 0){
            for(var row of mdata){
              const ds = { 'STUDENT ID':row.refno,'INDEX_NUMBER':row.indexno,'STUDENT_NAME':row.name && row.name.toUpperCase(),'YEAR':Math.ceil(row.semester/2),'GENDER':(row.gender == 'M' ? 'MALE':(row.gender == 'F' ? 'FEMALE':'')),'PHONE':row.phone,'DATE OF BIRTH':moment(row.dob).format('MMM DD,YYYY'),'PROGRAM':row.program_name,'MAJOR':row.major_name,'STUDY MODE':row.session,'INSTITUTIONAL EMAIL':row.institute_email,'DATE OF ADMISSION': moment(row.doa).format('MM/YYYY') }
              data.push(ds)
            }
            if(prog_id) fileName += `${row.program_name}`
            if(!prog_id) fileName += `ALL_STUDENT`
            if(major_id) fileName += `_${row.major_name}`
            if(year_group) fileName += `_YEAR_${Math.ceil(row.semester/2)}`
            if(gender) fileName += `_${(row.gender == 'M' ? 'MALE':(row.gender == 'F' ? 'FEMALE':''))}`
            return jsonToExcel(data,fileName)
          }else{ 
            dispatch(updateAlert({ show:true, message:`NO DATA !`, type:'error' }))
          }
       
        }else{

       }
       

    } else{
       // Show error messages
       dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
       alert("ACTION FAILED!")
    }
  }

  const onChange = async data => {
    if(data){
      const dk = Object.keys(data);
      dk.forEach( d => {
          return setValue(d,data[d])
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
     if(cm) history.push('/app/ais?mod=students&view=list')
  }

  useEffect(()=>{
    helperData();
  },[])


  return (
  <div className="card-innr">
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleSubmit(onChange)}>
                  <div className="row">
                      { (errors.prog_id)  &&
                      <div className="col-md-12">
                          <div className="alert alert-danger text-danger font-weight-bolder">
                             { errors.quantity && <small><b>**  {errors.quantity.message.toUpperCase()}<br/></b></small>}
                          </div>
                      </div>
                      }
                      
                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="prog_id" className="input-item-label">PROGRAMME OF STUDY</label>
                              <select {...register("prog_id")} className="input-bordered">
                                <option value="" disabled selected>--CHOOSE--</option>
                                {helper && helper.programs.map( row => 
                                  <option value={row.id}>{row.short && row.short.toUpperCase()}</option>
                                )}
                              </select>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="major_id" className="input-item-label">MAJOR & SPECIALIZATION</label>
                              <select {...register("major_id")} className="input-bordered">
                              <option value="" disabled selected>ALL</option>
                                { helper && helper.majors.map( row => 
                                  getValues('prog_id') == row.prog_id ? <option value={row.id} data-prog={row.prog_id}>{row.title && row.title.toUpperCase()}</option> : null 
                                )}
                              </select>
                          </div>
                      </div>

                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="year_group" className="input-item-label">YEAR GROUP</label>
                              <select {...register("year_group")} className="input-bordered">
                                 <option value="" disabled selected>ALL</option>
                                 { [1,2,3,4,5,6].includes(parseInt(getValues('prog_id'))) ? <option value={1}>YEAR 1</option> : null }
                                 { [1,2,3,4,5,6].includes(parseInt(getValues('prog_id'))) ? <option value={2}>YEAR 2</option> : null }
                                 { [1,2].includes(parseInt(getValues('prog_id'))) ? <option value={3}>YEAR 3</option> : null }
                                 { [1,2].includes(parseInt(getValues('prog_id'))) ? <option value={4}>YEAR 4</option> : null }
                              </select>
                          </div>
                      </div>
                      
                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="session" className="input-item-label">STUDY MODE </label>
                              <select {...register("session")} className="input-bordered">
                                 <option value="" disabled selected>ALL</option>
                                 <option value={'M'}>MORNING</option>
                                 <option value={'E'}>EVENING</option>
                                 <option value={'W'}>WEEKEND</option>
                              </select>
                          </div>
                      </div>

                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="gender" className="input-item-label">GENDER</label>
                              <select {...register("gender")} className="input-bordered">
                                 <option value="" disabled selected>ALL</option>
                                 <option value={'M'}>MALE</option>
                                 <option value={'F'}>FEMALE</option>
                              </select>
                          </div>
                      </div>

                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="entry_group" className="input-item-label">STUDENT CATEGORY</label>
                              <select {...register("entry_group")} className="input-bordered">
                                 <option value="" disabled selected>ALL</option>
                                 <option value={'GH'}>GHANAIAN STUDENT</option>
                                 <option value={'INT'}>INTERNATIONAL STUDENT</option>
                              </select>
                          </div>
                      </div>


                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="defer_status" className="input-item-label">DEFERRED STATUS</label>
                              <select {...register("defer_status")} className="input-bordered">
                                 <option value={'0'} selected >NOT DEFERRED</option>
                                 <option value={'1'}>DEFFERRED</option>
                              </select>
                          </div>
                      </div>

                      <div className="col-md-6">
                          <div className="input-item input-with-label">
                              <label htmlFor="type" className="input-item-label">REPORT TYPE</label>
                              <select {...register("type")} className="input-bordered">
                                 {/*<option value={0} selected>PRINT & PDF</option>*/}
                                 <option value={1} selected>EXCEL EXPORT</option>
                              </select>
                          </div>
                      </div>

                     

                  </div>

                  <div className="gaps-1x"></div>

                  <div className="d-sm-flex justify-content-between align-items-center">
                      <span>
                      <button className="btn btn-dark" type="submit">
                          <i className="fa fa-chart-bar "></i>&nbsp;&nbsp;<b>GENERATE REPORT</b>
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


export default Students
