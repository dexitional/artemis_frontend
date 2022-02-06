import React,{ useState } from 'react'
import LoginLayout from '../../components/admission/LoginLayout';
import { Link } from 'react-router-dom';
import { recoverVoucher } from '../../store/utils/ssoApi';


const Recover = () => {
    const [ form,setForm ] = useState({})
    const [ error,setError ] = useState("")
    const [ msg,setMsg ] = useState("")
    
    const onChange = (e) => {
       setMsg('')
       setError('')
       setForm({...form, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
       e.preventDefault()
       const res = await recoverVoucher({phone:form.phone});
       console.log(res)
       if(res.success){
          setMsg("Voucher sent to provided phone number!")
       } else{
          setError(res.msg && res.msg.toUpperCase())
       }
    }

    //

    return (
        <LoginLayout>
            <h4>RECOVER VOUCHER SERIAL & PIN </h4><hr/>
            {msg && <p><em>{msg}</em></p>}
            <form action="#" method="post" onSubmit={onSubmit}>
                <div class="sc-giYgFv deECce do-u-mb--small is-invalid is-required">
                    <label for="code" class="sc-ezbkgU kuTQpq">
                        Phone Number Provided During Purchase.
                        <span class="sc-hiCivh iUXnyj">*</span>
                    </label>
                    <div class="sc-bYoCmx iazfkw">
                        <input id="code" type="tel" required="true" onChange={onChange} placeholder="Enter phone number" class={ error  ? `sc-kLwgWK sc-cCcYRi gbZHtk giVDkR`:`sc-cCcYRi gbZHtk giVDkR`} name="phone" value={form.phone} />
                        <div class="sc-gWXaA-D fzBOpH"></div>
                        <div class="sc-jcFkyM fwguu"></div>
                    </div>
                    { error && 
                    <div class="sc-ikJzcn fJNrxx">
                       <small class="sc-jJoQpE cmGyex required-err">{error}</small>
                    </div>
                    }
                </div>
                <label for="trust_device-undefined" class="sc-eJwXpk cRmOdb sc-faUofl gqfWkZ is-hidden">
                    <input name="trust_device" id="trust_device-undefined" type="checkbox" aria-label="Trust this device for 60 days?" class="sc-clIAKW kWqifs" value=""/>
                    <p class="sc-ehCIER iuOWZA">Trust this device for 60 days?</p>
                </label>
                <button type="submit" class="sc-eCImvq duZDlN sc-cxpRKc hxgtkf do-u-mt--medium">Recover  </button>
            </form>
            <small class="do-u-mb--small">Back to <Link to="/applicant" class="sc-gKckTs kNJaHk sc-iCfLBT fxyNsI sc-fotPbf duBHuL" rel="noopener noreferrer"><span class="sc-kDThTU bBpNfQ"></span><b>Admission Login</b></Link></small>
        </LoginLayout>
    )
}

export default Recover
