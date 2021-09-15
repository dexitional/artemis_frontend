import React,{ useCallback, useState,useEffect, Fragment} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addResult, setResult,delResult,setGrade } from '../../../store/admission/applicantSlice';
import Session from '../Session';
import { helperData } from '../../../store/utils/helperData';
import { getGrade, getSubject } from '../../../store/utils/admissionUtil';
import moment from 'moment';

const Result = () => {

  const { step,applicant } = useSelector(state => state)
  const dispatch = useDispatch();
  const required = ['institute_type','institute_name','fname','mstatus','dob','gender','citizen_country','resident_country','home_region','religion','present_occupation','work_place','bond_status','disabled','phone','email','pobox_address','resident_address'];
  const [ form,setForm ] = useState({ id: 0, subject: "", grade: "" });
  const [ subjects,setSubjects ] = useState([]);
  const [ results,setResults ] = useState([]);
  
  /*
  const onChange = useCallback((e) => {
      setForm({...form,[e.target.name] : e.target.value })
      //dispatch(setEducation(edurows))
  },[form])
  */

  const onFormChange = (e,i) => {
    setForm({...form,[e.target.name] : e.target.value });
  }

  const formSubmit = (e,id) => {
     e.preventDefault();
     if(form.subject && form.grade && form.subject !== '' && form.grade !== ''){
       results.map((r,i) => {
         if(i == id){
            const sj = subjects.find((s,j) => s.subject === form.subject && r.result_id === s.result_id);
            if(!sj){
              setSubjects([...subjects,{...form,result_id:r.result_id}])
              dispatch(setGrade(subjects));
            }
         }
       });
     } 
     setForm({ id: 0, subject: "", grade: "" });
  }

  const delSubj = (id) => {
    const cm = window.confirm(`Delete Subject ${id}?`)
    if(cm){
      let sjs = subjects.filter((s,i) => i !== id);
      setSubjects([...sjs]);
    }
  }


  const onChange = (e,id) => {
    let newresults = [...results];
    newresults[id] = {...newresults[id],[e.target.name] : e.target.value };
    if(e.target.name === 'exam_type'){
       const result_id =  newresults[id].result_id
       const sjs = subjects.filter(sj => sj.result_id !== result_id )
       setSubjects([...sjs]);
    }  setResults(newresults);
  }

  const years = () => {
     var yrs = [];
     for(var i = new Date().getFullYear();i >= 1920;i--){
         yrs.push(i)
     } return yrs;
  }

  const addRecord = () => {
      if(results.length < 4){
        const data = { result_id: `${moment().unix()}-sess`}
        setResults([...results,data ])
      }
  }

  const delRecord = (id) => {
      console.log(id);
      const cm = window.confirm(`Remove Exam Result ${id+1} ?`)
      if(cm){
        const newRes = results.filter((r,i) => i !== id);
        console.log(results);
        setResults([...newRes])
      }
  }
  
  const isDirty = useCallback((tag,i) => {
      const vs = required.find(row => row === tag);
      const ms = results[i][tag];
      if(vs){
          if(ms && ms !== ''){ return false;}
          else{ return true; }
      }   return false;
  },[results])

  useEffect(() => {
    setResults([...applicant.result])
    setSubjects([...applicant.grade])
  },[])

  useEffect(() => {
    dispatch(setResult(results))
    dispatch(setGrade(subjects))
  },[results,subjects])


  useEffect(() => {
    console.log(results);
    console.log(subjects);
  })

    return (
      <Session>
      <div className="row">
      {/* Exams Result Information */}
      <div className="small-12 columns" data-ref="education">
        <div className="u-textAlignCenter">
          <h2 className="u-mb-0 label-title">EXAM RESULTS<hr/></h2>
        </div>
        {/* Documents Information */}
        <div className="row">
          <div className="small-12 columns">
            
            <div className="bui u-mb-3">
              <div role="banner" className="balance-due-banner bui-Banner bui-Banner--danger">
                <div className="bui-Banner-content">
                  <dl><dt><b>Examination Results ( Including Awaiting Results )</b></dt><dd><em><small>Please provide examination results from any examinations that qualify you for for admission to this university. You are allowed to present up to a maximum of Three(3) Examination Results.</small></em></dd></dl>
                </div>
              </div>
            </div><hr/>

            { results.map((rec,i) => ( 
            i < 3 ?
            <Fragment>
            <div class="row" >
                <div className="small-9 columns"><h3><small><b>EXAM RESULT {i+1} </b></small></h3></div>
                <div className="small-3 columns"><button onClick={() => i === 0 ? addRecord() : delRecord(i) } class="Button Button--green" style={{height:'2em',lineHeight:'1.2em'}}><b>{i === 0 ? 'ADD NEW' : 'REMOVE'} </b></button></div>
            </div><hr/>

           

              <div className="small-12 columns" style={{ overflow:'hidden'}}>
                <div className="small-3 columns">
                    <label className="u-ml-0 label-title">Exam Type </label>
                    <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                        <select name="exam_type" onChange={(e)=> onChange(e,i)}  value={results[i].exam_type} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                            <option selected disabled>-- Select --</option>
                            { helperData.certType.map((hp) => 
                                hp.instituteType == 2 ?
                                <option value={hp.id}>{hp.title}</option>
                                : null
                            )}
                        </select>
                    </div>
                </div>
                <span className="small-3 columns">
                    <label className="u-ml-0 label-title">Exam Year </label>
                    <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                        <select name="exam_year" onChange={(e)=> onChange(e,i)}  value={results[i].exam_year} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                            <option selected disabled>-- Select --</option>
                            { years().map((yr,i) => 
                                <option value={yr}>{yr}</option>
                            )}
                        </select>
                    </div>
                </span>
            
                <span className="small-3 columns">
                    <label className="u-ml-0 label-title">Exam Sitting </label>
                    <div id="ember1133" className="fleet-name-input FloatLabel is-required ember-view">
                        <select name="exam_sitting" onChange={(e)=> onChange(e,i)} value={results[i].exam_sitting} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                            <option selected disabled>-- Select --</option>
                            { helperData.sitting.map((hp) => 
                                <option value={hp.id}>{hp.title}</option>
                            )}
                        </select>
                    </div>
                </span>

                <span className="small-3 columns">
                    <label className="u-ml-0 label-title">Index Number </label>
                    <div id="ember1133" className="fleet-name-input FloatLabel ember-view">
                       <input type="text" name="index_number" onChange={(e)=> onChange(e,i)}  value={results[i].index_number} spellCheck="false" required placeholder="Enter Index No." id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view" />
                    </div>
                </span>
            </div>
           
                                
            <table className="domains--list">
              <thead>
                <tr>
                  <th id="ember2087" className="aurora-th name ember-view"><span className="headerText">SUBJECT</span></th>
                  <th></th>
                  <th><span className="headerText">GRADE</span></th>
                  <th id="ember2089" className="aurora-th action ember-view">
                    <span className="headerText">&nbsp;</span>
                  </th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td colSpan={4} style={{backgroundColor:'#fff8ef'}}>
                      <span className="small-5 columns">
                          <label className="u-ml-0 label-title">Subject </label>
                          <select name="subject" onChange={(e)=> onFormChange(e)}  value={form.subject} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                            <option value="" selected>-- Select Subject --</option>
                            { helperData.subjects.map((hp) => 
                                <option value={hp.id}>{hp.title.toUpperCase()}</option>
                            )}
                          </select>
                      </span>
                      <span className="small-4 columns">
                          <label className="u-ml-0 label-title">Grade </label>
                          <select name="grade" onChange={(e)=> onFormChange(e)}  defaultValue="" value={form.grade} id="ember1134" className="Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                            <option value="" selected>-- Select Grade --</option>
                            { helperData.grades.map((hp) => 
                                results[i].exam_type == hp.certType ?
                                <option value={hp.id}>{hp.title.toUpperCase()}</option>
                                : null
                            )}
                          </select>
                      </span>
                      <span className="small-3 columns">
                         <br/><label className="u-ml-0 label-title">&nbsp; </label>
                         <span className="headerText">
                           <button className="Button Button--green" onClick={(e) => formSubmit(e,i)} style={{height:'2em',lineHeight:'1.2em'}}><small><b>ADD SUBJECT</b></small></button>
                         </span>
                      </span>
                  </td>
                </tr>
               
                { subjects && subjects.map((subj,j) =>  subj.result_id == rec.result_id ? 
                <tr key={j}>
                  <td><small id="ember2105" className="ellipsis-text ember-view"><b>{getSubject(subj.subject) && getSubject(subj.subject).toUpperCase()}</b></small></td>
                  <td></td>
                  <td><b id="ember2105" className="ellipsis-text ember-view">{getGrade(subj.grade) && getGrade(subj.grade).toUpperCase()}</b></td>
                  <td className="flex-row">
                    <button onClick={()=> delSubj(j)} className="Button Button--red" title="Delete File" style={{height:'2em',lineHeight:'1.2em'}}><span className="Icon--close" /></button>
                  </td>
                </tr>
                 : null )}
                
              </tbody>
            </table>
             { i !== results.length-1 ? <hr/> : null }
            </Fragment> : null
            ))}


          </div>
        </div>
      </div>
    </div>
    </Session>
    )
}

export default Result
