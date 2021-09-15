import React, { Component }  from 'react';
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import './SSOReset.css';

const SSOResetEmail = () => {
      return (
        <form className="login-form__form">
			<div className="login-form__field ae-input__input">
				<input type="text" value="" placeholder="UCC SSO EMAIL" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular"/>
			</div>
			<button type="submit" className="login-form__submit-button ae-button__green ae-button__button">
				<b className="ae-button__label">SUBMIT</b>
			</button>
		</form>
      )
}

export default SSOResetEmail;
