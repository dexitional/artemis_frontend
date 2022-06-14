import React from 'react'
import Session from '../Session';

const Qualification = () => {

    return (
      <Session>
      <div className="row">
      {/* Educational  Information */}
      <div className="small-12 columns" data-ref="education">
        <div className="u-textAlignCenter">
          <h2 className="u-mb-0 label-title">OTHER QUALIFICATIONS<hr /></h2>
        </div>
        {/* Step Content 2 - Guardian Information */}
        <div className="row">
          <div className="small-12 columns u-textAlignLeft">
            <form autoComplete="off" id="ember1130" className="ember-view">
              <div className="form--inline ">
                <div className="institute1" data-ref="inst1">
                  <p className="u-ml-0 label-title">Qualification Title</p>
                  <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                    <input type="text" spellCheck="false" required placeholder="Enter Qualification title" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                    <label className="FloatLabel-label" htmlFor="ember1207">qualification cannot be blank</label>
                  </div>
                  <p className="u-ml-0 label-title">Awarding Institution</p>
                  <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                    <input type="text" spellCheck="false" required placeholder="Enter Awarding institution" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                    <label className="FloatLabel-label" htmlFor="ember1207">Institution cannot be blank</label>
                  </div>
                  <p className="u-ml-0 label-title">Subjects Studied</p>
                  <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                    <input type="text" spellCheck="false" required placeholder="Enter Subjects studied" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                    <label className="FloatLabel-label" htmlFor="ember1207">Subjects studied cannot be blank</label>
                  </div>
                  <p className="u-ml-0 label-title">Awarded Class </p>
                  <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view"> 
                    <select id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                      <option value={8}>N/A</option>
                      <option value={1}>First Class</option>
                      <option value={2}>Second Class (Upper Division)</option>
                      <option selected="selected" value={3}>Second Class (Lower Division)</option>
                      <option value={4}>Third Class</option>
                      <option value={5}>Pass</option>
                      <option value={6}>Fail</option>
                      <option value={7}>Distinction</option>
                    </select>
                  </div>
                  <div className="start-cover flex-row">
                    <span>
                      <p className="u-ml-0 label-title">Month Awarded </p>
                      <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view"> 
                        <select id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                          <option value={1}>January</option>
                          <option value={2}>February</option>
                          <option value={3}>March</option>
                          <option value={4}>April</option>
                          <option value={5}>May</option>
                          <option value={6}>June</option>
                          <option value={7}>July</option>
                          <option selected="selected" value={8}>August</option>
                          <option value={9}>September</option>
                          <option value={10}>October</option>
                          <option value={11}>November</option>
                          <option value={12}>December</option>
                        </select>
                      </div>
                    </span>
                    <span>
                      <p className="u-ml-0 label-title"><b>Year Awarded</b> </p>
                      <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view"> 
                        <select id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                          <option value={2021}>2021</option>
                          <option value={1920}>1920</option>
                        </select>
                      </div>
                    </span>
                  </div>
                  <p className="u-ml-0 label-title">Remarks</p>
                  <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view validatePass is-active"> 
                    <input type="text" spellCheck="false" required placeholder="Enter Remarks" id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                    <label className="FloatLabel-label" htmlFor="ember1207">Remarks studied cannot be blank</label>
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

export default Qualification
