import React, { Fragment, useEffect } from 'react';
import '../../assets/css/aurora.css';
import SideNav from '../../components/admission/SideNav'
import TopHeader from '../../components/admission/TopHeader'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import PreviewModal from '../../components/admission/PreviewModal';
import { setIsLoggedIn, setIsModal, setMeta, setStepCount } from '../../store/admission/stepSlice';
import '../../components/admission/AdminLayout.css';
import { saveApplication, submitApplication } from '../../store/utils/admissionApi';
import { dbData, getApplyTypeTitle, getStageTitle, isCompleteStep, isReviewStep } from '../../store/utils/admissionUtil';
import { setAccount, setAdmission, setAdmitStatus, setApplyMode, setChoice, setDocument, setEducation, setGrade, setGuardian, setNotification, setProfile, setResult, setStage, setSubmitStatus, setUser, updateUser } from '../../store/admission/applicantSlice';
import ModalPage from '../mainui/ModalPage';

const AdminLayout = ({children}) => {
    
    const { step,applicant } = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch()
    if(!step.isLoggedIn) history.push('/applicant')
    
    useEffect(()=>{
        mustSubmit();
    },[step.step])

    const closeModal = () => {
       dispatch(setIsModal(false));
    }

    const mustSubmit = async () => {
        if(isReviewStep(step)){
            const res = await saveApplication(dbData(applicant,step.meta))
            if(res.success){
              const rec = res.data;
              console.log("Applicant Data saved!")
              console.log(res.data)
               // Format Data fields for Forms
               if(rec.data.profile){
                rec.data.profile.dob = moment(rec.data.profile.dob).format('YYYY-MM-DD')
              }
              // Configure Application
              dispatch(setApplyMode(rec.apply_type));
              dispatch(setStage(rec.stage_id));
              // Setup Form Meta & Steps
              dispatch(setStepCount(rec.count));
              dispatch(setMeta(rec.meta));
              dispatch(setSubmitStatus(rec.flag_submit))
              // Setup User info
              const user = { photo: rec.user.photo, name: (rec.stage_id ? getStageTitle(rec.stage_id):'')+(rec.apply_type ? ' | '+getApplyTypeTitle(rec.apply_type):'')}
              dispatch(updateUser(user));
              // Setup Notifications
              dispatch(setNotification(rec.notification));
              // Setup User Form Data
              if(rec.data.profile) dispatch(setProfile(rec.data.profile))
              if(rec.data.guardian) dispatch(setGuardian(rec.data.guardian))
              if(rec.data.education) dispatch(setEducation(rec.data.education))
              if(rec.data.result){
                dispatch(setResult(rec.data.result))
                if(rec.data.grade) dispatch(setGrade(rec.data.grade))
              } 
              if(rec.data.choice) dispatch(setChoice(rec.data.choice))
              if(rec.data.document) dispatch(setDocument(rec.data.document))
              //if(rec.data.referee) dispatch(setReferee(rec.data.referee))
              //if(rec.data.employment) dispatch(setEmployment(rec.data.employment))
              //if(rec.data.qualification) dispatch(setQualification(rec.data.qualification))
              // dispatch(updateUser(user));
              
              // Setup Admission & Accounts
              dispatch(setAdmitStatus(rec.flag_admit))
              dispatch(setAdmission(rec.admission))
              dispatch(setAccount(rec.account))

            }

        }else if(isCompleteStep(step)){
            const res = await submitApplication(applicant.user.serial,applicant.flag_submit);
            if(res.success){
              console.log("Applicant Submitted saved!")
              console.log(res.data)
            }
        } 
    }

    return (
        <Fragment>
            <div id="container">
                <div id="content">
                <div className="contents">
                <div className="cloud-container nav-has-loaded" id="main">
                <div id="aurora-container" className="ember-application">
                    <div id="ember578" className="ember-view">
                        <div className="aurora-container with-side-nav">
                            <SideNav/>
                            <div className="aurora-container-right" style={{paddingTop: '94px'}}>
                                <TopHeader/>
                                <div className="global-search-overlay" />
                                <div className="aurora-body ">
                                {children}
                                </div>
                                <div id="ember1182" className="Footer ember-view"><p><small><b>Copyright © {new Date().getFullYear()}, AUCC Admissions</b></small></p></div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                </div>
            </div>
            
            { step.isModal ? <div onClick={closeModal} className="Modal-backdrop fade is-in" /> : null }
            <ModalPage/>
        </Fragment>
    )
}

export default AdminLayout


