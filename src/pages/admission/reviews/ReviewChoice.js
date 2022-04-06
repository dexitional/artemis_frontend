import React, { Fragment,useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getMonth,getCertType,getClass, getProgram } from '../../../store/utils/admissionUtil';
import { helperData } from '../../../store/utils/helperData';
import { loadAMSHelpers } from '../../../store/utils/ssoApi';

const ReviewEmployment = ({tag,title,edit}) => {
    
    const [ helpers,setHelpers ] = useState({ countries:[],adm_programs:[] });
    const { applicant,helper } = useSelector(state => state)
    const { choice } =  applicant;

    const editRecord = () => {
        // const cm = window.confirm("Edit Data ?")
        // if(cm) edit(tag);
        edit(tag);
    }

    const helperLoader = async() => {
        const hps = await loadAMSHelpers()
        if(hps.success){
            setHelpers(hps.data)
        } 
    }

    useEffect(() => {
      helperLoader()
    },[])

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
              { choice.map((row,i) => 
                <tr>
                    <td colSpan={1}> <h4>CHOICE {(i+1)}</h4></td>
                    <td colSpan={3}> <h4>{getProgram(row.option_id,helpers.adm_programs) && getProgram(row.option_id,helpers.adm_programs).toUpperCase()}</h4></td>
                </tr> 
              )}
              </tbody>
            </table>
                   
        </Fragment>
    )
}

export default ReviewEmployment
