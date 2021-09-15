import AdminLayout from '../../components/admission/AdminLayout'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { applicantSlice } from '../../store/admission/applicantSlice';
import AlertBanner from '../../components/admission/AlertBanner';


const Status = () => {

    const [ active, setActive ] = useState('profile');
    const history = useHistory();
    const { step } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <AdminLayout>
            <div class="row">
                <div class="small-6 columns"><h3 class="u-floatLeft heading">ADMISSION STATUS</h3></div>
            </div>
            <div className="row">
                <div className="small-12 columns">
                     <div id="ember1330" className="ember-view">
                       <section className="u-mb-5 bandwidth-meter">
                        
                        { applicantSlice.flag_admit == 1 ?
                        <Fragment>
                        <ul role="tablist" className="Tabs"/>
                        <div className="Tabs-content Tabs-content--box">
                            <div role="tabpanel" className="Tabs-pane is-active">
                                    <h4 className="u-mb-3">OFFER OF ADMISSION</h4>
                                    <p>Congratulations you have been offered admission into our institution. Please "<b>ACCEPT</b>" or "<b>DECLINE</b>" offer to enable further processing</p>
                                    <div id="ember1380" className="paypal-form ember-view">
                                        <form method="post" action="" id="ember1385" className="ember-view">
                                            <div>
                                            <div className="row">
                                                    <div className="small-6 columns">
                                                        <button type="submit" className="Button  Button--fullWidth Button--green " data-ember-action data-ember-action-1386={1386}>
                                                            <b className="Button--text">ACCEPT ADMISSION OFFER</b>
                                                        </button>
                                                    </div>
                                                    <div className="small-6 columns">
                                                        <button type="submit" className="Button  Button--fullWidth Button--red " data-ember-action data-ember-action-1386={1386}>
                                                            <b className="Button--text">DECLINE ADMISSION OFFER</b>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                            </div>
                            <hr/>
                            <div role="tabpanel" className="Tabs-pane is-active">
                                    <h4 className="u-mb-3">ADMISSION STATUS</h4>
                                    <p>This is a preview of your provisional admission letter and proposed school fees structure.</p>
                                    <div id="ember1380" className="paypal-form ember-view">
                                        <form method="post" action="" id="ember1385" className="ember-view">
                                            <div className="row">
                                                <div className="small-6 columns">
                                                    <button type="submit" className="Button  Button--fullWidth Button--green " data-ember-action data-ember-action-1386={1386}>
                                                        <b className="Button--text">VIEW PROVISIONAL ADMISSION LETTER</b>
                                                    </button>
                                                </div>
                                                <div className="small-6 columns">
                                                    <button type="submit" className="Button  Button--fullWidth Button--green " data-ember-action data-ember-action-1386={1386}>
                                                        <b className="Button--text">VIEW PROPOSED FEES STRUCTURE</b>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                        </div>
                        </Fragment> :
                        
                        <div className="Box">
                            <AlertBanner title="ADMISSION PENDING" content="Please note that admission processes are still on-going, You shall be notified on the status "/>
                        </div>
                        }

                        <div className="Box">
                           <div className="bandwidth-faq">
                                <h4>FRESHMAN ( ADMITTED STUDENT ) INSTRUCTIONS</h4>
                                <div className="bandwith-faq-answer">
                                    <p>Freshmen are advised to follow the procedure for stress-free enrolment into our wonderful institution:
                                        <ol>
                                            <li><b>FEES PAYMENT</b>: You are reminded to pay your fees before the <b>stated deadline</b> else your <b>offer of admission</b> might be revoked and awarded to a different applicant. School fees can be paid at the selected banks and bank account below the freshman instructions section.</li><br/>
                                            <li><b>MEDICAL EXAMINATION</b>: You are required to take a medical examination and declared fit to undertake the program of study by a qualified health practitioner. You are required to present a current <b>chest X-Ray</b> film ( not later than a month ) to eligibility.</li><br/>
                                            <li><b>COURSE REGISTRATION</b>: You are required to <b>register</b> your mounted course for <b>the semester</b> to enable effective assessment by lecturers and department. <b>Failure to register courses is an automatic forfeitment of admission.</b> </li><br/>
                                            <li><b>HALL REGISTRATION:</b> You are required to to enroll at your hall of affiliation for a room. Please note and pay the hall charges and dues into the required hall account<b></b></li><br/>
                                            <li><b>DEPARMENT/FACULTY & ASSOCIATIONS REGISTRATION</b>: We believe in social-life enhancement at AUCC, So students are at liberty to be affiliated to association groups on campus. However, SRC is a mandatory association that has every student as member automatically. </li>
                                        </ol>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br/>

                        { applicantSlice.flag_admit == 1 ?
                        <div className="Box">
                           <div className="bandwidth-faq">
                             <div className="row">
                              <div className="small-6 columns">
                                <h4>FRESHMAN ACCOUNTS INFORMATION</h4>
                                <div className="bandwith-faq-answer">
                                    <p>
                                        <ul>
                                            <li><b>PORTAL ACCOUNT</b>:
                                                 <ul>
                                                   <li><b>url address      : <a href="https://portal.aucc.edu.gh" target="_blank">https://portal.aucc.edu.gh</a></b></li>
                                                   <li><b>student Id : <em>41329232</em></b></li>
                                                   <li><b>username : <em>ekbackah</em></b></li>

                                                   <li><b>password : <em>123232nsad33</em></b></li>
                                                 </ul>
                                            </li><br/>
                                            <li><b>EMAIL ACCOUNT</b>:
                                                 <ul>
                                                   <li><b>url address      : <a href="https://studentmail.aucc.edu.gh" target="_blank">https://studentmail.aucc.edu.gh</a></b></li>
                                                   <li><b>username : <em>ekbackah@st.aucc.edu.gh</em></b></li>
                                                   <li><b>password : <em>123232nsad33</em></b></li>
                                                 </ul>
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                               </div>
                              <div className="small-6 columns">
                                 <h4>AUCC SCHOOL FEES ACCOUNTS INFORMATION</h4>
                                 <div className="bandwith-faq-answer">
                                    <p>
                                        <ul>
                                          <li><b>AUCC SCHOOL FEES ACCOUNT</b>:<br/>
                                            <ul>
                                              <li><b>Bank Name : &nbsp;&nbsp;&nbsp;&nbsp;<a>Calbank Limited</a></b></li>
                                              <li><b>Bank Acc No : &nbsp;&nbsp;<a>45334323434324234324</a></b></li>
                                              <li><b>Bank Branch : &nbsp;&nbsp;&nbsp;<a>Circle</a></b></li>
                                            </ul><br/>
                                            <ul>
                                              <li><b>Bank Name : &nbsp;&nbsp;&nbsp;&nbsp;<a>Calbank Limited</a></b></li>
                                              <li><b>Bank Acc No : &nbsp;&nbsp;<a>45334323434324234324</a></b></li>
                                              <li><b>Bank Branch : &nbsp;&nbsp;&nbsp;<a>Circle</a></b></li>
                                            </ul>
                                          </li>
                                        </ul>
                                    </p>
                                </div>
                               </div>
                            </div>
                           </div>
                        </div> : null }
                        
                
                    </section>
                    </div>
                
                </div>
            </div> 
        </AdminLayout>
    )
}

export default Status
