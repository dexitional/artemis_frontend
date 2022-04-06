import React, { Component, useState }  from 'react';
import '../../assets/css/ui-vendor.css';
import '../../assets/css/ui-style.css';
import SSOTopNav from './SSOTopNav';
import SSONavbar from './SSONavbar';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import SSORoleMenu from './SSORoleMenu';
import SSORole from './SSORole';
import AlertBox from './students/components/AlertBox';
import DialogBox from './students/components/DialogBox';


const SSORoleLayout = ({location:{data}}) => {
	
	const { sso } = useSelector( state => state );
	const history = useHistory();
    const [ isMobile,setIsMobile ] = useState(false) 
	  
	const setMobile = (bool) => {
	  setIsMobile(bool)
	}
	
	if(!sso.isLoggedIn){
	   history.push('/account/ssoLogin');
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
			  <SSORoleMenu data={data}/>
			  <SSORole data={data}/>
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

export default SSORoleLayout;
