import React,{useState} from 'react'
import AdminLayout from '../../components/admission/AdminLayout'
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import htmlToReact from 'html-react-parser';
import moment from 'moment';

const Notifications = () => {
    
    const history = useHistory();
    const { applicant } = useSelector(state => state)
    const dispatch = useDispatch()
    const [index,setIndex] = useState(-1)

    const setActive = (id) => {
        console.log(id)
        setIndex(id == index ? id : (id != -1 ? id : -1));
        console.log(index)
    }

    return (
        <AdminLayout>
            <div class="row">
                <div class="small-6 columns"><h3 class="u-floatLeft heading">APP NOTIFICATIONS</h3></div>
            </div>
            <div className="row">
               <div className="small-12 columns u-mb-4">
                <table className="notification-listing">
                    <thead>
                        <tr>
                            <th id="ember2320" className="aurora-th type ember-view"><span className="headerText">Type</span></th>
                            <th id="ember2321" className="aurora-th subject ember-view"><span className="headerText">Subject</span></th>
                            <th id="ember2322" className="aurora-th created_at ember-view"><span className="headerText">Date</span></th>
                            <th id="ember2323" className="aurora-th action ember-view"><span className="headerText" /></th>
                        </tr>
                    </thead>
                    <tbody>

                        { applicant.notification.map((row,i) => 

                        <tr onClick={()=> setActive(i)} role="button" id="notification-227013966" className={ index == i ? "notification-row" : "notification-row acknowledged"}>
                            <td className="type">
                                <div className="resource-icon default-notification" />
                            </td>
                            <td className="subject">
                                <p className="u-mb-0"></p>
                                <div id="ember2326" className="ellipsis-text ember-view">{row.title}!</div><p />
                                <div className={index == i ? "body is-showing" : "body"} style={ index == i ? {minHeight: '200px'} : {minHeight: 'auto'}}>
                                    <div className="full">
                                        <p>Greetings {row.receiver} !</p>
                                        { htmlToReact(row.content) }
                                    </div>
                                    <div className="blurb">
                                        Hello !  {row.excerpt}
                                    </div>
                                </div>
                            </td>
                            <td className="created_at"><div data-toggle="tooltip" id="ember2327" className="tooltip-wrap ember-view"><time>{row.created_at}</time></div></td>
                            <td className="action">
                                { index != i ? <span>Show<span className="Icon--arrowDown" /></span>
                                : <span>Hide<span className="Icon--arrowUp" /></span>
                                }
                            </td>
                        </tr>
                        )}

                    </tbody>
                </table>

               {/*
                <div id="ember2424" className="Pagination u-mb-4 u-mt-6 ember-view">
                    <a href="/notifications?i=c3d9b3&page=0" id="ember2425" className="is-disabled prev ember-view">
                        Previous<div className="Loader--basic Loader--blue  u-va-m   " />
                    </a>
                    <a href="/notifications?i=c3d9b3" id="ember2428" className="is-active page pagination-button  active ember-view"><span className="Label">1</span></a>
                    <a href="/notifications?i=c3d9b3&page=2" id="ember2430" className=" page pagination-button  ember-view"><span className="Label">2</span></a>
                    <a href="/notifications?i=c3d9b3&page=3" id="ember2432" className=" page pagination-button  ember-view"><span className="Label">3</span></a>
                    <a href="/notifications?i=c3d9b3&page=2" id="ember2433" className=" next  ember-view">Next</a>
                </div>
               */}

              </div>
            </div>
        </AdminLayout>
    )
}

export default Notifications
