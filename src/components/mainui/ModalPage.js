import React, { useState,useEffect } from 'react'
import { Button,Modal,TabContainer,Tabs,Tab,Col,Row,Nav } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { updateModal } from '../../store/admission/ssoSlice'
import PaperBill from './PaperBill'
import PaperForm from './PaperForm'
import PaperMountList from './PaperMountList'
import PaperReceipt from './PaperReceipt'
import PaperRegList from './PaperRegList'
import PaperRegSlip from './PaperRegSlip'
import PaperResult from './PaperResult'
import PaperSlip from './PaperSlip'
import PaperTable from './PaperTable'

const ModalPage = () => {
  
  const dispatch = useDispatch()
  const { sso } = useSelector( state => state)
  const { modal } = sso;
  
  const closeButton = () => {
    dispatch(updateModal({show:false}))
  }

  const switchPage = () => {
      if(modal && modal.page == 'table') return  <PaperTable />
      if(modal && modal.page == 'letter') return  <PaperTable />
      if(modal && modal.page == 'slip') return  <PaperSlip />
      if(modal && modal.page == 'result') return  <PaperResult />
      // Admin Modals Printout
      if(modal && modal.page == 'form') return  <PaperForm /> // Applicant Printout
      if(modal && modal.page == 'bill') return  <PaperBill /> // Bill Printout
      if(modal && modal.page == 'payment') return  <PaperReceipt /> // Payment Receipt Printout
      if(modal && modal.page == 'regslip') return  <PaperRegSlip /> // Registration Printout
      if(modal && modal.page == 'reglist') return  <PaperRegList /> // Registration Printout
      if(modal && modal.page == 'regmount') return  <PaperMountList /> // Registration Printout
 
 
      
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
