import React, { useEffect }  from 'react';
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import NationalIcon from '../../assets/img/icon-national-id.png'
import Adinkra from '../../assets/img/adinkra-bullet.png'
import { Link,useHistory } from 'react-router-dom'
import { verifySSOUser } from '../../store/utils/ssoApi';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setIsLoggedIn, setUser } from '../../store/admission/ssoSlice';

const SSOLoginLayout = ({children}) => {

	const [form,setForm] = useState({ username:'', password:'' })
    const [ usernameError,setUsernameError ] = useState(false)
    const [ passwordError,setPasswordError ] = useState(false)
	const [ error,setError ] = useState('')
    const [ authenticate,setAuthenticate ] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if(form.username == ''){
			setUsernameError(true);
        }else if(form.password == ''){
			setPasswordError(true);
        }else{
            try{
				// API
				setAuthenticate(true);
				const ap = await verifySSOUser({username:form.username,password:form.password})
				if(ap.success){
					const rec = ap.data;
					console.log(ap.data);
					// Set User Data
					dispatch(setUser(rec));
					// Goto Dashboard
					dispatch(setIsLoggedIn(true));
					// Reset Authentication Flag
					setAuthenticate(false);
					console.log(parseInt(rec.user.user_group))
					if(parseInt(rec.user.user_group) == 1){
					   console.log("STUDENTS DASHBOARD")
                       history.push('/student');  // Student Portal
					}else{
					   console.log("STAFF DASHBOARD")
                       history.push('/dash');  // Staff, NSS, Alumni, Others Portals
					}
					
				}else{
					setAuthenticate(false);
					setError(ap.msg)
				}
			}catch(e){
				console.log(e)
				setAuthenticate(false);
				setError("No Connection!")
			}
        }
    }
     
    const onChange = (e) => {
       setForm({...form,[e.target.name] : e.target.value})
       setPasswordError(false);
       setUsernameError(false);
	   setError('');
    }

	useEffect(()=>{
		var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
		(function(){
			var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
			s1.async=true;
			s1.src='https://embed.tawk.to/614b5c42d326717cb682d291/1fg760pit';
			s1.charset='UTF-8';
			s1.setAttribute('crossorigin','*');
			s0.parentNode.insertBefore(s1,s0);
		})();
	},[])


      return (
       <div id="main">
			<div className="layout">
				<div className="layout__logo"></div>
				<div className="layout__content">
					<div className="layout-login">
						<div className="layout-login__inner">
							<div className="layout-login__content">
								<div className="layout-login__title" style={{display:'none'}}>One account and entry into our university system!</div><br/><br/><br/><br/><br/>
								<div className="layout-login__subtitle" style={{marginBottom:'20px',fontWeight:'bolder',letterSpacing:'0.06em'}}>All University Services placed in one location for easy access.</div>
								<ul className="layout-login__text layout-login__list">
									<li className="layout-login__list__item"><img src={Adinkra} className="adinkra-bullet"/> Easy access to AUCC Staff Services.</li>
									<li className="layout-login__list__item"><img src={Adinkra} className="adinkra-bullet"/> Easy access to AUCC Student Services.</li>
									<li className="layout-login__list__item"><img src={Adinkra} className="adinkra-bullet"/> Easy access to AUCC NSS Services.</li>
									<li className="layout-login__list__item"><img src={Adinkra} className="adinkra-bullet"/> Easy access to AUCC Alumni Services.</li>
									<li className="layout-login__list__item"><img src={Adinkra} className="adinkra-bullet"/> Easy access to Prospective Staff Services.</li>
								</ul>
								<p> Reset AUCC Single-Sign-On (SSO) Password ? <Link className="layout-login__link" to="/ssoReset">Click here !</Link></p>
								<div className="layout-login__cards" >
									{/*<div className="layout-login__card layout-login__card_pink"></div>
									<div className="layout-login__card layout-login__card_blue"></div>*/}
									{/*<div className="layout-login__card layout-login__card_white"></div>
									<div className="layout-login__card layout-login__card_purple"></div>
									<div className="layout-login__card layout-login__card_black"></div>
								    */}
								</div>
							</div>
							<div className="layout-login__form">
								<div className="layout-login__form__inner">
									<div className="login-form signin-form">
										<div className="login-form__title">Single-Sign-On</div>
										<img src={NationalIcon} className="login-icon"/>
										{/*
										<div className="login-form__head">
											<Link className="login-form__link login-form__link_signup" to="/account/SSOReset"><b>JOIN AUCC !</b></Link>
										</div>
										*/}
										
										<form className="login-form__form" onSubmit={onSubmit} autoComplete={false} aut>
											<div className="login-form__field ae-input__input">
												<input type="email" name="username" value={form.username} onChange={onChange} placeholder="SSO USERNAME" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular ae-input__error"/>
												{ usernameError ? <span  className="f.username.errors and f.username.errors.required" class="ae-input__error-msg ae-input__font-roboto-regular">Please, enter correct SSO Username</span> : null}
											</div>

											<div className="login-form__field login-form__field_password ae-input__input">
												<input type="password" name="password" value={form.password} onChange={onChange} placeholder="SSO PASSWORD" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular ae-input__error" />
												{ passwordError ? <span className="f.password.errors and f.password.errors.required" className="ae-input__error-msg ae-input__font-roboto-regular">Please, enter the SSO Password</span> : null}
												{/*dsgform.password && form.password.length < 6 ? <span className="f.password.errors and f.password.errors.minlength" className="ae-input__error-msg ae-input__font-roboto-regular">Password must be at least 6 characters</span> : null*/}
											</div>
                                            {error ? <div class="login-form__error"><b>Incorrect SSO Username or Password !</b></div> : null}
											<Link className="login-form__link signin-form__forgot-password" to="/SSOReset"><b>Reset your password? </b></Link>
											<a className="login-form__link signin-form__forgot-password" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSccZFkI0JzisvrFmjyYLPSP7cGsdPnPotpKlk5rFjprUE9QHA/viewform" style={{color:"#f59f60",marginLeft:"10px"}}><b>Need assistance & help? </b></a>
											<button type="submit" className="login-form__submit-button ae-button__green ae-button__button"><span className="ae-button__label"><b>{ !authenticate ? 'SIGN IN':'AUTHENTICATING ...'}</b></span></button>
											<div style={{fontSize:'10px',fontWeight:'bolder',marginTop:'10px',fontSize:'11px'}}>*** Student sso username must be ( eg: xxxx@st.aucc.edu.gh ) <br/>*** Staff sso username must be ( eg: yyyy@aucc.edu.gh ) </div>
											<div className="gauth d-none">
												<button type="button" className="gauth__button ae-button__white ae-button__button"><span className="ae-button__label"> <i className="icon icon_gauth"></i> <b>SIGN IN WITH GOOGLE</b></span></button>
											</div>
										</form>

									</div>
								</div>
								<div className="footer">
									<div className="footer__inner">Copyright © {new Date().getFullYear()} UIT, AUCC.<a href="#" style={{display:'none'}} target="_blank">Terms of Service</a></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default SSOLoginLayout;
