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
		<>
		
		<div className="row">
		<div className="col-lg-6">
			<div className="token-statistics card card-token height-auto">
				<div className="card-innr">
					<div className="token-balance token-balance-with-icon">
						<div className="token-balance-icon"><img src={user.photo} style={{width:'200px',borderRadius:'5px'}} alt="logo"/></div>
						<div className="token-balance-text">
							<h6 className="card-sub-title">{user.user.names}{user && (user.user.fname+' '+user.user.mname+' '+user.user.lname)}</h6><span className="lead"> STAFF NO: {user && user.user.staff_no}</span>
						 {/*<h6 className="card-sub-title">SENIOR ICT ASSISTANT<br><span className="btitle"><b>DESIGNATION</b></span><br><br></h6>
							<h6 className="card-sub-title">SENIOR MEMBER<br><span className="btitle"><b>STAFF CATEGORY</b></span></h6> */}
						</div> 
					</div>
				</div>
				<div style={{height:'6px',width:'100%',background:'seashell',display:'flex',marginBottom:'10px'}}>
					 <div style={{flex:2,height:'100%',background:'#555'}}></div>
					 <div style={{flex:3,height:'100%',background:'#f58635'}}></div>
					 <div style={{flex:2,height:'100%',background:'#555'}}></div>
				</div>
			</div>
		</div>
		<div className="col-lg-4">
			<div className="token-information card token-padding">
					<div className="row">
					  <div className="col-12">
						<div className="token-currency-choose">
						  <div className="row">
							<div className="col-12">
								<div className="pay-option-label unit-cover">
									<h3 style={{textAlign:'center'}}><small><b> { user.user.designation || user.user.inst_mail }</b></small></h3>
								</div>
							</div>
							<div className="col-12">
								{/*<marquee className="notice" behavior="scroll" direction="left" scrollamount="4">WELCOME! TO THE UNIVERSITY UNIFIED PORTAL. THIS PORTAL HOSTS THE RECRUITMENT OF STAFF THROUGH TO APPOINTMENT AND ALSO NATIONAL SERVICE PERSONS. </marquee>*/}
								<ul className="bread-crum">
									{ false ?
									  <li><Link to={{ pathname:'/app'}} className="active"><i className="fa fa-arrow-left"></i> AMS MENU</Link></li> : 
									  <li><Link to="/app/alu?mod=profile&view=showprofile" className="active"><i className="fa fa-user"></i>&nbsp;&nbsp;PROFILE</Link></li> 
									}
									<li><Link to="/dash">HELPDESK</Link></li>
									
								</ul>
							</div>
						  </div>
						</div>
					  </div>
					</div>
			</div>
		</div>
		<div className="col-lg-2">
			<div className="token-information card token-padding app-cover">
				<img src={Logo} className="app-logo"/>
				<span className="app-id">STAFF</span>
			</div>
		</div>
	   
	</div>
 

		</>
	  )

}

export default SSODashMenu;
