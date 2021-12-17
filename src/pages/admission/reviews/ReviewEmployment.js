import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { getMonth,getCertType,getClass } from '../../../store/utils/admissionUtil';
import { helperData } from '../../../store/utils/helperData';

const ReviewEmployment = ({tag,title,edit}) => {

    const { applicant,helper } = useSelector(state => state)
    const { employment } =  applicant;

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
            <table>
               <tbody>
                { education.map((row,i) => (
                <span key={i}>
                { row.employer_name != '' ?
                <Fragment>
                <tr><td colSpan={4}> <h4>{i+1}. Employment Record {i+1}</h4></td></tr> {/* If Tertiary*/}
                <tr>
                    <td className="date"><b>Employer Name</b></td>
                    <td className="date"><b>Employer Address</b></td>
                    <td className="date"><b>Job Title</b></td>
                    <td className="date"><b>Job Description</b></td>
                </tr>
                <tr>
                    <td className="date">{row.employer_name}</td>
                    <td className="date">{row.employer_address}</td>
                    <td className="date">{row.job_title }</td>
                    <td className="date">{row.job_description}</td>
                </tr>
                <tr>
                    <td className="date"><b>Start Month</b></td>
                    <td className="date"><b>Start Year</b></td>
                    <td className="date"><b>End Month</b></td>
                    <td className="date"><b>End Year</b></td>
                </tr>
                <tr>
                    <td className="date">{row.start_month}</td>
                    <td className="date">{row.start_year}</td>
                    <td className="date">{row.end_month }</td>
                    <td className="date">{row.end_year}</td>
                </tr>
                </Fragment>
                : null }
               
                </span>
                ))} 
              </tbody>
           </table>
        </Fragment>
    )
}

export default ReviewEmployment
