import React, {useState} from 'react'
import LoginLayout from '../../components/admission/LoginLayout';
import { Link,useHistory } from 'react-router-dom';
import { setIsLoggedIn, setIsModal, setMeta, setStepCount } from '../../store/admission/stepSlice';
import { setAccount, setAdmission, setAdmitStatus, setApplyMode, setChoice, setDocument, setEducation, setGrade, setGroupID, setGuardian, setNotification, setProfile, setResult, setSellType, setStage, setSubmitStatus, setUser, updateUser } from '../../store/admission/applicantSlice';
import { useDispatch } from 'react-redux';
import { verifyApplicant } from '../../store/utils/admissionApi';
import { getApplyTypeTitle, getStage, getStageTitle } from '../../store/utils/admissionUtil';
import moment from 'moment';

const Login = () => {
    const [form,setForm] = useState({})
    const [ serialError,setSerialError ] = useState(false)
    const [ pinError,setPinError ] = useState(false)
    const [ authenticate,setAuthenticate ] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();
    /*
    const users = [
        { serial:'12345678', pin:'test1234', name:'Applicant Test 1'},
        { serial:'87654321', pin:'test4321', name:'Applicant Test 2'},
    ]
    
    
    */

    const onSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(form.voucher == ''){
          setSerialError(true);
        }else if(form.pin == ''){
          setPinError(true);
        }else{
          try{
          // API
          setAuthenticate(true);
          const ap = await verifyApplicant({serial:form.serial,pin:form.pin})
          if(ap.success){
              const rec = ap.data;
              console.log(rec)
              // Format Data fields for Forms
              if(rec.data.profile){
                rec.data.profile.dob = moment(rec.data.profile.dob).format('YYYY-MM-DD')
              }
              // Configure Application
              dispatch(setApplyMode(rec.apply_type));
              dispatch(setStage(rec.stage_id));
              // Setup Form Meta & Steps
              dispatch(setStepCount(rec.count));
              dispatch(setMeta(rec.meta));
              dispatch(setSubmitStatus(rec.flag_submit))
              dispatch(setGroupID(rec.group_id))
              dispatch(setSellType(rec.sell_type))
              // Setup User info
              const user = { serial:form.serial, pin:form.pin, photo: rec.user.photo, name: (rec.stage_id ? getStageTitle(rec.stage_id):'')+(rec.apply_type ? ' | '+getApplyTypeTitle(rec.apply_type):'')}
              dispatch(setUser(user));
              // Setup Notifications
              dispatch(setNotification(rec.notification));
              // Setup User Form Data
              if(rec.data.profile) dispatch(setProfile(rec.data.profile))
              if(rec.data.guardian) dispatch(setGuardian(rec.data.guardian))
              if(rec.data.education) dispatch(setEducation(rec.data.education))
              if(rec.data.result){
                dispatch(setResult(rec.data.result))
                if(rec.data.grade) dispatch(setGrade(rec.data.grade))
              } 
              if(rec.data.choice) dispatch(setChoice(rec.data.choice))
              if(rec.data.document) dispatch(setDocument(rec.data.document))
              //if(rec.data.referee) dispatch(setReferee(rec.data.referee))
              //if(rec.data.employment) dispatch(setEmployment(rec.data.employment))
              //if(rec.data.qualification) dispatch(setQualification(rec.data.qualification))
              // dispatch(updateUser(user));
              
              // Setup Admission & Accounts
              dispatch(setAdmitStatus(rec.flag_admit))
              dispatch(setAdmission(rec.admission))
              dispatch(setAccount(rec.account))

              // Goto Dashboard
              dispatch(setIsLoggedIn(true));
              dispatch(setIsModal(false));
              // Reset Authentication Flag
              setAuthenticate(false);
              // Redirect to Dashboard
              history.push('admission-dash');
          }else{
            setAuthenticate(false);
            alert(ap.msg.toUpperCase())
          }
         }catch(e){
           setAuthenticate(false);
           alert("Connection lost!")
         }
        }

        
    }
     
    const onChange = (e) => {
       setForm({...form,[e.target.name] : e.target.value})
       setPinError(false);
       setSerialError(false);
       console.log(form);
    }
    
    return (
       <LoginLayout>
            <h2><small><b style={{fontSize:'8px!important',letterSpacing:'0.02em'}}>AUCC APPLICANTS PORTAL</b></small><hr/></h2>
            <form onSubmit={onSubmit} autoComplete="none">

                <div className={ serialError ? "sc-giYgFv deECce do-u-mb--small is-invalid is-required" : "sc-giYgFv deECce do-u-mb--small is-required"}>
                    <label className="sc-ezbkgU kuTQpq">Voucher Serial Number <span className="sc-hiCivh iUXnyj">*</span></label>
                    <div className="sc-bYoCmx iazfkw">
                        <input id="email" type="number" onChange={onChange} name="serial" value={form.serial}  placeholder="Enter your Serial Number" autoComplete="none" className="sc-kLwgWK sc-cCcYRi gbZHtk giVDkR" />
                        <div className="sc-gWXaA-D fzBOpH" />
                        <div className="sc-jcFkyM fwguu" />
                    </div>
                    { serialError ? 
                    <div className="sc-ikJzcn fJNrxx">
                       <div className="sc-jJoQpE cmGyex required-err">Serial # is required</div>
                    </div> : ''
                    }
                </div>

                <div className={ serialError ? "sc-giYgFv deECce do-u-mb--small is-invalid is-required" : "sc-giYgFv deECce do-u-mb--small is-required"}>
                    <label className="sc-ezbkgU kuTQpq">Voucher Pin <span className="sc-hiCivh iUXnyj">*</span></label>
                    <div className="sc-bYoCmx iazfkw">
                        <input id="password" type="password" onChange={onChange} name="pin" value={form.pin}   placeholder="Enter your Pin" autoComplete="false" className="sc-kLwgWK sc-cCcYRi gbZHtk giVDkR" />
                        <div className="sc-gWXaA-D fzBOpH" />
                        <div className="sc-jcFkyM fwguu" />
                        { pinError ? 
                        <div className="sc-ikJzcn fJNrxx">
                           <div className="sc-jJoQpE cmGyex required-err">Pin is required</div>
                        </div> : ''
                        }
                    </div>
                </div>
                
                <button type="submit" className="sc-eCImvq duZDlN sc-cxpRKc hxgtkf">{ authenticate ? ' Authenticating...':'Log In'} </button>

            </form>

            <div className="sc-AjmZR juOfWY" style={{textAlign: 'left'}}>
                <Link className="sc-gKckTs kNJaHk sc-iCfLBT fxyNsI sc-bBHwJV hDsuPB" to="recover-voucher" rel="noopener noreferrer">
                    <span className="sc-kDThTU bBpNfQ" /><small><b>Lost your Pin?</b></small>
                </Link>
            </div>
            <div className="eWLxTJ"><center><small style={{fontSize: '11px'}}><b>© {new Date().getFullYear()} African University College of Communications.</b></small></center></div>
       </LoginLayout>
    )
}

export default Login
