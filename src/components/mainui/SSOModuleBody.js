import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModalPage from './ModalPage';
import Sessions from './apps/ams/Sessions';
import Vendors from './apps/ams/Vendors';
import Vouchers from './apps/ams/Vouchers';
import Applicants from './apps/ams/Applicants';
import Students from './apps/ais/Students';
import StudentBills from './apps/fms/StudentBills';
import FeePayments from './apps/fms/FeePayments';
import Registrations from './apps/ais/Registrations';
import HRStaff from './apps/hrs/HRStaff';
import HRJob from './apps/hrs/HRJob';
import HRUnit from './apps/hrs/HRUnit';
import StaffProfile from './apps/hrs/StaffProfile';
import OtherPayments from './apps/fms/OtherPayments';
import Shortlists from './apps/ams/Shortlists';
import Matriculants from './apps/ams/Matriculants';
import StudentAccounts from './apps/fms/StudentAccounts';
import Debtors from './apps/fms/Debtors';
import VoucherSales from './apps/fms/VoucherSales';
import BillItems from './apps/fms/BillItems';
import Scoresheets from './apps/ais/Scoresheets';
import MyScoresheets from './apps/ais/MyScoresheets';
import Curriculum from './apps/ais/Curriculum';
import Calendar from './apps/ais/Calendar';
import Informer from './apps/ais/Informer';
import Progchange from './apps/ais/Progchange';
import Letters from './apps/ams/Letters';
import Entrance from './apps/ams/Entrance';
import Utilities from './apps/ams/Utilities';
import Deferment from './apps/ais/Deferment';

const SSOModuleBody = ({module,mod,view,data,recid}) => {
  const { sso } = useSelector( state => state)
  const switchPage = () => {
      // AMS Modules
      if(module == 'ams' && mod == 'sessions') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'vendors') return <Vendors view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'vouchers') return <Vouchers view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'applicants') return <Applicants view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'shortlists') return <Shortlists view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'letters') return <Letters view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'matriculants') return <Matriculants view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'bills') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'entrance') return <Entrance view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'utilities') return <Utilities view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'modes') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'notices') return <Sessions view={view} data={data} recid={recid}/>
      if(module == 'ams' && mod == 'statistics') return <Sessions view={view} data={data} recid={recid}/>
      // HRS Modules
      if(module == 'hrs' && mod == 'hrstaff') return <HRStaff view={view} data={data} recid={recid}/>
      if(module == 'hrs' && mod == 'hrsunit') return <HRUnit view={view} data={data} recid={recid}/>
      if(module == 'hrs' && mod == 'hrsjob') return <HRJob view={view} data={data} recid={recid}/>
      if(module == 'hrs' && mod == 'profile') return <StaffProfile view={view} data={data} recid={recid}/>
      // AIS Modules
      if(module == 'ais' && mod == 'students') return <Students view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'registrations') return <Registrations view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'scoresheets') return <Scoresheets view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'myscoresheets') return <MyScoresheets view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'curriculum') return <Curriculum view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'calendar') return <Calendar view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'informer') return <Informer view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'progchange') return <Progchange view={view} data={data} recid={recid}/>
      if(module == 'ais' && mod == 'deferment') return <Deferment view={view} data={data} recid={recid}/>
      // FMS Modules
      if(module == 'fms' && mod == 'studentbills') return <StudentBills view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'staccounts') return <StudentAccounts view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'feestrans') return <FeePayments view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'othertrans') return <OtherPayments view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'alltrans') return <StudentBills view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'debtors') return <Debtors view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'vsales') return <VoucherSales view={view} data={data} recid={recid}/>
      if(module == 'fms' && mod == 'billitems') return <BillItems view={view} data={data} recid={recid}/>
      
      
  }
  return (
    <>
     {switchPage()}
     <ModalPage />
    </>
    )
}

export default SSOModuleBody;
