import React, { Component }  from 'react';
import '../../assets/css/ui-vendor.css';
import '../../assets/css/ui-style.css';
import LogoP from '../../assets/img/logo_portal.png'
import { Fragment } from 'react';
import { useSelector } from 'react-redux'

const SSOTopNav = () => {
      const { sso } = useSelector( state => state)
	  const { user } = sso;
	  return (
		<Fragment>
		<div className="topbar is-sticky">
			<div className="container">
				<div className="d-flex justify-content-between align-items-center">
				<ul className="topbar-nav d-lg-none">
					<li className="topbar-nav-item relative">
						<a className="toggle-nav" href="#">
							<div className="toggle-icon">
								<span className="toggle-line" />
								<span className="toggle-line" />
								<span className="toggle-line" />
								<span className="toggle-line" />
							</div>
						</a>
					</li>
				</ul>
				
				<a className="topbar-logo" href="/dash"><img src={LogoP} srcSet={LogoP} alt="logo" /></a>
				<ul className="topbar-nav">
					<li className="topbar-nav-item relative">
						<span className="user-welcome d-none d-lg-inline-block">WELCOME ! { user && user.user.name || (user.user.fname+' '+user.user.lname)	 }</span><a className="toggle-tigger user-thumb" href="#"><em className="ti ti-user" /></a>
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