import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const RoleSSO = ({data}) => {

	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
      const modules = [
		  { title : 'User accounts', desc: 'Freshers Bills Module', url: '/app/ams?mod=sessions&view=list',icon:'fa-stream', accessRoles: [1,4] },
		  { title : 'User groups', desc: 'Freshers Bills Module', url: '/app/ams?mod=sessions&view=list',icon:'fa-stream', accessRoles: [1,4] },
		  { title : 'User roles', desc: 'Freshers Bills Module', url: '/app/ams?mod=sessions&view=list',icon:'fa-stream', accessRoles: [1,4] },
		  { title : 'Identity Photos', desc: 'Continuing Bills Module', url: '/app/ams?mod=vouchers&view=list',icon:'fa-id-card', accessRoles: [1,4] },
		  { title : 'Active Apps', desc: 'Freshers Bills Module', url: '/app/ams?mod=sessions&view=list',icon:'fa-stream', accessRoles: [1,4] },
		  { title : 'App roles', desc: 'Freshers Bills Module', url: '/app/ams?mod=sessions&view=list',icon:'fa-stream', accessRoles: [1,4] },
		  { title : 'Staff ID Cards', desc: 'Freshers Bills Module', url: '/app/ams?mod=sessions&view=list',icon:'fa-stream', accessRoles: [1,4] },
		  { title : 'Student ID Cards', desc: 'Freshers Bills Module', url: '/app/ams?mod=sessions&view=list',icon:'fa-stream', accessRoles: [1,4] },
		
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

export default RoleSSO;
