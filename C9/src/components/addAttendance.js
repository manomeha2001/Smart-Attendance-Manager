import '../index.css'
import Navbar from './user-navbar';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactFontLoader from 'react-font-loader';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useParams} from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(100),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



const AddAttendance = ({ setFunc }) => {
  const [courses, setCourses] = React.useState(null);
  async function getcourses() {
    fetch("http://localhost:4000/courses")
      .then(response => response.json())
      .then(response => setCourses(response.data))
      .catch(err => console.error(err))
  }
  React.useEffect(() => {
    getcourses()
  }, [])
  var {id}=useParams()

  const [cid,setCid]=React.useState("");
  const [sem,setSem]=React.useState("");
  const [sec,setSec]=React.useState("");
  const [hours,setHours]=React.useState("");
  const [date,setDate]=React.useState("");
  const [students,setStudents]=React.useState("");
  const [showtable,setShowtable]=React.useState(0);
  // var x=students.map((student,index)=>{
    
  //     student.id:false,
      
  // })
  const classes = useStyles();
  var obj={}

  const [state, setState] = React.useState(obj);
  console.log(state)
  const handleChange = (event) => { 
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(state)
  };



  const submitHandlerMain = (e) => {
    e.preventDefault();
    var ob
    var obj2
    for (var i=0;i<students.length;i++)
    {
      obj2={[students[i].id]:false}
      ob={...ob,...obj2}
      console.log(ob)
    }
    
    fetch(`http://localhost:4000/faculties/retrieve?fid=${id}&cid=${cid}&sem=${sem}&sec=${sec}`)
    .then(response => response.json())
      .then(response =>{setStudents(response.data)})
      .catch(err => console.error(err))
      console.log(students)
      setShowtable(1)
  }
  
  const handler = (e) => {
    e.preventDefault();
    window.location = `/faculty/${id}`
  }
  const updateHandler = (e) => {
    e.preventDefault();
    for (var key in state){
      if(state.hasOwnProperty(key)){
        if(state[key]===true){
          fetch(`http://localhost:4000/faculties/updateclassesattended?sid=${key}&fid=${id}&cid=${cid}`)
          .then(response => response.json())
          .catch(err => console.error(err))
        }
      
    
    fetch(`http://localhost:4000/faculties/updatetotalclasses?sid=${key}&fid=${id}&cid=${cid}`)
          .then(response => response.json())
          .catch(err => console.error(err))
    // alert("Successfully Updated!");
    // window.location = '/add-attendance'
  }}}

  const handleChangeSec=(e)=>{
    setSec(e.target.value)
  }

  const handleChangeDate=(e)=>{
    setDate(e.target.value)
  }


  const handleChangeHours=(e)=>{
    setHours(e.target.value)
  }

  const handleChangeSem=(e)=>{
    setSem(e.target.value)
  }

  const handleChangeCid=(e)=>{
    setCid(e.target.value)
  }


  return (

    <div>
      <Navbar message="faculty" />
      <form onSubmit={handler} className="Add-form">
        <Button type="submit" class="btn btn-primary" variant="contained" color="primary" disableElevation style={{ height: '100%', marginLeft: '2%', backgroundColor: 'rgb(60,60,60)', marginTop: '2%', fontFamily: 'Kosugi Maru' }}>Go Back</Button>
      </form>
      <form style={{display:"flex", alignItems:'center', justifyContent:'center', flexDirection:"column"}} onSubmit={submitHandlerMain} className="Add-form">
        <h4 className="form-header">Comprehensive Attendance Report</h4>
        <div>
          <label className="login-form-label">Semester</label>
          <select value={sem} onChange={handleChangeSem} id="Course" className="form-attendance">
            <option value="0">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div>
          <label className="login-form-label">Course</label>
          {courses&&<select value={cid} onChange={handleChangeCid} id = "Course" className="form-attendance">   
                <option value = "0">Select</option>
                {courses.map((name,index) => (
            <option key={index} value={name.id}>
              {name.id}
            </option>
          ))}
               
             </select>}
          
        
          <label className="login-form-label">Section</label>
          <input type="text" value={sec} onChange={handleChangeSec} id="" className="form-attendance" placeholder="Section"></input>

          <label className="login-form-label">Hours Taken</label>
          <input type="text" value={hours} onChange={handleChangeHours} id="" className="form-attendance" placeholder="Hours"></input>
          <p>{hours}</p>
            <TextField
              id="date"
              label="Date"
              value={date}
              onChange={handleChangeDate}
              type="date"
              placeholder="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p>{date}</p>
          
        </div>

        <div id="update-btn">
          <Button type="submit" class="btn btn-primary" variant="contained" color="primary" disableElevation style={{ height: '100%', marginLeft: '47%', marginTop: '2%', backgroundColor: 'rgb(60,60,60)', fontFamily: 'Kosugi Maru' }}>Show</Button>
        </div>
      </form>
      <form onSubmit={updateHandler}>
        {showtable===1&&(
          <div id="student-info">
          {students&&<table>
            
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Attendance</th>
            </tr>
            {students.map((student,index)=>(
              <tr key={index}>
              <td>{student.id}</td>
              <td>{student.S_Name}</td>
              <td >
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  color="primary"
                  name={student.id}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </td>
            </tr>
            ))}
          </table>
          }
          <Button type="submit" class="btn btn-primary" variant="contained" color="primary" disableElevation style={{ height: '100%', marginLeft: '47%', marginTop: '2%', backgroundColor: 'rgb(60,60,60)', fontFamily: 'Kosugi Maru' }}>Update</Button>
        </div>)}
      </form>
    </div>
  );
}



export default AddAttendance;