import React, { useState,useEffect }  from 'react';
import { useDispatch,useSelector} from 'react-redux'
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import './SSOReset.css';
import NationalIcon from '../../assets/img/icon-national-id.png'
import Adinkra from '../../assets/img/adinkra-bullet.png'
import Logo from '../../assets/img/logo.png'
import { updateAlert, updateReset } from '../../store/admission/ssoSlice';
import { sendPwd } from '../../store/utils/ssoApi';
import { useHistory } from 'react-router';

const SSOResetForm = () => {
	
	const dispatch = useDispatch()
	const sso = useSelector( state => state.sso)
	const { reset } = sso;
	const [ data,setData ] = useState({})
	const [ isLoading,setIsLoading ] = useState(false)
	const history = useHistory();

	const onChange = (e) => {
	  console.log(e.target.value)
	  setData({...data, [e.target.name]:e.target.value})
	}

	const onSubmit = async(e) => {
	  e.preventDefault()
	  setIsLoading(true)
	  console.log(data);
	  if(data.pass && data.pass == data.rpass){
		const resp = await sendPwd({ email:data.email,password:data.pass })
		if(resp.success){
		  dispatch(updateAlert({show:true,message:`PASSWORD CHANGED!`,type:'success'}))
		  setData({...data,view:'email',pass:'',rpass:'',token:'',email:'', mtoken:''})
		  setIsLoading(false);
		  setTimeout(() => {
			history.push('/login')
		  },3000)
		
		}else{
		  dispatch(updateAlert({show:true,message:`PROCESS FAILED!`,type:'error'}))
		  setIsLoading(false);
		}
	  }else{
		dispatch(updateAlert({show:true,message:`PLEASE CHECK PASSWORDS!`,type:'error'}))
		setIsLoading(false);
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
		 <h3 className="login-form__title" style={{color:'#f59f60'}}>{data.email}</h3>
		 <div className="login-form__field ae-input__input">
			<input type="password" name="pass" onChange={onChange} value={data.pass} placeholder="SET NEW PASSWORD" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular"/>
		 </div>
		 <div className="login-form__field ae-input__input">
			<input type="password" name="rpass" onChange={onChange} value={data.rpass} placeholder="REPEAT NEW PASSWORD" className="ae-input__native-dark ae-input__native ae-input__font-roboto-regular"/>
		 </div>
		 <button type="submit" className="login-form__submit-button ae-button__green ae-button__button"><span className="ae-button__label"><b>{ isLoading ? 'PROCESSING ...' : 'SAVE PASSWORD'}</b></span></button>
	  </form>
	)
}

export default SSOResetForm;
