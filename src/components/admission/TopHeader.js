import React from 'react'
import { Link,useHistory } from 'react-router-dom'
import Avatar from '../../assets/img/default41.png'
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setStepCount } from '../../store/admission/stepSlice';
import { useSelector } from 'react-redux';

const TopHeader = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { step,applicant } = useSelector(state => state);
    
    const logout = () => {
       const cm = window.confirm("Logout of System?")
       if(cm){
         setIsLoggedIn(false);
         dispatch(setStepCount(1));
         localStorage.removeItem('state');
         history.push('/applicant');
       }
    }
    return (
       <nav id="ember918" className="nav-bar global-search nav-bar-v2 ember-view" style={{top: '0px'}}>
           <div className="nav_controls_v2">
                <div className="columns small-8">
                    <div className="nav-search">
                        <div id="ember932" className="aurora-auto-complete is-required dont-show-selected search-select ember-view">
                            <ul className="results u-clearfix">
                            <li>
                                <div id="ember937" className="ember-view">
                                   <h4 className="aurora-h4" style={{margin:'15px 15px 10px', background:'#fff8ef', color:'#b76118 ',padding:'10px 20px', borderRadius:'18px',boxShadow:'0 0 3px',fontWeight:'bolder'}}>{'APPLICANT ID : '+applicant.user.serial+' , MODE : '+applicant.user.name}</h4>
                                </div>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="columns nav-right-wrapper small-4 stackRight">
                    <div id="ember960" className="aurora-dropdown-menu navigation-dropdown-menu account-dropdown teams-dropdown ember-view">
                        <div role="button" className="dropdown-title">
                            {/* Applicant Image */}
                            <div id="ember966" className="ember-view">
                            <div className="avatarWrapper">
                                <img src={applicant.user.photo && applicant.user.photo != '' ? applicant.user.photo : Avatar} alt="avatar" className="avatar" />
                            </div>
                            </div>
                        </div>
                    </div>
                    <span className="top-nav-partition" />
                    {/* Logout */}
                    <div id="ember988" className="aurora-dropdown-menu multi-create-dropdown ember-view">
                        <div role="button" className="dropdown-title">
                            <Link  onClick={logout} className="create-button Button Button--green u-mr-3">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
                    
       
    )
}

export default TopHeader
