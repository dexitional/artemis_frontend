import React, { Component }  from 'react';
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import './SSOReset.css';
import NationalIcon from '../../assets/img/icon-national-id.png'
import Adinkra from '../../assets/img/adinkra-bullet.png'
import Logo from '../../assets/img/logo.png'

const SSOResetToken = () => {
      return (
        <form className="login-form__form" action="sso_reset_form.html">
			<div className="login-form__field ae-input__input">
				<input type="text" value="" placeholder="SSO OTP" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular"/>
			</div>
			<div style={{clear:'both'}}>
			  <a className="login-form__link signin-form__forgot-password" href="#" style={{float:'left',textAlign:'right',fontSize:'12px',fontWeight:'bolder'}}>Re-Send OTP</a>   
			  <a className="login-form__link signin-form__forgot-password" href="#" style={{float:'right',textAlign:'right',fontSize:'12px',fontWeight:'bolder'}}>Send OTP by Email</a>   
			</div>
			
			<button type="submit" className="login-form__submit-button ae-button__green ae-button__button"><span className="ae-button__label"><b>VERIFY</b></span></button>
			<div style={{fontSize:'10px',fontWeight:'bolder',marginTop:'10px',fontSize:'11px'}}>*** Please Check Phone for SSO OTP ! </div>
		</form>

	  )
}

export default SSOResetToken;
