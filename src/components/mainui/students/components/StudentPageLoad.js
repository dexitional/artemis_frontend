import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModalPage from '../../ModalPage';
import StudentDash from '../pages/StudentDash';
import StudentProfile from '../pages/StudentProfile';
import StudentRegister from '../pages/StudentRegister';
import StudentResult from '../pages/StudentResult';
import PaperSlip from '../../PaperSlip';
import StudentFees from '../pages/StudentFees';
import ModalForm from './ModalForm';

const StudentPageLoad = ({mod,view,data = {},recid}) => {
  const { sso } = useSelector( state => state)
  const switchPage = () => {
    // Student Modules
    switch(mod){
      case 'menu': return <StudentDash view={view} data={data} recid={recid}/>; break;
      case 'profile': return <StudentProfile view={view} data={data} recid={recid}/>; break;
      case 'results': return <StudentResult view={view} data={data} recid={recid}/>; break;
      case 'registration': return <StudentRegister view={view} data={data} recid={recid}/>; break;
      case 'slip': return <PaperSlip view={view} data={data} recid={recid}/>; break;
      case 'fees': return <StudentFees view={view} data={data} recid={recid}/>; break;
      //case 'results': return <StudentDash view={view} data={data} recid={recid}/>; break;
      default: return <StudentDash view={view} data={data} recid={recid}/>; break;
    }
    //if(mod == 'menus') return <StudentDash view={view} data={data} recid={recid}/>
    //if(mod == 'profile') return <StudentProfile view={view} data={data} recid={recid}/>
    //if(mod == 'results') return <StudentResult view={view} data={data} recid={recid}/>
    //if(mod == 'registration') return <StudentRegister view={view} data={data} recid={recid}/>
    //if(mod == 'aimapp') return <StudentAimApp view={view} data={data} recid={recid}/>
    //if(mod == 'fees') return <StudentFees view={view} data={data} recid={recid}/>
  }

  return (
    <>
      {switchPage()}
      <ModalPage />
      {/*<ModalForm/>*/}
    </>
  )

}

export default StudentPageLoad;
