import React, { Component }  from 'react';
import Logo from '../../../../assets/img/logo.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const StudentHeader = ({data,mod}) => {
	const dispatch = useDispatch();
	const { sso } = useSelector( state => state );
	const { user } = sso;	
	
	return (
		<div className="row">
		<div className="col-lg-6">
			<div className="token-statistics card card-token height-auto">
				<div className="card-innr">
					<div className="token-balance token-balance-with-icon">
						<div className="token-balance-icon"><img src={user.photo} style={{width:'200px',borderRadius:'5px'}} alt="logo"/></div>
						<div className="token-balance-text">
						  <h6 className="card-sub-title">{user.user.name}</h6>
						  <span className="lead">{user.user.indexno}</span><br/><br/>
					      <h6 className="card-sub-title"><span className="btitle"><b>{user.user.program_name} { user.user.major_name ? <><br/> [ <span style={{color:'#f58635'}}>{user.user.major_name && user.user.major_name.toUpperCase()}</span> ]</> : null } </b></span></h6>
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
					  <div className="col-12" style={{paddingRight:'5px',paddingLeft:'5px', paddingTop:'5px', paddingBottom:'5px'}}>
						<div className="token-currency-choose">
						  <div className="row">
							<div className="col-12">
								<div className="pay-option-label unit-cover">
									<h3 style={{textAlign:'center'}}><b> STUDENT PORTAL</b></h3>
								</div>
							</div>
							<div className="col-12">
								<div className="pay-option-label unit-cover">
									<h3 style={{textAlign:'center', color:'white'}}><b> {user.user.session_name ? `${user.user.session_year}, SEMESTER ${user.user.session_semester}` : 'NO ACTIVE SESSION SET'}</b></h3>
								</div>
							</div>
							
							<div className="col-12">
								{/*<marquee className="notice" behavior="scroll" direction="left" scrollamount="4">WELCOME! TO THE UNIVERSITY UNIFIED PORTAL. THIS PORTAL HOSTS THE RECRUITMENT OF STAFF THROUGH TO APPOINTMENT AND ALSO NATIONAL SERVICE PERSONS. </marquee>*/}
								<ul className="bread-crum">
									<li><Link to="#" className="active"><i className="fa fa-mobile-alt"></i>&nbsp;&nbsp;AIM APP</Link></li> 
									<li><Link to="/student">&nbsp;&nbsp;APP MENUS</Link></li>
									
								</ul>
							</div>
						  </div>
						</div>
					  </div>
					</div>
			</div>
		</div>
		<div className="col-lg-2"><button className="btn mb-2 btn-primary"><i className="fa fa-inbox"></i>&nbsp;&nbsp;<b>NOTIFICATIONS</b></button>
			<div className="token-information card token-padding app-cover">
				<img src={Logo} className="app-logo"/>
				<span className="app-id"> PORTAL</span>
			</div>
			
		</div>
	   
	</div>
	
	)

}

export default StudentHeader;
