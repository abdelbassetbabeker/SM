import './App.css';
import { Routes, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import Login from '../pages/login/Login';
import RequireAuth from '../auth/RequireAuth';

import Layout from '../Layout/Layout';

import Dashboard from '../pages/Dashboard/Dashboard';
import Teachers from '../pages/Teacher/Teachers';
import ViewTeacher from '../pages/Teacher/viewTeacher';
import Students from '../pages/Student/Students';
import Agenda from '../pages/Agenda/Agenda';
import Expenses from '../pages/Expenses/Expenses';
import Main from '../pages/Courses/Main';
import Create from '../pages/Courses/addCourse/Create';
import ShowStudent from '../pages/Student/ShowStudent';
import AgendaLayout from '../Layout/AgendaLayout';



function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />


        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route index path='/' element={<Dashboard />} />

            <Route path='teachers' element={<Teachers />} />
            <Route path='teachers/:id' element={<ViewTeacher />} />

            <Route path='students' element={<Students />} />
            <Route path='students/:studentID' element={<ShowStudent />} />

            <Route path='courses' element={<Main />} />
            <Route path='courses/create' element={<Create />} />


            <Route path='agenda' element={<Agenda />} />

            <Route path='expenses' element={<Expenses />} />
          </Route>
        </Route>
      </Routes >
    </>
  );
}

export default App;
