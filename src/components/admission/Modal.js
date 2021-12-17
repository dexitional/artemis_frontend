import React from 'react'

const Modal = ({title = null, body, size='small'}) => {
    
    return (
        <div tabIndex={0} role="dialog" id="ember1167" className="Modal fade Modal--medium ember-view is-in" style={{display: 'block', paddingLeft: '0px', marginLeft:'200px'}}>
            <div className="Modal-dialog fleets ">
                <div className="Modal-content settings-edit form-modal">
                <div className="Modal-header u-pb-0">
                    <a role="button" data-dismiss="modal" aria-label="Close" className="Icon--close Modal-close"/>
                    { title ? <h2 className="modal-title">{title}</h2>: null }
                    <span className="modal-subtitle" />
                </div>
                <div className="Modal-body u-clearfix u-pb-3">
                    {/* Content */}
                    Coming to america part one
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
