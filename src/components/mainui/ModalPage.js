import React, { useState,useEffect } from 'react'
import { Button,Modal,TabContainer,Tabs,Tab,Col,Row,Nav } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { updateModal } from '../../store/admission/ssoSlice'
import PaperBill from './PaperBill'
import PaperClassList from './PaperClassList'
import PaperCourseResult from './PaperCourseResult'
import PaperForm from './PaperForm'
import PaperLetter from './PaperLetter'
import PaperMiniProfile from './PaperMiniProfile'
import PaperMountList from './PaperMountList'
import PaperReceipt from './PaperReceipt'
import PaperRegList from './PaperRegList'
import PaperRegSlip from './PaperRegSlip'
import PaperResult from './PaperResult'
import PaperSlip from './PaperSlip'
import PaperStaffActiveList from './PaperStaffActiveList'
import PaperTable from './PaperTable'
import PaperTransDetail from './PaperTransDetail'

const ModalPage = () => {
  
  const dispatch = useDispatch()
  const { sso } = useSelector( state => state)
  const { modal } = sso;
  
  const closeButton = () => {
    dispatch(updateModal({show:false}))
  }

  const switchPage = () => {
      if(modal && modal.page == 'table') return  <PaperTable />
      if(modal && modal.page == 'letter') return  <PaperLetter />
      if(modal && modal.page == 'slip') return  <PaperSlip />
      if(modal && modal.page == 'result') return  <PaperResult />
      // Admin Modals Printout
      if(modal && modal.page == 'form') return  <PaperForm /> // Applicant Printout
      if(modal && modal.page == 'bill') return  <PaperBill /> // Bill Printout
      if(modal && modal.page == 'payment') return  <PaperReceipt /> // Payment Receipt Printout
      if(modal && modal.page == 'transdetail') return  <PaperTransDetail /> // Bill Printout
      if(modal && modal.page == 'regslip') return  <PaperRegSlip /> // Registration Printout
      if(modal && modal.page == 'reglist') return  <PaperRegList /> // Registration Printout
      if(modal && modal.page == 'regmount') return  <PaperMountList /> // Mounted Course Printout
      if(modal && modal.page == 'staffactive') return  <PaperStaffActiveList /> // Active Staff Printout
      if(modal && modal.page == 'courseres') return  <PaperCourseResult /> // Course Results Printout
      if(modal && modal.page == 'classlist') return  <PaperClassList /> // Class List Printout
      if(modal && modal.page == 'miniprofile') return  <PaperMiniProfile /> // Staff Mini Profile Printout
 
 
      
  }


  return (
    <Modal show={modal && modal.show} dialogClassName={`modal-dialog-${modal && modal.size}`} onHide={closeButton}>
        <Modal.Body style={{height:'90vh', overflow:'scroll',padding:'10px 0'}}>
          {switchPage()}
        </Modal.Body>
    </Modal>
  )
}

export default ModalPage
