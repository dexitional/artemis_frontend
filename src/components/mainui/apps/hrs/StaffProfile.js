import React, { Component, useState,useEffect }  from 'react';
import '../../../../assets/css/ui-auth-elements.css';
import Loader from '../../../../assets/img/loader.gif';
import Logo from '../../../../assets/img/logo.png';
import { useHistory,Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { fetchStudentData, postStudentProfile, sendPhoto } from '../../../../store/utils/ssoApi';
import { setUser, updateAlert, updateUser } from '../../../../store/admission/ssoSlice';
import { useForm } from "react-hook-form"
import { postHRUnitDataHRS, loadHRSHelpers, deleteHRUnitDataHRS, fetchHRUnitDataHRS } from '../../../../store/utils/ssoApi';


import moment from 'moment'
import Resizer from "react-image-file-resizer";
import { convertBase64 } from '../../../../store/utils/admissionUtil';

const StaffProfile = ({view,data,recid}) => {
	
	const dispatch = useDispatch()
	const { sso } = useSelector(state => state)
	const { user } = sso;

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
				//dispatch(updateUser({...userData,photo:resp.data+'&rand='+Math.random()*2000})) 
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

	
	const title = () => {
		switch(view){
		case 'showprofile': return 'PROFILE';
		case 'approles': return 'APPS & ROLES';
		case 'editprofile': return 'EDIT STAFF PROFILE';
		}
	}
	const content = () => {
		switch(view){
			case 'showprofile': return <ProfilePage/>;
			case 'approles': return <RolesPage recid={recid}/>;
			case 'editprofile': return <Form recid={recid}/>;
		} 
	}

	return (
		<>
		<div className="row">
		<div className="main-content col-lg-9">
		   {/* Content */}
		   {content()}
		</div>
		<div className="main-content col-lg-3">
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
					<div className="">
						<img src={user.photo} id="studphoto" style={{ width: '300px', height:'auto'}}/>
					</div>
					<div  className="table-wrap responsive-table">
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<thead >
								<tr role="row" className="data-item data-head"><th colspan="2" className="data-col dt-user sorting_disabled pt-3 center">QUICK LINKS<hr/></th></tr>
							</thead>
							<tbody>
								{/*
								<tr role="row" className="data-item">
									<td className="data-col" colspan="2">
										<Link to="/app/hrs?mod=profile&view=editprofile" className="text-dark"><b>EDIT STAFF PROFILE</b></Link>
									</td>
								</tr>
								*/}

                                { view == 'approles' && <>
								<tr role="row" className="data-item">
									<td className="data-col" colspan="2">
										<Link to="/app/hrs?mod=profile&view=showprofile" className="text-dark"><b>VIEW STAFF PROFILE</b></Link>
									</td>
								</tr>
								
								</>
								}

							    { view == 'showprofile' && <>
								<tr role="row" className="data-item">
									<td className="data-col" colspan="2">
										<Link to="/app/hrs?mod=profile&view=approles" className="text-dark"><b>USER APPS & ROLES</b></Link>
									</td>
								</tr>
								{/*
								<tr role="row" className="data-item">
									<td className="data-col" colspan="2">
										<Link to="/app/hrs?mod=profile&view=myaccount" className="text-dark"><b>ACCOUNT & ACTIVITY</b></Link>
									</td>
								</tr>
								*/}
								</>
								}
								
								
							</tbody>
						</table>
					</div>
					{ /*
					<div className="col-sm-12 pl-0">
						<input type="file" name="photo" id="photo" onChange={onPhotoChange}  style={{display:'none'}}/>
						<button className="btn btn-block alert-dark text-primary" onClick={browsePhoto}><i className="fa fa-user-circle fa-lg"></i>&nbsp;&nbsp;<b>CHANGE PHOTO</b></button>
					</div>
					*/ }
				</div>
			</div>
		</div>

		</div>
    </>
	)
}  
	
	
	
	
// COMPONENT - PROFILE PAGE
const ProfilePage = () => {
	
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

	useEffect(() => {
	   	
	})
	
	return (
	   <div className="content-area card">
		<div className="card-innr">
				<div className="token-statistics card card-token height-auto">
					<div className="card-innr">
						<div className="token-balance">
							<div className="token-balance-text">
								<h6 className="card-sub-title d-none">PERSONAL INFORMATION</h6>
								<span className="lead">PROFILE</span>
								<Link href="#" onClick={(e)=> e.preventDefault()} class="btn btn-sm btn-outline btn-light print-btn"><i class="fa fa-print"></i> <b>PRINT</b></Link>
							</div>
						</div>
					</div>
				</div>
			{/* CONTENT HERE */}
			<div className="content-area card px-2 py-2 pt-4 bg-white">
				<div>
					<div className="card-head">
					<h3 className="card-title text-center text-dark">AFRICAN UNIVERSITY COLLEGE OF COMMUNICATIONS</h3>
					</div>
					<h3 className="card-sub-title text-center">UNIVERSITY STAFF INFORMATION</h3>
					<div className="card-head">
					<h4 className="card-title text-center d-none">FORM A</h4>
					</div>
					<center><img src={Logo} className="app-logo" style={{width:'80px'}} /></center>
					<div className="gaps-1-5x" />
				</div>
				<div className="gaps-1-5x" />
				<h5 className="card-sub-title">PERSONAL INFORMATION</h5>
				<div className="data-details d-md-flex">
					<div className="fake-class"><span className="data-details-title">FIRST NAME</span><span className="data-details-info">{userData.fname && userData.fname.toUpperCase()}</span></div>
					<div className="fake-class"><span className="data-details-title">MIDDLE NAME(S)</span><span className="data-details-info">{userData.mname && userData.mname.toUpperCase()}</span></div>
					<div className="fake-class"><span className="data-details-title">LAST NAME</span><span className="data-details-info">{userData.lname && userData.lname.toUpperCase()}</span></div>
				</div>
				<div className="data-details d-md-flex">
					<div className="fake-class"><span className="data-details-title">AGE</span><span className="data-details-info">{userData && moment().diff(userData.dob,'years')+' YEARS'}</span></div>
					<div className="fake-class"><span className="data-details-title">DATE OF BIRTH</span><span className="data-details-info">{userData && moment(userData.dob).format('LL').toUpperCase()}</span></div>
					<div className="fake-class"><span className="data-details-title">PLACE OF BIRTH</span><span className="data-details-info">{userData.birth_place && userData.birth_place.toUpperCase()}</span></div>
					<div className="fake-class"><span className="data-details-title">HOMETOWN</span><span className="data-details-info">{userData.hometown && userData.hometown.toUpperCase()}</span></div>
				</div>
				<div className="data-details d-md-flex">
					<div className="fake-class"><span className="data-details-title">DISTRICT</span><span className="data-details-info">{userData.district && userData.district.toUpperCase() || 'NOT-SET'}</span></div>
					<div className="fake-class"><span className="data-details-title">REGION</span><span className="data-details-info">{userData.regioname && userData.regioname.toUpperCase() || 'NOT-SET'}</span></div>
					<div className="fake-class"><span className="data-details-title">NATIONALITY</span><span className="data-details-info">{userData.countryname && userData.countryname.toUpperCase() || 'NOT-SET'}</span></div>
					<div className="fake-class"><span className="data-details-title">NATIONAL ID OR TIN NUMBER</span><span className="data-details-info">{userData.paddress && userData.paddress.toUpperCase()}</span></div>
				</div>
				<div className="data-details d-md-flex">
					<div className="fake-class"><span className="data-details-title">PRIMARY PHONE NUMBER</span><span className="data-details-info">{userData.phone}</span></div>
					<div className="fake-class"><span className="data-details-title">PERSONAL EMAIL ADDRESS</span><span className="data-details-info">{userData.email}</span></div>
					<div className="fake-class"><span className="data-details-title">RESIDENTIAL ADDRESS</span><span className="data-details-info">{userData.address}</span></div>
				</div>
				<div className="data-details d-md-flex">
					{/*<div className="fake-class"><span className="data-details-title">POSTAL ADDRESS</span><span className="data-details-info">{userData.phone}</span></div>*/}
					<div className="fake-class"><span className="data-details-title">EMERGENCY CONTACT</span><span className="data-details-info">{userData.emergency_contact || 'NOT-SET'}</span></div>
					{/*<div className="fake-class"><span className="data-details-title">EMERGENCY NUMBER</span><span className="data-details-info">{userData.phone}</span></div>*/}
				</div>
				{/*
				<div className="gaps-3x" />
				<h3 className="card-sub-title">FAMILY INFORMATION</h3>
				<ul className="data-details-list">
					<li>
					<div className="data-details-head">NAME OF SPOUSE</div>
					<div className="data-details-des"><strong>SUSANA AYERTEY</strong><span>MOBILE: 0277675089</span></div>
					</li>
					<li>
					<div className="data-details-head">FATHER'S NAME</div>
					<div className="data-details-des"><strong>JOHN KWEKUCHER ACKAH</strong><span>ADDRESS: CALVARY METHODIST CHURCH</span></div>
					</li>
					<li>
					<div className="data-details-head">MOTHER'S NAME</div>
					<div className="data-details-des"><strong>EMELIA OWOO DUNCAN ACKAH</strong><span>ADDRESS: CALVARY METHODIST CHURCH</span></div>
					</li>
					<li>
					<div className="data-details-head">CHILD #1</div>
					<div className="data-details-des"><strong>MIGUEL KWEKUCHER BLAY ACKAH</strong><span>DATE OF BIRTH: JULY 27, 2018</span></div>
					</li>
					<li>
					<div className="data-details-head">NEXT OF KIN #1</div>
					<div className="data-details-des"><strong>VINCENT KWABENA BLAY ACKAH</strong><span>DATE OF BIRTH: JANUARY 12,2024</span></div>
					</li>
				</ul>
				*/}

				<div className="gaps-3x" />
				<h5 className="card-sub-title">UNIVERSITY INFORMATION</h5>
				<ul className="data-details-list">
					<li>
					<div className="data-details-head">AUCC STAFF NUMBER</div>
					<div className="data-details-des"><strong>{userData.staff_no}</strong></div>
					</li>{/* li */}
					<li>
					<div className="data-details-head">AUCC EMAIL ADDRESS</div>
					<div className="data-details-des"><strong>{userData.inst_mail}</strong></div>
					</li>{/* li */}
					<li>
					<div className="data-details-head">AUCC DESIGNATION</div>
					<div className="data-details-des"><strong>{userData.designation && userData.designation.toUpperCase() || userData.position }</strong></div>
					</li>{/* li */}
					<li>
					<div className="data-details-head">ASSIGNED AUCC UNIT</div>
					<div className="data-details-des"><strong>{userData.unitname && userData.unitname.toUpperCase() || 'NOT-SET'}</strong></div>
					</li>{/* li */}
					{/*<li>
					<div className="data-details-head">UCC EXIT REMARKS</div>
					<div className="data-details-des"><strong>EXITTED THE SCHOOL BY RETIREMENT</strong><span>JANUARY 1, 2012</span></div>
					</li> li */}
				</ul>

				{/* 
				<div className="gaps-3x" />
				<h3 className="card-sub-title">ACADEMIC INFORMATION</h3>
				<ul className="data-details-list">
					<li>
					<div className="data-details-head">O-LEVEL</div>
					<div className="data-details-des"><strong>HIGHER EDUCATION CERTIFICATION</strong><span>GES, 2018-2020</span></div>
					</li>
					<li>
					<div className="data-details-head">DIPLOMA</div>
					<div className="data-details-des"><strong>DIPLOMA IN EDUCATION, SCIENCE EDUCATION</strong><span>ENCHICO, 2018-2020</span></div>
					</li>
					<li>
					<div className="data-details-head">DEGREE</div>
					<div className="data-details-des"><strong>BACHELOR OF SCIENCE IN TELECOMMUNICATIONS ENGINEERIING</strong><span>KNUST, 2008-2012</span></div>
					</li>
					<li>
					<div className="data-details-head">MASTERS</div>
					<div className="data-details-des"><strong>MASTER OF SCIENCE IN INFORMATION COMMUNICATION TECHNOLOGY</strong><span>KNUST, 2018-2020</span></div>
					</li>
				</ul>
				*/}

				{/*
				<div className="gaps-3x" />
				<h3 className="card-sub-title">APPOINTMENT &amp; PROMOTION INFORMATION</h3>
				<ul className="data-details-list">
					<li>
					<div className="data-details-head">APPOINTMENT</div>
					<div className="data-details-des"><strong>SENIOR ICT ASSISTANT</strong><span>JANUARY 1, 2012</span></div>
					</li>
					<li>
					<div className="data-details-head">PROMOTION</div>
					<div className="data-details-des"><strong>PRINCIPAL ICT ASSISTANT</strong><span>FEBRUARY 31,2017</span></div>
					</li>
					<li>
					<div className="data-details-head">UPGRADE</div>
					<div className="data-details-des"><strong>LECTURER</strong><span>MARCH 12, 2020</span></div>
					</li>
				</ul>
				*/}

				{/*
				<div className="gaps-3x" />
				<h3 className="card-sub-title">RENEWAL INFORMATION</h3>
				<ul className="data-details-list">
					<li>
					<div className="data-details-head">RENEWAL #1</div>
					<div className="data-details-des"><strong>ASSISTANT SYSTEMS ANALYST</strong><span>JANUARY 1, 2012</span></div>
					</li>
				</ul>
				<div className="gaps-3x" />
				<h3 className="card-sub-title">POST-RETIREMENT INFORMATION</h3>
				<ul className="data-details-list">
					<li>
					<div className="data-details-head">CONTRACT #1</div>
					<div className="data-details-des"><strong>ASSISTANT SYSTEMS ANALYST</strong><span>JANUARY 1, 2012 - MAY 12, 2020.</span></div>
					</li>
				</ul>
				*/}


				</div>
			</div>
	</div>
	)
}


	
// COMPONENT - PROFILE PAGE
const RolesPage = () => {
	
	const { sso }  = useSelector(state=>state);
	const { user:{roles} } = sso;
	const [ userData, setUserData ] = useState({})
	const dispatch = useDispatch()
    
	
	useEffect(() => {
	   	
	})
	
	return (
		<div className="content-area card">
        <h2 className="sub-head bg-blueblack">
          APPS & ROLES
          {/*<a href="#" className="print-btn"><i className="fa fa-save" /></a>*/}
        </h2>
        <div className="card-innr">
          <div className="card-head">
            <h4 className="card-title">STAFF PRIVILEGES FOR SECURED &amp; ACTIVATED APPS</h4><hr />
          </div>
          
          <div className="content-area px-3 py-3">
           { roles.map((row) => 
            <>
		    <div className="gaps-3x"/>
            <h6 className="card-sub-title">{row.app_name} ({row.app_tag}) APP</h6>
            <div className="gaps-1-5x" />
            <ul className="data-details-list bg-white">
              <li>
                <div className="data-details-head">{row.role_name}</div>
                <div className="data-details-des">
					<strong>{row.role_desc && row.role_desc.toUpperCase()}</strong>
				    {/*<span>LAST ACTIVITY: 2018-02-34 34:34</span>*/}
				</div>
              </li>
            </ul>
			</>	
           )}
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
	if(cm) history.push('/app/hrs?mod=profile&view=showprofile')
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




export default StaffProfile;




/*

<select name="vendor_id" class="input-bordered">
    <option value="1" selected >Calbank</option>
</select>


*/