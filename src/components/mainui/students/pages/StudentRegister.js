import React, { useState,useEffect }  from 'react';
import '../../../../assets/css/ui-auth-elements.css';
import { useHistory,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSemesterReg, fetchSemesterSlip, postSemesterReg } from '../../../../store/utils/ssoApi';
import { setModal, updateAlert } from '../../../../store/admission/ssoSlice';
import moment from 'moment';

const StudentRegister = () => {
	const [ courses, setCourses ] = useState([])
	const [ regcourses, setRegcourses ] = useState({})
	const [ isLoading, setIsLoading ] = useState(false) 
	const [ isRegister, setIsRegister ] = useState(false) 
	const [ allowRegister, setAllowRegister ] = useState(false) 
	const [ regMsg, setRegMsg ] = useState("") 
	const dispatch = useDispatch()
	const { sso }  = useSelector(state=>state);
	const { user } = sso; 

	// Load Registered Data from assessment tbl
	const loadSemesterSlip = async () => {
		setIsLoading(true)
		const res = await fetchSemesterSlip(user.user.session_id,user.user.indexno)
		if(res.success){
		   if(res.data.length > 0){
			  setCourses([...res.data])
			  setIsRegister(true)
		   }else{
			  setCourses([...res.data])
			  setIsRegister(false) 
		   }
           setIsLoading(false)
		}
	}
	
	// Fetch Mounted courses for this semester
	const loadSemesterReg = async () => {
		setIsLoading(true)
		const res = await fetchSemesterReg(user.user.session_id,user.user.refno)
		if(res.success){
		   setRegcourses(res.data)
		   setIsLoading(false)
		}
	}
	

	// Choose Course
	const chooseCourse = (e,course_id,type,lock) => {
	   const newcourses = {...regcourses}
       if(type == 'E'){
		  newcourses.elective = newcourses.elective.map(row => {
			  if(row.course_id == course_id && lock == 0 ) return { ...row, selected: !row.selected }
			  return row
		  })
	   }
	   if(type == 'C'){
		 newcourses.core = newcourses.core.map(row => {
			if(row.course_id == course_id && lock == 0 ) return { ...row, selected: !row.selected }
			return row
		 })
	   }
	   if(type == 'R'){
		 newcourses.trail = newcourses.trail.map(row => {
			if(row.course_id == course_id && lock == 0 ) return { ...row, selected: !row.selected }
			return row
		 })
	   }
	   setRegcourses(newcourses)
    }

	const sendCourses = async () => {
	   var isAllow = true;
	   /*
	   // Check for Exceeded Credit Hours
	   const num = (regcourses.elective && regcourses.elective.filter(row => row.selected || row.lock == 1).reduce((acc,row)=> acc+row.credit,0))+(regcourses.core && regcourses.core.filter(row => row.selected || row.lock == 1).reduce((acc,row)=> acc+row.credit,0))+(regcourses.trail && regcourses.trail.filter(row => row.selected || row.lock == 1).reduce((acc,row)=> acc+row.credit,0))
	   const selElective = (regcourses.elective && regcourses.elective.filter(row => row.selected || row.lock == 1)).length
	   if(num < regcourses.meta.min_credit || num > regcourses.meta.max_credit){
		  dispatch(updateAlert({show:true,message:`MAXIMUM CREDIT HOURS EXCEEDED!`,type:'error'}))
		  isAllow = false
	   } 
	   // Check whether Total Number of Electives are chosen
	   if(selElective < regcourses.meta.max_elective || selElective > regcourses.meta.max_elective){
		  dispatch(updateAlert({show:true,message:`CHOOSE ${regcourses.meta.max_elective} ELECTIVES!`,type:'error'}))
		  isAllow = false
	   } 
       */

	   if((regcourses.elective && regcourses.elective.length <= 0) && (regcourses.core && regcourses.core.length <= 0)) isAllow = false; // If No courses are not selected!

       if(isAllow){
		  // Submit Form Data
		  const send = window.confirm('Register selected courses for semester ?')
		  if(send){
			 const res = await postSemesterReg({...regcourses,indexno:user.user.indexno,semester:user.user.semester,session_id:user.user.session_id,scheme_id:user.user.scheme_id})
			 if(res.success){
			   dispatch(updateAlert({show:true,message:`COURSES REGISTERED SUCCESSFULLY!`,type:'success'}))
			   loadSemesterSlip()
			 }
		  }
	   }
    }

    const changeReg = () => {
	   setIsRegister(false)
	}

	const printSlip = () => {
	    let dt = { content: null, size:'md', show:true, page:'slip' }
        dispatch(setModal(dt));
	}

	const updateRegStatus = () => {
		var allowReg = true, msg = "";
		// If Student is Owing Fees, Lock Registration
		if(user.user.flag_fees_allow == 0){
			allowReg = false
			msg = "You Owe Fees, Please settle debt to allow registration!"
		}
		// If Student is Pardoned by Finance, Allow Registration
		if(user.user.cal_register_hold == 1){
			allowReg = false
			msg = "Registration is halted temporarily!"
		}
		// If Registration Period is Inactive
		if(!moment().isBetween(moment(user.user.cal_register_start),moment(user.user.cal_register_end).add(1,'days'))){
			allowReg = false
			msg = "Registration period is over or inactive!"
		}
		// If Registration Period is Active and Halt status is ON
		if(moment().isBetween(moment(user.user.cal_register_start),moment(user.user.cal_register_end).add(1,'days')) && user.user.cal_register_hold == 1){
			allowReg = false
			msg = "Registration is closed temporarily!"
		}
        // If Semester Level or Program ID or Major  ID is not Updated, Block Registration
        if(!user.user.semester || !user.user.prog_id){
			allowReg = false
			msg = "Goto `Profile` to update Year/Level,Program of Study with/without Major Before permitted to Register or Contact AUCC IT Helpdesk for Assistance!"
		}

		setAllowRegister(allowReg)
		setRegMsg(msg)
		if(msg){
		   dispatch(updateAlert({show:true,message:msg.toUpperCase(),type:'error'}))
		}
    }

    useEffect(() => {
		console.log(user)
	  updateRegStatus()
	  loadSemesterSlip()
	  loadSemesterReg()
	},[])

	
	

	
	return (
		<div className="row">
		<div className="main-content col-lg-8">
			<div className="content-area card">
				{ allowRegister ? 
				<div className="card-innr">
					<div className="card-head"><h2 className="card-title text-primary"><b>{ isRegister ? `COMPLETED REGISTRATION SLIP`:`PLEASE SELECT SEMESTER COURSES FOR REGISTRATION !`}</b></h2></div>
					
					{/* Registered Courses */}
                    { isRegister ?
					<div  className="table-wrap">
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<thead >
								<tr role="row" className="data-item data-head">
									<th colspan="2" className="data-col dt-user sorting_disabled pt-3">COURSE TITLE</th>
									<th className="data-col dt-doc-type sorting_disabled center">COURSE CODE</th>
									<th className="data-col dt-status sorting_disabled center">CREDIT<span class="d-xs-none"> HOURS</span></th>
								</tr>
							</thead>
							<tbody >
							    { courses && courses.length > 0 ?
							    courses.map((row) =>
								<tr role="row" className="data-item odd">
									<td className="data-col" colspan="2"><span className="lead user-name">{row.course_name && row.course_name.toUpperCase()}</span></td>
									<td className="data-col dt-doc-type center"><b className="lead user-name text-primary">{row.course_code && row.course_code.toUpperCase()}</b></td>
									<td className="data-col center"><b className="badge badge-outline badge-dark badge-sm text-dark" style={{fontSize:'18px'}}>{row.credit}</b></td>
								</tr>
							    ) : null }
							</tbody>
						</table>
					</div> :


                    
                    <div className="table-wrap">{/* Course Registration */}
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<thead>
								<tr role="row" className="data-item data-head">
								    <th className="data-col dt-doc-type sorting_disabled">&nbsp;</th>
									<th colspan="2" className="data-col dt-user sorting_disabled pt-3">COURSE TITLE</th>
									<th className="data-col dt-doc-type sorting_disabled center">COURSE CODE</th>
									<th className="data-col dt-status sorting_disabled center">CREDITS</th>
								</tr>
							</thead>
							<tbody >
							  { regcourses.core && regcourses.core.length > 0 ?
							  <>
							        <tr><td colspan={5}><h4 className="alert alert-warning text-primary">COMPULSORY COURSES FOR THIS SEMESTER REGISTRATION</h4></td></tr>
									{ regcourses.core.map((row) =>
									<tr role="row" className="data-item odd" style={{cursor:`${row.lock == 1 ? 'cursor':'pointer'}`,background:`${row.selected || row.lock == 1  ? '#e9f3ed':'none'}`}} onClick={(e) => chooseCourse(e,row.course_id,'C',row.lock)}>
										<td className="data-col center"><span className={`text-white ${row.selected || row.lock == 1  ? 'btn-success':'btn-dark'}`} style={{width:'50px',height:'45px',padding:'3px 5px', borderRadius:'50%'}}><i className={`fa ${row.selected || row.lock == 1 ? 'fa-check':'fa-minus'}`}></i></span> </td>
										<td className="data-col" colspan="2"><span className="lead user-name">{row.course_name && row.course_name.toUpperCase()}</span></td>
										<td className="data-col dt-doc-type center"><b className="lead user-name text-primary">{row.course_code }</b></td>
										<td className="data-col center"><b className="badge badge-outline badge-dark badge-sm text-dark" style={{fontSize:'18px'}}>{row.credit}</b></td>
									</tr>
									)}
							  </> : null }
							 
                              { regcourses.elective && regcourses.elective.length > 0 ?
							   <>
									<tr><td colspan={5}><h4 className="alert alert-warning text-primary">ELECTIVE COURSES FOR THIS SEMESTER REGISTRATION {regcourses.meta && regcourses.meta.elective_remark/* && regcourses.meta.elective_remark.toUpperCase()*/} </h4></td></tr>
									{ regcourses.elective.map((row) =>
									<tr role="row" className="data-item odd" style={{cursor:`${row.lock == 1 ? 'cursor':'pointer'}`,background:`${row.selected || row.lock == 1  ? '#e9f3ed':'none'}`}} onClick={(e) => chooseCourse(e,row.course_id,'E',row.lock)}>
										<td className="data-col center"><span className={`text-white ${row.selected || row.lock == 1  ? 'btn-success':'btn-dark'}`} style={{width:'50px',height:'45px',padding:'3px 5px', borderRadius:'50%'}}><i className={`fa ${row.selected || row.lock == 1 ? 'fa-check':'fa-minus'}`}></i></span> </td>
										<td className="data-col" colspan="2"><span className="lead user-name">{row.course_name && row.course_name.toUpperCase()}</span></td>
										<td className="data-col dt-doc-type center"><b className="lead user-name text-primary">{row.course_code}</b></td>
										<td className="data-col center"><b className="badge badge-outline badge-dark badge-sm text-dark" style={{fontSize:'18px'}}>{row.credit}</b></td>
									</tr>
									)}
							  </> : null }

							  { false ?
							   <>
									<tr><td colspan={5}><h4 className="alert alert-warning text-primary">TRAILED COURSES FOR THIS SEMESTER REGISTRATION </h4></td></tr>
									{ regcourses.trail.map((row) =>
									<tr role="row" className="data-item odd" style={{cursor:`${row.lock == 1 ? 'cursor':'pointer'}`,background:`${row.selected || row.lock == 1  ? '#e9f3ed':'none'}`}} onClick={(e) => chooseCourse(e,row.course_id,'R',row.lock)}>
										<td className="data-col center"><span className={`text-white ${row.selected || row.lock == 1  ? 'btn-success':'btn-dark'}`} style={{width:'50px',height:'45px',padding:'3px 5px', borderRadius:'50%'}}><i className={`fa ${row.selected || row.lock == 1 ? 'fa-check':'fa-minus'}`}></i></span> </td>
										<td className="data-col" colspan="2"><span className="lead user-name">{row.course_name && row.course_name.toUpperCase()}</span></td>
										<td className="data-col dt-doc-type center"><b className="lead user-name text-primary">{row.course_code}</b></td>
										<td className="data-col center"><b className="badge badge-outline badge-dark badge-sm text-dark" style={{fontSize:'18px'}}>{row.credit}</b></td>
									</tr>
									)}
							  </> : null }

							 
							  { (((regcourses.elective && regcourses.elective.filter(row => row.selected || row.lock == 1).length)+(regcourses.core && regcourses.core.filter(row => row.selected || row.lock == 1).length)+(regcourses.trail && regcourses.trail.filter(row => row.selected || row.lock == 1).length)) > 0) && <tr><td colspan={5}><button className="btn btn-block btn-xl btn-primary text-white" onClick={sendCourses}><h3><i className="fa fa-lg fa-save"></i>&nbsp;&nbsp;SAVE REGISTRATION</h3></button></td></tr> }
							</tbody>
						</table>
					</div>
                   }
				</div>

				:
                
				<div className="card-innr">
					<div className="card-head"><h3 className="card-title text-primary"><b>{ regMsg &&  regMsg.toUpperCase() }</b></h3></div>
				</div>
				}

			</div>
		</div>

		<div className="aside sidebar-right col-lg-4 d-shadow">
			<div className="token-statistics card card-token height-auto">
			    <div className="card-innr">
					<div className="token-balance">
						<div className="token-balance-text">
							<h6 className="card-sub-title">ACADEMIC SESSION</h6>
							<span className="lead">{`${sso.user.user.session_year} SEMESTER ${sso.user.user.session_semester}`}</span>
						</div>
					</div>

					{ allowRegister ? 
					<>
					<div  className="token-balance token-balance-s2">
						<h6  className="card-sub-title">{isRegister ? `REGISTERED`:`SELECTED`} SEMESTER COURSES</h6>
						<ul  className="token-balance-list">
							<li  className="token-balance-sub mr-3"><span className="lead">{ isRegister ? (courses.length):((regcourses.elective && regcourses.elective.filter(row => row.selected || row.lock == 1).length)+(regcourses.core && regcourses.core.filter(row => row.selected || row.lock == 1).length)+(regcourses.trail && regcourses.trail.filter(row => row.selected || row.lock == 1).length))}</span></li>
						</ul>
					</div>
					<div  className="token-balance token-balance-s2">
						<h6  className="card-sub-title">TOTAL CREDIT HOURS</h6>
						<ul  className="token-balance-list">
						<li  className="token-balance-sub mr-3"><span className="lead">{ isRegister ? (courses.reduce((acc,row) => acc+row.credit,0)) : ((regcourses.elective && regcourses.elective.filter(row => row.selected || row.lock == 1).reduce((acc,row)=> acc+row.credit,0))+(regcourses.elective && regcourses.core.filter(row => row.selected || row.lock == 1).reduce((acc,row)=> acc+row.credit,0))+(regcourses.elective && regcourses.trail.filter(row => row.selected || row.lock == 1).reduce((acc,row)=> acc+row.credit,0)))}</span></li>
						</ul>
					</div>
					</> : null }
				</div>
				{ allowRegister && isRegister ? 
				 <>
				   <button className="btn btn-dark text-warning" onClick={printSlip}><i className="fa fa-lg fa-print"></i>&nbsp;&nbsp;<b>PRINT REGISTRATION SLIP</b></button>
				   { moment().isBetween(moment(user.user.cal_register_start),moment(user.user.cal_register_end).add(1,'days')) ? 
				   <button className="btn btn-default text-dark" onClick={changeReg}><i className="fa fa-lg fa-edit"></i>&nbsp;&nbsp;<b>RESET COURSE REGISTRATION</b></button>
				   : null }
				 </> : null
				}	
			</div>
			
		</div>
	</div>
	)
} 

export default StudentRegister;
