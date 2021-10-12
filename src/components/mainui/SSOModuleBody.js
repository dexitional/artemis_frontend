import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import Sessions from './apps/ams/Sessions';
import Vendors from './apps/ams/Vendors';
import Vouchers from './apps/ams/Vouchers';
import ModalPage from './ModalPage';
import { useSelector } from 'react-redux';
import Applicants from './apps/ams/Applicants';
import Students from './apps/ais/Students';
import StudentBills from './apps/fms/StudentBills';
import FeePayments from './apps/fms/FeePayments';
import Registrations from './apps/ais/Registrations';
import HRStaff from './apps/hrs/HRStaff';

const SSOModuleBody = ({module,mod,view,data,recid}) => {
  const { sso } = useSelector( state => state)
  const switchPage = () => {
      // AMS Modules
      if(module == 'ams' && mod == 'sessions') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'vendors') return <Vendors view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'vouchers') return <Vouchers view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'applicants') return <Applicants view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'selections') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'letters') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'freshers') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'bills') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'exams') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'programs') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'modes') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'notices') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'statistics') return <Sessions view={view} data={data} recid={recid}/>
      // HRS Modules
      if(module == 'hrs' && mod == 'hrstaff') return <HRStaff view={view} data={data} recid={recid}/>

      // AIS Modules
      if(module == 'ais' && mod == 'students') return <Students view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'registrations') return <Registrations view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'curriculum') return <Students view={view} data={data} recid={recid}/>
      // FMS Modules
      if(module == 'fms' && mod == 'studentbills') return <StudentBills view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'feestrans') return <FeePayments view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'alltrans') return <StudentBills view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'debtors') return <StudentBills view={view} data={data} recid={recid}/>
      
      
  }
  return (
    <>
     {switchPage()}
     <ModalPage />
    </>
    )
}

export default SSOModuleBody;
