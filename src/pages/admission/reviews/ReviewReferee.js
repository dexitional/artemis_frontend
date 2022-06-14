import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { getClass, getTitle } from '../../../store/utils/admissionUtil';
import { helperData } from '../../../store/utils/helperData';

const ReviewReferee = ({tag,title,edit}) => {

    const { applicant,helper } = useSelector(state => state)
    const { referee } =  applicant;

    const editRecord = () => {
        edit(tag);
    }

    return (
        <Fragment>
           <div className="row">
                <div className="small-7 columns"><h3 className="u-mb-3">{title}</h3></div>
                <div className="small-5 columns">
                    <button onClick={editRecord} class="Button u-floatRight u-mb-3">&nbsp;<span class="Icon--edit"></span>&nbsp;&nbsp;Edit&nbsp;&nbsp;</button>
                </div>
            </div>
            <table className="">
                { referee.map((row,i) => (
                <Fragment key={i}>
                <tbody>
                <tr><td colSpan={4}> <h4>Referee Information #{i+1}. </h4></td></tr> {/* If Tertiary*/}
                <tr>
                    <td className="date"><b>Referee Name</b></td>
                    <td className="date"><b>Occupation</b></td>
                    <td className="date"><b>Phone Number</b></td>
                    <td className="date"><b>Postal Address</b></td>
                    <td className="date"><b>E-mail Address</b></td>
                </tr>
                <tr>
                    <td className="date">{row.lname}, {row.fname} <b>({row.title && getTitle(row.title).toUpperCase()})</b></td>
                    <td className="date">{row.occupation}</td>
                    <td className="date">{row.cert_class && getClass(row.cert_class,helperData).title }{row.phone}</td>
                    <td className="date">{row.address}</td>
                    <td className="date">{row.email || '-- None --'}</td>
                </tr>
                </tbody> 
                </Fragment>
                ))}
           </table>
        </Fragment>
    )
}

export default ReviewReferee
