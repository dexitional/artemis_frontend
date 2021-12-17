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
import SSOTopNav from './SSOTopNav';
import SSONavbar from './SSONavbar';
import SSODashMenu from './SSODashMenu';
import SSODash from './SSODash';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import AlertBox from './students/components/AlertBox';
import DialogBox from './students/components/DialogBox';


const SSOPageLayout = () => {
	
	const dispatch = useDispatch();
	const { sso } = useSelector( state => state );
	const history = useHistory();
	
	if(!sso.isLoggedIn){
	   history.push('/login');
	}
    
    return (
	  <div>
		{/* Header */}
		<div className="topbar-wrap">
		   <SSOTopNav/>
		   <SSONavbar/>
        </div>

		{/* Content */}
		<div className="page-content">
		   <div className="container">
			  {/* Menu */}
			  <SSODashMenu/>
			  {/* Content Page */}
			  <SSODash/>
			  <AlertBox/>
			  <DialogBox/>

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
		
		</div>
	
      
	  )
}

export default SSOPageLayout;
