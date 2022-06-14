import React, { useEffect, useRef } from 'react'
import StepAction from '../../components/admission/StepAction'
import AdminLayout from '../../components/admission/AdminLayout'
import { loadStepLabel } from '../../store/utils/admissionUtil'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StepPage from '../../components/admission/StepPage';
import Profile from './steps/Profile';
import { setIsAllowed, setStepCount } from '../../store/admission/stepSlice';


const Session = ({children}) => {
    const step = useSelector(state => state.step);
    const history = useHistory();
    const pageRef = useRef();
    const dispatch = useDispatch();

    
    const exitSession = () => {
       const cm = window.confirm('Quit Application Session?')
       if(cm){
          dispatch(setIsAllowed(false));
          history.push('admission-dash')
        } return false;
    }

    
    useEffect(() => {
      if(!step.isAllowed){
         history.push('admission-dash')
      }
    },[])

    useEffect(() => {
      pageRef.current.scrollIntoView();
    },[])
    

    return (
      <AdminLayout >
        <div className="fleetCreate" ref={pageRef}>
            <section className="barriers-page">
                { loadStepLabel(step) }
                <div className="Box u-mb-4 u-mt-4">
                   {children}
                </div>
                <StepAction exitSession={exitSession} />
            </section>
        </div> 
      </AdminLayout>
    )
}

export default Session
