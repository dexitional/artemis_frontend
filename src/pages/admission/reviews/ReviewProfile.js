import moment from 'moment';
import React, { Fragment,useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { getMarital, getRegion, getReligion, getStudyMode, getTitle, getCountryTitle } from '../../../store/utils/admissionUtil';
import { loadAMSHelpers } from '../../../store/utils/ssoApi';

const ReviewProfile = ({tag,title,edit}) => {
    
    const [ helpers,setHelpers ] = useState({ countries:[],adm_programs:[] });
    const { applicant,helper } = useSelector(state => state)
    const { profile } =  applicant;

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
        <table className="">
        <tbody>
            <tr>
                <td className="date"><b>Title</b></td>
                <td className="date">{getTitle(profile.title)}</td>
                <td className="date"><b>Present Occupation</b></td>
                <td className="date">{profile.present_occupation || '-- None --'}</td>
            </tr>
            <tr>
                <td className="date"><b>Surname</b></td>
                <td className="date">{profile.lname || '-- None --'}</td>
                <td className="date"><b>Place of Work</b></td>
                <td className="date">{profile.work_place || '-- None --'}</td>
            </tr>
            <tr>
                <td className="date"><b>Othername(s)</b></td>
                <td className="date">{profile.fname || '-- None --'}</td>
                <td className="date"><b>Are you bonded ?</b></td>
                <td className="date">{profile.bond_status == 0 ? 'No':'Yes'}</td>
            </tr>
            <tr>
                <td className="date"><b>Gender</b></td>
                <td className="date">{profile.gender === 'M' ? 'Male':'Female'}</td>
                <td className="date"><b>Bonded Organisation</b></td>
                <td className="date"> {profile.bond_institute && profile.bond_institute !== '' ? profile.bond_institute : '-- None --'}</td>
            </tr>
            <tr>
                <td className="date"><b>Date of Birth</b></td>
                <td className="date">{moment(profile.dob).format('DD MMMM, YYYY') || '-- None --'}</td>
                <td className="date"><b>Are you Physically Challenged? </b></td>
                <td className="date">{profile.disabled == 0 ? 'No':'Yes'}</td>
            </tr>
            <tr>
                <td className="date"><b>Marital Status</b></td>
                <td className="date">{getMarital(profile.mstatus) || '-- None --'}</td>
                <td className="date"><b>Disabilities</b></td>
                <td className="date">{profile.disabilities || '-- None --'}</td>
            </tr>
            <tr>
                <td className="date"><b>Citizen of Country</b></td>
                <td className="date">{getCountryTitle(profile.citizen_country,helpers.countries) || '-- None --'}</td>
                <td className="date"><b>Phone Number</b></td>
                <td className="date">{profile.phone || '-- None --'}</td>
            </tr>
            <tr>
                <td className="date"><b>Country of Residence</b></td>
                <td className="date">{getCountryTitle(profile.resident_country,helpers.countries) || '-- None --'}</td>
                <td className="date"><b>E-mail address </b></td>
                <td className="date">{profile.email || '-- None --'}</td>
            </tr>
            <tr>
                <td className="date"><b>Home Region</b></td>
                <td className="date">{getRegion(profile.home_region) || '-- None --'}</td>
                <td className="date"><b>Postal Address</b></td>
                <td className="date">{profile.pobox_address || '-- None --'}</td>
            </tr>
            <tr>
                <td className="date"><b>Home Town</b></td>
                <td className="date">{profile.home_town || '-- None --'}</td>
                <td className="date"><b>Residential Address</b></td>
                <td className="date">{profile.resident_address || '-- None --'}</td>
            </tr>
            <tr>
                <td className="date"><b>Religion</b></td>
                <td className="date">{getReligion(profile.religion) || '-- None --'}</td>
                <td className="date">Study Mode</td>
                <td className="date">{getStudyMode(profile.session_mode) || '-- None --'}</td>
            </tr>
        </tbody>
        </table>

     </Fragment>
    )
}

export default ReviewProfile
