import React from 'react'
import { useSelector } from 'react-redux';


const PreviewModal = ({ source,closeModal }) => {
    const { step } = useSelector(state => state)

    return (
        step.isModal ? 
        <div tabIndex={0} role="dialog" id="ember1167" className="Modal fade Modal--small ember-view is-in" style={{display: 'block', paddingLeft: '0px', marginLeft:'200px'}}>
            <div className="Modal-dialog fleets ">
                <div className="Modal-content settings-edit form-modal">
                <div className="Modal-header u-pb-0">
                    <a onClick={closeModal} role="button" data-dismiss="modal" aria-label="Close" className="Icon--close Modal-close"/>
                </div>
                <div className="Modal-body u-clearfix u-pb-3">
                    <embed src={source}   width="100%" height="450px"></embed>
                </div>
                </div>
            </div>
        </div>
        : null
    )
}

export default PreviewModal
