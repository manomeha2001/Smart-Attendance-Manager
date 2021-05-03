const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const app=express();
app.use(cors());
const connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'SupermaN5401',
    database:'C9',
})

const SELECT_ALL_STUDENTS_QUERY='SELECT * FROM student';
app.get('/',(req,res)=>{res.send("Hello from server")});
app.get('/students',(req,res)=>{connection.query(SELECT_ALL_STUDENTS_QUERY,(err,results)=>{
    if(err){
        return res.send(err)
    }
    else{
        return res.json({
            data:results
        })
    }
})})


const SELECT_ALL_FACULTIES_QUERY='SELECT * FROM faculty';
app.get('/',(req,res)=>{res.send("Hello from server")});
app.get('/faculties',(req,res)=>{connection.query(SELECT_ALL_FACULTIES_QUERY,(err,results)=>{
    if(err){
        return res.send(err)
    }
    else{
        return res.json({
            data:results
        })
    }
})})

const SELECT_ALL_COURSES_QUERY='SELECT * FROM course';
app.get('/',(req,res)=>{res.send("Hello from server")});
app.get('/courses',(req,res)=>{connection.query(SELECT_ALL_COURSES_QUERY,(err,results)=>{
    if(err){
        return res.send(err)
    }
    else{
        return res.json({
            data:results
        })
    }
})})

app.get('/students/add',(req,res)=>{
    var {id,name,username,password,elective,department,section,semester}=req.query;    
    elective=(elective===''?null:`'${elective}'`)
    const INSERT_STUDENT_QUERY=`INSERT INTO student values ('${id}','${name}','${username}','${password}',${elective},'${department}','${section}',${semester})`
    console.log(id,name,username,password,elective,department,section,semester)
    connection.query(INSERT_STUDENT_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log("Successfully added Student")
        }
    }) 
})

app.get('/faculties/add',(req,res)=>{
    var {id,name,username,password,department}=req.query;
    const INSERT_FACULTY_QUERY=`INSERT INTO faculty values ('${id}','${name}','${username}','${password}','${department}')`
    console.log(id,name,username,password,department)
    connection.query(INSERT_FACULTY_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
                console.log("Successfully added faculty")
        }
    }) 
})

app.get('/courses/add',(req,res)=>{
    var {id,name,semester,type}=req.query;
    const INSERT_COURSE_QUERY=`INSERT INTO course values ('${id}','${name}','${semester}','${type}')`
    console.log(id,name,semester,type)
    connection.query(INSERT_COURSE_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
                console.log("Successfully added course")
        }
    }) 
})

app.get('/assign',(req,res)=>{
    var {fid,cid,dept,sec,sem}=req.query;
    console.log(fid,cid,dept,sec,sem)
    const SELECT_ATTENDANCE_QUERY=`SELECT id from student where S_Dept='${dept}' and S_Sec='${sec}' and S_Sem='${sem}'`
    connection.query(SELECT_ATTENDANCE_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
            res.sendStatus(500)
            return
        }
        else{
                console.log(results)
                var len=results.length;
                while(len>0){
                    len--;
                    const INSERT_ATTENDANCE_QUERY=`INSERT INTO attendance values ('${results[len].id}','${fid}','${cid}',0,0)`
                    connection.query(INSERT_ATTENDANCE_QUERY,(err,results)=>{
                        if(err){
                            // return res.send(err)
                            console.log(err)
                            res.sendStatus(500)
                            return
                        }
                        else{
                            console.log("Successfully added into attendance")
                            
                        }

                    }
                    )
                }

                const QUERY=`select SId from attendance where FId like '${fid}' and CId like '${cid}'`
                            connection.query(QUERY,(err,results)=>{
                            if(err){
                            // return res.send(err)
                            console.log(err)
                            res.sendStatus(500)
                            return
                            }
                            else{
                            console.log("Successfully added into attendance")
                            console.log(results)
                            return res.json({
                                data:results
                             })
                        }
                    })
        }
    }) 

})

app.get('/students/modify',(req,res)=>{
    var {id,name,username,password,elective,department,section,semester}=req.query;
    elective=(elective===''?null:`'${elective}'`)
    const MODIFY_STUDENT_QUERY=`UPDATE student SET S_Name='${name}',S_Username='${username}',S_Password='${password}',C_elective=${elective},S_Dept='${department}',S_Sec='${section}',S_Sem=${semester} where id like '${id}'`  
    console.log(id,name,username,password,elective,department,section,semester)
    connection.query(MODIFY_STUDENT_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log("Successfully modified student")
        }
})
})

