import React, { useState, useEffect }  from 'react';
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import './SSOReset.css';
import NationalIcon from '../../assets/img/icon-national-id.png'
import Adinkra from '../../assets/img/adinkra-bullet.png'
import Logo from '../../assets/img/logo.png'
import SSOResetForm from './SSOResetForm';
import SSOResetToken from './SSOResetToken';
import { Link,useHistory } from 'react-router-dom';
import SSOResetEmail from './SSOResetEmail';
import { useDispatch,useSelector} from 'react-redux'
import AlertBox from './students/components/AlertBox';
import { updateReset } from '../../store/admission/ssoSlice';

const SSOReset = () => {
	 const dispatch = useDispatch()
	 const sso = useSelector( state => state.sso)
	 const { reset } = sso;
     const history = useHistory();

	 const goBack = (e) => {
		e.preventDefault()
        // Cancel Login Reset
		dispatch(updateReset({...reset,view:'email',pass:'',rpass:'',token:'',email:'', mtoken:''}))
        history.push('/')
	 }
	 
	 const showPage = () => {
		console.log(reset)
		switch(reset && reset.view){
		   case 'token': return <SSOResetToken/>; break;
		   case 'form': return <SSOResetForm/>; break;
		   case 'email': return <SSOResetEmail/>; break;
		   default: return <SSOResetEmail/>; break;
	    }
	 }
	 
	  
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
										{/*<SSOResetEmail/>*/}
										{showPage()}

									    <Link className="login-form__link signin-form__forgot-password" onClick={goBack} style={{float:'right',textAlign:'right',fontSize:'12px',fontWeight:'bolder',marginTop:'25px',color:'#fb8730'}}><b>Cancel and Go back To Login !</b></Link>   
									</div>
									<AlertBox/>
								</div>
								<div className="footer">
									<div className="footer__inner">Copyright ©{new Date().getFullYear()} MIS-UIT, AUCC.<a href="#" target="_blank">Terms of Service</a>.</div>
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
