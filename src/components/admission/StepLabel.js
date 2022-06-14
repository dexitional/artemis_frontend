import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

const StepLabel = ({ meta }) => {
    const step = useSelector(state => state.step);
    return (
        <div className="row">
            <div className="small-12 columns">
                <div className="CreateFleet--header">
                    {
                      meta.map((row,i) => 
                      (
                        <Fragment>
                          <div key={i} className={row.active ? 'CreateFleet--headerStep CreateFleet--headerStep-current':'CreateFleet--headerStep'}>
                            <div className="CreateFleet--circle" style={row.active ? { border:'2px solid #b76118' }:{border:'1px solid #b76118'}}><b>{row.num}</b></div>
                            { row.active ? <b className="CreateFleet--headerTitle">{row.title && row.title.toUpperCase()}</b> : <span className="CreateFleet--headerTitle">{row.title && row.title.toUpperCase()}</span> }
                          </div>
                        { (i < meta.length-1 || i === 0) ? <div className="CreateFleet--space" /> : ''}
                        </Fragment>
                      ))
                    }
                </div>
            </div>
       </div>
    )
}

export default StepLabel
