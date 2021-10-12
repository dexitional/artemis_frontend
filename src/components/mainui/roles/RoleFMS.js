import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const RoleFMS = ({data}) => {

	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
      const modules = [
		  { title : 'Student Bills', desc: 'Student Bills Module', url: '/app/fms?mod=studentbills&view=list',icon:'fa-stream', accessRoles: [1,4] },
		  //{ title : 'Student Accounts', desc: 'Student Accounts Module', url: '/app/fms?mod=studentaccounts&view=list',icon:'fa-id-card', accessRoles: [1,4] },
		  { title : 'Fees Payments', desc: 'Fees Payments Module', url: '/app/fms?mod=feestrans&view=list',icon:'fa-file-alt', accessRoles: [] },
		  //{ title : 'Other Payments', desc: 'Other Transactions Module', url: '/app/fms?mod=othertrans&view=list',icon:'fa-user-check', accessRoles: [] },
		  //{ title : 'Transactions', desc: 'Transaction Module', url: '/app/fms?mod=alltrans&view=list',icon:'fa-chalkboard-teacher', accessRoles: [] },
		  //{ title : 'Bill Items', desc: 'Bill Items Module', url: '/app/fms?mod=billitems&view=list',icon:'fa-chalkboard-teacher', accessRoles: [] },
		  //{ title : 'Debtors', desc: 'Debtors Module', url: '/app/fms?mod=debtors&view=list',icon:'fa-user-friends', accessRoles: [] },
		  //{ title : 'Statistics', desc: 'Statistics Module', url: '/app/fms?mod=statistics&view=list',icon:'fa-chart-bar', accessRoles: [] },
		  //{ title : 'Vendors', desc: 'Vendor Module', url: '/app/ams?mod=vendors&view=list',icon:'fa-id-user', accessRoles: [1,4] },
	  ]

      return (
		<>
		  {modules.map((mod,i) => 	
			<div className="col-md-3">
				<div className="token-info nitro">
					<em className={`fas fa-3x ${mod.icon} text-info`} />
					<div className="gaps-2x" />
					<div><Link to={mod.url} title={mod.desc} className="btn btn-primary" style={{color:'#f8e0cd'}}><b>{mod.title.toUpperCase()}</b></Link></div>
				</div>
			</div>
		  )}
		</>
	  )
}

export default RoleFMS;
