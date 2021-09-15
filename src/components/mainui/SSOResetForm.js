import React, { Component }  from 'react';
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import './SSOReset.css';
import NationalIcon from '../../assets/img/icon-national-id.png'
import Adinkra from '../../assets/img/adinkra-bullet.png'
import Logo from '../../assets/img/logo.png'

const SSOResetForm = () => {
      return (
        <form className="login-form__form" action="#">
			<div className="login-form__field ae-input__input">
				<input type="password" value="" placeholder="SET NEW PASSWORD" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular"/>
			</div>
			<div className="login-form__field ae-input__input">
				<input type="password" value="" placeholder="REPEAT NEW PASSWORD" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular"/>
			</div>
			<button type="submit" className="login-form__submit-button ae-button__green ae-button__button"><span className="ae-button__label"><b>SAVE PASSWORD</b></span></button>
		</form>
	  )
}

export default SSOResetForm;
