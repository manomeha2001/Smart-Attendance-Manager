import '../index.css'
import Navbar from './user-navbar';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactFontLoader from 'react-font-loader';
import * as React from 'react'; 
import {useParams} from 'react-router-dom';
import reactDom from 'react-dom';

const StudentAttendance = ({setFunc}) => {
    var {id}=useParams()
    const [sem,setSem]=React.useState('')
    const [show,setShow]=React.useState(0)
    const [val,setVal]=React.useState(null)
    const submitHandler=(e)=>{
        e.preventDefault(); 
        fetch(`http://localhost:4000/students/viewattendance?sid=${id}&sem=${sem}`)
        .then(response=>response.json())
        .then(response=>setVal(response.data))
        .catch(err=>console.error(err))
        setShow(1)
        console.log(val)
        }
    
        const handler=(e)=>{
            e.preventDefault();
            window.location=`/student/${id}`
        } 
        const handleChangeSem=(e)=>{
            setSem(e.target.value)
        }
    return (
<div data-testid='studentattendance'>
     <Navbar message="student" />
     <form onSubmit={handler} className="Add-form">
            <Button type="submit" className="btn btn-primary" variant="contained" color="primary" disableElevation style={{height:'100%', marginLeft:'2%', backgroundColor:'rgb(60,60,60)', marginTop:'2%', fontFamily:'Kosugi Maru'}}>Go Back</Button>
            </form>
     <form onSubmit={submitHandler} className="Add-form">
         <h4 className="form-header">Comprehensive Attendance Report</h4>
         <div>
            <label className="login-form-label">Semester</label>
            <select value={sem} onChange={handleChangeSem} id = "Course" className="form-attendance">
                <option value = "0">Select</option>
               <option value = "1">1</option>
               <option value = "2">2</option>
               <option value = "3">3</option>
               <option value = "4">4</option>               
               <option value = "5">5</option>
               <option value = "6">6</option>
               <option value = "7">7</option>
               <option value = "8">8</option>
             </select>
        </div>
        <div id="submit-btn">
            <Button type="submit" className="btn btn-primary" variant="contained" color="primary" disableElevation style={{height:'100%', marginLeft:'47%', marginTop:'2%',backgroundColor:'rgb(60,60,60)',fontFamily:'Kosugi Maru'}}>Submit</Button>
            </div>
            {show&&<div id="student-info">
        {val&&<table>
            
            <tr>
                <th>Course Id</th>
                <th>Name</th>
                <th>Classes Attended</th>
                <th>Total Classes</th>
                <th>Percentage</th>
            </tr>
            {
                val.map((data,index)=>(
                <tr>
                    <td>{data.id}</td>
                    <td>{data.C_Name}</td>
                    <td>{data.Class_attended}</td>
                    <td>{data.Total_classes}</td>
                    <td>{data.percent}</td>
                </tr>)
                )
            }
        </table>}
        </div>}
     </form>
    </div>
        );
}
 


export default StudentAttendance;