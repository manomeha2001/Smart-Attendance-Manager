import {render,screen,cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import Homemain from '../components/homemain'
import StudentHome from "../components/studenhome";
import StudentAttendance from '../components/studentAttendance';
import StudentAdd from '../components/studentAdd';
import StudentDelete from '../components/studentDelete';
import Modifystudent from '../components/modifystudent';



test('should render homestudent',()=>{
    render(<StudentHome/>)
    const StudentHomeElement=screen.getByTestId('studenthome');
    expect(StudentHomeElement).toHaveTextContent('Success')

})

test('should render homemain',()=>{
    render(<Homemain/>)
    const HomemainElement=screen.getByTestId('homemain');
    expect(HomemainElement).toHaveTextContent('Student');
    expect(HomemainElement).toHaveTextContent('Admin')
    expect(HomemainElement).toHaveTextContent('Faculty')


})

test('should render studentattendance',()=>{
    render(<StudentAttendance/>)
    const Element=screen.getByTestId('studentattendance');
    expect(Element).toHaveTextContent('Semester');


})

test('should render studentadd',()=>{
    render(<StudentAdd/>)
    const Element=screen.getByTestId('studentadd');
    expect(Element).toHaveTextContent('Add Student');
    expect(Element).toHaveTextContent('Student Id');
    expect(Element).toHaveTextContent('Student Name');
    expect(Element).toHaveTextContent('Student Username');
    expect(Element).toHaveTextContent('Password');
    expect(Element).toHaveTextContent('Elective');
    expect(Element).toHaveTextContent('Department');
    expect(Element).toHaveTextContent('Section');
    expect(Element).toHaveTextContent('Semester');


})

test('should render studentdel',()=>{
    render(<StudentDelete/>)
    const Element=screen.getByTestId('studentdel');
    expect(Element).toBeInTheDocument()

})

test('should render modstud',()=>{
    render(<Modifystudent/>)
    const Element=screen.getByTestId('modstud');
    expect(Element).toBeInTheDocument()

})