import React, { useState,useEffect }  from 'react';
import { useDispatch,useSelector} from 'react-redux'
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import { setReset, updateAlert, updateReset } from '../../store/admission/ssoSlice';
import { sendOtp } from '../../store/utils/ssoApi';
import './SSOReset.css';

const SSOResetEmail = () => {

	const dispatch = useDispatch()
	const sso = useSelector( state => state.sso)
	const { reset } = sso;
	const [ data,setData ] = useState({email:'', pass:'', rpass:'', token:'', mtoken:'', view:'email'})
	const onChange = (e) => {
	   setData({...data, [e.target.name]:e.target.value})
	}
    
	const onSubmit = async(e) => {
       e.preventDefault()
	   if(data.email){
		   const resp = await sendOtp({email:data.email})
		   console.log(resp)
		   if(resp.success){
			   console.log(resp.data)
			   setData({...data,token:resp.data.otp,email:resp.data.email,view:'token'})
           }else{
			 dispatch(updateAlert({show:true,message:`${resp.msg.toUpperCase()}`,type:'error'}))
		   }
	   }else{
		   dispatch(updateAlert({show:true,message:`PLEASE ENTER SSO USERNAME!`,type:'error'}))
	   }
	}

	useEffect(() => {
      setData({...reset})
	},[])

	useEffect(() => {
	  dispatch(setReset({...data}))
	},[data])


	return (
	<form className="login-form__form" onSubmit={onSubmit}>
		<div className="login-form__field ae-input__input">
			<input type="text" name="email" value={data.email} onChange={(e) => onChange(e)} placeholder="SSO USERNAME OR PHONE" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular"/>
		</div>
		<button type="submit" className="login-form__submit-button ae-button__green ae-button__button">
			<b className="ae-button__label">SUBMIT</b>
		</button>
	</form>
	)
}

export default SSOResetEmail;
