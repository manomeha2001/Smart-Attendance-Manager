import React from 'react'
import Navbar from './navbar'
import '../index.css'
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactFontLoader from 'react-font-loader';
import axios from 'axios'


const Assign = () => {

    const [fid, setFid] = React.useState('')
    const [cid, setCid] = React.useState('')
    const [dept, setDept] = React.useState('')
    const [sec, setSec] = React.useState('')
    const [sem, setSem] = React.useState('')
    const [students, setStudents] = React.useState({})
    const [subject, setSubject] = React.useState({})
   
    const submitHandler= async (e)=>{
        e.preventDefault()
        await fetch(`http://localhost:4000/assign?fid=${fid}&cid=${cid}&dept=${dept}&sec=${sec}&sem=${sem}`)
        .then(response=>response.json())
        .then(response=>setStudents(response.data))
        .catch(err=>console.error(err))
        students&&students.map((student)=>{
            axios.get(`http://localhost:8000/attendance/${student.SId}`)
      .then(res => {
        
        setSubject(res.data[student.SId].courses)
        var x=subject
        console.log(x)
        x.push({
            "cid":cid,
            "sem":sem,
            "dates":[

            ]
        })
        setSubject(x)

        
      })

      axios.put(`http://localhost:8000/attendance/${student.SId}`, { 
            
            "courses":subject
          })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
        })
        
        
       
        }

       
        
        const handler=(e)=>{
            e.preventDefault();
            window.location='/admin/add'
        }    

        const handleChangeRno=(event)=>{
            setFid(event.target.value);
        }

        const handleChangeName=(event)=>{
            setCid(event.target.value);
        }

        const handleChangeUsername=(event)=>{
            setDept(event.target.value);
        }

        const handleChangePass=(event)=>{
            setSec(event.target.value);
        }

        const handleChangeDept=(event)=>{
            setSem(event.target.value);
        }


    return (
        <div>
            <Navbar/>
            <form onSubmit={handler} className="Add-form">
            <Button type="submit" class="btn btn-primary" variant="contained" color="primary" disableElevation style={{height:'100%', marginLeft:'2%', backgroundColor:'rgb(60,60,60)', marginTop:'2%', fontFamily:'Kosugi Maru'}}>Go Back</Button>
            </form>
        <form className="Add-form">
         <h4 className="form-header">Assign Faculty</h4>
         <div className="form-group">
                <label className="login-form-label">Facuty Id</label>
                <input type="text" className="form-control login-form-input" value={fid} onChange={handleChangeRno} placeholder="Facuty Id"></input>
            </div>
            <div className="form-group">
                <label className="login-form-label">Course Id</label>
                <input type="text" className="form-control login-form-input" value={cid} onChange={handleChangeName} placeholder="Course Id"></input>
            </div>          
            <div className="form-group">
                <label className="login-form-label">Department</label>
                <input type="text" className="form-control login-form-input" value={dept} onChange={handleChangeUsername} placeholder="Department"></input>
            </div>
            <div className="form-group">
                <label className="login-form-label">Section</label>
                <input type="text" className="form-control login-form-input" value={sec} onChange={handleChangePass} placeholder="Section"></input>
            </div>
            <div className="form-group">
                <label className="login-form-label">Semester</label>
                <input type="text" className="form-control login-form-input" value={sem} onChange={handleChangeDept} placeholder="Semester"></input>
            </div>
            {/* <p>{id}</p>
            <p>{name}</p>
            <p>{username}</p>
            <p>{pass}</p>
            <p>{dept}</p> */}
            <Button onClick={submitHandler} type="submit" class="btn btn-primary" variant="contained" color="primary" disableElevation style={{height:'100%', marginLeft:'47%', backgroundColor:'rgb(60,60,60)',fontFamily:'Kosugi Maru'}}>Submit</Button>
     </form>
        </div>
    )
}

export default Assign
