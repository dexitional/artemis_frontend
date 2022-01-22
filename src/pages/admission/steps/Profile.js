import React, { useEffect, useCallback, useState, useRef, Fragment } from 'react'
import PhotoImg from '../../../assets/img/add_photo.png';
import Session from '../Session';
import { useSelector,useDispatch } from 'react-redux';
import { setUser, updateProfile } from '../../../store/admission/applicantSlice';
import { convertBase64 } from '../../../store/utils/admissionUtil';
import { helperData } from '../../../store/utils/helperData';
import { convertPhoto } from '../../../store/utils/admissionApi';
import Resizer from "react-image-file-resizer";
import { loadAMSHelpers } from '../../../store/utils/ssoApi';

const Profile = () => {
    
    const [ helper,setHelper ] = useState({ countries:[],adm_programs:[] });
    const { step,applicant } = useSelector(state => state)
    const dispatch = useDispatch();
    const required = ['title','lname','fname','mstatus','dob','gender','citizen_country','resident_country','home_region','religion','present_occupation','work_place','bond_status','disabled','phone','email','pobox_address','resident_address','session_mode'];
    const [form,setForm] = useState({});
    const photoRef = useRef();

    const onChange = useCallback((e) => {
       setForm({...form,[e.target.name] : e.target.value })
       dispatch(updateProfile({[e.target.name] : e.target.value }))
    },[form])

    const onSubmit = (e) => {
       alert("Submitted");
    }

    const photoChange = async (e) => {
       const f = e.target.files[0];
       if(f && f.type.match('image.*')){
          const base64 = await convertBase64(f);
          // Resizing & Compression from Backend
          try {
            Resizer.imageFileResizer(
              f,
              192, // max-width
              192, // max-height
              "JPEG", // compress format
              100,  // quality
              0,  // rotation
              (uri) => {
                console.log(uri);
                localStorage.setItem('photo_con', uri);
                dispatch(setUser({...applicant.user,photo:uri}))
              },
              "base64",
            );
          } catch (err) {
            console.log(err);
          }
       }
    }

    const clickPhoto = () => {
        photoRef.current.click();
    }
    
    const isDirty = useCallback((tag) => {
        const vs = required.find(row => row === tag);
        const ms = form[tag];
        if(vs){
            if(ms && ms !== ''){ return false;}
            else{ return true; }
        }   return false;
    },[form])

    const helperLoader = async() => {
        const hps = await loadAMSHelpers()
        if(hps.success){
          setHelper(hps.data)
        } 
    }

    useEffect(() => {
       helperLoader()
       setForm({ ...applicant.profile })
    },[])

    

    return (
        <Session>
        <div className="row">
            {/* Biodata / Personal Information */}
            <div className="small-12 columns" data-ref="biodata">
                <div className="u-textAlignCenter">
                    <h2 className="u-mb-0 label-title">Personal Information<hr /></h2>
                </div>
            {/* Photo Update */}
            <h4 className="u-mb-0 label-title"><b>{'ADD APPLICANT PHOTO'}</b><hr /></h4>
            <div class="CreateFleet--project-icon-select">
                <div id="ember1124" className="row group-icon-select-container ember-view flex-row">
                    <div role="button" className="group-icon-select isEditable" onClick={clickPhoto}>
                        <div class="icon-select-overlay">
                            <img src={applicant.user.photo && applicant.user.photo != '' ? applicant.user.photo : PhotoImg} className="photo-preview"/>
                        </div>
                    </div>
                    {/*
                    <div role="button" class="group-icon-select group-icon-20-large isEditable">
                        <div class="icon-select-overlay"></div>
                    </div>
                    */}
                </div>
            </div>
            
 
            {/* Step Content 1 - Personal Information */}
            <div className="row">
                <div className="small-12 columns u-textAlignLeft">
                    <form autoComplete="off" id="ember1130" className="ember-view" onSubmit={onSubmit}>
                        <input type="file" style={{display:'none'}} onChange={photoChange} ref={photoRef} id="file"/>
                        <div className="form--inline ">
                       
                        <div>
                            <hr/>
                            <p className="u-ml-0 label-title">PREFFERED MODE OF STUDY</p>
                            <div id="ember1133" className={ !form.session_mode ? "fleet-name-input is-required ember-view" : (isDirty('session_mode') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <select onChange={onChange} name="session_mode" value={form.session_mode} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Study Mode --</option>
                                    <option value="M">Morning</option>
                                    <option value="E">Evening</option>
                                    <option value="W">Weekend</option>
                                </select>
                                { isDirty('session_mode') ? <label className="FloatLabel-label" htmlFor="ember1207">Select Mode of Study</label> :'' }
                            </div>
                            <hr/>

                            <p className="u-ml-0 label-title">Title</p>
                            <div id="ember1133" className={ !form.title ? "fleet-name-input is-required ember-view" : (isDirty('title') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <select id="ember1134" onChange={onChange} name="title" value={form.title} className="Input--floatLabel FloatLabel-input ember-text-field ember-view">
                                    <option selected disabled>-- Choose Title --</option>
                                    { helperData.titles && helperData.titles.map((hp) => 
                                      <option value={hp.id}>{hp.title}</option>
                                    )}
                                </select>
                                { isDirty('title') ? <label className="FloatLabel-label">Please select a Title</label> :'' }
                            </div>
                            
                            <span className="form-small-input">* The names entered here must be of the same spelling and order as those used on your results slip/certificates OR registered at WAEC .</span><br /> 
                            <p className="u-ml-0 label-title">Surname (Lastname)</p>
                            <div id="ember1133" className={ !form.lname ? "fleet-name-input is-required ember-view" : (isDirty('lname') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <input type="text" onChange={onChange} name="lname" value={form.lname} defaultValue={form.lname} spellCheck="false" required placeholder="Enter Surname" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                { isDirty('lname') ? <label className="FloatLabel-label">Surname cannot be blank</label> :'' }
                             
                            </div>
                            <p className="u-ml-0 label-title">Othername(s)</p>
                            <div id="ember1133" className={ !form.fname ? "fleet-name-input is-required ember-view" : (isDirty('fname') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <input type="text" onChange={onChange} name="fname" value={form.fname} spellCheck="false" required placeholder="Enter Othername" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                { isDirty('fname') ? <label className="FloatLabel-label" htmlFor="ember1207">Othername cannot be blank</label> :'' }
                            </div>
                            <p className="u-ml-0 label-title">Gender</p>
                            <div id="ember1133" className={ !form.gender ? "fleet-name-input is-required ember-view" : (isDirty('gender') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <select onChange={onChange} name="gender" value={form.gender} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Gender --</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                                { isDirty('gender') ? <label className="FloatLabel-label" htmlFor="ember1207">Please Choose Gender</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Date of Birth</p>
                            <span className="form-small-input">Provide date of birth registered on birth certificates or with national documents.</span> 
                            <div id="ember1133" className={ !form.dob ? "fleet-name-input is-required ember-view" : (isDirty('dob') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <input type="date" onChange={onChange} name="dob" value={form.dob}  placeholder="Enter D.O.B" id="ember1134" className="Input--floatLabel FloatLabel-input ember-text-field ember-view" />
                                { isDirty('dob') ? <label className="FloatLabel-label">Choose Date of Birth</label> :'' }
                            </div><br/>

                            <p className="u-ml-0 label-title">Marital Status</p>
                            <div id="ember1133" className={ !form.mstatus ? "fleet-name-input is-required ember-view" : (isDirty('mstatus') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <select onChange={onChange} name="mstatus" value={form.mstatus} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Marital Status --</option>
                                    { helperData.marital && helperData.marital.map((hp) => 
                                     <option value={hp.id}>{hp.title}</option>
                                    )}
                                </select>
                                { isDirty('mstatus') ? <label className="FloatLabel-label">Choose marital status</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Citizen of Country</p>
                            <div id="ember1133" className={ !form.citizen_country ? "fleet-name-input is-required ember-view" : (isDirty('citizen_country') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <select onChange={onChange} name="citizen_country" value={form.citizen_country} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Country --</option>
                                    <option value="000">N/A</option>
                                    { helper && helper.countries.map((hp) => 
                                     <option value={hp.code_name}>{hp.title}</option>
                                    )}
                                </select>
                                { isDirty('citizen_country') ? <label className="FloatLabel-label" htmlFor="ember1207">Select Country of citizenry</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Country of Residence</p>
                            <div id="ember1133" className={ !form.resident_country ? "fleet-name-input is-required ember-view" : (isDirty('resident_country') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <select onChange={onChange} name="resident_country" value={form.resident_country} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Country --</option>
                                    <option value="000">N/A</option>
                                    { helper && helper.countries.map((hp) => 
                                     <option value={hp.code_name}>{hp.title}</option>
                                    )}
                                </select>
                                { isDirty('resident_country') ? <label className="FloatLabel-label" htmlFor="ember1207">Select Country of residence</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Home Region</p>
                            <div id="ember1133" className={ !form.home_region ? "fleet-name-input is-required ember-view" : (isDirty('home_region') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                                <select onChange={onChange} name="home_region" value={form.home_region} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Region --</option>
                                    { helperData.regions && helperData.regions.map((hp) => 
                                      <option value={hp.id}>{hp.title}</option>
                                    )}
                                </select>
                                { isDirty('home_region') ? <label className="FloatLabel-label" htmlFor="ember1207">Select Home region</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Home Town</p>
                            <div id="ember1133" className={ !form.home_town ? "fleet-name-input is-required ember-view" : (isDirty('home_town') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                <input type="text" onChange={onChange} name="home_town" value={form.home_town} spellCheck="false" required placeholder="Enter Home Town" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                { isDirty('home_town') ? <label className="FloatLabel-label" htmlFor="ember1207">Home Town cannot be blank</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Religion</p>
                            <div id="ember1133" className={ !form.religion ? "fleet-name-input is-required ember-view" : (isDirty('religion') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                <select onChange={onChange} name="religion" value={form.religion} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Region --</option>
                                    { helperData.religions && helperData.religions.map((hp) => 
                                      <option value={hp.id}>{hp.title}</option>
                                    )}
                                </select>
                                 { isDirty('religion') ? <label className="FloatLabel-label">Select Country of residence</label> :'' }
                            </div>

                            { applicant.apply_type && ['5'].includes(applicant.apply_type) ? 
                            <Fragment> {/* AB */}

                            <p className="u-ml-0 label-title">Present Occupation</p>
                            <div id="ember1133" className={ !form.present_occupation ? "fleet-name-input is-required ember-view" : (isDirty('present_occupation') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                <input type="text" onChange={onChange} name="present_occupation" value={form.present_occupation}  spellCheck="false" required placeholder="Enter Present occupation" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                { isDirty('present_occupation') ? <label className="FloatLabel-label">occupation cannot be blank</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Place of Work</p>
                             <div id="ember1133" className={ !form.work_place ? "fleet-name-input is-required ember-view" : (isDirty('work_place') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                <input type="text" onChange={onChange} name="work_place" value={form.work_place}  spellCheck="false" required placeholder="Enter Place of work" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                { isDirty('work_place') ? <label className="FloatLabel-label">Place of work cannot be blank</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Are you bonded ?</p>
                            <span className="form-small-input">State whether you're still bonded with your employer.</span> 
                            <div id="ember1133" className={ !form.bond_status ? "fleet-name-input is-required ember-view" : (isDirty('bond_status') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                <select  onChange={onChange} name="bond_status" value={form.bond_status} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Status --</option>
                                    <option value="0">NO</option>
                                    <option value="1">YES</option>
                                </select>
                                { isDirty('bond_status') ? <label className="FloatLabel-label">Choose bonding answer</label> :'' }
                            </div>
                            
                            { form.bond_status && form.bond_status === '1' ? 
                            <Fragment>
                              <p className="u-ml-0 label-title">Bonded Organisation</p>
                              <div id="ember1133" className="fleet-name-input FloatLabel ember-view"> 
                                <input type="text" onChange={onChange} name="bond_institute" value={form.bond_institute} spellCheck="false" required placeholder="Enter Bonded Organisation" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                <label className="FloatLabel-label">Bonded organisation cannot be blank</label>
                              </div>
                            </Fragment> : '' }

                            </Fragment> : '' /* AB */}

                            <p className="u-ml-0 label-title">Are you Physically Challenged? </p>
                            <span className="form-small-input" /> 
                            <div id="ember1133" className={ !form.disabled ? "fleet-name-input is-required ember-view" : (isDirty('disabled') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                <select onChange={onChange} name="disabled" value={form.disabled} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                    <option selected disabled>-- Choose Status --</option>
                                    <option value={0}>NO</option>
                                    <option value={1}>YES</option>
                                </select>
                                { isDirty('disabled') ? <label className="FloatLabel-label">Choose disability answer</label> :'' }
                            </div>
                            
                            {/*
                            <span className="form-small-input label-title">Please select disabilities by holding CTRL + Clicking.</span> 
                            <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                                <select onChange={onChange} name="disabilities" value={form.disabilities} id="ember1134" multiple className="Input--floatLabel FloatLabel-input  ember-text-field ember-view ember1000">
                                    <option selected disabled>-- N/A --</option>
                                    <option value={1}>Hearing Loss</option>
                                    <option value={2}>Meniere's Disease</option>
                                    <option value={3}>Tinnitus (Ringing In the Ears)</option>
                                    <option value={4}>Lower Limb Impairment</option>
                                    <option value={5}>Upper Limb Impairment</option>
                                    <option value={6}>Rheumatoid Arthitis (RA)</option>
                                    <option value={7}>Osteoarthritis</option>
                                    <option value={8}>Cerebral Palsy</option>
                                    <option value={9}>Multiple Sclerosis (MS)</option>
                                    <option value={10}>Muscular Dystrophy (MD)</option>
                                    <option value={11}>Stroke </option>
                                    <option value={12}>Blindness</option>
                                    <option value={13}>Blurred Vision</option>
                                    <option value={14}>Color Blindness</option>
                                    <option value={15}>Cataract</option>
                                    <option value={16}>Blindness</option>
                                </select>
                            </div>
                            */}

                            { form.disabled && form.disabled === '1' ?    
                            <Fragment>     
                            <p className="u-ml-0 label-title">Please enter Disabilities</p>
                            <div id="ember1133" className="fleet-name-input FloatLabel "> 
                                <input type="text" onChange={onChange} name="disabilities" value={form.disabilities} spellCheck="false" required placeholder="Enter Disabilities" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                            </div>
                            </Fragment> : ''}




                            <p className="u-ml-0 label-title">Phone Number</p>
                            <span className="form-small-input">Please enter phone number starting with ' <b>0</b> ' in this format for example:&nbsp;&nbsp;<b>0270000000</b>.</span> 
                            <div id="ember1133" className={ !form.phone ? "fleet-name-input is-required ember-view" : (isDirty('phone') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                <input type="text" onChange={onChange} name="phone" maxLength={10} value={form.phone} spellCheck="false" required placeholder="Enter Phone number" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                { isDirty('phone') ? <label className="FloatLabel-label" htmlFor="ember1207">Phone Number is not valid</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">E-mail address </p>
                            <div id="ember1133" className={ !form.email ? "fleet-name-input is-required ember-view" : (isDirty('email') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                                <input type="email" onChange={onChange} name="email" value={form.email} spellCheck="false" required placeholder="Enter E-mail address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                { isDirty('email') ? <label className="FloatLabel-label" htmlFor="ember1207">E-mail address is not valid</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Postal Address</p>
                            <div id="ember1133" className={ !form.pobox_address ? "fleet-name-input is-required ember-view" : (isDirty('pobox_address') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>   
                                <input type="text"  onChange={onChange} name="pobox_address" value={form.pobox_address} spellCheck="false" required placeholder="Enter Postal address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                { isDirty('pobox_address') ? <label className="FloatLabel-label" htmlFor="ember1207">Postal address cannot be blank</label> :'' }
                            </div>

                            <p className="u-ml-0 label-title">Residential Address</p>
                            <div id="ember1133" className={ !form.resident_address ? "fleet-name-input is-required ember-view" : (isDirty('resident_address') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>
                                <input type="text" onChange={onChange} name="resident_address" value={form.resident_address} spellCheck="false" required placeholder="Enter Residential address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                                { isDirty('pobox_address') ? <label className="FloatLabel-label" htmlFor="ember1207">Residential address cannot be blank</label> :'' }
                            </div>

                            
                            {/*
                            <p class="u-ml-0">Add a description</p>
                            <span class="form-small-input">Helpful for teams or differentiating between projects with similar names.</span> 
                            <div id="ember1135" class="FloatLabel ember-view"> 
                                <input type="text" spellcheck="false" placeholder="Enter description" id="ember1136" class="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                <label class="FloatLabel-label" for="ember1208">Enter description</label>
                            </div>
                            <p class="u-ml-0">Tell us what it's for</p>
                            <span class="form-small-input">This will help us to provide a more relevant experience.</span>
                            <div class="fleet-select is-required power-select select-wrapper FloatLabel validateFail">
                                <div class="Select">
                                    <label class="FloatLabel-label">Purpose required</label>
                                    <div id="ember1144" class="ember-basic-dropdown ember-view">
                                    <div aria-required="true" aria-owns="ember-basic-dropdown-content-ember1144" tabindex="0" data-ebd-id="ember1144-trigger" role="button" id="ember1149" class="ember-power-select-trigger ember-basic-dropdown-trigger ember-basic-dropdown-trigger--in-place ember-view">
                                        <span class="ember-power-select-placeholder">Select purpose</span>
                                        <span class="ember-power-select-status-icon"></span>
                                    </div>
                                    <div id="ember-basic-dropdown-content-ember1144" style="display: none;" class="ember-basic-dropdown-content-placeholder"></div>
                                    </div>
                                </div>
                            </div>
                            */}
                        </div>
                        
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
        </Session>
    )
}

export default Profile
