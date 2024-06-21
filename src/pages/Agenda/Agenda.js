import React, { useEffect, useState } from 'react';
import { addAgenda, teacherAgenda } from '../../actions/agendaActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Loader } from 'semantic-ui-react';
import ModalComponent from '../../components/modal/ModalComponent';
import { Alert, Autocomplete, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { listCourseGroups, listCourses } from '../../actions/courseActions';
import { listClasses } from '../../actions/ClassActions';
import { listTeachers, showTeacher } from '../../actions/teacherActions';



const Agenda = () => {


    let courseColor = "red"
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(listTeachers());
    }, [dispatch]);

    const {
        loading: teacherListLoding,
        teachers
    } = useSelector(state => state.teacherList);

    const [teacherOptions, setTeacherOptions] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    useEffect(() => {
        if (teachers?.data?.data?.length > 0) {
            const mappedTeachers = teachers.data.data.map((item) => ({
                id: item.id,
                label: `${item.lname} ${item.fname}`
            }));
            setTeacherOptions(mappedTeachers);
            setSelectedTeacher(mappedTeachers[0]); // Initialize with the first teacher
        }
    }, [teachers]);
    //  End Of Load Teacher List 




    useEffect(() => {
        if (selectedTeacher) {
            dispatch(showTeacher(selectedTeacher.id))
        }
    }, [selectedTeacher]);


    const {
        loding: teacherLoding,
        error: teacherError,
        teacher,
    } = useSelector(state => state.showTeacher)


    const [courseId, setCourseId] = useState('')
    const [courseOptions, setCourseOptions] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null);




    useEffect(() => {
        if (teacher) {
            setCourseId(() => teacher?.data?.groups[0]?.course.id)
        }
        console.log(teacher?.data);
    }, [selectedTeacher?.id]);



    //list of groups section **************************    
    const [groupsOptions, setCourseGroupOption] = useState([])

    useEffect(() => {
        dispatch(listCourseGroups(courseId, selectedTeacher?.id))
    }, [courseId, selectedTeacher?.id])


    const {
        loading: groupsLoding,
        // error: groupsError,
        groups
    } = useSelector(state => state.courseGroupsList)


    useEffect(() => {
        if (groups) {
            setCourseGroupOption(() => (groups?.data?.map((item) => ({
                id: item.id,
                label: `${item.name}`
            }))))
        }
    }, [groupsLoding, groups])

    //end list of groups section **********************









    //Start list of classes section ********************

    useEffect(() => {
        dispatch(listClasses())
    }, [dispatch]);

    const {
        loding: classroomLoading,
        // error:classroomError,
        classes
    } = useSelector(state => state.listClasses)


    useEffect(() => {
        if (classes) {
            setClassesOption(() => (classes?.data?.data?.map((item) => ({
                id: item.id,
                label: `${item.name}`
            }))))
        }
    }, [classroomLoading, classes])

    const [classOptions, setClassesOption] = useState([])




    //end list of classes section ************************

    useEffect(() => {
        dispatch(teacherAgenda(courseId))
    }, [dispatch, courseId]);

    const {
        loding,
        // error,
        agenda
    } = useSelector(state => state.teacherAgenda)

    const [houres, setHours] = useState([])
    const [Dayes, setDayes] = useState([])

    useEffect(() => {
        if (agenda?.data?.length > 0) {
            setHours(() => agenda?.data[0]?.day_events?.map((e) => e.from))
            setDayes(() => agenda?.data?.map((e) => e.day_name))
            // console.log(agenda);
        }
    }, [agenda]);



    const {
        loding: addagendaLoding,
        error: addagendaError,
        agenda: addagendaSuccess
    } = useSelector(state => state.addAgenda)


    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const [open, setOpen] = useState(false)

    const handleClick = (day_name) => {
        setOpen(() => true)
        console.log(day_name);
        setValue('day', day_name)
    }


    const onSubmit = (data) => {
        console.log(data);
        dispatch(addAgenda(
            {
                group_id: data.group_id.id,
                classroom_id: data.classroom_id.id,
                from: data.from,
                to: data.to,
                day: data.day
            }
        ))
    }


    return (
        <>
            <div className='mb-4'>
                <h1 className='m-0 text-gray-800 font-roboto font-extrabold '>Agenda</h1>
                <p className='m-0 text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur </p>
            </div>
            {teacherListLoding ? <p>loding..</p> :
                <div className="text-md font-medium border-gray-200 flex flex-auto items-center w-2/6">
                    <Autocomplete
                        size='small'
                        value={selectedTeacher}
                        onChange={(_, newValue) => setSelectedTeacher(newValue)}
                        getOptionLabel={(option) => option?.label || ''}
                        options={teacherOptions}
                        renderInput={(params) => (
                            <TextField
                                helperText={"Select Teacher"}
                                label="Teacher"
                                type="search"
                                {...params}
                            />
                        )}
                        className='flex-1 mx-2'
                        disableClearable={true}
                    />
                    <Autocomplete
                        size='small'
                        value={selectedCourse}
                        onChange={(_, newValue) => setSelectedCourse(newValue)}
                        getOptionLabel={(option) => option?.label || ''}
                        options={courseOptions}
                        renderInput={(params) => (
                            <TextField
                                helperText={"Select Course"}
                                label="Course"
                                type="search"
                                {...params}
                            />
                        )}
                        className='flex-1 mx-2'
                        disableClearable={true}
                    />
                </div>
            }
            <div className='mt-10'>
                <div className='flex items-start'>
                    <ul className=''>
                        <li className='border p-2 h-[50px] w-[100px]  '>
                            <p>Dayes/Houre</p>
                        </li>
                        {Dayes?.map((dayname, index) => (
                            <li key={index} className='border p-5 h-[70px] w-[100px] text-center text-gray-800 font-bold font-roboto capitalize '>
                                <p>{dayname}</p>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <ul className=' flex  h-fit bg-500  text-center text-gray-800 font-bold font-roboto'>
                            {houres?.map((day, index) => (
                                <li key={index} className='border p-5 h-[50px] w-[100px]  '>
                                    <p>{`${day}h`}</p>
                                </li>
                            ))}
                        </ul>

                        {loding ?
                            'Loding...'
                            : agenda?.data?.map((day, day_index) => (
                                <ul key={day_index} className='flex'>
                                    {day.day_events.map((time, time_index) => (
                                        <li key={time_index}
                                            onClick={() => (handleClick(day.day_name))}
                                            className={`
                                    ${time.name === "" ? "border" : ""}
                                    ${time.name === "" ? "" : "z-10 text-ellipsis whitespace"}
                                    flex items-center justify-center h-[70px] w-[100px]  hover:bg-black/5 `}
                                            style={{
                                                background: `${time.name === "" ? "" : courseColor}`
                                            }}
                                        >
                                            <p className='text-[20px] font-roboto font-bold'>{time.name}</p>
                                        </li>
                                    ))}
                                </ul>
                            ))}

                    </div>
                </div>
                <ModalComponent
                    open={open}
                    setOpen={setOpen}
                    title='Add To Agenda'
                    subTitle='Lorem ipsum dolor, sit amet consectetur !'
                >
                    {addagendaLoding && <Loader active inline='centered'>Loding...</Loader>}
                    {addagendaError && <Alert severity="error">{addagendaError}</Alert>}
                    {addagendaSuccess && <Alert severity="success">{addagendaSuccess?.message || 'Add Successfuly '}</Alert>}
                    <br />
                    {groupsLoding ? 'loding...' :
                        <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                            <Controller
                                name='group_id'
                                control={control}
                                defaultValue={[]}
                                render={({ field: { ref, ...field }, fieldState: { error } }) => (
                                    <Autocomplete
                                        {...field}
                                        id="tags-outlined"
                                        size='small'
                                        fullWidth
                                        getOptionLabel={(option) => option?.label || ''}
                                        onChange={(_, value) => field.onChange(value)}
                                        options={groupsOptions ?? []}
                                        renderInput={(params) => (
                                            <TextField
                                                error={!!error}
                                                helperText={error?.message || "Select Group "}
                                                label="Groups"
                                                type="search"
                                                inputRef={ref}
                                                {...params}
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Controller
                                name='classroom_id'
                                control={control}
                                defaultValue={[]}
                                render={({ field: { ref, ...field }, fieldState: { error } }) => (
                                    <Autocomplete
                                        {...field}
                                        id="tags-outlined"
                                        size='small'
                                        fullWidth
                                        getOptionLabel={(option) => option?.label || ''}
                                        onChange={(_, value) => field.onChange(value)}
                                        options={classOptions ?? []}
                                        renderInput={(params) => (
                                            <TextField
                                                error={!!error}
                                                helperText={error?.message || "Select Classroom "}
                                                label="Classroom"
                                                type="search"
                                                inputRef={ref}
                                                {...params}
                                            />
                                        )}
                                    />
                                )}
                            />
                            <FormControl
                                error={Boolean(errors.sex)}
                                fullWidth
                                size='small'
                                sx={{ margin: '15px 0' }}
                            >
                                <InputLabel id="demo-simple-select-error-label">from</InputLabel>
                                <Controller
                                    name="from"
                                    control={control}
                                    defaultValue={houres ?? houres[0].id} // Set an appropriate default value
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="from"
                                        >
                                            {houres.map((e, i) => (
                                                <MenuItem key={i} value={e}>{e}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{(errors.from && errors.from.message) || 'Select Start Time For the Session'}</FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl
                                error={Boolean(errors.sex)}
                                fullWidth
                                size='small'
                            >
                                <InputLabel id="demo-simple-select-error-label">To</InputLabel>
                                <Controller
                                    name="to"
                                    control={control}
                                    defaultValue={houres ?? houres[0]} // Set an appropriate default value
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="To"
                                        >
                                            {houres.map((e, i) => (
                                                <MenuItem key={i} value={e}>{e}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{(errors.to && errors.to.message) || 'Select End time For the Session'}</FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <Button type='submit' color='green' >Submit</Button>
                            <Button type='button' floated='right' onClick={() => setOpen(false)}>Cancel</Button>

                        </form>
                    }
                </ModalComponent>
            </div >
        </>
    );
}

export default Agenda;


const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const schema = yup
    .object()
    .shape({
        group_id: yup.object().required('Group is required'),
        from: yup.string()
            .matches(timeRegex, 'Invalid time format')
            .required('Time is required'),
        to: yup.string()
            .matches(timeRegex, 'Invalid time format')
            .required('Time is required'),
    })
    .required();