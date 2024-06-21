import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showStudent } from '../../actions/studentActions';
import { Loader } from 'semantic-ui-react';
import { showEnrolment } from '../../actions/enrolmentActions';
import ModalComponent from '../../components/modal/ModalComponent';
import Enrolment from './Enrolment';
import Subscription from './Subscription';
import DeleteEnrolment from './DeleteEnrolment';





function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



const ShowStudent = () => {

    const [enroleModal, setEnroleModal] = useState(false)
    const [subscModal, setSubscModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(0)
    const [studentID, setStudentID] = useState(null)

    const params = useParams()

    const dispath = useDispatch()

    useEffect(() => {
        dispath(showStudent(params?.studentID))
        setStudentID(() => params?.studentID)
    }, [dispath, params?.studentID, enroleModal, deleteModal]);

    const {
        loding,
        error,
        student
    } = useSelector(state => state.showStudent)

    const [enrollmentID, setenrollmentID] = useState(null)

    useEffect(() => {
        setenrollmentID(null)
        if (student?.enrolments?.length > 0) {
            setenrollmentID(() => student?.enrolments[0]?.id)
        }
    }, [student]);


    useEffect(() => {
        dispath(showEnrolment(enrollmentID))
    }, [dispath, enrollmentID, subscModal]);


    const {
        loding: enrolmentDetailsLoding,
        error: enrolmentDetailsError,
        enrolment
    } = useSelector(state => state.showEnrolment)

    return (
        <div className=' lg:flex  md:block p-5  bg-zinc-100 gap-7 items-start flex-wrap h-[90dvh] overflow-scroll'>

            <div className='  bg-teal-900/95 rounded-lg shadow-lg p-5 basis-[300px] flex-grow sticky top-0 h-full overflow-scroll'>
                <div className='  '>
                    <div className='p-9 items-center h-full '>

                        {/* Student PIC */}
                        <div className='text-center'>
                            <div className='lg:max-w-[150px] md:max-w-[120px] sm:max-w-[100px] relative mx-auto shadow-lg rounded-full'>
                                <img src="/assets/profile.png" alt="" />
                            </div>
                            <h1 className='m-0 font-extrabold text-white  font-roboto lg:text-[30px] md:text-lg sm:text-[20px] capitalize'>{student?.fname} {student?.lname} </h1>
                            <p className='text-gray-300 lg:text-lg sm:text-[13px]'>+213 (0) {student?.phone1}</p>
                        </div>

                        {/* Student Detaiels */}
                        <div className='flex-grow'>
                            <div className='flex gap-32 justify-center mt-8'>

                                <ul className=' mt-5'>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>BirthDate</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>{student?.birthdate}</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>Gender</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>{student?.sex !== 0 ? 'Femme' : 'Homme'}</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>Level</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>{student?.level?.name}</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>School</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>Ramdan Hommed</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>Father Name</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>Ibrahim</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>Fathers Phone</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>06584847674</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>City</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>Ghardaia</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>Street</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>Salouha</p>
                                    </li>
                                </ul>

                                <ul className=' mt-5'>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>BirthDate</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>{student?.birthdate}</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>Gender</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>{student?.sex !== 0 ? 'Femme' : 'Homme'}</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>Level</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>{student?.level?.name}</p>
                                    </li>
                                    <li className='mb-4'>
                                        <p className='text-gray-400 m-0 text-sm'>School</p>
                                        <p className=' text-white font-roboto font-bold pt-1'>Ramdan Hommed</p>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Second Side */}
            <div className=' basis-[700px] flex-grow h-full'>
                <div className=' bg-white rounded-lg shadow-md p-5 '>
                    {loding ?
                        <Loader active inline='centered'>Loding...</Loader> :
                        <>
                            <div className='flex items-center justify-between mb-4'>
                                <div className=''>
                                    <h3 className='m-0 text-gray-700 font-extrabold font-roboto '>Enrolled Courses</h3>
                                    <p className='m-0 text-gray-500 '>Lorem ipsum dolor sit amet Rerum, ad!</p>
                                </div>
                                <div className=' '>
                                    <span className='flex items-center gap-3 px-3 py-3 border hover:bg-zinc-100 rounded-md  text-gray-700 font-bold font-roboto'
                                        onClick={() => setEnroleModal(true)}
                                    >
                                        {addIcon}
                                        Add New Enrolment
                                    </span>
                                </div>
                            </div>
                            <div className=' flex-1  rounded-lg '>
                                {student?.enrolments?.length > 0 ?
                                    <TableContainer >
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Course</TableCell>
                                                    <TableCell align="right">Group</TableCell>
                                                    <TableCell align="right">Level</TableCell>
                                                    <TableCell align="right">Price</TableCell>
                                                    <TableCell align="right">Payment Plan</TableCell>
                                                    <TableCell align="right">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {student?.enrolments?.map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        hover
                                                        onClick={() => {
                                                            setenrollmentID(() => row.id)
                                                            setSelectedRow(index)
                                                        }}
                                                        selected={index === selectedRow ? true : false}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.group.course.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.group.name}</TableCell>
                                                        <TableCell align="right">{row.group.name}</TableCell>
                                                        <TableCell align="right">{row.group.name}</TableCell>
                                                        <TableCell align="right">{row.plan.name}</TableCell>
                                                        <TableCell align="right">
                                                            <IconButton
                                                                onClick={() => {
                                                                    setDeleteModal(true)
                                                                    setenrollmentID(() => row.id)
                                                                }}
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
                                    <div className='bg-gray-100 text-gray-700 font-roboto border rounded-lg flex flex-col items-center py-10 mt-2'>
                                        {folderIcon}
                                        <h3 className='m-0 '>No Enrolments Found</h3>
                                        <p className='text-gray-500'>Click Here if you want to add enrolment For this students </p>
                                    </div>
                                }
                            </div>
                        </>
                    }
                </div>
                <br />
                <div className=' p-5 bg-white rounded-lg shadow-md'>

                    {enrolmentDetailsLoding ?
                        <Loader active inline='centered'>
                            Loding...
                        </Loader> :
                        <>
                            <div className='flex items-center justify-between mb-4'>
                                <div className=''>
                                    <h3 className='m-0 text-gray-700 font-extrabold font-roboto'>
                                        <span className='text-teal-600 mr-2'>
                                            {enrolment?.group?.course?.name}
                                        </span>
                                        Subscriptions</h3>
                                    <p className='m-0 text-gray-500 '>Lorem ipsum dolor sit amet Rerum, ad!</p>
                                </div>
                                <div className=' '>
                                    <span className='flex items-center gap-3 px-3 py-3 border hover:bg-zinc-100 rounded-md  text-gray-800 font-bold font-roboto '
                                        onClick={() => {
                                            setSubscModal(true)
                                        }}

                                    >
                                        {addIcon}
                                        Add Subscribtion
                                    </span>
                                </div>
                            </div>

                            <div className=' flex-1 rounded-lg  '>
                                {enrolment?.subscriptions?.length > 0 ?
                                    <TableContainer>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Course</TableCell>
                                                    <TableCell align="right">Group</TableCell>
                                                    <TableCell align="right">Level</TableCell>
                                                    <TableCell align="right">Price</TableCell>
                                                    <TableCell align="right">Payment Plan</TableCell>
                                                    <TableCell align="right">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {enrolment?.subscriptions?.map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        hover

                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.paid_amount}
                                                        </TableCell>
                                                        <TableCell align="right">{row.paid_amount}</TableCell>
                                                        <TableCell align="right">{row.paid_amount}</TableCell>
                                                        <TableCell align="right">{row.paid_amount}</TableCell>
                                                        <TableCell align="right">{row.paid_amount}</TableCell>
                                                        <TableCell align="right">
                                                            <IconButton>
                                                                {deleteIcon}
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    :
                                    <div className='bg-gray-100 text-gray-700 font-roboto border rounded-lg flex flex-col items-center py-10 mt-2'>
                                        {moneyIcon}
                                        <h3 className='m-0 '>No Subscriptions Yet</h3>
                                        <p className='text-gray-500'>Click Here if you want to add enrolment For this students </p>
                                    </div>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
            <ModalComponent ModalComponent
                open={deleteModal}
                setOpen={setDeleteModal}
                title='Delete Student'
                subTitle='This Action can not be recavered ,Are You Sure About this Action '
            >
                <DeleteEnrolment
                    setDeleteModal={setDeleteModal}
                    enrollmentID={enrollmentID}
                />
            </ModalComponent >

            <ModalComponent ModalComponent
                open={enroleModal}
                setOpen={setEnroleModal}
                title='Add Enrolment'
                subTitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, recusandae?'
            >
                <Enrolment
                    setOpen={setEnroleModal}
                    studentID={studentID}
                />
            </ModalComponent >

            <ModalComponent ModalComponent
                open={subscModal}
                setOpen={setSubscModal}
                title='Add Subscription'
                subTitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, recusandae?'
            >
                <Subscription
                    setOpen={setSubscModal}
                    enrollmentID={enrollmentID}
                />
            </ModalComponent >

        </div >
    );
}

export default ShowStudent;






const photoIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
</svg>





const birthDate = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
</svg>

const phoneIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
</svg>

const levelIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
</svg>


// const addIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-900">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
// </svg>

const addIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>


const moneyIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>




const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>



const folderIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-teal-800 ">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>
