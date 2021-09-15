import React from 'react'
import Session from '../Session';

const Referee = () => {

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
            {/* Step Content 2 - Guardian Information */}
            <div className="row">
              <div className="small-12 columns u-textAlignLeft">
                  <form autoComplete="off" id="ember1130" className="ember-view">
                    <div className="form--inline ">
                        <div>
                          <p className="u-ml-0 label-title">Title</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                              <select id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                                <option selected="selected" value={1}>Miss</option>
                                <option value={2}>Very Rev.</option>
                                <option value={3}>Mrs.</option>
                                <option value={4}>Lt.</option>
                                <option value={5}>Dr.</option>
                                <option value={6}>Mr.</option>
                                <option value={7}>Rev.</option>
                                <option value={8}>Prof.</option>
                                <option value={9}>Rev. Fr.</option>
                                <option value={10}>Sis.</option>
                                <option value={11}>Rev. Sis.</option>
                              </select>
                              <label className="FloatLabel-label" htmlFor="ember1207">Please select a Title</label>
                          </div>
                          <span className="form-small-input">* The names entered here must be of the same spelling and order as those used on your results slip/certificates OR registered at WAEC .</span><br /> 
                          <p className="u-ml-0 label-title">Surname (Lastname)</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validateFail is-active"> 
                              <input type="text" spellCheck="false" required placeholder="Enter Surname" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              <label className="FloatLabel-label" htmlFor="ember1207">Surname cannot be blank</label>
                          </div>
                          <p className="u-ml-0 label-title">Othername(s)</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text" spellCheck="false" required placeholder="Enter Othername" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              <label className="FloatLabel-label" htmlFor="ember1207">Othername cannot be blank</label>
                          </div>
                          <p className="u-ml-0 label-title">Qualification</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text" spellCheck="false" required placeholder="Enter occupation" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              <label className="FloatLabel-label" htmlFor="ember1207">Qualification cannot be blank</label>
                          </div>
                          <p className="u-ml-0 label-title">Phone Number</p>
                          <span className="form-small-input">Please enter phone number with country code in this format:&nbsp;&nbsp;<b>+233-0277675089</b>.</span> 
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text" spellCheck="false" required placeholder="Enter Phone number" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              <label className="FloatLabel-label" htmlFor="ember1207">Phone Number is not valid</label>
                          </div>
                          <p className="u-ml-0 label-title">E-mail address </p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text" spellCheck="false" required placeholder="Enter E-mail address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              <label className="FloatLabel-label" htmlFor="ember1207">E-mail address is not valid</label>
                          </div>
                          <p className="u-ml-0 label-title">Address</p>
                          <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                              <input type="text" spellCheck="false" required placeholder="Enter Postal address" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                              <label className="FloatLabel-label" htmlFor="ember1207">Postal address cannot be blank</label>
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

export default Referee
