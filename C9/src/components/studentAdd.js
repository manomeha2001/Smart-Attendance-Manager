import '../index.css'
import Navbar from './navbar';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactFontLoader from 'react-font-loader';
import * as React from 'react';
import axios from 'axios'



const StudentAdd = ({setFunc}) => {

    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [elective, setElective] = React.useState('')
    const [dept, setDept] = React.useState('')
    const [sec, setSec] = React.useState('')
    const [sem, setSem] = React.useState('')
   
    const submitHandler=(e)=>{
         e.preventDefault();
         axios.post(`http://localhost:8000/attendance/`, { 
            "id": id,
            "courses":[]
          })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
        // alert("Successfully added!");
        fetch(`http://localhost:4000/students/add?id=${id}&name=${name}&username=${username}&password=${pass}&elective=${elective}&department=${dept}&section=${sec}&semester=${sem}`)
        .then(response=>response.json())
        .then(()=>
            response=>console.log(response)
        )
        .catch(err=>console.error(err))

        
      

        }

    const handler=(e)=>{
        e.preventDefault();
        window.location='/admin/add'
        }

    const handleChangeRno=(event)=>{
        setId(event.target.value);
    }
    
    const handleChangeName=(event)=>{
        setName(event.target.value);
    }

    const handleChangeUsername=(event)=>{
        setUsername(event.target.value);
    }

    const handleChangePass=(event)=>{
        setPass(event.target.value);
    }

    const handleChangeElective=(event)=>{
        setElective(event.target.value);
    }

    const handleChangeDept=(event)=>{
        setDept(event.target.value);
    }

    const handleChangeSec=(event)=>{
        setSec(event.target.value);
    }

    const handleChangeSem=(event)=>{
        setSem(event.target.value);
    }

    return (
    <div data-testid='studentadd'>
     <Navbar />
     <form onSubmit={handler} className="Add-form">
            <Button type="submit" className="btn btn-primary" variant="contained" color="primary" disableElevation style={{height:'100%', marginLeft:'2%', backgroundColor:'rgb(60,60,60)', marginTop:'2%', fontFamily:'Kosugi Maru'}}>Go Back</Button>
            </form>
     <form  className="Add-form">
         <h4 className="form-header">Add Student</h4>
         <div className="form-group">
                <label className="login-form-label">Student Id</label>
                <input type="text" className="form-control login-form-input" value={id} onChange={handleChangeRno} placeholder="Eg.: CSE18001"></input>
            </div>
            <div className="form-group">
                <label className="login-form-label">Student Name</label>
                <input type="text" className="form-control login-form-input" value={name} onChange={handleChangeName} placeholder="Eg.: Abcdef Xyz"></input>
            </div>          
            <div className="form-group">
                <label className="login-form-label">Student Username</label>
                <input type="text" className="form-control login-form-input" value={username} onChange={handleChangeUsername} placeholder="Eg: abc123"></input>
            </div>
            <div className="form-group">
                <label className="login-form-label">Password</label>
                <input type="text" className="form-control login-form-input" value={pass} onChange={handleChangePass} placeholder="*****"></input>
            </div>
            <div className="form-group">
                <label className="login-form-label">Elective</label>
                <input type="text" className="form-control login-form-input" value={elective} onChange={handleChangeElective} placeholder="Eg.: 15HUM302"></input>
            </div>
            <div className="form-group">
                <label className="login-form-label">Department</label>
                <input type="text" className="form-control login-form-input" value={dept} onChange={handleChangeDept} placeholder="Eg.: CSE"></input>
            </div>
            <div className="form-group">
                <label className="login-form-label">Section</label>
                <input type="text" className="form-control login-form-input" value={sec} onChange={handleChangeSec} placeholder="Eg.:A,B,C"></input>
            </div>
            <div className="form-group">
                <label className="login-form-label">Semester</label>
                <select id = "myList" onChange={handleChangeSem} value={sem} className="form-control login-form-input">
               <option value = "1">1</option>
               <option value = "2">2</option>
               <option value = "3">3</option>
               <option value = "4">4</option>               <option value = "1">1</option>
               <option value = "5">5</option>
               <option value = "6">6</option>
               <option value = "7">7</option>
               <option value = "8">8</option>
             </select>
            </div>
            <Button onClick={submitHandler} type="submit" className="btn btn-primary" variant="contained" color="primary" disableElevation style={{height:'100%', marginLeft:'47%', backgroundColor:'rgb(60,60,60)', marginBottom:'5%', fontFamily:'Kosugi Maru'}}>Submit</Button>
     </form>
    </div>
      );
}
 


export default StudentAdd;