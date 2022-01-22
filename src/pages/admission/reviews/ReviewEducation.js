import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { getMonth,getCertType,getClass } from '../../../store/utils/admissionUtil';
import { helperData } from '../../../store/utils/helperData';

const ReviewEducation = ({tag,title,edit}) => {

    const { applicant,helper } = useSelector(state => state)
    const { education } =  applicant;

    const editRecord = () => {
        // const cm = window.confirm("Edit Data ?")
        // if(cm) edit(tag);
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
           
                { education.map((row,i) => (
                <Fragment key={i}>
                { row.institute_type == 1 ?
                <tbody>
                <tr><td colSpan={4}> <h4>{i+1}. University or College Degree/Diploma Information</h4></td></tr> {/* If Tertiary*/}
                <tr>
                    <td className="date"><b>Institution</b></td>
                    <td className="date"><b>Certificate Obtained</b></td>
                    <td className="date"><b>Class Obtained</b></td>
                    <td className="date"><b>Duration</b></td>
                </tr>
                <tr>
                    <td className="date">{row.institute_name}</td>
                    <td className="date">{row.cert_name} ( {row.cert_type && getCertType(row.cert_type,helperData).title } )</td>
                    <td className="date">{row.cert_class && getClass(row.cert_class,helperData).title }</td>
                    <td className="date">{getMonth(row.cert_startmonth,helperData) && getMonth(row.cert_startmonth,helperData).title }, {row.cert_startyear} - {getMonth(row.cert_endmonth,helperData) && getMonth(row.cert_endmonth,helperData).title }, {row.cert_endyear}</td>
                </tr>
                </tbody> :
                
                <tbody>
                <tr><td colSpan={4}> <h4> {i+1}. Secondary Education Certificate Information</h4></td></tr> {/* If Tertiary*/}
                <tr>
                    <td className="date"><b>Institution</b></td>
                    <td className="date"><b>Certificate Obtained</b></td>
                    <td className="date"><b>Certificate Aggregate</b></td>
                    <td className="date"><b>Date Obtained</b></td>
                </tr>
                <tr>
                    <td className="date">{row.institute_name}</td>
                    <td className="date">{row.cert_type && getCertType(row.cert_type,helperData).title } Certificate</td>
                    <td className="date">{row.cert_grade}</td>
                    <td className="date">{row.cert_month && getMonth(row.cert_month,helperData).title }, {row.cert_year}</td>
                </tr>
                </tbody>
                }

                </Fragment>
                ))}
           </table>
        </Fragment>
    )
}

export default ReviewEducation
