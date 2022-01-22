import React, { useEffect, useCallback, useState } from 'react'
import PhotoImg from '../../../assets/img/add_photo.png';
import Session from '../Session';
import { useSelector,useDispatch } from 'react-redux';
import { updateGuardian } from '../../../store/admission/applicantSlice';
import { helperData } from '../../../store/utils/helperData';

const Guardian = () => {

  const { step,applicant } = useSelector(state => state)
  const dispatch = useDispatch();
  const required = ['title','lname','fname','mstatus','dob','gender','citizen_country','resident_country','home_region','religion','present_occupation','work_place','bond_status','disabled','phone','email','pobox_address','resident_address'];
  const [form,setForm] = useState({});

  const onChange = useCallback((e) => {
     setForm({...form,[e.target.name] : e.target.value })
     dispatch(updateGuardian({[e.target.name] : e.target.value }))
  },[form])

  const onSubmit = (e) => {
     alert("Submitted");
  }
  
  const isDirty = useCallback((tag) => {
      const vs = required.find(row => row === tag);
      const ms = form[tag];
      if(vs){
          if(ms && ms !== ''){ return false;}
          else{ return true; }
      }   return false;
  },[form])

  useEffect(() => {
     setForm({ ...applicant.guardian })
  },[])

    return (
      <Session>
        <div className="row">
        {/* Guardian Information */}
        <div className="small-12 columns" data-ref="guardian">
          <div className="u-textAlignCenter">
            <h2 className="u-mb-0 label-title">GUARDIAN INFORMATION<hr /></h2>
          </div>
          {/* Step Content 2 - Guardian Information */}
          <div className="row">
            <div className="small-12 columns u-textAlignLeft">
              <form autoComplete="off" id="ember1130" className="ember-view">
                <div className="form--inline ">
                  <div>
                      
                    <p className="u-ml-0 label-title">Title</p>
                    <div id="ember1133" className={ !form.title ? "fleet-name-input is-required ember-view" : (isDirty('title') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                        <select id="ember1134" onChange={onChange} name="title" defaultValue="" value={form.title} className="Input--floatLabel FloatLabel-input ember-text-field ember-view">
                            <option value="" selected disabled>-- Choose Title --</option>
                            { helperData.titles.map((hp) => 
                              <option value={hp.id}>{hp.title}</option>
                            )}
                        </select>
                        { isDirty('title') ? <label className="FloatLabel-label">Please select a Title</label> :'' }
                    </div>

                    <span className="form-small-input">* The names entered here must be of the same spelling and order as those used on your results slip/certificates OR registered at WAEC .</span><br /> 
                    <p className="u-ml-0 label-title">Surname (Lastname)</p>
                    <div id="ember1133" className={ !form.lname ? "fleet-name-input is-required ember-view" : (isDirty('lname') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                        <input type="text" onChange={onChange} name="lname" value={form.lname} spellCheck="false" required placeholder="Enter Surname" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                        { isDirty('lname') ? <label className="FloatLabel-label">Surname cannot be blank</label> :'' }
                      
                    </div>

                    <p className="u-ml-0 label-title">Othername(s)</p>
                    <div id="ember1133" className={ !form.fname ? "fleet-name-input is-required ember-view" : (isDirty('fname') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                        <input type="text" onChange={onChange} name="fname" value={form.fname} spellCheck="false" required placeholder="Enter Othername" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                        { isDirty('fname') ? <label className="FloatLabel-label" htmlFor="ember1207">Othername cannot be blank</label> :'' }
                    </div>

                    <p className="u-ml-0 label-title">Relation to Applicant</p>
                    <div id="ember1133" className={ !form.relation ? "fleet-name-input is-required ember-view" : (isDirty('relation') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}> 
                      <select id="ember1134" onChange={onChange} name="relation" defaultValue="" value={form.relation}  className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                          <option value="" selected disabled>-- Choose Title --</option>
                        { helperData.relatives.map((hp) => 
                          <option value={hp.id}>{hp.title}</option>
                        )}
                      </select>
                      { isDirty('relation') ? <label className="FloatLabel-label">Please select a Relation</label> :'' }
                    </div>

                    <p className="u-ml-0 label-title">Occupation</p>
                    <div id="ember1133" className={ !form.occupation ? "fleet-name-input is-required ember-view" : (isDirty('occupation') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                        <input type="text" onChange={onChange} name="occupation" value={form.occupation}  spellCheck="false" required placeholder="Enter Occupation" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                        { isDirty('occupation') ? <label className="FloatLabel-label">occupation cannot be blank</label> :'' }
                    </div>

                    <p className="u-ml-0 label-title">Phone Number</p>
                    <span className="form-small-input">Please enter phone number starting with ' <b>0</b> ' in this format:&nbsp;&nbsp;<b>0277XXXXXX</b>.</span> 
                    <div id="ember1133" className={ !form.phone ? "fleet-name-input is-required ember-view" : (isDirty('phone') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                        <input type="text" onChange={onChange} name="phone" maxLength={10} value={form.phone} spellCheck="false" required placeholder="Enter Phone number" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                        { isDirty('phone') ? <label className="FloatLabel-label">Phone Number is not valid</label> :'' }
                    </div>

                    <p className="u-ml-0 label-title">E-mail address </p>
                    <div id="ember1133" className={ !form.email ? "fleet-name-input is-required ember-view" : (isDirty('email') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>  
                        <input type="email" onChange={onChange} name="email" value={form.email} spellCheck="false" required placeholder="Enter E-mail address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                        { isDirty('email') ? <label className="FloatLabel-label" htmlFor="ember1207">E-mail address is not valid</label> :'' }
                    </div>

                    <p className="u-ml-0 label-title">Address</p>
                    <div id="ember1133" className={ !form.address ? "fleet-name-input is-required ember-view" : (isDirty('address') ? "fleet-name-input FloatLabel is-required ember-view validateFail is-active": "fleet-name-input FloatLabel ember-view validatePass is-active")}>   
                        <input type="text"  onChange={onChange} name="address" value={form.address} spellCheck="false" required placeholder="Enter Address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                        { isDirty('address') ? <label className="FloatLabel-label" htmlFor="ember1207">Address cannot be blank</label> :'' }
                    </div>

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

export default Guardian
