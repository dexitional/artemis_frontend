import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../../../store/admission/ssoSlice';
import { useHistory } from 'react-router-dom'; 

const StudentNavbar = () => {
   
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
		<div className="navbar">
			<div className="container">
			<div className="navbar-innr">
				<ul className="navbar-menu">
					<li className="active"><Link to="/student"> DASHBOARD</Link></li>
					<li className=""><Link to="/student?mod=profile&view=list"> STUDENT PROFILE</Link></li>
					{/*<li className=""><Link to="/student?mod=results&view=list"> STATEMENT OF RESULTS</Link></li> */}
					<li className=""><Link to="/student?mod=registration&view=list"> SEMESTER REGISTRATION</Link></li>
					<li className=""><Link to="/student?mod=fees&view=list"> ACADEMIC FEES</Link></li>
					
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
			      */}
				</ul>
				<ul className="navbar-btns">
					<li><Link to="#" onClick={logout} className="btn btn-sm btn-outline btn-light"><em className="text-primary fas fa-lg fa-sign-out-alt" /><b> LOGOUT</b></Link></li>
				</ul>
			</div>
			</div>
		</div>
	  )

}

export default StudentNavbar;
