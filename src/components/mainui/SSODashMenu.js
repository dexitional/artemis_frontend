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
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';


const SSODashMenu = () => {
	const dispatch = useDispatch();
	const { sso } = useSelector( state => state );
	const { user } = sso;	

	return (
		<div className="row">
				 <div className="col-lg-5">
					<div className="token-statistics card card-token height-auto">
						<div className="card-innr">
							<div className="token-balance token-balance-with-icon">
								<div className="token-balance-icon"><img src={Logo} style={{width: '200px'}} alt="logo" /></div>
								<div className="token-balance-text">
									<h6 className="card-sub-title">{user && (user.user.fname+' '+user.user.mname+' '+user.user.lname)}</h6>
									<span className="lead">{user && user.user.staff_no}<span> -- ( { user && user.user.staff_status} STAFF )</span></span>
									<h6 className="card-sub-title">{user.user.designation}<br /><span className="btitle"><b>DESIGNATION</b></span></h6>
									
									{/*
									<hr />
									<h6 className="card-sub-title">{user.user.designation}<br /><span className="btitle"><b>DESIGNATION</b></span><br /><br /></h6>
									<h6 className="card-sub-title">{user.user.staff_group}<br /><span className="btitle"><b>STAFF CATEGORY</b></span></h6>
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
				<div className="col-lg-5">
						<div className="token-information card card-full-height cardbox-full-height token-padding">
							<div className="row">
							<div className="col-12">
								<div className="token-currency-choose">
									<div className="row">
										<div className="col-12" style={{marginBottom: '10px'}}>
										  <div className="pay-option-label unit-cover">
										  <h6><b>USERNAME : {user.user.inst_mail ? user.user.inst_mail.toUpperCase():'NOT SET'}</b></h6>
										</div>
									</div>
									<div className="col-12 d-none">
										<div className="pay-option">
											<label className="pay-option-label" htmlFor="learn"><span className="pay-title"><span className="pay-cur">PHONE : {user.user.phone}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span className="pay-cur">DOB : {moment(user.user.dob).format('MMM DD, YYYY')}</span></span></label>
										</div>
									</div>
									<br />
									<div className="col-12 d-none">
										<div className="pay-option-label unit-cover">
										<h6><b>{user.user.unitname}</b></h6>
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
				<div className="col-lg-2">
					<div className="token-information card card-full-height cardbox-full-height dash-cover">
						<div className="row no-gutters height-100">
							<div className="col-md-12 text-center">
							{/*
							<div class="gaps-2x"></div>
							*/}
							<img src={`https://portal.aucc.edu.gh/api/photos/?tag=00000000`} className="dash-photo" style={{display: 'block', alignSelf: 'top',height:'215px'}} />
							</div>
						</div>
					</div>
					{/* .card */}
				</div>
			 </div>
	  )

}

export default SSODashMenu;
