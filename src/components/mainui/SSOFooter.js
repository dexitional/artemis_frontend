import '../../assets/css/ui-vendor.css';
import '../../assets/css/ui-style.css';
//import './SSOReset.css';
//import NationalIcon from '../../assets/img/icon-national-id.png'
//import Adinkra from '../../assets/img/adinkra-bullet.png'
import Logo from '../../assets/img/logo.png'
import LogoP from '../../assets/img/logo_portal.png'
import Staff from '../../assets/img/15666.jpg'

import { Link } from 'react-router-dom';


const SSOPageLayout = () => {
      return (
		<div>
		<div className="topbar-wrap">
		   <div className="topbar is-sticky">
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
					{/* .topbar-nav */}<a className="topbar-logo" href="./"><img src={LogoP} srcSet={LogoP} alt="logo" /></a>
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
					   <li className="active"><a href="index.html"> DASHBOARD</a></li>
					   <li className="has-dropdown page-links-all">
						  <a className="drop-toggle" href="#"> STAFF MODULE</a>
						  <ul className="navbar-dropdown">
							 <li><a href="biodata.html"><b>BIODATA &amp; PROFILE</b></a></li>
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
							 <li className="has-dropdown active">
								<a className="drop-toggle" href="#"><b>NSS MODULE</b></a>
								<ul className="navbar-dropdown">
								   <li className="active"><a href="index.html"><b>BIODATA &amp; PROFILE</b></a></li>
								   <li className="active"><a href="index.html"><b>NSS REMINDERS</b></a></li>
								   <li className="active"><a href="index.html"><b>HEALTH ASSESSMENT</b></a></li>
								   <li className="active"><a href="index.html"><b>DHR HELPDESK</b></a></li>
								</ul>
							 </li>
							 <li className="has-dropdown active">
								<a className="drop-toggle" href="#"><b>USER MANAGEMENT</b></a>
								<ul className="navbar-dropdown">
								   <li className="active"><a href="index.html"><b>APPS MANAGEMENT</b></a></li>
								   <li className="active"><a href="index.html"><b>USER ACCOUNTS</b></a></li>
								   <li className="active"><a href="index.html"><b>SSO IDENTITY</b></a></li>
								   <li className="active"><a href="index.html"><b>SYSTEM LOGS</b></a></li>
								</ul>
							 </li>
							 <li className="has-dropdown active">
								<a className="drop-toggle" href="#"><b>UNIVERSITY SERVICES</b></a>
								<ul className="navbar-dropdown">
								   <li className="active"><a href="index.html"><b>UNIVERSITY CIRCULARS</b></a></li>
								   <li className="active"><a href="index.html"><b>DOCUMENTS &amp; GUIDES</b></a></li>
								   <li className="active"><a href="index.html"><b>THIRD-PARTY SERVICES</b></a></li>
								   <li className="active"><a href="index.html"><b>SUPPORT &amp; HELPDESK</b></a></li>
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
			  <div className="row">
				 <div className="col-lg-5">
					<div className="token-statistics card card-token height-auto">
					   <div className="card-innr">
						  <div className="token-balance token-balance-with-icon">
							 <div className="token-balance-icon"><img src={Logo} style={{width: '200px'}} alt="logo" /></div>
							 <div className="token-balance-text">
								<h6 className="card-sub-title">EBENEZER KWABENA BLAY ACKAH</h6>
								<span className="lead">15666<span> -- ( TEMPORAL STAFF )</span></span>
								<hr />
								<h6 className="card-sub-title">SENIOR ICT ASSISTANT<br /><span className="btitle"><b>DESIGNATION</b></span><br /><br /></h6>
								<h6 className="card-sub-title">SENIOR MEMBER<br /><span className="btitle"><b>STAFF CATEGORY</b></span></h6>
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
			  <div className="col-lg-5">
				 <div className="token-information card card-full-height token-padding">
					<div className="row">
					   <div className="col-12">
						  <div className="token-currency-choose">
							 <div className="row">
								<div className="col-12" style={{marginBottom: '10px'}}>
								<div className="pay-option-label unit-cover">
								   <h6><b>USERNAME : EBENEZER.ACKAH@AUCC.EDU.GH</b></h6>
								</div>
							 </div>
							 <div className="col-12">
								<div className="pay-option">
									<label className="pay-option-label" htmlFor="learn"><span className="pay-title"><span className="pay-cur">PHONE : 0277675089</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span className="pay-cur">DOB : FEB 28, 2021</span></span></label>
								</div>
							 </div>
							 <br />
							 <div className="col-12">
								<div className="pay-option-label unit-cover">
								   <h6><b>MANAGEMENT INFORMATION SYSTEMS SECTION</b></h6>
								</div>
							 </div>
							 <div className="col-12">
								<marquee className="notice" behavior="scroll" direction="left" scrollamount={4}>WELCOME! TO THE UNIVERSITY UNIFIED PORTAL. THIS PORTAL HOSTS THE RECRUITMENT OF STAFF THROUGH TO APPOINTMENT AND ALSO NATIONAL SERVICE PERSONS. </marquee>
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
			  <div className="token-information card card-full-height dash-cover">
				 <div className="row no-gutters height-100">
					<div className="col-md-12 text-center">
					   {/*
					   <div class="gaps-2x"></div>
					   */}
					   <img src={Staff} className="dash-photo" style={{display: 'block', alignSelf: 'baseline'}} />
					</div>
				 </div>
			  </div>
			  {/* .card */}
		   </div>
		   {/* .col */}
		</div>
		<div className="row">
		<div className="col-lg-12">
		<div className="token-information card card-full-height">
		<h2 className="sub-head">GENERAL USER SERVICES</h2>
		<div className="row no-gutters height-100">
		<div className="col-md-3">
		<div className="token-info">
		   <em className="fas fa-3x fa-user text-info" />
		   <div className="gaps-2x" />
			  <div><a href="#" className="btn btn-primary"><b>PERSONAL PROFILE</b></a></div>
		   </div>
		</div>
		<div className="col-md-3">
		   <div className="token-info">
			  <em className="fas fa-3x fa-chalkboard-teacher text-info" />
			  <div className="gaps-2x" />
				 <div><a href="#" className="btn btn-primary"><b>STAFF SERVICES</b></a></div>
			  </div>
		   </div>
		   <div className="col-md-3">
			  <div className="token-info">
				 <em className="fas fa-3x fa-chalkboard-teacher text-info" />
				 <div className="gaps-2x" />
					<div><a href="#" className="btn btn-primary"><b>USER PRIVILEGES</b></a></div>
				 </div>
			  </div>
			  <div className="col-md-3 d-none">
				 <div className="token-info">
					<em className="fas fa-3x fa-tools text-info" />
					<div className="gaps-2x" />
					   <div><a href="uenr_vle.html" className="btn btn-primary"><b>ESTATE SERVICES</b></a></div>
					</div>
				 </div>
				 <div className="col-md-3">
					<div className="token-info">
					   <em className="fas fa-3x fa-chalkboard-teacher text-info" />
					   <div className="gaps-2x" />
						  <div><a href="#" className="btn btn-primary"><b>AUCC CIRCULARS</b></a></div>
					   </div>
					</div>
					<div className="col-md-3 d-none">
					   <div className="token-info">
						  <em className="fas fa-3x fa-photo text-info" />
						  <div className="gaps-2x" />
							 <div><a href="uenr_vle.html" className="btn btn-primary"><b>PHOTO MODULE</b></a></div>
						  </div>
					   </div>
					   <div className="col-md-3 d-none">
						  <div className="token-info">
							 <em className="fas fa-3x fa-briefcase text-info" />
							 <div className="gaps-2x" />
								<div><a href="#" className="btn btn-primary"><b>DOCUMENTS MODULE</b></a></div>
							 </div>
						  </div>
						  <div className="col-md-3 d-none">
							 <div className="token-info">
								<em className="fas fa-3x fa-headset text-info" />
								<div className="gaps-2x" />
								   <div><a href="#" className="btn btn-primary"><b>DHR HELPDESK</b></a></div>
								</div>
							 </div>
						  </div>
					   </div>
					   {/* .card */}
					</div>
					{/* .col */}
				 </div>
				 {/* E-learning Services 
				 <div class="row">
					<div class="col-lg-12">
					   <div class="token-information card card-full-height">
						  <h2 class="sub-head">VIRTUAL LEARNING MODULE</h2>
						  <div class="row no-gutters height-100">
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>VLE COURSE TUTOR</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>VLE COURSE ASSISTANT</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>VLE ADMINISTRATOR</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-info-circle text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>VLE FAQ & SUPPORT</b></a></div>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
				 */}
				 {/* CODE Services
				 <div class="row">
					<div class="col-lg-12">
					   <div class="token-information card card-full-height">
						  <h2 class="sub-head">CODE MANAGEMENT MODULE</h2>
						  <div class="row no-gutters height-100">
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>USER DASHBOARD</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>ADMIN DASHBOARD</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-calendar text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>CODE CALENDAR</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-info-circle text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>CODE FAQ & SUPPORT</b></a></div>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
				 */}
				 {/* Partimers Services
				 <div class="row">
					<div class="col-lg-12">
					   <div class="token-information card card-full-height">
						  <h2 class="sub-head">CASUAL STAFF & PART-TIMERS MODULE</h2>
						  <div class="row no-gutters height-100">
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>BIODATA & PROFILE</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>APPOINTMENTS</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-money text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>PAYMENT & CLAIMS</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-headset text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>DHR HELPDESK</b></a></div>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
				 */}
				 {/* Recruitment Services 
				 <div class="row">
					<div class="col-lg-12">
					   <div class="token-information card card-full-height">
						  <h2 class="sub-head">JOB RECRUITMENT MODULE</h2>
						  <div class="row no-gutters height-100">
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b> JOB ADVERTISEMENTS</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>JOB APPLICATIONS</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>APPLICANT PROFILE</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-info-circle text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>DHR CONTACT FORM</b></a></div>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
				 */}
				 {/* NSS Services 
				 <div class="row">
					<div class="col-lg-12">
					   <div class="token-information card card-full-height">
						  <h2 class="sub-head">NATIONAL SERVICE MODULE</h2>
						  <div class="row no-gutters height-100">
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-user text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b> BIODATA & PROFILE</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-envelope-open-text text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>NSS REMINDERS</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-file-medical text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>HEALTH ASSESSMENT</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-headset text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>DHR HELPDESK</b></a></div>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
				 */}
				 {/* User Management 
				 <div class="row">
					<div class="col-lg-12">
					   <div class="token-information card card-full-height">
						  <h2 class="sub-head">ACCOUNTS & USER MANAGEMENT</h2>
						  <div class="row no-gutters height-100">
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-mobile-alt text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>APPS MANAGEMENT</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-users-cog text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>USER ACCOUNTS</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-fingerprint text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>SSO IDENTITY</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-clipboard-list text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>SYSTEM LOGS</b></a></div>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
				 */}
				 {/* General Services
				 <div class="row">
					<div class="col-lg-12">
					   <div class="token-information card card-full-height">
						  <h2 class="sub-head">UNIVERSITY SERVICES</h2>
						  <div class="row no-gutters height-100">
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-envelope-open-text text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>UNIVERSITY CIRCULARS</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-file-pdf text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>DOCUMENTS & GUIDES </b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-support text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>THIRD-PARTY SERVICES</b></a></div>
								</div>
							 </div>
							 <div class="col-md-3">
								<div class="token-info">
								   <em class="fas fa-3x fa-robot text-info"></em>
								   <div class="gaps-2x"></div>
								   <div><a href="#" class="btn btn-primary"><b>SUPPORT & HELPDESK</b></a></div>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
				 */}
			  </div>
			  {/* .container */}
		   </div>
		   {/* .page-content */}
		   <div className="footer-bar">
			  <div className="container">
				 <div className="row align-items-center justify-content-center">
					<div className="col-md-8">
					   <ul className="footer-links">
						  <li><b>Powered by UIT-AUCC</b></li>
					   </ul>
					</div>
					{/* .col */}
					<div className="col-md-4 mt-2 mt-sm-0">
					   <div className="d-flex justify-content-between justify-content-md-end align-items-center guttar-25px pdt-0-5x pdb-0-5x">
						  <div className="copyright-text">© 2021 UIT-AUCC</div>
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
	
      )
}

export default SSOPageLayout;
