import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import './SSOReset.css';
import NationalIcon from '../../assets/img/icon-national-id.png'
import Adinkra from '../../assets/img/adinkra-bullet.png'
import Logo from '../../assets/img/logo.png'
import SSOResetForm from './SSOResetForm';
import SSOResetToken from './SSOResetToken';
import { Link } from 'react-router-dom';
import SSOResetEmail from './SSOResetEmail';

const SSOApp = () => {
      return (
		<div>
		<div className="topbar-wrap" style={{paddingTop: '71px'}}>
		<div className="topbar is-sticky has-fixed">
		   <div className="container">
			  <div className="d-flex justify-content-between align-items-center">
				 <ul className="topbar-nav d-lg-none">
					<li className="topbar-nav-item relative">
					   <a className="toggle-nav" href="#">
						  <div className="toggle-icon"><span className="toggle-line" /><span className="toggle-line" /><span className="toggle-line" /><span className="toggle-line" /></div>
					   </a>
					</li>
					{/* .topbar-nav-item */}
				 </ul>
				 {/* .topbar-nav */}<a className="topbar-logo" href="./"><img src="assets/images/logo_portal.png" srcSet="assets/images/logo_portal.png" alt="logo" /></a>
				 <ul className="topbar-nav">
					<li className="topbar-nav-item relative">
					   <span className="user-welcome d-none d-lg-inline-block">Welcome! Ebenezer Kwabena Blay Ackah</span><a className="toggle-tigger user-thumb" href="#"><em className="ti ti-user" /></a>
					   <div className="toggle-class dropdown-content dropdown-content-right dropdown-arrow-right user-dropdown">
						  <div className="user-status d-none">
							 <h6 className="user-status-title">PROGRAMME</h6>
							 <div className="user-status-balance">BSc. Telecommunications Engineering <small>TWZ</small></div>
						  </div>
						  <ul className="user-links">
							 <li><a href="profile.html"><i className="ti ti-id-badge" />My Profile</a></li>
							 <li><a href="sign-in.html"><i className="ti ti-power-off" />Logout</a></li>
						  </ul>
					   </div>
					</li>
					{/* .topbar-nav-item */}
				 </ul>
				 {/* .topbar-nav */}
			  </div>
		   </div>
		   {/* .container */}
		</div>
		{/* .topbar */}
		<div className="navbar">
		   <div className="container">
			  <div className="navbar-innr">
				 <ul className="navbar-menu">
					<li><a href="index.html"> DASHBOARD</a></li>
					<li className="has-dropdown page-links-all active">
					   <a className="drop-toggle" href="#"> STAFF MODULE</a>
					   <ul className="navbar-dropdown">
						  <li className="active"><a href="biodata.html"><b>BIODATA &amp; PROFILE</b></a></li>
						  <li><a href="#"><b>DHR STAFF SERVICES</b></a></li>
						  <li><a href="#"><b>DHR HEAD SERVICES</b></a></li>
						  <li><a href="#"><b>DHR ADMIN MODULE</b></a></li>
						  <li><a href="#"><b>ESTATE SERVICES</b></a></li>
						  <li><a href="#"><b>DOCUMENTS MODULE</b></a></li>
						  <li><a href="#"><b>PHOTO MODULE</b></a></li>
						  <li><a href="#"><b>DHR HELPDESK</b></a></li>
					   </ul>
					</li>
					<li className="has-dropdown page-links-all">
					   <a className="drop-toggle" href="#"> VLE MODULE</a>
					   <ul className="navbar-dropdown">
						  <li><a href="#"><b>VLE COURSE TUTOR</b></a></li>
						  <li><a href="#"><b>VLE COURSE ASSISTANT</b></a></li>
						  <li><a href="#"><b>VLE ADMINISTRATOR</b></a></li>
						  <li><a href="#"><b>VLE FAQ &amp; SUPPORT</b></a></li>
					   </ul>
					</li>
					<li className="has-dropdown page-links-all">
					   <a className="drop-toggle" href="#"> CODE MODULE</a>
					   <ul className="navbar-dropdown">
						  <li><a href="#"><b>USER DASHBOARD</b></a></li>
						  <li><a href="#"><b>ADMIN DASHBOARD</b></a></li>
						  <li><a href="#"><b>CODE CALENDAR</b></a></li>
						  <li><a href="#"><b>CODE FAQ &amp; SUPPORT</b></a></li>
					   </ul>
					</li>
					<li className="has-dropdown page-links-all">
					   <a className="drop-toggle" href="#"> PARTTIMERS MODULE</a>
					   <ul className="navbar-dropdown">
						  <li><a href="#"><b>BIODATA &amp; PROFILE</b></a></li>
						  <li><a href="#"><b>APPOINTMENTS</b></a></li>
						  <li><a href="#"><b>PAYMENT CLAIMS</b></a></li>
						  <li><a href="#"><b>DHR HELPDESK</b></a></li>
					   </ul>
					</li>
					<li className="has-dropdown page-links-all">
					   <a className="drop-toggle" href="#"> JOB MODULE</a>
					   <ul className="navbar-dropdown">
						  <li><a href="#"><b>JOB ADVERTISEMENTS</b></a></li>
						  <li><a href="#"><b>JOB APPLICATIONS</b></a></li>
						  <li><a href="#"><b>APPLICANT PROFILE</b></a></li>
						  <li><a href="#"><b>DHR CONTACT FORM</b></a></li>
					   </ul>
					</li>
					<li className="has-dropdown page-links-all">
					   <a className="drop-toggle" href="#"> MENUS</a>
					   <ul className="navbar-dropdown">
						  <li className="has-dropdown">
							 <a className="drop-toggle" href="#"><b>NSS MODULE</b></a>
							 <ul className="navbar-dropdown">
								<li><a href="index.html"><b>BIODATA &amp; PROFILE</b></a></li>
								<li><a href="index.html"><b>NSS REMINDERS</b></a></li>
								<li><a href="index.html"><b>HEALTH ASSESSMENT</b></a></li>
								<li><a href="index.html"><b>DHR HELPDESK</b></a></li>
							 </ul>
						  </li>
						  <li className="has-dropdown">
							 <a className="drop-toggle" href="#"><b>USER MANAGEMENT</b></a>
							 <ul className="navbar-dropdown">
								<li><a href="index.html"><b>APPS MANAGEMENT</b></a></li>
								<li><a href="index.html"><b>USER ACCOUNTS</b></a></li>
								<li><a href="index.html"><b>SSO IDENTITY</b></a></li>
								<li><a href="index.html"><b>SYSTEM LOGS</b></a></li>
							 </ul>
						  </li>
						  <li className="has-dropdown">
							 <a className="drop-toggle" href="#"><b>UNIVERSITY SERVICES</b></a>
							 <ul className="navbar-dropdown">
								<li><a href="index.html"><b>UNIVERSITY CIRCULARS</b></a></li>
								<li><a href="index.html"><b>DOCUMENTS &amp; GUIDES</b></a></li>
								<li><a href="index.html"><b>THIRD-PARTY SERVICES</b></a></li>
								<li><a href="index.html"><b>SUPPORT &amp; HELPDESK</b></a></li>
							 </ul>
						  </li>
					   </ul>
					</li>
				 </ul>
				 <ul className="navbar-btns">
					<li><a href="#" className="btn btn-sm btn-outline btn-light"><em className="text-primary fas fa-lg fa-file-pdf-o" /><span>USER GUIDE</span></a></li>
				 </ul>
			  </div>
			  {/* .navbar-innr */}
		   </div>
		   {/* .container */}
		</div>
		{/* .navbar */}
	 </div>
	 {/* .topbar-wrap */}
	 <div className="page-content">
	 <div className="container">
		{/* Jumbo banner */}
		<div className="row">
		   <div className="col-lg-6">
			  <div className="token-statistics card card-token height-auto">
				 <div className="card-innr">
					<div className="token-balance token-balance-with-icon">
					   <div className="token-balance-icon"><img src="images/15666.jpg" style={{width: '200px', borderRadius: '5px'}} alt="logo" /></div>
					   <div className="token-balance-text">
						  <h6 className="card-sub-title">EBENEZER KWABENA BLAY ACKAH</h6>
						  <span className="lead"> UNIVERSITY STAFF</span>
						  {/*  
						  <h6 class="card-sub-title">SENIOR ICT ASSISTANT<br><span class="btitle"><b>DESIGNATION</b></span><br><br></h6>
						  <h6 class="card-sub-title">SENIOR MEMBER<br><span class="btitle"><b>STAFF CATEGORY</b></span></h6>
						  */}
					   </div>
					</div>
				 </div>
				 <div style={{height: '6px', width: '100%', background: 'seashell', display: 'flex', marginBottom: '10px'}}>
				 <div style={{flex: 2, height: '100%', background: '#555'}} />
				 <div style={{flex: 3, height: '100%', background: '#f58635'}} />
				 <div style={{flex: 2, height: '100%', background: '#555'}} />
			  </div>
		   </div>
		</div>
		{/* .col */}
		<div className="col-lg-4">
		   <div className="token-information card token-padding">
			  <div className="row">
				 <div className="col-12">
					<div className="token-currency-choose">
					   <div className="row">
						  <div className="col-12">
							 <div className="pay-option-label unit-cover">
								<h3 style={{textAlign: 'center'}}><b>STAFF PROFILE</b></h3>
							 </div>
						  </div>
						  <div className="col-12">
							 {/*
							 <marquee class="notice" behavior="scroll" direction="left" scrollamount="4">WELCOME! TO THE UNIVERSITY UNIFIED PORTAL. THIS PORTAL HOSTS THE RECRUITMENT OF STAFF THROUGH TO APPOINTMENT AND ALSO NATIONAL SERVICE PERSONS. </marquee>
							 */}
							 <ul className="bread-crum">
								<li><a href="index.html">HOME</a></li>
								<li className="active"><a href className="active">STAFF PROFILE</a></li>
							 </ul>
						  </div>
					   </div>
					</div>
				 </div>
			  </div>
		   </div>
		   {/* .card */}
		</div>
		{/* .col */}
		<div className="col-lg-2">
		   <div className="token-information card token-padding app-cover">
			  <img src="assets/images/logo.png" className="app-logo" />
			  <span className="app-id">STAFF APP</span>
		   </div>
		   {/* .card */}
		</div>
		{/* .col */}
	 </div>
	 <div className="row">
		<div className="col-lg-3 aside sidebar-left">
		   <div className="card card-navs">
			  <h2 className="sub-head">NAVIGATION</h2>
			  <div className="card-innr" style={{paddingTop: '5px'}}>
			  <ul className="sidebar-nav">
				 <li><a href="#"><em className="ikon ikon-user" /> <b>STAFF PROFILE</b></a></li>
				 <li><a href="#"><em className="ikon ikon-user" /> <b>EDIT PROFILE</b></a></li>
				 <li><a href="#"><em className="ikon ikon-user" /> <b>APPS &amp; ROLES</b></a></li>
			  </ul>
		   </div>
		</div>
	 </div>
	 <div className="col-lg-9 main-content">
	 {/* Biodata File */}
	 <div className="card content-area d-none">
		<h2 className="sub-head bg-blueblack">
		   STAFF PROFILE
		   <i className="fa fa-print print-btn" />
		</h2>
		<div className="card-innr">
		   <iframe id="printf" name="printf" src="profile_report" style={{width: '100%', minHeight: '650px', margin: '0px auto 10px', border: 'none', borderTop: '3px solid brown', transform: 'scale(1)', transformOrigin: '0 0'}} />
		</div>
		{/* .card-innr */}
	 </div>
	 {/* .card */}
	 {/* Edit Profile */}
	 <div className="content-area card">
	 <h2 className="sub-head bg-blueblack">
		EDIT PROFILE
		<a href="#" className="print-btn"><i className="fa fa-save" /></a>
	 </h2>
	 <div className="card-innr">
	 <div className="card-head d-none">
		<h4 className="card-title">PROFILE &amp; UPDATE</h4>
		<hr />
	 </div>
	 <div className="tab-content" id="profile-details">
	 <div className="tab-pane fade show active" id="personal-data">
	 <form action="#">
		<div className="row">
		   <div className="col-md-6">
			  <div className="input-item input-with-label"><label htmlFor="email-address" className="input-item-label">UCC Email Address </label><input className="input-bordered" type="text" id="email-address" name="email-address" defaultValue="info@softnio.com" disabled /></div>
		   </div>
		   <div className="col-md-6">
			  <div className="input-item input-with-label"><label htmlFor="email-address" className="input-item-label">Alternative Email Address</label><input className="input-bordered" type="text" id="email-address" name="email-address" defaultValue="info@softnio.com" disabled /></div>
		   </div>
		   <div className="col-md-6">
			  <div className="input-item input-with-label"><label htmlFor="mobile-number" className="input-item-label">Primary Mobile Number</label><input className="input-bordered" type="text" id="mobile-number" name="mobile-number" /></div>
			  {/* .input-item */}
		   </div>
		   <div className="col-md-6">
			  <div className="input-item input-with-label"><label htmlFor="date-of-birth" className="input-item-label">TIN Number or National ID Number</label><input className="input-bordered date-picker-dob" type="text" id="date-of-birth" name="date-of-birth" /></div>
			  {/* .input-item */}
		   </div>
		   {/* .col */}
		   <div className="col-md-6">
			  <div className="input-item input-with-label"><label htmlFor="date-of-birth" className="input-item-label">Name of Emergency Contact Person</label><input className="input-bordered date-picker-dob" type="text" id="date-of-birth" name="date-of-birth" /></div>
			  {/* .input-item */}
		   </div>
		   {/* .col */}
		   <div className="col-md-6">
			  <div className="input-item input-with-label"><label htmlFor="mobile-number" className="input-item-label">Emergency Contact's Mobile Number</label><input className="input-bordered" type="text" id="mobile-number" name="mobile-number" /></div>
			  {/* .input-item */}
		   </div>
		</div>
		{/* .row */}
		<div className="gaps-1x" />
		{/* 10px gap */}
		<div className="d-sm-flex justify-content-between align-items-center">
		   <button className="btn btn-primary"><i className="fa fa-save " />&nbsp;&nbsp;SAVE PROFILE</button>
		   <div className="gaps-2x d-sm-none" /><span className="text-success"><em className="ti ti-check-box" /> All Changes are saved</span>
		   </div>
	 </form>
	 {/* form */}
	 </div>{/* .tab-pane */}
	 <div className="tab-pane fade" id="settings">
		<div className="pdb-1-5x">
		   <h5 className="card-title card-title-sm text-dark">Security Settings</h5>
		</div>
		<div className="input-item"><input type="checkbox" className="input-switch input-switch-sm" id="save-log" defaultChecked /><label htmlFor="save-log">Save my Activities
		   Log</label>
		</div>
		<div className="input-item"><input type="checkbox" className="input-switch input-switch-sm" id="pass-change-confirm" /><label htmlFor="pass-change-confirm">Confirm me through
		   email before password change</label>
		</div>
		<div className="pdb-1-5x">
		   <h5 className="card-title card-title-sm text-dark">Manage Notification</h5>
		</div>
		<div className="input-item"><input type="checkbox" className="input-switch input-switch-sm" id="latest-news" defaultChecked /><label htmlFor="latest-news">Notify me by email
		   about sales and latest news</label>
		</div>
		<div className="input-item"><input type="checkbox" className="input-switch input-switch-sm" id="activity-alert" defaultChecked /><label htmlFor="activity-alert">Alert me by email
		   for unusual activity.</label>
		</div>
		<div className="gaps-1x" />
		   <div className="d-flex justify-content-between align-items-center"><span /><span className="text-success"><em className="ti ti-check-box" /> Setting has been
			  updated</span>
		   </div>
		</div>
		{/* .tab-pane */}
		<div className="tab-pane fade" id="password">
		   <div className="row">
			  <div className="col-md-6">
				 <div className="input-item input-with-label"><label htmlFor="old-pass" className="input-item-label">Old Password</label><input className="input-bordered" type="password" id="old-pass" name="old-pass" /></div>
				 {/* .input-item */}
			  </div>
			  {/* .col */}
		   </div>
		   {/* .row */}
		   <div className="row">
			  <div className="col-md-6">
				 <div className="input-item input-with-label"><label htmlFor="new-pass" className="input-item-label">New Password</label><input className="input-bordered" type="password" id="new-pass" name="new-pass" /></div>
				 {/* .input-item */}
			  </div>
			  {/* .col */}
			  <div className="col-md-6">
				 <div className="input-item input-with-label"><label htmlFor="confirm-pass" className="input-item-label">Confirm New Password</label><input className="input-bordered" type="password" id="confirm-pass" name="confirm-pass" /></div>
				 {/* .input-item */}
			  </div>
			  {/* .col */}
		   </div>
		   {/* .row */}
		   <div className="note note-plane note-info pdb-1x">
			  <em className="fas fa-info-circle" />
			  <p>Password should be minmum 8 letter and include lower and uppercase letter.
			  </p>
		   </div>
		   <div className="gaps-1x" />
			  {/* 10px gap */}
			  <div className="d-sm-flex justify-content-between align-items-center">
				 <button className="btn btn-primary">Update</button>
				 <div className="gaps-2x d-sm-none" /><span className="text-success"><em className="ti ti-check-box" /> Changed Password</span>
				 </div>
			  </div>
			  {/* .tab-pane */}
		   </div>
		   {/* .tab-content */}
		</div>
		{/* .card-innr */}
	 </div>
	 {/* PROFILE OVERVIEW */}
	 <div className="content-area card">
	 <h2 className="sub-head bg-blueblack">
		STAFF PROFILE
		<a href="#" className="btn btn-sm btn-outline btn-light print-btn"><i className="fa fa-print" /> <b>PRINT PROFILE</b></a>
	 </h2>
	 <div className="card-innr">
	 <div className="card-head d-none">
		<h4 className="card-title">PERSONAL PROFILE</h4>
		<hr />
	 </div>
	 {/* CONTENT HERE */}
	 <div className="content-area">
	 <h6 className="card-sub-title">PERSONAL INFORMATION</h6>
	 <div className="gaps-1-5x" />
	 <div className="data-details d-md-flex">
		<div className="fake-class"><span className="data-details-title">FIRST NAME</span><span className="data-details-info">EBENEZER</span></div>
		<div className="fake-class"><span className="data-details-title">MIDDLE NAME(S)</span>KWABENA BLAY<span className="badge badge-success ucap d-none">Approved</span></div>
		<div className="fake-class"><span className="data-details-title">LAST NAME</span><span className="data-details-info">ACKAH</span></div>
	 </div>
	 <div className="data-details d-md-flex">
		<div className="fake-class"><span className="data-details-title">AGE</span><span className="data-details-info">50 YEARS</span></div>
		<div className="fake-class"><span className="data-details-title">DATE OF BIRTH</span><span className="data-details-info">FEBRUARY 28, 1989</span></div>
		<div className="fake-class"><span className="data-details-title">PLACE OF BIRTH</span>ENCHI<span className="badge badge-success ucap d-none">Approved</span></div>
		<div className="fake-class"><span className="data-details-title">HOMETOWN</span><span className="data-details-info">ENCHI</span></div>
	 </div>
	 <div className="data-details d-md-flex">
		<div className="fake-class"><span className="data-details-title">DISTRICT</span><span className="data-details-info">AOWIN</span></div>
		<div className="fake-class"><span className="data-details-title">REGION</span>WESTERN-NORTH<span className="badge badge-success ucap d-none">Approved</span></div>
		<div className="fake-class"><span className="data-details-title">NATIONALITY</span><span className="data-details-info">GHANAIAN</span></div>
		<div className="fake-class"><span className="data-details-title">NATIONAL ID OR TIN NUMBER</span><span className="data-details-info">GHANAIAN</span></div>
	 </div>
	 <div className="data-details d-md-flex">
		<div className="fake-class"><span className="data-details-title">PRIMARY PHONE NUMBER</span><span className="data-details-info">0277675089</span></div>
		<div className="fake-class"><span className="data-details-title">PERSONAL EMAIL ADDRESS</span>ebenezerkb.ackah@gmail.com<span className="badge badge-success ucap d-none">Approved</span></div>
		<div className="fake-class"><span className="data-details-title">RESIDENTIAL ADDRESS</span><span className="data-details-info">AKOTOKYIR NEWTOWN</span></div>
	 </div>
	 <div className="data-details d-md-flex">
		<div className="fake-class"><span className="data-details-title">POSTAL ADDRESS</span><span className="data-details-info">PMB MIS-UCC, CAPE COAST.</span></div>
		<div className="fake-class"><span className="data-details-title">EMERGENCY CONTACT</span>SUSANA AYERTEY<span className="badge badge-success ucap d-none">Approved</span></div>
		<div className="fake-class"><span className="data-details-title">EMERGENCY NUMBER</span><span className="data-details-info">0577567786</span></div>
	 </div>
	 <div className="gaps-3x" />
	 <h6 className="card-sub-title">FAMILY INFORMATION</h6>
	 <ul className="data-details-list">
		<li>
		   <div className="data-details-head">NAME OF SPOUSE</div>
		   <div className="data-details-des"><strong>SUSANA AYERTEY</strong><span>MOBILE: 0277675089</span></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">FATHER'S NAME</div>
		   <div className="data-details-des"><strong>JOHN KWEKUCHER ACKAH</strong><span>ADDRESS: CALVARY METHODIST CHURCH</span></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">MOTHER'S NAME</div>
		   <div className="data-details-des"><strong>EMELIA OWOO DUNCAN ACKAH</strong><span>ADDRESS: CALVARY METHODIST CHURCH</span></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">CHILD #1</div>
		   <div className="data-details-des"><strong>MIGUEL KWEKUCHER BLAY ACKAH</strong><span>DATE OF BIRTH: JULY 27, 2018</span></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">NEXT OF KIN #1</div>
		   <div className="data-details-des"><strong>VINCENT KWABENA BLAY ACKAH</strong><span>DATE OF BIRTH: JANUARY 12,2024</span></div>
		</li>
		{/* li */}
	 </ul>
	 <div className="gaps-3x" />
	 <h6 className="card-sub-title">UNIVERSITY INFORMATION</h6>
	 <ul className="data-details-list">
		<li>
		   <div className="data-details-head">UCC STAFF NUMBER</div>
		   <div className="data-details-des"><strong>15666</strong></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">UCC EMAIL ADDRESS</div>
		   <div className="data-details-des"><strong>ebenezer.ackah@ucc.edu.gh</strong></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">UCC DESIGNATION</div>
		   <div className="data-details-des"><strong>SENIOR ICT ASSISTANT</strong></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">ASSIGNED UCC UNIT</div>
		   <div className="data-details-des"><strong>MANAGEMENT INFORMATION SYSTEMS SECTION</strong></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">UCC STAFF STATUS</div>
		   <div className="data-details-des"><strong>PERMANENT | TEMPORAL | DEAD | RETIRED | EXPELLED</strong></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">UCC SALARY SCALE</div>
		   <div className="data-details-des"><strong>GRADE 17H, NOTCH 2</strong></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">UCC EXIT REMARKS</div>
		   <div className="data-details-des"><strong>EXITTED THE SCHOOL BY RETIREMENT</strong><span>JANUARY 1, 2012</span></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">EDUROAM DETAILS</div>
		   <div className="data-details-des"><strong>IDENTITY OR USERNAME: ebenezer.ackah@ucc.edu.gh , PASSWORD: XCSDERD</strong></div>
		</li>
		{/* li */}
	 </ul>
	 <div className="gaps-3x" />
	 <h6 className="card-sub-title">ACADEMIC INFORMATION</h6>
	 <ul className="data-details-list">
		<li>
		   <div className="data-details-head">O-LEVEL</div>
		   <div className="data-details-des"><strong>HIGHER EDUCATION CERTIFICATION</strong><span>GES, 2018-2020</span></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">DIPLOMA</div>
		   <div className="data-details-des"><strong>DIPLOMA IN EDUCATION, SCIENCE EDUCATION</strong><span>ENCHICO, 2018-2020</span></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">DEGREE</div>
		   <div className="data-details-des"><strong>BACHELOR OF SCIENCE IN TELECOMMUNICATIONS ENGINEERIING</strong><span>KNUST, 2008-2012</span></div>
		</li>
		{/* li */}
		<li>
		   <div className="data-details-head">MASTERS</div>
		   <div className="data-details-des"><strong>MASTER OF SCIENCE IN INFORMATION COMMUNICATION TECHNOLOGY</strong><span>KNUST, 2018-2020</span></div>
		</li>
		{/* li */}
	 </ul>
	 <div className="gaps-3x" />
		<h6 className="card-sub-title">APPOINTMENT &amp; PROMOTION INFORMATION</h6>
		<ul className="data-details-list">
		   <li>
			  <div className="data-details-head">APPOINTMENT</div>
			  <div className="data-details-des"><strong>SENIOR ICT ASSISTANT</strong><span>JANUARY 1, 2012</span></div>
		   </li>
		   {/* li */}
		   <li>
			  <div className="data-details-head">PROMOTION</div>
			  <div className="data-details-des"><strong>PRINCIPAL ICT ASSISTANT</strong><span>FEBRUARY 31,2017</span></div>
		   </li>
		   {/* li */}
		   <li>
			  <div className="data-details-head">UPGRADE</div>
			  <div className="data-details-des"><strong>LECTURER</strong><span>MARCH 12, 2020</span></div>
		   </li>
		   {/* li */}
		</ul>
		<div className="gaps-3x" />
		   <h6 className="card-sub-title">RENEWAL INFORMATION</h6>
		   <ul className="data-details-list">
			  <li>
				 <div className="data-details-head">RENEWAL #1</div>
				 <div className="data-details-des"><strong>ASSISTANT SYSTEMS ANALYST</strong><span>JANUARY 1, 2012</span></div>
			  </li>
			  {/* li */}
		   </ul>
		   <div className="gaps-3x" />
			  <h6 className="card-sub-title">POST-RETIREMENT INFORMATION</h6>
			  <ul className="data-details-list">
				 <li>
					<div className="data-details-head">CONTRACT #1</div>
					<div className="data-details-des"><strong>ASSISTANT SYSTEMS ANALYST</strong><span>JANUARY 1, 2012 - MAY 12, 2020.</span></div>
				 </li>
				 {/* li */}
			  </ul>
		   </div>
		</div>
		{/* .card-innr */}
	 </div>
	 {/* ACCOUNT & ROLES */}
	 <div className="content-area card">
	 <h2 className="sub-head bg-blueblack">
		APPS &amp; ROLES
		<a href="#" className="print-btn"><i className="fa fa-save" /></a>
	 </h2>
	 <div className="card-innr">
	 <div className="card-head">
		<h4 className="card-title">STAFF PRIVILEGES FOR SECURED &amp; ACTIVATED APPS</h4>
		<hr />
	 </div>
	 {/* CONTENT HERE */}
	 <div className="content-area">
		<h6 className="card-sub-title">HRMS APP - ( DIRECTORATE OF HUMAN RESOURCE )</h6>
		<div className="gaps-1-5x" />
		   <ul className="data-details-list">
			  <li>
				 <div className="data-details-head">STAFF SERVICES</div>
				 <div className="data-details-des"><strong>PRIVILEGE FOR ALL STAFF OF THE UNVERSITY</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
			  </li>
			  {/* li */}
			  <li>
				 <div className="data-details-head">HEAD SERVICES</div>
				 <div className="data-details-des"><strong>PRIVILEGE FOR UNIT HEAD &amp; STAFF APPROVALS</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
			  </li>
			  {/* li */}
			  <li>
				 <div className="data-details-head">HR ADMIN</div>
				 <div className="data-details-des"><strong>PRIVILEGE FOR HRMS ADMINISTRATOR</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
			  </li>
			  {/* li */}
			  <li>
				 <div className="data-details-head">HR ENQUIRIES</div>
				 <div className="data-details-des"><strong>PRIVILEGE FOR HR ENQUIRIES AND HELP DESK</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
			  </li>
			  {/* li */}
			  <li>
				 <div className="data-details-head">HR DATA-ENTRY</div>
				 <div className="data-details-des"><strong>PRIVILEGE FOR HR DATA ENTRY CLERKS</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
			  </li>
			  {/* li */}
			  <li>
				 <div className="data-details-head">HR SUPERADMIN</div>
				 <div className="data-details-des"><strong>PRIVILEGE FOR DEVELOPER &amp; TECHNICAL SUPPORT</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
			  </li>
			  {/* li */}
			  <li>
				 <div className="data-details-head">HR REGISTRAR</div>
				 <div className="data-details-des"><strong>PRIVILEGE FOR HR REGISTRAR ADMINISTRATIONS</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
			  </li>
			  {/* li */}
			  <li>
				 <div className="data-details-head">HR DIRECTOR</div>
				 <div className="data-details-des"><strong>PRIVILEGE FOR HR DIRECTOR ADMINISTRATIONS</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
			  </li>
			  {/* li */}
		   </ul>
		   <div className="gaps-3x" />
			  <h6 className="card-sub-title">CODE APP - ( COLLEGE OF DISTANCE EDUCATION ) </h6>
			  <div className="gaps-1-5x" />
				 <ul className="data-details-list">
					<li>
					   <div className="data-details-head">HR SUPERADMIN</div>
					   <div className="data-details-des"><strong>PRIVILEGE FOR DEVELOPER &amp; TECHNICAL SUPPORT</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
					</li>
					{/* li */}
				 </ul>
				 <div className="gaps-3x" />
					<h6 className="card-sub-title">PHOTO APP - ( UNIVERSITY PHOTO &amp; ID CARD SYSTEM )</h6>
					<div className="gaps-1-5x" />
					   <ul className="data-details-list">
						  <li>
							 <div className="data-details-head">HR SUPERADMIN</div>
							 <div className="data-details-des"><strong>PRIVILEGE FOR DEVELOPER &amp; TECHNICAL SUPPORT</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
						  </li>
						  {/* li */}
					   </ul>
					   <div className="gaps-3x" />
						  <h6 className="card-sub-title">VLE APP - ( UNIVERSITY VIRTUAL LEARNING SYSTEM )</h6>
						  <div className="gaps-1-5x" />
							 <ul className="data-details-list">
								<li>
								   <div className="data-details-head">HR SUPERADMIN</div>
								   <div className="data-details-des"><strong>PRIVILEGE FOR DEVELOPER &amp; TECHNICAL SUPPORT</strong><span>LAST ACTIVITY: 2018-02-34 34:34</span></div>
								</li>
								{/* li */}
							 </ul>
						  </div>
						  {/* .card-innr */}
					   </div>
					</div>
				 </div>
			  </div>
			  {/* .container */}
		   </div>
		   {/* .page-content */}
		   <div className="footer-bar">
			  <div className="container">
				 <div className="row align-items-center justify-content-center">
					<div className="col-md-8">
					   <ul className="footer-links">
						  <li><a href="#">Whitepaper</a></li>
						  <li><a href="faq-page.html">FAQs</a></li>
						  <li><a href="regular-page.html">Privacy Policy</a></li>
						  <li><a href="regular-page.html">Terms of Condition</a></li>
					   </ul>
					</div>
					{/* .col */}
					<div className="col-md-4 mt-2 mt-sm-0">
					   <div className="d-flex justify-content-between justify-content-md-end align-items-center guttar-25px pdt-0-5x pdb-0-5x">
						  <div className="copyright-text">© 2018 TokenWiz.</div>
						  <div className="lang-switch relative">
							 <a href="#" className="lang-switch-btn toggle-tigger">En <em className="ti ti-angle-up" /></a>
							 <div className="toggle-class dropdown-content dropdown-content-up">
								<ul className="lang-list">
								   <li><a href="#">Fr</a></li>
								   <li><a href="#">Bn</a></li>
								   <li><a href="#">Lt</a></li>
								</ul>
							 </div>
						  </div>
					   </div>
					</div>
					{/* .col */}
				 </div>
				 {/* .row */}
			  </div>
			  {/* .container */}
		   </div>
		   {/* .footer-bar */}
		   {/* JavaScript (include all script here) */}
		   {/* Code injected by live-server */}
		</div>
	 </div>
	  )
}

export default SSOReset;
