import React, { Fragment } from 'react'
import { setNextStep,setPrevStep } from '../../store/admission/stepSlice'
import { useDispatch, useSelector } from 'react-redux';

const StepAction = ({exitSession}) => {
    const dispatch = useDispatch();
    const { step,applicant } = useSelector(state => state);

    const nextStep = async () => {
       dispatch(setNextStep())
    }

    const prevStep = () => {
       dispatch(setPrevStep())
    }

    const exitSteps = () => {
       return exitSession()
    }

    return (
        <Fragment>
        <div className="row Box u-mb-3 u-mt-0 flex-row step-action">
            <button disabled={step.step === 1} onClick={prevStep} className="Button Button--blue Button--large Button--fullWidth Button Button--green Button--large Button--fullWidth u-mt-4">
                <b className="Button--text">PREVIOUS</b>
            </button>
            &nbsp;
            &nbsp;
            <button disabled={step.step === step.count} onClick={nextStep} className="Button Button--blue Button--large Button--fullWidth Button Button--green Button--large Button--fullWidth u-mt-4">
                <b className="Button--text"> NEXT</b>
            </button>
        </div>
        <a onClick={exitSteps} id="ember1166" className="ember-view">SAVE &amp; EXIT</a>
        </Fragment>
    ) 
}

export default StepAction
