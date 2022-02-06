import React, { Component }  from 'react';
import '../../assets/css/ui-vendor.css';
import '../../assets/css/ui-style.css';
//import './SSOReset.css';
//import NationalIcon from '../../assets/img/icon-national-id.png'
//import Adinkra from '../../assets/img/adinkra-bullet.png'
import Logo from '../../assets/img/logo.png'
import LogoP from '../../assets/img/logo_portal.png'
import Staff from '../../assets/img/15666.jpg'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../store/admission/ssoSlice';
import { useHistory } from 'react-router-dom'; 

const SSONavbar = ({ isMobile,setMobile }) => {
   
   const dispatch = useDispatch();
   const { sso } = useSelector( state => state );
   const history = useHistory();

   const logout = (e) => {
	  e.preventDefault();
	  const cm = window.confirm('Logout session ?');
	  if(cm){
		 dispatch(setIsLoggedIn(false));
	     history.push('/login');
	  }
   }



	return (
		<div className={ isMobile ? 'navbar active navbar-mobile':'navbar'}>
			<div className="container">
			<div className="navbar-innr">
				<ul className="navbar-menu">
					<li className="active"><Link to="/dash"> DASHBOARD</Link></li>
					{/*
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
					*/}
				</ul>
				<ul className="navbar-btns">
					<li><Link to="#" onClick={logout} className="btn btn-sm btn-outline btn-light"><em className="text-primary fas fa-lg fa-file-pdf-o" /><span>{/*USER GUIDE*/} LOGOUT</span></Link></li>
				</ul>
			</div>
			</div>
		</div>
	  )

}

export default SSONavbar;
