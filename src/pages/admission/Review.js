import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import AdminLayout from '../../components/admission/AdminLayout'
import { useSelector, useDispatch } from 'react-redux'
import { setNextStep, stepSlice } from '../../store/admission/stepSlice'
import ReviewTabs from '../../components/admission/ReviewTabs'
import { setAdmitStatus, setSubmitStatus } from '../../store/admission/applicantSlice';
import { submitApplication } from '../../store/utils/admissionApi';

const Review = () => {
    const [ active, setActive ] = useState('profile');
    const history = useHistory();
    const { step,applicant } = useSelector(state => state)
    const dispatch = useDispatch()

    const finalize = async () => {
        const cm = window.confirm("Finalize & Submit Aplication Form ?")
        if(cm){
            const res = await submitApplication({ serial:applicant.user.serial,status:1 });
            if(res.success){
              dispatch(setSubmitStatus(1))
              dispatch(setNextStep())
            }
        } 
    }
    
    const gotoTab = (tag) => {
       setActive(tag);
    }

    const exitSession = () => {
        const cm = window.confirm('Exit Application Session ?')
        if(cm) history.push('admission-dash')
    }


    return (
        <AdminLayout>
           <div className="row">
                <div className="Box small-12 columns">
                    <div className="small-8 columns u-pl-0">
                        <h3 className="u-mb-1">Application Overview</h3>
                        <p className="u-mb-2">Review application information provided carefully before finalizing application process.<br/><small><b>Click on the section label to switch to its related tab to view provided information and feel free to edit section with the "Edit" button on the right.</b></small></p>
                    </div>
                    <div className="small-4 columns u-pr-0">
                        <button onClick={finalize} className="Button u-floatRight u-mb-2">&nbsp;&nbsp;Finalize Application&nbsp;&nbsp;</button>
                    </div>
                </div>
                <div className="small-12 columns">
                <section >
                    <ul role="tablist" className="Tabs">
                       { step.meta.map((row,i) => row.canReview ? 
                         ( 
                           <li key={i} role="presentation" className={active === row.tag ? 'is-active':''}><a aria-controls="profile" onClick={() => gotoTab(row.tag)} role="tab">{row.title}</a></li>
                         ) : null )
                       }
                    </ul>

                    <div className="Tabs-content Tabs-content--box">
                     { step.meta.map((row,i) => row.canReview ? 
                       ( 
                          <div role="tabpanel" className={active === row.tag ? 'Tabs-pane cc-form is-active':'Tabs-pane cc-form'}>
                            <ReviewTabs tag={row.tag} title={row.title}/>
                          </div>
                       ) : null )
                     }
 
                    </div>
                </section>
                <div className="Box small-12 columns">
                    <center><a  onClick={exitSession} id="ember1166" class="ember-view">SAVE &amp; EXIT</a></center>
                </div>
               
                </div>
            </div> 
        </AdminLayout>
    )
}

export default Review
