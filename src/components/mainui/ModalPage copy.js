import React from 'react'
import { Button,Modal,TabContainer,Tabs,Tab,Col,Row,Nav } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { updateModal } from '../../store/admission/ssoSlice'
import PaperTable from './PaperTable'

const ModalPage = ({header = 'title', content = 'title',footer = null,show = true, size = 'md' }) => {
  const dispatch = useDispatch()
  const closeButton = () => {
     dispatch(updateModal({show:false}))
  }

  return (
    <Modal show={show} dialogClassName={`modal-dialog-${size}`} onHide={closeButton} style={{background:'white',overflow:'hidden'}}>
        <Modal.Header>
        <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}
          <PaperTable/>
        </Modal.Body>
        {footer}
    </Modal>
  )
}

export default ModalPage
