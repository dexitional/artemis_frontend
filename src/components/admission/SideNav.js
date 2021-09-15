import React, { Fragment } from 'react'
import { Link,useLocation,useHistory } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { setIsAllowed, setIsLoggedIn } from '../../store/admission/stepSlice';


const SideNav = () => {

    const { step,applicant } = useSelector(state => state);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const pathname = location.pathname.replace('/','');
    
    const resumeAction = () => {
        dispatch(setIsAllowed(true));
        history.push('admission-session')
       return console.log("Resumed Application");
    }

    const exitSession = () => {
        const cm = window.confirm('Quit Application Session?')
        if(cm){
           dispatch(setIsAllowed(false));
           history.push('admission-dash')
        }  return false;
    }

    const exitApp = () => {
        const cm = window.confirm('Logout of System?')
        if(cm){
           dispatch(setIsLoggedIn(false));
           history.push('/')
        }  return false;
    }

    return (
        <Fragment>
        <div className="aurora-container-left" style={{top: '0px'}}>
                    <div id="ember613" className="side-nav ember-view">
                        <div className="logo-wrapper">
                            <Link to="admission-dash" id="ember623" className="Logo ember-view">AUCC</Link>
                        </div>
                        <div className="side-nav-section groups open-section">
                            <div id="ember645" className="side-nav-groups ember-view">
                                <h5>AUCC APPLICANT</h5>
                                <ul>
                                    <li>
                                    <a id="ember1540" className="navLink active-group active ember-view">
                                        <span className="side-nav-list-icon group-icon-4-small" />
                                        <div id="ember1541" className="ellipsis-text is-overflowing ember-view">
                                            <div id="ember1583" className="tooltip-wrap overflow ember-view">
                                                {applicant.user.serial}
                                            </div>
                                        </div>
                                    </a>
                                    </li>
                                    { pathname !== 'admission-session' && (applicant.stage_id != '' && applicant.apply_type != '') ? 
                                    <li>
                                        <a onClick={resumeAction} id="ember1292" className="addGroup ember-view">
                                            <span className="groupLink--left Icon Icon--plus" />
                                            <b><small>GOTO APPLICATION</small></b>
                                        </a>
                                    </li>
                                    : null
                                    }
                                </ul>
                            </div>
                        </div>

                        { pathname !== 'admission-session' && pathname !== 'admission-print' ? 
                        <div className="side-nav-section manage open-section">
                            <div id="ember680" className="ember-view">
                                <h5 role="button">APPLICANT MENU</h5>
                                <ul>
                                    <li><Link to="admission-dash" id="ember748" className="fleetPathActive ember-view">Application Guide</Link></li>
                                    <li><Link to="admission-notices" id="ember686" className="ember-view"> App Notifications { applicant.notification.length > 0 ? <span id="ember691" className="trailingLabelBox__beta--blue ember-view">{applicant.notification.length}</span> : null }</Link></li>
                                    { applicant.flag_submit == 1 ? <li><Link to="admission-status" id="ember733" className="fleetPathActive ember-view">Admission Status</Link></li> : null }
                                    {/*<li><Link to="admission-support" id="ember748" className="fleetPathActive ember-view">Contact Support</Link></li>*/}
                                </ul>
                            </div>
                        </div>
                        : null
                        }
                        <div className="side-nav-section open-section">
                            <h5>Account</h5>
                            <ul>
                                { pathname !== 'admission-session' && pathname !== 'admission-print'? <li><Link onClick={exitApp} id="ember871" className="ember-view">Logout</Link></li>:''}   
                                { ['admission-session','admission-print'].includes(pathname) ? <li><Link onClick={exitSession} id="ember871" className="ember-view"><b>Exit Session </b></Link></li>:''} 
                            </ul>
                        </div>
                       
                        </div>
                    </div>
                    
            
        </Fragment>
    )
}

export default SideNav
