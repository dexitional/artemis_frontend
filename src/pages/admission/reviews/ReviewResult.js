import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { getCertType, getSitting,getGrade,getSubject } from '../../../store/utils/admissionUtil';

const ReviewResult = ({tag,title,edit}) => {

    const { applicant : { result,grade }} = useSelector(state => state)
    //const { result } =  applicant;

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
            <tbody>
              { result.map((row,i) => 
                <span key={i}>
                <tr>
                    <td colSpan={4}> <h4>{(i+1)} - Examination Results</h4></td>
                </tr> 
                <tr>
                    <td className="date"><b>Exam Type</b></td>
                    <td className="date"><b>Exam Year</b></td>
                    <td className="date" ><b>Index Number</b></td>
                    <td className="date"><b>Exam Sitting</b></td>
                </tr>
                <tr>
                    <td className="date">{getCertType(row.exam_type) && getCertType(row.exam_type).title}</td>
                    <td className="date">{row.exam_year}</td>
                    <td className="date">{row.index_number}</td>
                    <td className="date">- {getSitting(row.exam_sitting)} -</td>
                </tr>
                <tr>
                    <td colSpan={4}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="date"><b>Subject </b></td>
                                    <td className="date"><b>Grade</b></td>
                                </tr>
                                { grade.map((subj,j) =>  subj.result_id == row.result_id ? 
                                <tr>
                                    <td className="date"><b><small style={{fontWeight:'bolder',fontSize:'13px',letterSpacing:'0.09em'}}>{getSubject(subj.subject).toUpperCase()}</small></b></td>
                                    <td className="date"><b>{getGrade(subj.grade)}</b></td>
                                </tr>
                                : null )}
                            </tbody>
                        </table>
    
                    </td>
                </tr> 
                </span>
                )} 
               
               
            </tbody>
            </table>
                    
        </Fragment>
    )
}

export default ReviewResult
