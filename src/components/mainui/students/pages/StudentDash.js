import React, { Component, Fragment }  from 'react';
import '../../../../assets/css/ui-auth-elements.css';
import { useHistory,Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const StudentDash = () => {
	
	const { sso }  = useSelector(state=>state);
	const {user} = sso;
	const modules = [
		{ title : 'PROFILE MODULE', desc: 'Student Profile', url: '/student?mod=profile&view=list',icon:'fa-user-graduate'},
		{ title : 'REGISTRATION MODULE', desc: 'Registration Module', url: '/student?mod=registration&view=list',icon:'fa-address-card'},
		//{ title : 'RESULTS MODULE', desc: 'Statement of Result', url: '/student?mod=results&view=list',icon:'fa-book'},
		{ title : 'FEES MODULE', desc: 'Academic Fees & Payment History', url: '/student?mod=fees&view=list',icon:'fa-credit-card'},
		//{ title : 'SLIP MODULE', desc: 'Academic Fees & Payment History', url: '/student?mod=slip&view=list',icon:'fa-file-invoice-dollar'},
	]

	return (
	  <div className="row">
		<div className="col-lg-12">
			<div className="token-information card card-full-height">
				<h3 className="sub-head bg-blueblack"><span style={{fontSize:'.9rem', color:'#eee'}}>STUDENT PORTAL MENU</span></h3>
				<div className="row no-gutters height-100">
				   
				   {modules.map((mod,i) => 	
					  <div className="col-md-3">
						<div className="token-info nitro">
								<em className={`fas fa-3x ${mod.icon} text-info`} />
								<div className="gaps-2x" />
								<div><Link to={mod.url} title={mod.desc} className="btn btn-primary" style={{color:'#f8e0cd'}}><b>{mod.title.toUpperCase()}</b></Link></div>
						</div>
					  </div>
					)}

				</div>
			</div>
		</div>
  	  </div>
	)
}


export default StudentDash;
