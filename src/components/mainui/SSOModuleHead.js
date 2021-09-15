import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

const SSOModuleHead = ({module,mod,view,data}) => {

  return (
	<div className="col-lg-12 main-content" style={{paddingLeft:0,paddingRight:0,display:'none'}}>
		<div className="content-area card card-secondary card-text-light">
			<div className="card-innr" style={{padding:'10px 10px 0px 25px', border:'1px solid #555' }}>
				<div className="card-head has-aside">
				  <h6 className="card-title" style={{color:'#555'}}>{mod && mod.toUpperCase()}</h6>
				  <div className="d-flex">
					 <div className="card-opt">
						<Link to={{ pathname:'/app', data }} className="btn btn-default btn-sm apply-btn text-info" style={{color:'#1b34a5'}}><i className="fa fa-arrow-left"></i> {module && module.toUpperCase()} MENU</Link>
					 </div> &nbsp;&nbsp;
					 {/*
					 <div className="card-opt"><i className="fa fa-2x fa-info d-none"></i>
						<a href="" className="btn btn-default btn-sm apply-btn text-info" style={{color:'#1b34a5'}}>APPLY LEAVE</a>
					 </div>
					 */}
				  </div>
				</div>
				{/*<p></p>*/}
			</div>
		</div>
    </div>
  )
}

export default SSOModuleHead;
