import React,{ useCallback, useState,useEffect, Fragment} from 'react'
import PhotoImg from '../../../assets/img/add_photo.png';
import Session from '../Session';
import { useSelector,useDispatch } from 'react-redux'
import { setEmployment, delEmployment, addEmployment, addReferee, delReferee, setReferee } from '../../../store/admission/applicantSlice';
import { helperData } from '../../../store/utils/helperData';

const Referee = () => {

  const { step,applicant } = useSelector(state => state)
  const dispatch = useDispatch();
  const required = ['employer_name','employer_address','job_title','job_description','start_month','start_year','end_month','end_year'];
  const [form,setForm] = useState({});
  const [ edurows,setEdurows ] = useState([{referee_id:''}]);

  
  const onChange = (e,id) => {
    let newrows = [...edurows];
    newrows[id] = {...newrows[id],[e.target.name] : e.target.value };
    setEdurows(newrows);
  }

  const years = () => {
    var yrs = [];
    for(var i = new Date().getFullYear();i >= 1980;i--){
        yrs.push(i)
    } return yrs;
  }

  
  const addRecord = (e) => {
      const cm = window.confirm(`Add Referee Record ${edurows.length+1} ?`)
      if(cm){
        const data = { referee_id:''}
        setEdurows([...edurows,data ])
        dispatch(addReferee(data))
        
      }
  }

  const delRecord = (id) => {
      const cm = window.confirm(`Remove Referee Record ${id+1} ?`)
      if(cm){
        setEdurows([...edurows.filter((r,i) => i !== id)])
        dispatch(delReferee(id))
      }
  }
  
  const isDirty = useCallback((tag,i) => {
      const vs = required.find(row => row === tag);
      const ms = edurows[i][tag];
      if(vs){
          if(ms && ms !== ''){ return false;}
          else{ return true; }
      }   return false;
  },[edurows])

  useEffect(() => {
      setEdurows(applicant.referee)
  },[])

  useEffect(() => {
      console.log(edurows);
      dispatch(setReferee(edurows))
  })


    return (
      <Session>
      <div className="row">
        {/* Guardian Information */}
        <div className="small-12 columns" data-ref="guardian">
            <div className="u-textAlignCenter">
              <h2 className="u-mb-0 label-title">
                  REFEREES
                  <hr />
              </h2>
            </div>
            {/* Step Content 2 - Referee Information */}
            <div className="row">

              { edurows.map((rec,i) => ( 
              <div className="small-12 columns u-textAlignLeft" key={i}>
                  <div class="row" >
                      <div className="small-9 columns"><h4>REFEREE INFORMATION #{i+1}</h4></div>
                      <div className="small-3 columns"><button onClick={() => i === 0 ? addRecord() : delRecord(i) } class="Button Button--green" style={{height:'2em',lineHeight:'1.2em'}}><b>{i === 0 ? 'ADD NEW' : 'REMOVE'} </b></button></div>
                  </div><hr/>
                  <form autoComplete="off" id="ember1130" className="ember-view">
                    <div className="form--inline ">
                        <div>
                          <p className="u-ml-0 label-title">Title</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                            <select id="ember1134" onChange={(e)=> onChange(e,i)} name="title" value={edurows[i].title} className="Input--floatLabel FloatLabel-input ember-text-field ember-view">
                                <option value="" selected disabled>-- Choose Title --</option>
                                { helperData.titles.map((hp,i) => 
                                  <option  key={i} value={hp.id}>{hp.title}</option>
                                )}
                            </select>
                          </div>

                          <p className="u-ml-0 label-title">Surname ( Lastname )</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validateFail is-active"> 
                              <input type="text" onChange={(e)=> onChange(e,i)} name="lname" value={edurows[i].lname} spellCheck="false" required placeholder="Enter Surname" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('lname',i) ? <label className="FloatLabel-label">Surname cannot be blank</label> :'' }
                          </div>

                          <p className="u-ml-0 label-title">Othername(s)</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text" onChange={(e)=> onChange(e,i)} name="fname" value={edurows[i].fname} spellCheck="false" required placeholder="Enter Othername" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('fname',i) ? <label className="FloatLabel-label">Othername(s) cannot be blank</label> :'' }
                          </div>

                          <p className="u-ml-0 label-title">Occupation</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text" onChange={(e)=> onChange(e,i)} name="occupation" value={edurows[i].occupation} spellCheck="false" required placeholder="Enter occupation" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('occupation',i) ? <label className="FloatLabel-label">Occupation cannot be blank</label> :'' }
                          </div>

                          <p className="u-ml-0 label-title">Phone Number</p>
                          <span className="form-small-input">Please enter phone number starting with ' <b>0</b> ' in this format:&nbsp;&nbsp;<b>0277XXXXXX</b>.</span> 
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text" onChange={(e)=> onChange(e,i)} name="phone" value={edurows[i].phone} spellCheck="false" required placeholder="Enter Phone number" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('phone',i) ? <label className="FloatLabel-label">Phone Number cannot be blank</label> :'' }
                          </div>

                          <p className="u-ml-0 label-title">E-mail address </p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text" onChange={(e)=> onChange(e,i)} name="email" value={edurows[i].email} spellCheck="false" placeholder="Enter E-mail address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('email',i) ? <label className="FloatLabel-label">Email Address cannot be blank</label> :'' }
                          </div>

                          <p className="u-ml-0 label-title">Postal Address</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text"  onChange={(e)=> onChange(e,i)} name="address" value={edurows[i].address} spellCheck="false" required placeholder="Enter Postal address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              { isDirty('address',i) ? <label className="FloatLabel-label">Postal Address cannot be blank</label> :'' }
                          </div>
                        </div>
                    </div>
                  </form>
              </div>
              ))}

            </div>
        </div>
      </div>
      </Session>
    )
}

export default Referee
