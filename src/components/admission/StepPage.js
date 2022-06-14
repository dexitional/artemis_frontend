import React, { useMemo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Alpha from '../../pages/admission/Review';
import Complete from '../../pages/admission/Complete';
import Review from '../../pages/admission/Review';
import Choice from '../../pages/admission/steps/Choice';
import Document from '../../pages/admission/steps/Document';
import Education from '../../pages/admission/steps/Education';
import Guardian from '../../pages/admission/steps/Guardian';
import Profile from '../../pages/admission/steps/Profile';
import Qualification from '../../pages/admission/steps/Qualification';
import Referee from '../../pages/admission/steps/Referee';
import Result from '../../pages/admission/steps/Result';
import Employment from '../../pages/admission/steps/Employment';

const StepPage = () => {
    const step = useSelector( state => state.step );
    const currentStep = step.step;
    const stepMeta = step.meta.find( row => row.num === currentStep );
   
    switch(stepMeta.tag){
        case 'profile': return <Profile/>; break;
        case 'guardian': return <Guardian/>; break;
        case 'education': return <Education/>; break;
        case 'result': return <Result/>; break;
        case 'choice': return <Choice/>; break;
        case 'document': return <Document/>; break;
        case 'employment': return <Employment/>; break;
        case 'qualification': return <Qualification/>; break;
        case 'referee': return <Referee/>; break;
        case 'review': return <Review/>; break;
        case 'complete': return <Complete/>; break;
        default: return <Profile/>; break;
    }

}

export default StepPage
