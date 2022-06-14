import React, { Component }  from 'react';
import '../../assets/css/ui-vendor.css';
import '../../assets/css/ui-style.css';
import LogoP from '../../assets/img/logo_portal.png'
import { Fragment } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { Link,useHistory } from 'react-router-dom';
import { switchAccount } from '../../store/utils/ssoApi';
import { setIsLoggedIn, setUser, updateAlert } from '../../store/admission/ssoSlice';

const SSOTopNav = ({ isMobile,setMobile }) => {
      const { sso } = useSelector( state => state)
	  const { user } = sso;
	  const dispatch = useDispatch()
	  const history = useHistory()
	  
	  const setIsMobile = (bool) => {
          setMobile(bool)
		  //alert(isMobile)
	  }

	  const switchAccess = async (tag) => {
		const ok = window.confirm("Switch Access ?")
		if(ok){
			const rt = await switchAccount(tag)
			if(rt.success){
			//dispatch(setUser(null))
			dispatch(updateAlert({show:true,message:`ACCESS SWITCHED TO ADMIN !`,type:'success'}))
			setTimeout(()=> {
					var rec = rt.data;
					// Set User Data
					dispatch(setUser(rec));
					// Goto Dashboard
					dispatch(setIsLoggedIn(true));
					// Reset Authentication Flag
					if(parseInt(rec.user.user_group) == 1){
					history.push('/student');  // Student Portal
					}else{
					history.push('/dash');  // Staff, NSS, Alumni, Others Portals
					}
			}, 2000)
			// Account Reset Successfully!
			}else{ dispatch(updateAlert({show:true,message:rt.msg.toUpperCase(),type:'error'})) }
		}
	  }

	  return (
		<Fragment>
		<div className="topbar is-sticky">
			<div className="container">
				<div className="d-flex justify-content-between align-items-center">
				<ul className="topbar-nav d-lg-none">
					<li className="topbar-nav-item relative">
						<a className={ isMobile ? 'toggle-nav active':'toggle-nav'} onClick={ () => setIsMobile(!isMobile) }> {/* toggle-nav active */}
							<div className="toggle-icon">
								<span className="toggle-line" />
								<span className="toggle-line" />
								<span className="toggle-line" />
								<span className="toggle-line" />
							</div>
						</a>
					</li>
				</ul>
				
				<Link className="topbar-logo" to={ user && user.user.user_group == "01" ? '/student':'/dash' }><img src={LogoP} srcSet={LogoP} alt="logo" /></Link>
				<ul className="topbar-nav">
					<li className="topbar-nav-item relative">
						<span className="user-welcome d-none d-lg-inline-block">WELCOME ! { user && user.user.name || (user.user.fname+' '+user.user.lname)}</span>
						{ (user && user.user.access) && <a className="toggle-tigger user-thumb" style={{ background:'rgb(245, 134, 53)',color:'#fff' }} onClick={() => switchAccess(user.user.access) } ><em className="fa fa-times-circle"/></a> }
						
						<div className="toggle-class dropdown-content dropdown-content-right dropdown-arrow-right user-dropdown">
							<ul className="user-links">
						    	<li><a href="#"><i className="ti ti-id-badge" />My Profile</a></li>
							    <li><a href="#"><i className="ti ti-power-off" />Logout</a></li>
							</ul>
						</div>
					</li>
				</ul>
			   </div>
			</div>
		</div>
		</Fragment>
	  )
}

export default SSOTopNav;
