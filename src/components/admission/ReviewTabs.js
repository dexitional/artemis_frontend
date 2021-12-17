import React, { useMemo, useEffect, useState } from 'react'
import ReviewEducation from '../../pages/admission/reviews/ReviewEducation';
import ReviewGuardian from '../../pages/admission/reviews/ReviewGuardian';
import ReviewProfile from '../../pages/admission/reviews/ReviewProfile';
import ReviewResult from '../../pages/admission/reviews/ReviewResult';
import { useSelector, useDispatch } from 'react-redux'
import { setNextStep,setActiveStep,stepSlice } from '../../store/admission/stepSlice'
import ReviewChoice from '../../pages/admission/reviews/ReviewChoice';
import ReviewEmployment from '../../pages/admission/reviews/ReviewChoice';

const ReviewTabs = ({tag,title}) => {
    
    const step = useSelector( state => state.step );
    const dispatch = useDispatch()

    const edit = (dtag) => { 
       const activeMeta = step.meta.find(row => row.tag === dtag)
       dispatch(setActiveStep(activeMeta.num))
    }

    switch(tag){
        case 'profile': return <ReviewProfile tag={tag} title={title} edit={edit}/>; break;
        case 'guardian': return <ReviewGuardian tag={tag} title={title} edit={edit}/>; break;
        case 'education': return <ReviewEducation tag={tag} title={title} edit={edit}/>; break;
        case 'result': return <ReviewResult tag={tag} title={title} edit={edit}/>; break;
        case 'choice': return <ReviewChoice tag={tag} title={title} edit={edit}/>; break;
        case 'document': return <ReviewProfile tag={tag} title={title} edit={edit}/>; break; // Not done    
        case 'qualification': return <ReviewProfile tag={tag} title={title} edit={edit}/>; break; // Not done
        case 'referee': return <ReviewProfile tag={tag} title={title} edit={edit}/>; break;  // Not done
        case 'employment': return <ReviewEmployment tag={tag} title={title} edit={edit}/>; break; // Not done    
        default: return <ReviewProfile tag={tag} title={title} edit={edit}/>; break;
    }

}

export default ReviewTabs
