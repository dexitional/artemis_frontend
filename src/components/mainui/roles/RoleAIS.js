import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { helperData } from '../../../store/utils/helperData';

const RoleAIS = ({data}) => {

	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
      const modules = [
		  { title : 'Students', desc: 'Students Module', url: '/app/ais?mod=students&view=list',icon:'fa-id-card', accessRoles: [15,16] },
		  { title : 'Scoresheets', desc: 'Scoresheets Module', url: '/app/ais?mod=scoresheets&view=list',icon:'fa-file-alt', accessRoles: [15,21,22] },
		  { title : 'My Scoresheets', desc: 'Assigned Scoresheets Module', url: '/app/ais?mod=myscoresheets&view=list',icon:'fa-file-alt', accessRoles: [15,21,22,23] },
		  { title : 'Registrations', desc: 'Registrations Module', url: '/app/ais?mod=registrations&view=list',icon:'fa-id-card-alt', accessRoles: [15] },
		  //{ title : 'Classes', desc: 'Class groups Module', url: '/app/ais?mod=classes&view=list',icon:'fa-user-friends', accessRoles: [15,21,22] },
		  //{ title : 'Programs', desc: 'Programs Module', url: '/app/ais?mod=programs&view=list',icon:'fa-file-alt', accessRoles: [15,21,22] },
		  { title : 'Curriculum', desc: 'Curriculum Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [15,21,22] },
		  //{ title : 'Resits', desc: 'Resit Module', url: '/app/ais?mod=resits&view=list',icon:'fa-id-card-alt', accessRoles: [15,21,22] },
		  { title : 'Calendar', desc: 'Academic Calendar Module', url: '/app/ais?mod=calendar&view=list',icon:'fa-book', accessRoles: [15,21] },
		  { title : 'Informer', desc: 'Information Dispatcher Module', url: '/app/ais?mod=informer&view=list',icon:'fa-envelope', accessRoles: [1,15,18,13] },
		  { title : 'Program Change', desc: 'Program Change Module', url: '/app/ais?mod=progchange&view=list',icon:'fa-envelope', accessRoles: [15] },
		  { title : 'Deferment', desc: 'Deferment Module', url: '/app/ais?mod=deferment&view=list',icon:'fa-envelope', accessRoles: [15] },
		  { title : 'Transwift', desc: 'Transwift Module', url: '/app/ais?mod=transwift&view=list',icon:'fa-book', accessRoles: [15] },
		  //{ title : 'Schemes', desc: 'Academic Scheme Module', url: '/app/ais?mod=schemes&view=list',icon:'fa-book', accessRoles: [15] },
		  //{ title : 'Settings', desc: 'Settings Module', url: '/app/ais?mod=settings&view=list',icon:'fa-cog', accessRoles: [15] },
		  //{ title : 'Statistics', desc: 'Stats Module', url: '/app/ais?mod=statistics&view=list',icon:'fa-chart-bar', accessRoles: [15,21,22] },
		  /* Program Change-[ Change of program ], 
		     Transwift-[transcript-attestation-proficiency requests], 
			 Utilities-[country,region,religion,]
			 
		   */
	  ]

      return (
		<>
		  {modules.map((mod,i) => helperData.renderView(mod.accessRoles,user) &&	
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

export default RoleAIS;
