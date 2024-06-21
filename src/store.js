import { combineReducers } from 'redux';
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';


import { addTeacherReducer, deleteTeacherReducer, editTeacherReducer, showTeacherReducer, teacherListReducer } from './reducers/teacherReducers';
import { userLoginReducer } from './reducers/loginReducers';
import { addLevelReducer, deleteLevelReducer, levelsListReducer } from './reducers/levelsReducers';
import { addPlanReducer, deletePlanReducer, plansListReducer } from './reducers/plansReducers';
import { addCourseReducer, courseGroupsListReducer, coursesListReducer, deleteCourseReducer, showCourseReducer } from './reducers/courseReducers';
import { addClassReducer, classesListReducer, deleteClassReducer } from './reducers/classReducers';
import { addStudentReducer, deleteStudentReducer, showStudentReducer, studentsListReducer } from './reducers/studentReducers';
import { deleteEnrolmentReducer, enrolmentReducer, showEnrolmentReducer } from './reducers/enrolmentReducers';
import { addSubscriptionReducer } from './reducers/subscriptionReducers';
import { addAgendaReducer, teacherAgendaReducer } from './reducers/agendaReducers';
import { addExpenseReducer, expensesListReducer } from './reducers/expensesReducers';

const reducer = combineReducers(
    {
        userLogin: userLoginReducer,

        teacherList: teacherListReducer,
        addTeacher: addTeacherReducer,
        deleteTeacher: deleteTeacherReducer,
        showTeacher: showTeacherReducer,
        editTeacher: editTeacherReducer,

        studentsList: studentsListReducer,
        addStudent: addStudentReducer,
        deleteStudent: deleteStudentReducer,
        showStudent: showStudentReducer,

        addCourse: addCourseReducer,
        coursesList: coursesListReducer,
        courseGroupsList: courseGroupsListReducer,
        deleteCourse: deleteCourseReducer,
        showCourse: showCourseReducer,

        listLevels: levelsListReducer,
        addLevel: addLevelReducer,
        deleteLevel: deleteLevelReducer,

        listExpenses: expensesListReducer,
        addExpense: addExpenseReducer,
        // deleteLevel: deleteLevelReducer,

        listPlans: plansListReducer,
        addPlan: addPlanReducer,
        deletePlan: deletePlanReducer,

        listClasses: classesListReducer,
        addClass: addClassReducer,
        deleteClass: deleteClassReducer,

        enrolment: enrolmentReducer,
        showEnrolment: showEnrolmentReducer,
        deleteEnrolment: deleteEnrolmentReducer,

        addSubscription: addSubscriptionReducer,

        teacherAgenda: teacherAgendaReducer,
        addAgenda: addAgendaReducer
    }
)



const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialstate = {
    userLogin: { userInfo: userInfoFromStorage }
}

const store = configureStore({
    reducer: reducer,
    middleware: [thunk],
    preloadedState: initialstate,
})


export default store;