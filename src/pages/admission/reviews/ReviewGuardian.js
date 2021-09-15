import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { getRelation, getTitle } from '../../../store/utils/admissionUtil';

const ReviewGuardian = ({tag,title,edit}) => {
    
    const { applicant,helper } = useSelector(state => state)
    const { guardian } =  applicant;

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
            <table className="">
              <tbody>
                <tr>
                    <td className="date"><b>Title</b></td>
                    <td className="date">{getTitle(guardian.title)}</td>
                    <td className="date"><b>Occupation</b></td>
                    <td className="date">{guardian.occupation}</td>
                </tr>
                <tr>
                    <td className="date"><b>Surname</b></td>
                    <td className="date">{guardian.lname}</td>
                    <td className="date"><b>Phone Number</b></td>
                    <td className="date">{guardian.phone}</td>
                </tr>
                <tr>
                    <td className="date"><b>Othername(s)</b></td>
                    <td className="date">{guardian.fname}</td>
                    <td className="date"><b>E-mail address </b></td>
                    <td className="date">{guardian.email}</td>
                </tr>
                <tr>
                    <td className="date"><b>Relation to Applicant</b></td>
                    <td className="date">{getRelation(guardian.relation)}</td>
                    <td className="date"><b>Address</b></td>
                    <td className="date">{guardian.address}</td>
                </tr>
              </tbody>
            </table>
        </Fragment>
    )
}

export default ReviewGuardian
