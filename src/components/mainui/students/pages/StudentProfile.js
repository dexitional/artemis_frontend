import React, { Component, useState,useEffect }  from 'react';
import '../../../../assets/css/ui-auth-elements.css';
import Loader from '../../../../assets/img/loader.gif';
import { useHistory,Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { fetchStudentData, postStudentProfile, sendPhoto } from '../../../../store/utils/ssoApi';
import { setUser, updateAlert, updateUser } from '../../../../store/admission/ssoSlice';
import moment from 'moment'
import Resizer from "react-image-file-resizer";
import { convertBase64 } from '../../../../store/utils/admissionUtil';

const StudentProfile = () => {
	const { sso }  = useSelector(state=>state);
    const dispatch = useDispatch()

	const { user } = sso;
    const [ form, setForm ] = useState({})
    const [ userData, setUserData ] = useState({})
    const [ isEdit, setIsEdit ] = useState(false)
	
    
	const submitProfile = async () => {
	   const resp = await postStudentProfile({...form,flag_profile_lock:1})
	   if(resp.success){
		 const esp = await fetchStudentData(userData.refno)
		 if(esp.success) setUserData({...esp.data})
		 dispatch(updateAlert({show:true,message:`PROFILE UPDATED`,type:'success'}))
	   }
	   setIsEdit(false)
	}

    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

	const onPhotoChange = async (e) => {
        const f = e.target.files[0];
        if(f && f.type.match('image.*')){
          const base64 = await convertBase64(f);
          // Resizing & Compression from Backend
          try {
            Resizer.imageFileResizer(
              f,
              192, // max-width
              192, // max-height
              "JPEG", // compress format
              100,  // quality
              0,  // rotation
              async (uri) => {
                // Send To Server
				const resp = await sendPhoto(user.user.refno,uri,'01',true)
				if(resp.success){
				  document.querySelector('#studphoto').setAttribute('src',uri)
				  dispatch(updateUser({...userData,photo:resp.data+'&rand='+Math.random()*2000})) 
				}
				
              },
              "base64",
            );
          } catch (err) {
            console.log(err);
			dispatch(updateAlert({show:true,message:`PHOTO UPDATE FAILED`,type:'error'}))
          }
        }
    }

	const browsePhoto = (e) => {
		const cm = window.confirm('YOU ARE ALLOWED ONLY ONE ATTEMPT TO UPLOAD A PHOTO !\n\n -- UPLOAD NEW PHOTO ?')
		if(cm) document.querySelector('#photo').click();
    }


    useEffect(() => {
      console.log(user)
      setUserData({...user.user})
	  setForm({
		refno: user.user.refno,
		dob: moment(user.user.dob).format('YYYY-MM-DD'),
		gender:user.user.gender, country_id:user.user.country_id,
		phone:user.user.phone, email:user.user.email, address:user.user.address,
		guardian_name: user.user.guardian_name, guardian_phone: user.user.guardian_phone,
		prog_id: user.user.prog_id, major_id: user.user.major_id,
		session: user.user.session, semester: user.user.semester
	  })
	  
    },[])

    useEffect(() => {
       dispatch(updateUser({user:{...userData}})) 
    },[userData])

    useEffect(()=>{
        
    })
	
	return (
		<div className="row">
		  <div className="main-content col-lg-8">
			<div className="content-area card">
				<div className="card-innr">
					<div className="token-statistics card card-token height-auto">
						<div className="card-innr">
							<div className="token-balance">
								<div className="token-balance-text">
									<h6 className="card-sub-title d-none">PERSONAL INFORMATION</h6>
									<span className="lead">STUDENT PROFILE</span>
									{ isEdit ?
                                    <button className="btn btn-xs btn-success right text-white active" onClick={submitProfile}><h3>SAVE</h3></button>:
                                    <button className="btn btn-xs btn-warning right text-white active" onClick={()=> setIsEdit(true)}><h3>CHANGE</h3></button>
									}
								</div>
							</div>
						</div>
					</div>
					<div  className="table-wrap responsive-table">
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<tbody >
								<tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">SURNAME</b></td>
									<td className="data-col left" colspan="2"><h3 className="lead"><small><b>{userData.lname && userData.lname.toUpperCase()}</b></small></h3></td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">OTHER NAMES</b></td>
									<td className="data-col left" colspan="2"><h3 className="lead"><small><b>{userData && (userData.fname && userData.fname.toUpperCase()+' '+(userData.mname && userData.mname.toUpperCase() || ''))}</b></small></h3></td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">DATE OF BIRTH</b></td>
									<td className="data-col left" colspan="2">
                                        { !isEdit ?
                                        <h3 className="lead"><small><b>{userData && moment(userData.dob).format('MMMM DD, YYYY').toUpperCase()}</b></small></h3> :
                                        <input type="date" name="dob" value={form.dob} onChange={onChange}/>
                                        }
                                    </td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">GENDER</b></td>
									<td className="data-col left" colspan="2">
                                        { !isEdit ?
                                        <h3 className="lead"><small><b>{userData && userData.gender === 'M' ? 'MALE':'FEMALE'}</b></small></h3>:
                                        <select name="gender" value={form.gender} onChange={onChange} className="form-control">
                                            <option value="M">MALE</option>
                                            <option value="F">FEMALE</option>
                                        </select>
                                        }
                                    </td>
								</tr>
								
								{/*
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">COUNTRY OF RESIDENCE</b></td>
									<td className="data-col left" colspan="2">
                                        { !isEdit ?
                                        <h3 className="lead"><small><b>GHANA</b></small></h3>:
                                        <select name="country_id" value={form.country_id} onChange={onChange} className="form-control">
                                            <option value="GHA">Dynamic</option>
                                        </select>
                                        }
                                    </td>
								</tr>
								*/}

                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">PHONE NUMBER</b></td>
									<td className="data-col left" colspan="2">
									    { !isEdit ?
										<h3 className="lead"><small><b>{userData && userData.phone}</b></small></h3>:
										<input type="text" name="phone" minLength={9} maxLength={10} value={form.phone} onChange={onChange}/>
										}
								    </td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">PERSONAL EMAIL ADDRESS</b></td>
									<td className="data-col left" colspan="2">
									    { !isEdit ?
										<h3 className="lead"><small><b>{userData.email && userData.email.toUpperCase() || 'NOT SET'}</b></small></h3>:
										<input type="text" name="email" value={form.email} onChange={onChange}/>
										}
									</td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">POSTAL ADDRESS</b></td>
									<td className="data-col left" colspan="2">
								   	    { !isEdit ?
										<h3 className="lead"><small><b>{userData.address && userData.address.toUpperCase() || 'NONE'}</b></small></h3>:
										<input type="text" name="address" value={form.address} onChange={onChange}/>
										}
									</td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">GUARDIAN NAME</b></td>
									<td className="data-col left" colspan="2">
									    { !isEdit ?
										<h3 className="lead"><small><b>{userData.guardian_name && userData.guardian_name.toUpperCase() || 'NONE'}</b></small></h3>:
										<input type="text" name="guardian_name" value={form.guardian_name} onChange={onChange}/>
										}
									</td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">GUARDIAN PHONE</b></td>
									<td className="data-col left" colspan="2">
									    { !isEdit ?
										<h3 className="lead"><small><b>{userData.guardian_phone && userData.guardian_phone || 'NONE'}</b></small></h3>:
										<input type="text" name="guardian_phone" minLength={9} maxLength={10} value={form.guardian_phone} onChange={onChange}/>
										}
									</td>
								</tr>

								{ userData.flag_profile_lock == 0 &&
								<>  </>}
								
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">PROGRAMME OF STUDY</b></td>
									<td className="data-col left" colspan="2">
								    	{ !isEdit ?
										<h3 className="lead"><small><b>{userData.program_name && userData.program_name || 'NONE'}</b></small></h3>:
										<select name="prog_id" value={form.prog_id} onChange={onChange} className="form-control">
                                           <option value="1">BA. COMMUNICATION STUDIES</option>
										   <option value="2">BSC. BUSINESS ADMINISTRATION</option>
										   <option value="3">MA. COMMUNICATION STUDIES</option>
										   <option value="4">MBA. ACCOUNTING AND FINANCE</option>
										   <option value="5">MSC. PROJECT MANAGEMENT</option>
										   <option value="6">DIP. MANAGEMENT STUDIES</option>
										</select>
                                        }
									</td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">SPECIALIZATION/MAJOR</b></td>
									<td className="data-col left" colspan="2">
									    { !isEdit ?
										<h3 className="lead"><small><b>{userData.major_name && userData.major_name || 'NONE'}</b></small></h3> :
										
										['1','2','3'].includes(form.prog_id) ?
										<select name="major_id" value={form.major_id} onChange={onChange} className="form-control">
                                           { form.prog_id == '1' && 
										    <>
												<option value="1">STRATEGIC COMMUNICATION</option>
												<option value="2">JOURNALISM</option>
												<option value="3">VISUAL AND DIGITAL COMMUNICATION</option>
												<option value="4">DEVELOPMENT COMMUNICATION</option>
											</>
										   }
										   { form.prog_id == '2' && 
										    <>
											<option value="5">HUMAN RESOURCE MANAGEMENT</option>
											<option value="6">ACCOUNTING</option>
											<option value="7">MARKETING</option>
											<option value="8">BANKING AND FINANCE</option>
											</>
										   }
										   { form.prog_id == '3' && 
										    <>
											<option value="9">DEVELOPMENT COMMUNICATION</option>
											<option value="10">INTEGRATED MARKETING COMMUNICATION</option>
											<option value="11">JOURNALISM</option>
											</>
										   }
										</select> : 'NONE'
                                        }
									</td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">MODE OF STUDY</b></td>
									<td className="data-col left" colspan="2">
					                    { !isEdit ?
										<h3 className="lead"><small><b>{userData.session && (userData.session === 'E' ? 'EVENING':(userData.session === 'W' ? 'WEEKEND':'MORNING'))}</b></small></h3>:
										<select name="session" value={form.session} onChange={onChange} className="form-control">
                                            <option value="M">MORNING</option>
                                            <option value="E">EVENING</option>
											<option value="W">WEEKEND</option>
                                        </select>
                                        }
									</td>
								</tr>
                                <tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">LEVEL/YEAR</b></td>
									<td className="data-col left" colspan="2">
									    { !isEdit ?
										<h3 className="lead"><small><b>{userData.semester && Math.ceil(userData.semester/2) || 'NOT SET'}</b></small></h3>:
										<select name="semester" value={form.semester} onChange={onChange} className="form-control">
                                            <option disabled selected>-- CHOOSE CURRENT YEAR --</option>
											<option value="0">-- COMPLETED --</option>
											<option value="1">YEAR 1, SEMESTER 1</option>
											<option value="2">YEAR 1, SEMESTER 2</option>
											<option value="3">YEAR 2, SEMESTER 1</option>
											<option value="4">YEAR 2, SEMESTER 2</option>
											<option value="5">YEAR 3, SEMESTER 1</option>
											<option value="6">YEAR 3, SEMESTER 2</option>
											<option value="7">YEAR 4, SEMESTER 1</option>
											<option value="8">YEAR 4, SEMESTER 2</option>
										</select>
                                        }
									</td>
								</tr>
								<tr role="row" className="odd py-1">
									<td className="data-col"><b className="text-primary left">COMPLETE STATUS</b></td>
									<td className="data-col left" colspan="2">
					                    { !isEdit ?
										<h3 className="lead"><small><b>{userData.complete_status == '1' ? 'COMPLETED PROGRAMME':'STILL IN SCHOOL'}</b></small></h3>:
										<select name="complete_status" value={form.complete_status} onChange={onChange} className="form-control">
                                            { form.semester != 0 && <option value="0" selected={form.semester != 0}>STILL IN SCHOOL</option>}
                                            <option value="1">COMPLETED PROGRAMME</option>
										</select>
                                        }
									</td>
								</tr>
                             

                              {/*

								<tr role="row" className="data-item odd">
									<td className="data-col" colspan="2" ><span className="lead user-name">ACADEMIC USER FACILITY FEES</span><b className="user-id text-primary left">-- 01 Jul 2020</b></td>
									<td className="data-col dt-doc-type  center"><h3 className="lead user-name"><small><b>BILL</b></small></h3></td>
									<td className="data-col center"><b className="badge badge-outline badge-danger badge-sm text-danger" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								    <td className="data-col center"><b className="badge badge-outline badge-dark badge-sm text-dark" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								</tr>
                                <tr role="row" className="data-item odd">
									<td className="data-col" colspan="2" ><span className="lead user-name">ONLINE: 20777941-Ebenezer Kwabena Blay ACKAH</span><b className="user-id text-primary left">-- 01 Jul 2020</b></td>
									<td className="data-col dt-doc-type  center"><h3 className="lead user-name"><small><b>PAYMENT</b></small></h3></td>
									<td className="data-col center"><b className="badge badge-outline badge-success badge-sm text-dark" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								    <td className="data-col center"><b className="badge badge-outline badge-dark badge-sm text-dark" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								</tr>
                            */}
								
							</tbody>
						</table>
					</div>
					<h6  className="text-light mb-0 d-none">* Last update on 28 August, 2020.</h6>
				</div>
			</div>
		</div>
		  <div className="main-content col-lg-4">
			<div className="content-area card">
				<div className="card-innr">
					<div className="token-statistics card card-token height-auto d-none">
						<div className="card-innr ">
							<div className="token-balance">
								<div className="token-balance-text">
								    <b className="lead"><small>ACADEMIC INFORMATION</small></b>
								</div>
							</div>
						</div>
					</div>
					<div className="card-head d-none"><h2 className="card-title text-primary"><b>STATEMENT OF RESULTS</b></h2></div>
					<div className="">
						<img src={user.photo} id="studphoto" style={{ width: '300px', height:'auto'}}/>
					</div>
					<div  className="table-wrap responsive-table">
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<thead >
								<tr role="row" className="data-item data-head"><th colspan="2" className="data-col dt-user sorting_disabled pt-3 center">ACADEMIC INFORMATION<hr/></th></tr>
							</thead>
							<tbody >
								<tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">{userData.program_name && userData.program_name.toUpperCase()}</small><small><b className="user-id text-primary left">PROGRAMME OF STUDY</b></small></td></tr>
								<tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">{userData.major_name && userData.major_name.toUpperCase() || 'NONE'}</small><small><b className="user-id text-primary left">SPECIALIZATION / MAJOR</b></small></td></tr>
								<tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">{userData.indexno && userData.indexno.toUpperCase()}</small><small><b className="user-id text-primary left">INDEX NUMBER</b></small></td></tr>
								<tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">{userData.refno}</small><small><b className="user-id text-primary left">STUDENT ID</b></small></td></tr>
                                { userData.complete_status == '0' && <tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">{userData.semester && Math.ceil(userData.semester/2) || 'NOT SET'}</small><small><b className="user-id text-primary left">LEVEL / YEAR</b></small></td></tr>}
								{ userData.complete_status == '1' && <tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">YES</small><small><b className="user-id text-primary left">COMPLETED</b></small></td></tr>}
								<tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">{userData.session && (userData.session === 'E' ? 'EVENING':(userData.session === 'W' ? 'WEEKEND':'MORNING'))}</small><small><b className="user-id text-primary left">STUDY MODE</b></small></td></tr>
							
                            </tbody>
						</table>
					</div>
					{ userData.flag_photo_lock == '0' && 
					<div className="col-sm-12 pl-0">
						<input type="file" name="photo" id="photo" onChange={onPhotoChange}  style={{display:'none'}}/>
						<button className="btn btn-block alert-dark text-primary" onClick={browsePhoto}><i className="fa fa-user-circle fa-lg"></i>&nbsp;&nbsp;<b>CHANGE/ADD NEW PHOTO</b></button>
					</div>
                    }
				</div>
			</div>
		  </div>
        
		</div>
	)
}

export default StudentProfile;
