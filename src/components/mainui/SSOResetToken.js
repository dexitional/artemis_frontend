import React, { useState,useEffect }  from 'react';
import { useDispatch,useSelector} from 'react-redux'
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import './SSOReset.css';
import NationalIcon from '../../assets/img/icon-national-id.png'
import Adinkra from '../../assets/img/adinkra-bullet.png'
import Logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom';
import { setReset, updateAlert, updateReset } from '../../store/admission/ssoSlice';
import { sendOtp, verifyOtp } from '../../store/utils/ssoApi';

const SSOResetToken = () => {
	  
	  const dispatch = useDispatch()
	  const sso = useSelector( state => state.sso)
	  const { reset } = sso;
	  const [ data,setData ] = useState({ mtoken:'' })
	  const [ isLoading,setIsLoading ] = useState(false)
	  
	  const onChange = (e) => {
		setData({...data, [e.target.name]:e.target.value})
	  }

	  const onSubmit = async(e) => {
		e.preventDefault()
		setIsLoading(true)
		if(data.mtoken){
		  const resp = await verifyOtp({email:data.email, token:data.mtoken})
		  if(resp.success){
			setData({...data,view:'form'})
			setIsLoading(false);
		  }else{
			dispatch(updateAlert({show:true,message:`WRONG SSO OTP!`,type:'error'}))
			setIsLoading(false);
		  }
		}else{
		  dispatch(updateAlert({show:true,message:`PLEASE ENTER OTP!`,type:'error'}))
		  setIsLoading(false);
		}
	  }

	  const onResend = async(e) => {
		if(data.email){
		  const resp = await sendOtp({email:data.email})
		  if(resp.success){
			setData({...data,token:resp.data})
			dispatch(updateAlert({show:true,message:`SSO OTP SENT!`,type:'warning'}))
		  }else{
		    dispatch(updateAlert({show:true,message:`SSO OTP NOT SENT!`,type:'error'}))
		  }
		}
	  }

	  useEffect(() => {
		setData({...reset})
	  },[])

	  useEffect(() => {
		dispatch(updateReset({...data}))
	  },[data])

      return (
        <form className="login-form__form" onSubmit={onSubmit}>
			<div className="login-form__field ae-input__input">
			   <input type="text" maxLength={4} name="mtoken" value={data.mtoken} onChange={onChange} placeholder="SSO OTP" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular"/>
			</div>
			<div style={{clear:'both'}}>
			  <Link className="login-form__link signin-form__forgot-password" onClick={(e) => onResend(e)} style={{float:'left',textAlign:'right',fontSize:'12px',fontWeight:'bolder'}}>Resend OTP?</Link>   
			  { false && <a className="login-form__link signin-form__forgot-password" href="#" style={{float:'right',textAlign:'right',fontSize:'12px',fontWeight:'bolder'}}>Send OTP by Email</a>}  
			</div>
			
			<button type="submit" className="login-form__submit-button ae-button__green ae-button__button"><span className="ae-button__label"><b>{ isLoading ? 'VERIFYING ...':'VERIFY OTP'}</b></span></button>
			<div style={{fontSize:'10px',fontWeight:'bolder',marginTop:'10px',fontSize:'11px'}}>*** Please Check Phone for SSO OTP ! </div>
		</form>

	  )
}

export default SSOResetToken;
