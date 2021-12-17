import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import './SSOReset.css';
import NationalIcon from '../../assets/img/icon-national-id.png'
import Adinkra from '../../assets/img/adinkra-bullet.png'
import Logo from '../../assets/img/logo.png'
import SSOResetForm from './SSOResetForm';
import SSOResetToken from './SSOResetToken';
import { Link } from 'react-router-dom';
import SSOResetEmail from './SSOResetEmail';

const SSODash = () => {
	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
      return (
		<div className="row">
			        {user.roles.map((role,i) =>  
					<Fragment> 
					<div className="col-lg-6">
				    <div className="token-information card card-full-height">
				    <h3 className="sub-head"><span style={{fontSize:'.9rem', color:'#eee'}}>{role.app_name && role.app_name.toUpperCase() } ({role.app_tag.toUpperCase()})</span></h3>
					<div className="row no-gutters height-100">
						<div className="col-md-6">
							<div className="token-info">
								<em className="fas fa-3x fa-user-lock text-info" />
								<div className="gaps-2x" />
								<div><Link to={{ pathname:'/app', data: role }} title={role.role_desc.toUpperCase()} className="btn btn-primary"><b>{role.role_name} ROLE</b></Link></div>
							</div>
						</div>
						
						
						<div className="col-md-6">
							<div className="token-info">
								<em className="fas fa-3x fa-file-pdf text-info" />
								<div className="gaps-2x" />
								<div><Link to="#" className="btn btn-primary"><b>{role.app_tag.toUpperCase()} GUIDE</b></Link></div>
							</div>
						</div>
								
						<div className="col-md-3 d-none">
							<div className="token-info">
								<em className="fas fa-3x fa-headset text-info" />
								<div className="gaps-2x" />
								<div><Link to="#" className="btn btn-primary"><b>DHR HELPDESK</b></Link></div>
							</div>
						</div>
					</div>
					</div>
			        </div>
					</Fragment>
					)}
				   
		</div>
      )
}

export default SSODash;
