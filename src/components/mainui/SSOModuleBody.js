import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import Sessions from './apps/ams/Sessions';
import Vendors from './apps/ams/Vendors';
import Vouchers from './apps/ams/Vouchers';
import ModalPage from './ModalPage';
import { useSelector } from 'react-redux';
import Applicants from './apps/ams/Applicants';

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
  }
  return (
    <>
     {switchPage()}
     <ModalPage />
    </>
    )
}

export default SSOModuleBody;
