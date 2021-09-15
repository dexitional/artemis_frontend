import React, { Component }  from 'react';
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

const SSOReset = () => {
      return (
        <div id="main">
			<div className="layout">
				
				<div className="layout__content">
					<div className="layout-login">
						<div className="layout-login__inner">
							<div className="layout-login__form layout-login__reset">
								<div className="layout-login__form__inner">
									<div className="login-form__head"></div>
									<div className="login-form signin-form">
										<div className="login-form__title">SSO PASSWORD RESET</div>
										<img src={Logo} className="login-icon"/>
										{/* Content */}
										{/*<SSOResetForm/>*/}
										{/*<SSOResetToken/>*/}
										<SSOResetEmail/>
									    <Link className="login-form__link signin-form__forgot-password" to="/login" style={{float:'right',textAlign:'right',fontSize:'12px',fontWeight:'bolder',marginTop:'25px',color:'#fb8730'}}><b>Cancel and Go back To Login !</b></Link>   
									</div>
								</div>
								<div className="footer">
									<div className="footer__inner">Copyright © {new Date().getFullYear()} MIS-UIT, AUCC.<a href="#" target="_blank">Terms of Service</a>.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	
      )
}

export default SSOReset;
