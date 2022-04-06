import React, { Component, useState }  from 'react';
import '../../assets/css/ui-vendor.css';
import '../../assets/css/ui-style.css';
import { Link, useParams,useLocation } from 'react-router-dom';
import SSOTopNav from './SSOTopNav';
import SSONavbar from './SSONavbar';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import SSORoleMenu from './SSORoleMenu';
import SSORole from './SSORole';
import SSOModuleHead from './SSOModuleHead';
import SSOModuleBody from './SSOModuleBody';
import AlertBox from './students/components/AlertBox';
import DialogBox from './students/components/DialogBox';


const SSOModuleLayout = () => {
	
	const dispatch = useDispatch();
	const { sso } = useSelector( state => state );
	const history = useHistory();
	const useQuery = () => {
	  return new URLSearchParams(useLocation().search);
	}
	const query = useQuery();
    const { module }  = useParams();
	const mod  = query.get('mod');
	const view  = query.get('view');
	const recid  = query.get('recid');
	const data = sso.user.roles && sso.user.roles.find( r => r.app_tag == module);
	const [ isMobile,setIsMobile ] = useState(false) 
	  
	const setMobile = (bool) => {
		setIsMobile(bool)
	}

	if(!sso || !sso.isLoggedIn){
	   history.push('/login');
	}
    if(!data){
	   history.push('/dash');
	}
	
    return (
	  <div>
		{/* Header */}
		<div className="topbar-wrap">
		   <SSOTopNav isMobile={isMobile} setMobile={setMobile} />
		   <SSONavbar isMobile={isMobile} setMobile={setMobile} />
        </div>

		{/* Content */}
		<div className="page-content">
		   <div className="container">
			  {/* Menu */}
			  <SSORoleMenu data={data} mod={mod}/>
			  {/* Content Page */}
			  <SSOModuleHead module={module} mod={mod} view={view} data={data} recid={recid}/>
			  <SSOModuleBody module={module} mod={mod} view={view} data={data} recid={recid}/>

			</div>
		</div>
		<AlertBox/>
	    <DialogBox/>



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

export default SSOModuleLayout;
