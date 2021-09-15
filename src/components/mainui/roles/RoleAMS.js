import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const RoleAMS = ({data}) => {

	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
      const modules = [
		  { title : 'Sessions', desc: 'Admission sessions', url: '/app/ams?mod=sessions&view=list',icon:'fa-stream', accessRoles: [1,4] },
		  { title : 'Vouchers', desc: 'Voucher Module', url: '/app/ams?mod=vouchers&view=list',icon:'fa-id-card', accessRoles: [1,4] },
		  { title : 'Applicants', desc: 'Applicants Module', url: '/app/ams?mod=applicants&view=list',icon:'fa-user-friends', accessRoles: [] },
		  { title : 'Selections', desc: 'Selections Module', url: '/app/ams?mod=selections&view=list',icon:'fa-user-friends', accessRoles: [] },
		  { title : 'Letters', desc: 'Letters Module', url: '/app/ams?mod=letters&view=list',icon:'fa-file-alt', accessRoles: [] },
		  { title : 'Freshers', desc: 'Freshers Module', url: '/app/ams?mod=freshers&view=list',icon:'fa-user-check', accessRoles: [] },
		  { title : 'Bills', desc: 'Bills Module', url: '/app/ams?mod=bills&view=list',icon:'fa-chalkboard-teacher', accessRoles: [] },
		  { title : 'Entrance Exams', desc: 'Exams Module', url: '/app/ams?mod=entrance&view=list',icon:'fa-id-card-alt', accessRoles: [] },
		  { title : 'Programs', desc: 'Programs Module', url: '/app/ams?mod=programs&view=list',icon:'fa-book', accessRoles: [] },
		  { title : 'Modes', desc: 'Admission Modes', url: '/app/ams?mod=modes&view=list',icon:'fa-chalkboard-teacher', accessRoles: [] },
		  { title : 'Notices', desc: 'Notice Module', url: '/app/ams?mod=notices&view=list',icon:'fa-comment', accessRoles: [] },
		  { title : 'Statistics', desc: 'Stats Module', url: '/app/ams?mod=statistics&view=list',icon:'fa-chart-bar', accessRoles: [] },
		  { title : 'Vendors', desc: 'Vendor Module', url: '/app/ams?mod=vendors&view=list',icon:'fa-id-user', accessRoles: [1,4] },
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

export default RoleAMS;