app.get('/faculties/modify',(req,res)=>{
    var {id,name,username,password,department}=req.query;
    const MODIFY_FACULTY_QUERY=`UPDATE faculty SET F_Name='${name}',F_Username='${username}',F_Password='${password}',F_Dept='${department}' where id like '${id}'`  
    console.log(id,name,username,password,department)
    connection.query(MODIFY_FACULTY_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log("Successfully modified student")
        }
})
})

app.get('/courses/modify',(req,res)=>{
    var {id,name,type,sem}=req.query;
    const MODIFY_COURSES_QUERY=`UPDATE course SET C_Name='${name}',C_Type='${type}',C_Sem=${sem} where id like '${id}'`  
    console.log(id,name,sem,type)
    connection.query(MODIFY_COURSES_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log("Successfully modified course")
        }
})
})

app.get('/students/delete',(req,res)=>{
    var {id}=req.query;
    const DELETE_STUDENT_QUERY=`DELETE FROM STUDENT where id like '${id}'`
    connection.query(DELETE_STUDENT_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log(
                "Successfully deleted student"
            )
        }
})
})

app.get('/faculties/delete',(req,res)=>{
    var {id}=req.query;
    const DELETE_FACULTY_QUERY=`DELETE FROM faculty where id like '${id}'`
    connection.query(DELETE_FACULTY_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log(
                "Successfully deleted faculty"
            )
        }
})
})

app.get('/courses/delete',(req,res)=>{
    var {id}=req.query;
    const DELETE_COURSE_QUERY=`DELETE FROM course where id like '${id}'`
    connection.query(DELETE_COURSE_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log(
                "Successfully deleted course"
            )
        }
})
})

app.get('/students/login',(req,res)=>{
    var {uname,pass}=req.query;
    const STUDENT_LOGIN_QUERY=`SELECT * FROM student where S_Username like '${uname}'`
    connection.query(STUDENT_LOGIN_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            return res.json({
                data:results
            })
        }
})
})

app.get('/faculties/login',(req,res)=>{
    var {uname,pass}=req.query;
    const FACULTY_LOGIN_QUERY=`SELECT * FROM faculty where F_Username like '${uname}'`
    connection.query(FACULTY_LOGIN_QUERY,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            return res.json({
                data:results
            })
        }
})
})

app.get('/faculties/attendance',(req,res)=>{
    var {sid,cid}=req.query;
    const FACULTY_UPDATE_TOTAL_ATTENDACE=`UPDATE attendace set Total_Classes=Total_Classes+1 where SId like '${sid}' and CId link'${cid}`
    connection.query(FACULTY_UPDATE_ATTENDANCE,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            return res.json({
                data:results
            })
        }
})
})

app.get('/faculties/retrieve',(req,res)=>{
    var {fid,cid,sem,sec}=req.query;
    const FACULTY_RETRIEVE=`select student.* from student,attendance where student.id=attendance.SId and attendance.FId like '${fid}' and attendance.CId like '${cid}' and student.S_Sem=${sem} and student.S_Sec like '${sec}'`
    connection.query(FACULTY_RETRIEVE,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log(results)
            return res.json({
                data:results
            })
        }
})
})

app.get('/students/viewattendance',(req,res)=>{
    var {sid,sem}=req.query;
    const STUDENT_VIEW_ATTENDANCE=`select course.id,course.C_Name,attendance.Class_attended,attendance.Total_classes,attendance.Class_attended*100/Total_classes as percent from course,attendance where attendance.SId='${sid}' and course.C_Sem=${sem} and attendance.CId= course.id`
    connection.query(STUDENT_VIEW_ATTENDANCE,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log(results)
            return res.json({
                data:results
            })
        }
})
})

app.get('/faculties/updateclassesattended',(req,res)=>{
    var {sid,fid,cid}=req.query;
    const FACULTY_UPDATE=`update attendance set Class_attended=Class_attended+1 where SId like '${sid}' and FId like '${fid}' and CId like '${cid}'`
    connection.query(FACULTY_UPDATE,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log(results)
            return res.json({
                data:results
            })
        }
})
})

app.get('/faculties/updatetotalclasses',(req,res)=>{
    var {sid,fid,cid}=req.query;
    const FACULTY_UPDATETOTAL=`update attendance set Total_classes=Total_classes+1 where SId like '${sid}' and FId like '${fid}' and CId like '${cid}'`
    connection.query(FACULTY_UPDATETOTAL,(err,results)=>{
        if(err){
            // return res.send(err)
            console.log(err)
        }
        else{
            console.log(results)
            return res.json({
                data:results
            })
        }
})
})


app.listen(4000,()=>{console.log("server listening on 4000")});