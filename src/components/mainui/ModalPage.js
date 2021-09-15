import React, { useState,useEffect } from 'react'
import { Button,Modal,TabContainer,Tabs,Tab,Col,Row,Nav } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { updateModal } from '../../store/admission/ssoSlice'
import PaperForm from './PaperForm'
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
      if(modal && modal.page == 'form') return  <PaperForm />
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
