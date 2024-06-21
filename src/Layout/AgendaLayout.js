import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { listTeachers, showTeacher } from '../actions/teacherActions';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

const AgendaLayout = () => {

    const dispatch = useDispatch()

    const [tabIndex, setTabIndex] = useState(0)
    const [teacherID, setTeacherID] = useState(null)
    const [teacherDetailes, setTeacherDetailes] = useState({})


    const {
        loding,
        // error,
        teachers
    } = useSelector(state => state.teacherList)

    useEffect(() => {
        dispatch(listTeachers())
    }, [dispatch]);

    const {
        loding: teacherLoding,
        error: teacherError,
        teacher,
    } = useSelector(state => state.showTeacher)


    useEffect(() => {
        if (teachers?.data?.data?.length > 0) {
            setTeacherID(teachers.data.data[0].id);
            // console.log(teacherID);
        }
    }, [loding]);




    useEffect(() => {
        if (teacherID) {
            dispatch(showTeacher(teacherID))
        }
    }, [teacherID]);


    useEffect(() => {
        if (teacher) {
            setTeacherDetailes(() => teacher)
        }
    }, [teacher]);

    const [courseID, setCourseID] = useState(null)
    const [courseColor, setCourseColor] = useState(null)
    const [courseIndex, setCourseIndex] = useState(0)

    const handleClike = (_teacherID, _index) => {
        setTeacherID(() => _teacherID)
        setTabIndex(() => _index)
        setTeacherDetailes(() => teacher)
    }

    useEffect(() => {
        if (teacher) {
            setCourseID(() => teacher?.data?.data?.groups[0]?.course.id)
            // console.log(courseID);
        }
    }, [teacher]);

    useEffect(() => {
        if (teacher) {
            setCourseColor(() => teacher?.data?.data?.groups[courseIndex]?.course.color_code)
            // console.log(courseID);
        }
    }, [courseID]);



    return (
        <div className='p-6'>
            <div className='mb-4'>
                <h1 className='m-0 text-gray-800 font-roboto font-extrabold '>Agenda</h1>
                <p className='m-0 text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur </p>
            </div>
            <div className="text-md font-medium   border-b border-gray-200 flex justify-between items-center ">
                <ul className="flex flex-wrap -mb-px ">
                    {loding ? 'loding...' :
                        teachers?.data?.data?.map((teacher, index) => (
                            <li className="mr-2" key={index}>
                                <Link
                                    id='autoClickLink'
                                    key={index}
                                    to={`${teacher.id}`}
                                    onClick={() => handleClike(teacher.id, index)}
                                    className={`inline-block p-3  border-b-2 transition-all duration-300 
                                            ${tabIndex === index ? 'font-bold border-teal-800 text-teal-800' : 'text-teal-800/60 border-transparen'}  rounded-t-lg hover:text-teal-800 `}>
                                    {teacher.lname} {teacher.fname}
                                </Link>
                            </li>
                        ))
                    }
                </ul>

                <div className='mr-5 '>
                    <Dropdown text='Teacher Courses' className='text-teal-800'>
                        <Dropdown.Menu >
                            {teacherDetailes?.data?.groups?.map((group, ind) => (
                                <Dropdown.Item
                                    key={ind}
                                    text={group.course.name}
                                    // value={group.course.id}
                                    onClick={() => {
                                        setCourseID(group.course.id)
                                        setCourseIndex(ind)
                                    }
                                    }
                                    active={group.course.id === courseID ? true : false}
                                />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className='overflow-scroll py-3'>
                <Outlet context={[courseID, teacherID, courseColor]} />
            </div>
        </div >
    );
}

export default AgendaLayout;
