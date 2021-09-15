import React from 'react'

const AlertBanner = ({title,content,icon,colorcode = 'danger'}) => {
    return (
        <div className="aurora-alerts">
            <div className="row">
              <div className="small-12 columns">
                <div className="bui u-mb-5">
                    <div role="banner" className={'balance-due-banner bui-Banner bui-Banner--'+colorcode}>
                        <div className="bui-Banner-content">
                           <h3>{icon ? <span className={'icon '+icon} />:''}{title}</h3>
                           <p><b>{content}</b></p>
                        </div>
                         
                        <div class="bui-Banner-right">Ok !</div>
                       {/**/}
                    </div>
                </div>
              </div>
            </div>
        </div>
                    
    )
}

export default AlertBanner
