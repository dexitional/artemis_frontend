import React,{ useEffect } from 'react';
import '../../../../assets/css/ui-vendor.css';
import '../../../../assets/css/ui-style.css';
import { useParams,useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import SSOTopNav from '../../SSOTopNav';
import StudentNavbar from '../components/StudentNavbar';
import StudentPageLoad from '../components/StudentPageLoad';
import StudentHeader from '../components/StudentHeader';
import AlertBox from '../components/AlertBox';
import DialogBox from '../components/DialogBox';
import { updateDialog } from '../../../../store/admission/ssoSlice';

const StudentLayout = () => {
	
	const dispatch = useDispatch();
	const { sso } = useSelector( state => state );
	const history = useHistory();
	const useQuery = () => {
	  return new URLSearchParams(useLocation().search);
	}
	const query = useQuery();
    const mod  = query.get('mod');
	const view  = query.get('view');
	const recid  = query.get('recid');
	
	if(!sso || !sso.isLoggedIn){
	   history.push('/login');
	}

	if(!sso.user && (sso.user && sso.user.user.user_group && parseInt(sso.user.user.user_group) > 1)){
		history.push('/login');
	}

	const checkNotes = () => {
       // Display Notifications
	   if(sso.user && sso.user.user.flag_profile_lock == 0){
		 dispatch(updateDialog({...sso.dialog, title:'<b>GENERAL STUDENT NOTIFICATION</b><hr/>',content:`Greetings <b>${sso.user.user.fname}</b>! Please click on <b>GOTO</b> to update your Student Profile. This exercise is mandatory to all active students of AUCC.<br/><br/>Choose <b>CHANGE</b> to bring the Edit Form and provide the needed information. Thank you !`, url:'student?mod=profile&view=list',show:true}))
	   }
	}
	
   
	useEffect(()=>{
       checkNotes()
	},[])
	
    return (
	  <div>
		{/* Header */}
		<div className="topbar-wrap">
		   <SSOTopNav/>
		   <StudentNavbar/>
        </div>

		{/* Content */}
		<div className="page-content">
		   <div className="container">
			  <StudentHeader mod={mod}/>
			  <StudentPageLoad mod={mod} view={view} recid={recid}/>
			  <AlertBox/>
			  <DialogBox/>
		   </div>
		</div>
		



		   <div className="footer-bar d-none">
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

export default StudentLayout;
