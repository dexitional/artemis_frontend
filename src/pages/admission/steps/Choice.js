import React,{ useCallback, useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setChoice } from '../../../store/admission/applicantSlice';
import Session from '../Session';
import { helperData } from '../../../store/utils/helperData';
import { getProgram } from '../../../store/utils/admissionUtil';
import { loadAMSHelpers } from '../../../store/utils/ssoApi';

const Choice = () => {

    const [ helper,setHelper ] = useState({ countries:[],adm_programs:[] });
    const { step,applicant } = useSelector(state => state)
    const dispatch = useDispatch();
    const required = ['institute_type','institute_name','fname','mstatus','dob','gender','citizen_country','resident_country','home_region','religion','present_occupation','work_place','bond_status','disabled','phone','email','pobox_address','resident_address'];
    const [ form, setForm ] = useState({});
    const [ options, setOptions ] = useState([]);

    const onChange = (e) => {
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index]
      var program_id =  optionElement.dataset.program;
      var major_id =  optionElement.dataset.major;
      setForm({...form, option_id : e.target.value, program_id, major_id });
    }

    const onSubmit = (e) => {
        alert("Submitted");
    }

    const addRecord = (e) => {
      if(options.length < 2){ 
        const cm = window.confirm(`Add Program Choice ${options.length+1} ?`)
        if(cm && form.option_id && form.option_id !== ''){
          setOptions([...options,form ])
          setForm({})
        }
      }else{
        alert("You are allowed a maximum of two(2) choices!")
      }
    }

    const delRecord = (id) => {
        const cm = window.confirm(`Remove Program Choice ${id+1} ?`)
        if(cm){
          setOptions([...options.filter((r,i) => i !== id)])
        }
    }

    const isDirty = useCallback((tag,i) => {
      const vs = required.find(row => row === tag);
      const ms = options[i][tag];
      if(vs){
          if(ms && ms !== ''){ return false;}
          else{ return true; }
      }   return false;
    },[options])

    const helperLoader = async() => {
      const hps = await loadAMSHelpers()
      if(hps.success){
        setHelper(hps.data)
      } 
    }

    useEffect(() => {
      helperLoader()
      setOptions([...applicant.choice])
    },[])

    useEffect(() => {
      dispatch(setChoice([...options]))
    },[options])


    return (
      <Session>
      <div className="row">
      {/* Supporting  Information */}
      <div className="small-12 columns" data-ref="education">
        <div className="u-textAlignCenter">
          <h2 className="u-mb-0 label-title">PROGRAMME CHOICE<hr/></h2>
        </div>
        {/* Documents Information */}
        <div className="row">
          <div className="small-12 columns">
            <div className="bui u-mb-3">
              <div role="banner" className="balance-due-banner bui-Banner bui-Banner--danger">
                <div className="bui-Banner-content">
                  <dl><dt><b>PROGRAMME REQUIREMENTS</b></dt><dd><em>Maximum of 2 choices are allowed.</em></dd></dl>
                </div>
              </div>
            </div>
            <table className="domains--list">
              
              <tbody>
                <tr>
                  <td colSpan={6} style={{backgroundColor:'#fff8ef'}}>
                      <span className="small-10 columns">
                          <label className="u-ml-0 label-title">Select Program of Choice </label>
                          <select name="program_id" onChange={(e)=> onChange(e)} value={form.option_id} id="ember1134" className="aurora-select Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                            <option selected disabled>-- Select --</option>
                            { helper && helper.adm_programs.map((hp) => 
                                <option value={hp.id} data-program={hp.prog_id} data-major={hp.major_id}>{`${hp.program_name.toUpperCase()} ${hp.major_name ? '( '+hp.major_name.toUpperCase()+' )':''}`}</option>
                            )}
                          </select>
                      </span>
                     
                      <span className="small-2 columns">
                         <br/><label className="u-ml-0 label-title">&nbsp; </label>
                         <span className="headerText">
                           <button className="Button Button--green" onClick={(e) => addRecord(e)} style={{height:'2em',lineHeight:'1.2em'}}><small><b>ADD</b></small></button>
                         </span>
                      </span>
                  </td>
                </tr>
               { options.map((row,i) =>
                i < 2 ?
                <tr key={i}>
                  <td colSpan={5}><small id="ember2105" className="ellipsis-text ember-view"><b>{(i+1)}. {getProgram(row.option_id,helper.adm_programs) && getProgram(row.option_id,helper.adm_programs).toUpperCase()}</b></small></td>
                  <td className="flex-row">
                    <button onClick={(e) => delRecord(i)} className="Button Button--red" title="Delete File" style={{height:'2em',lineHeight:'1.2em'}}><span className="Icon--close" /></button>
                  </td>
                </tr> : null 
               )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Session>
    )
}

export default Choice
