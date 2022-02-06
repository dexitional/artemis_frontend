import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchStudentDataAIS, postStudentDataAIS, loadAISHelpers, resetAccount, generateMail, stageAccount, fetchStudentTrans, generateIndexNo, } from '../../../../store/utils/ssoApi';
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
const StudentAccounts = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const title = () => {
     switch(view){
       case 'list': return 'STUDENT ACCOUNTS';
       case 'add': return 'ADD STUDENT';
       case 'edit': return 'EDIT STUDENT';
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
                {/*<Link to="/app/ais?mod=students&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD STUDENT</b></Link>*/}
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

  const restoreStudentData = () => {
    sso.databox.students && setStudents([...sso.databox.students]);
  }


  const viewTransDetail = async (refno) => {
      const ts = await fetchStudentTrans(refno)
      console.log(ts)
      //const bl = await fetchBillFMS(0)
      if(ts.success){
        const content = { title:'STATEMENT OF TRANSACTIONS', fees: [...ts.data]}
        let dz = { content, size:'md', show:true, page:'transdetail' }
        dispatch(setModal(dz));
      } setRef(null);
  }

  const genIndexNo = async (refno) => {
      try{
        const resp = await generateIndexNo({refno})
        console.log(resp)
        if(resp.success){
          fetchStudentData()
          dispatch(updateAlert({show:true,message:`INDEX NUMBER & AUCC EMAIL GENERATED !`,type:'success'}))
          alert(`STUDENT INDEX NUMBER : ${resp.data.indexno}${resp.data.email ? '\nAUCC EMAIL : '+resp.data.email:''}`)
        }else{
          dispatch(updateAlert({show:true,message:resp.msg.toUpperCase(),type:'error'}))
        }
      }catch(e){
        console.log(e)
        dispatch(updateAlert({show:true,message:e.toString(),type:'error'}))
      } setRef(null);
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
                    <table className="admin-tnx dataTable no-footer  table-responsive" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col" rowspan="1" colspan="1">INDEX NUMBER</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">FULL NAME</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">PROGRAMME</th>
                                <th className="data-col" rowspan="1" colspan="1">ACCOUNT BALANCE</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                                <th className="data-col" rowspan="1" colspan="1">&nbsp;</th>
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
                            <td className="data-col w-25">
                                <span className="lead token-amount">{row.fname && row.fname.toUpperCase()} {row.mname && row.mname.toUpperCase()} {row.lname && row.lname.toUpperCase()}</span>
                                {row.institute_email ? parse(`<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.institute_email}</small>`) : null }
                                {row.phone ? parse(`<br/><small style="color:#666;font-weight:bolder;word-break:break-word">-- ${row.phone}</small>`) : null }
                            
                            </td>
                            <td className="data-col">
                               <span className="lead amount-pay">{row.program_name && row.program_name.toUpperCase() } {row.major_name ? parse(`<br/><small style="color:#b76117;font-weight:bolder">( ${row.major_name.toUpperCase()} )</small>`) : null }</span>
                               {parse(`<small style="color:#666;font-weight:bolder;word-break:break-word">-- ${(row.complete_status == 0 ? (row.semester ? 'YEAR '+Math.ceil(row.semester/2) : null) :'COMPLETED') || 'NOT UPDATED' }</small>`)}
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{row.transact_account ? (row.transact_account > 0 ? parse(`<span style="color:red;font-weight:bolder;">${row.entry_group != 'GH' ? 'USD':'GHC'} ${row.transact_account}<span/>`) : parse(`<span style="color:green;font-weight:bolder;">${row.entry_group != 'GH' ? 'USD':'GHC'} ${row.transact_account}<span/>`)) :'NOT STAGED' }</span></td>
                            <td className="data-col">
                                <span className="lead tnx-id"> {row.complete_status ? (row.complete_status == 1 ? 'COMPLETED':'ACTIVE'):'NOT SET'}</span>
                            </td>
                            <td className="data-col">
                                <>
                                <Button id={`basic-button${row.refno}`} variant="contained" color={row.complete_status > 0 ? 'success':(row.complete_status == 0 ? 'error':'warning')} aria-controls={`basic-menu${row.refno}`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == row.refno ? 'true' : undefined} onClick={(e) => handleClick(e,row.refno)}><i className="fa fa-bars"></i></Button>
                                  <Menu id={`basic-menu${row.refno}`} anchorEl={anchorEl} open={ref && ref == row.refno} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button${row.refno}`}}>
                                    <MenuItem onClick={() => viewTransDetail(row.refno)}>VIEW STATEMENT</MenuItem>
                                    {!row.indexno || row.indexno == 'UNIQUE' ? <MenuItem onClick={() => genIndexNo(row.refno)}>GENERATE INDEX NUMBER</MenuItem>:''}
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


export default StudentAccounts
