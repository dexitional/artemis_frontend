import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import AdminLayout from '../../components/admission/AdminLayout'
import AlertBanner from '../../components/admission/AlertBanner'
import { setPrevStep } from '../../store/admission/stepSlice'

const Complete = () => {
    
    const history = useHistory();
    const { step } = useSelector(state => state)
    const dispatch = useDispatch()

    const reviewForm = () => {
    //   const cm = window.confirm("Review & Edit Aplication Form ?")
    //   if(cm) return dispatch(setPrevStep())
      return dispatch(setPrevStep())
    }

    const printForm = () => {
        const cm = window.confirm("Print Submitted Aplication Form")
        if(cm) {
            history.push('/admission-print')
            //dispatch(setPrevStep())
            console.log('Print Application')
        }
    }

    return (
        <AdminLayout>
        <section className="Box">
            <div className="row">
                <div className="small-12 columns">
                    <AlertBanner title="Application Completed" content="Your application has been fully submitted, you can return to the Homepage and check on your admission Status for updates." colorcode="success"/>
                </div>

                <div className="small-12 columns">
                    <div className="small-8 columns u-pl-0">
                        <h3 className="u-mb-1">Visit Application Review</h3>
                        <p className="u-mb-4">Revise your application and make any changes where necessary.<br/><small><b>Changes can not be made to application past the Admission Deadline.</b></small></p>
                    </div>
                    <div className="small-4 columns u-pr-0">
                        <button onClick={reviewForm} className="Button u-floatRight u-mb-3">&nbsp;<span className="Icon--edit" />&nbsp;&nbsp;Review Application&nbsp;&nbsp;</button>
                    </div>
                </div><hr/>

                <div className="small-12 columns">
                    <div className="small-8 columns u-pl-0">
                        <h3 className="u-mb-1">Print Out Application</h3>
                        <p className="u-mb-2">Get application printout for endorsement or personal submission.<br/><small><b>Changes can not be made to application past the Admission Deadline.</b></small></p>
                    </div>
                    <div className="small-4 columns u-pr-0">
                        <button onClick={printForm} className="Button u-floatRight u-mb-2">&nbsp;<span className="Icon--print" />&nbsp;&nbsp;Print Application&nbsp;&nbsp;</button>
                    </div>
                </div>
            </div>
        </section>
        <div className="Box small-12 columns">
            <center><a id="ember1166" class="ember-view">SAVE &amp; EXIT</a></center>
        </div>
               
        </AdminLayout>
    )
}

export default Complete
