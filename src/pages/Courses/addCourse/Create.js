import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';

// mui table import 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, IconButton, TextField, Toolbar, Tooltip } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { TwitterPicker } from 'react-color';
import ModalComponent from '../../../components/modal/ModalComponent';
import AddPlan from './AddPlan';
import AddGroup from './AddGroup'
import { Button } from 'semantic-ui-react';
import LottieAnimationCM from '../../../components/lottieAnimation/LottieAnimationCM';
import { addCourse } from '../../../actions/courseActions';
import { Link } from 'react-router-dom';

// actions Animations
import successfulAnimation from '../../../lottiefiles/successful.json';
import loderAnimation from '../../../lottiefiles/loder.json';
import errorAnimation from '../../../lottiefiles/error.json';
import formFillAnimation from '../../../lottiefiles/formFill.json';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { listLevels } from '../../../actions/levelActions';

const Create = () => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [levelsOptions, setLevels] = React.useState([])

    const dispatch = useDispatch()


    const {
        loding: levelsListLoding,
        // error: levelsListError,
        levels
    } = useSelector(state => state.listLevels)

    React.useEffect(() => {
        dispatch(listLevels())
    }, [dispatch]);

    React.useEffect(() => {
        setLevels(() => (levels?.data?.data?.map((item) => ({
            id: item.id,
            label: `${item.name}`
        }))))
    }, [levelsListLoding]);


    const {
        loding: addingCourseLoding,
        error: addingCourseError,
        course
    } = useSelector(state => state.addCourse)

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // adding course Form handler

    const {
        register,
        handleSubmit,
        control,
        setValue,
        trigger,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );
    const onSubmit = (data) => {
        console.log(data);
        dispatch(addCourse(
            {
                ...data,
                level_id: data.level_id.id,
                start_date: dayjs(data.start_date).format('YYYY-MM-DD'),
                end_date: dayjs(data.end_date).format('YYYY-MM-DD')

            }
        ))
    }



    const [planModal, setPlanModal] = React.useState(false)
    const [groupModal, setGroupModal] = React.useState(false)
    const [plans, setplans] = React.useState([]);
    const [groups, setGroups] = React.useState([]);


    React.useEffect(() => {
        // Update the 'groups' value in the form after 'groups' state changes
        setValue('plans', plans);
        setValue('groups', groups);
        console.log(groups);
    }, [plans, groups]);


    const handleDeletePlan = (index) => {
        if (index === 0) {
            setplans(plans.slice(1));
        } else {
            const newplans = plans.slice();
            newplans.splice(index, 1);
            setplans(newplans);
        }
    }

    const handleDeleteGroup = (index) => {
        if (index === 0) {
            setGroups(groups.slice(1));
        } else {
            const newgroups = groups.slice();
            newgroups.splice(index, 1);
            setGroups(newgroups);
        }
    }

    const handleNext = async () => {
        let isValid = false
        switch (activeStep) {
            case 0:
                isValid = await trigger(['name', 'plans', 'color_code', 'start_date', 'end_date', 'level_id'])
                break;
            case 1:
                isValid = await trigger(['groups'])
                break;
            default:
                break;
        }
        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        console.log(errors);
    };


    return (
        <div className='flex gap-3  justify-center'>

            <div className='p-5 w-full'>
                <div className='mb-4'>
                    <h1 className='m-0 text-gray-800 font-roboto font-extrabold '>Add New Course</h1>
                    <p className='m-0 text-gray-500'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, ullam?
                    </p>
                </div>
                <Box sx={{ maxWidth: 800 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 2 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                                        {activeStep === 0 &&
                                            <>

                                                <TextField
                                                    name='name'
                                                    label='Course Name'
                                                    size='small'
                                                    fullWidth
                                                    {...register('name')}
                                                    multiline
                                                    helperText={(errors.name && errors.name.message) || 'Enter Course Name Here'}
                                                    error={Boolean(errors.name)}
                                                    sx={{ margin: '10px 0' }}
                                                />
                                                <Controller
                                                    name='level_id'
                                                    control={control}
                                                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                                                        <Autocomplete
                                                            {...field}
                                                            id="tags-outlined"
                                                            size='small'
                                                            fullWidth
                                                            getOptionLabel={(option) => option.label}
                                                            onChange={(_, value) => field.onChange(value)} // Update the value in the controller's field state
                                                            value={field.value || null} // Ensure a valid controlled value
                                                            options={levelsOptions ?? []}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    error={!!error}
                                                                    helperText={error?.message || "Select Level "}
                                                                    label="Level"
                                                                    type="search"
                                                                    inputRef={ref}
                                                                    {...params}
                                                                    sx={{ margin: '10px 0' }}

                                                                />
                                                            )}
                                                        />
                                                    )}
                                                />

                                                <div className='flex gap-3 mb-5'>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']} >
                                                            <Controller
                                                                control={control}
                                                                name='start_date'
                                                                render={({ field }) => (
                                                                    <DatePicker
                                                                        name="start_date"
                                                                        placeholderText='Select date'
                                                                        onChange={(date) => field.onChange(date)}
                                                                        selected={field.value}
                                                                        format="YYYY-MM-DD"
                                                                        slotProps={{
                                                                            textField: {
                                                                                helperText: (errors.start_date && errors.start_date.message) || 'Select Your Birth Date ',
                                                                                size: 'small',
                                                                                error: Boolean(errors.start_date),
                                                                                fullWidth: true
                                                                            },
                                                                        }}

                                                                    />
                                                                )}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            <Controller
                                                                control={control}
                                                                name='end_date'
                                                                render={({ field }) => (
                                                                    <DatePicker
                                                                        name="end_date"
                                                                        placeholderText='Select date'
                                                                        onChange={(date) => field.onChange(date)}
                                                                        selected={field.value}
                                                                        format="YYYY-MM-DD"
                                                                        slotProps={{
                                                                            textField: {
                                                                                helperText: (errors.end_date && errors.end_date.message) || 'Select Your Birth Date ',
                                                                                size: 'small',
                                                                                error: Boolean(errors.end_date),
                                                                                fullWidth: true
                                                                            },
                                                                        }}

                                                                    />
                                                                )}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                                <div className={` ${errors.plans && 'border-red-300'} border  rounded-lg p-3`}>
                                                    <div className='w-full flex items-center px-3 mb-2 '>
                                                        <div className='w-full p-2'>
                                                            <h3 className='text-gray-700 font-roboto font-extrabold'>Payment Plans</h3>
                                                        </div>
                                                        <Tooltip
                                                            title='Add New Pyment Plan '
                                                        >
                                                            <IconButton onClick={() => setPlanModal(true)}>
                                                                {addIcon}
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    {plans.length !== 0 ?
                                                        <TableContainer component={Box}>
                                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>#</TableCell>
                                                                        <TableCell align="right">Plan</TableCell>
                                                                        <TableCell align="right">Price</TableCell>
                                                                        <TableCell align="right">Delete</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {plans?.map((row, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell component="th" scope="row">
                                                                                {index + 1}
                                                                            </TableCell>
                                                                            <TableCell align="right">{row.label}</TableCell>
                                                                            <TableCell align="right">{row.price} DZ</TableCell>
                                                                            <TableCell align="right">
                                                                                <IconButton
                                                                                    onClick={() => handleDeletePlan(index)}
                                                                                >
                                                                                    {deleteIcon}
                                                                                </IconButton>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                        :
                                                        <div className='h-[100px] rounded border text-center p-5 bg-gray-100'>
                                                            <h3 className='m-0 text-gray-700 font-roboto text-[20px] font-extrabold'>Add Plans</h3>
                                                            <p className='text-gray-500 '>Add as much as needed of groups to the new created course</p>
                                                        </div>
                                                    }
                                                    <br />
                                                </div>
                                                <p className='mt-5 text-gray-500'>Select Course Color</p>
                                                <Controller
                                                    name="color_code"
                                                    control={control}
                                                    defaultValue={{ hex: '#ffffff', a: 1 }} // Set the default color value with alpha
                                                    render={({ field }) => (
                                                        <TwitterPicker
                                                            colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
                                                            color={field.value}
                                                            onChange={(color) => field.onChange(color.hex)}
                                                            className='my-3' />
                                                    )}
                                                />
                                            </>
                                        }
                                        {activeStep === 1 &&
                                            // <Typography>{step.description}</Typography>
                                            <>
                                                <div className={` ${errors.groups && 'border-red-300'} border  rounded-lg p-3`}>
                                                    <div className='w-full flex items-center px-3 mb-2 '>
                                                        <div className='w-full p-2'>
                                                            <h3 className='text-gray-700 font-roboto font-extrabold'>Course Group</h3>
                                                        </div>
                                                        <Tooltip
                                                            title='Add New Group '
                                                        >
                                                            <IconButton onClick={() => setGroupModal(true)}>
                                                                {addIcon}
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    {groups.length !== 0 ?
                                                        <TableContainer component={Box}>
                                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>#</TableCell>
                                                                        <TableCell align="right">Group Name</TableCell>
                                                                        <TableCell align="right">Teaher</TableCell>
                                                                        <TableCell align="right">Level</TableCell>
                                                                        <TableCell align="right">Delete</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {groups?.map((row, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell component="th" scope="row">
                                                                                {index + 1}
                                                                            </TableCell>
                                                                            <TableCell align="right">{row.name}</TableCell>
                                                                            <TableCell align="right">{row.teacher}</TableCell>
                                                                            <TableCell align="right">{row.level} DZ</TableCell>
                                                                            <TableCell align="right">
                                                                                <IconButton
                                                                                    onClick={() => handleDeleteGroup(index)}
                                                                                >
                                                                                    {deleteIcon}
                                                                                </IconButton>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                        :
                                                        <div className='h-[100px] rounded border text-center p-5 bg-gray-100'>
                                                            <h3 className='m-0 text-gray-700 font-roboto text-[20px] font-extrabold'>Add Groups</h3>
                                                            <p className='text-gray-500 '>Add as much as needed of groups to the new created course</p>
                                                        </div>
                                                    }
                                                    <br />
                                                </div>
                                            </>

                                        }
                                        <div className='my-5'>
                                            <Button
                                                color='blue'
                                                onClick={handleNext}
                                                type={activeStep === steps.length ? 'submit' : 'button'}
                                            >
                                                {activeStep === steps.length - 1 ? 'Submit' : 'Continue'}
                                            </Button>
                                            <Button
                                                type='button'
                                                color='black'
                                                disabled={index === 0}
                                                onClick={handleBack}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </form>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {
                        activeStep === steps.length && <div>
                            <div className='mb-2'>
                                {addingCourseLoding &&
                                    <LottieAnimationCM
                                        animationObject={loderAnimation}
                                        settings={null}
                                        height='100px'
                                        loop={true}
                                    />
                                }
                                {addingCourseError &&
                                    <>
                                        <LottieAnimationCM
                                            animationObject={errorAnimation}
                                            settings={null}
                                            height='100px'
                                            loop={false}
                                        />
                                        <h3 className='text-center text-red-800 font-roboto m-0 font-bold '>OOPS ERROR!</h3>
                                        <p className='text-center text-red-900 font-roboto m-0'>{addingCourseError}</p>
                                        <Button
                                            type='button'
                                            color='black'
                                            onClick={handleBack}
                                        >
                                            Back
                                        </Button>
                                    </>
                                }
                                {course &&
                                    <>
                                        <LottieAnimationCM
                                            animationObject={successfulAnimation}
                                            settings={null}
                                            height='150px'
                                            width='100px'
                                            loop={false}

                                        />
                                        <h3 className='text-center text-teal-800 font-roboto m-0 font-bold '>Successfully Created !</h3>
                                        <p className='text-center text-gray-500 font-roboto m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, eum.</p>
                                    </>
                                }
                                <span className='text-center'>
                                    <Link
                                        to={'/courses'}
                                        className='flex  justify-center text-sm'
                                    >
                                        Back To Courses
                                    </Link>
                                </span>

                            </div>
                        </div>

                    }
                </Box>

                <ModalComponent
                    open={planModal}
                    setOpen={setPlanModal}
                    title='Adding Payment Plan For Course '
                    subTitle='This Action can not be recavered ,Are You Sure About this Action '
                >
                    <AddPlan
                        setOpen={setPlanModal}
                        setplans={setplans}
                    />
                </ModalComponent >

                <ModalComponent
                    open={groupModal}
                    setOpen={setGroupModal}
                    title='Add Group '
                    subTitle='This Action can not be recavered ,Are You Sure About this Action '
                >
                    <AddGroup
                        setOpen={setGroupModal}
                        setGroups={setGroups}
                    />
                </ModalComponent >
            </div >
            <div className='w-full md:hidden sm:hidden lg:block'>
                <LottieAnimationCM
                    animationObject={formFillAnimation}
                    settings={null}
                    height='500px'
                    width='100px'
                    loop={true}

                />
            </div>
        </div >
    );
}

export default Create;

const steps = [
    {
        label: 'Create New Course',
        description: `For each ad campaign that you create, you can control how much
            you're willing to spend on clicks and conversions, which networks
            and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Add Groups',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    }
];


const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>


const addIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>





const schema = yup
    .object()
    .shape({
        name: yup.string().required('Full Name is required'),
        level_id: yup.object().required('Full Name is required'),
        plans: yup.array().min(1, 'pleas Select at list one Payment method').required('Payment Plan is required'),
        color_code: yup.string().required('Color is required'),
        start_date: yup.date().required('start Date is required'),
        end_date: yup.date().required('End Date is required'),
        groups: yup.array().min(1, 'pleas Select at list one teacher').required('Full Name name is required'),
        // levels: yup.array().min(1, 'pleas Select at list one level').required('Full Name name is required'),
    })
    .required();

