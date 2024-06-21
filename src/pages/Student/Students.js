import { IconButton, TablePagination, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Table } from 'semantic-ui-react';
import './style.css'

import { useDispatch, useSelector } from 'react-redux';
// import Loding from '../../components/Loding';

import AddStudent from './AddStudent';
import ModalComponent from '../../components/modal/ModalComponent';
import EditTeacher from './EditStudent';
import DeleteStudent from './DeleteStudent';
import { listStudents } from '../../actions/studentActions';
import Enrolment from './Enrolment';
import { usePagination } from '../../data/pagination/usepagination';


const Students = () => {

    const [addModal, setAddModal] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)
    const [editModal, setEditModal] = React.useState(false)
    const [enroleModal, setEnroleModal] = React.useState(false)
    const [studentID, setstudentID] = React.useState(null)


    const dispath = useDispatch()

    const [
        handleChangePage,
        handleChangeRowsPerPage,
        page,
        rowsPerPage
    ] = usePagination();


    useEffect(() => {
        dispath(listStudents(page, rowsPerPage))
    }, [deleteModal, addModal, editModal, page, rowsPerPage]);

    const {
        loding,
        // error,
        students
    } = useSelector(state => state.studentsList)

    useEffect(() => {
        console.log(students);
    }, [page, rowsPerPage]);

    const handelDeleteModal = (_id) => {
        setstudentID(() => _id)
        setDeleteModal(true)
    }
    const handleEditModal = (_id) => {
        setstudentID(() => _id)
        setEditModal(true)
    }

    const handleEnroleModal = (_id) => {
        setstudentID(() => _id)
        setEnroleModal(true)
    }

    return (
        <>
            <div className='px-5 pt-1 col-span-3'>
                <div className='mb-5'>

                    <div className='my-4'>
                        <h1 className='m-0 text-gray-800 font-roboto font-extrabold '>Students</h1>
                        <p className='m-0 text-gray-500'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, ullam?
                        </p>
                    </div>
                    {/* filter and search section  */}
                    <div className='my-5  flex items-center gap-3  justify-between'>
                        {/* Search section  */}
                        <div className='flex w-3/4 items-center gap-3'>
                            <div className=' w-full rounded  p-[2px]  pl-4 flex items-center bg-slate00 border border-gray-300 bg-zinc-100 '>
                                <div className='border-r pr-4 mx-4 py-2 ' >
                                    <p className='whitespace-nowrap'>Name</p>
                                </div>
                                <input
                                    type="text"
                                    placeholder='Search...'
                                    className='text-lg border-none bg-transparent w-full rounded-full focus:ring-transparent py-1 outline-0'
                                />
                                <div className='pr-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6  ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                            </div>
                            <ul className='w-full flex items-center'>
                                <li className='mr-2 border bg-zinc-100  px-5 py-2 rounded min-w-[100px]'>
                                    <button>
                                        <span className='flex gap-3 items-center'>
                                            {statusIcon}
                                            {/*
                                         < Dropdown
                                            //     inline
                                            //     search
                                            //     scrolling
                                            //     defaultValue={filterByCategories !== undefined && filterByCategories.length > 0 ? filterByCategories[0].value : 0}
                                            //     options={filterByCategories}
                                            // /> 
                                        */}
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/* end of Search section  */}
                        <div className=''>
                            <button onClick={() => setAddModal(true)} className='mr-2 bg-zinc-100 border px-5 py-2 rounded'>
                                <span className='flex gap-3 items-center text-black'>
                                    {plusIcon}
                                    Add
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* end of filter and search section  */}
                </div>
                <div className=' bg-transparent overflow-scroll  rounded  '>
                    {loding ?
                        <Loader active inline='centered'>Loding...</Loader>
                        :
                        <>
                            <Table unstackable >
                                <Table.Header className='sticky top-0 z-10'>
                                    <Table.Row textAlign='center'>
                                        <Table.HeaderCell textAlign='left'>#</Table.HeaderCell>
                                        <Table.HeaderCell>First Name</Table.HeaderCell>
                                        <Table.HeaderCell>Family Name</Table.HeaderCell>
                                        <Table.HeaderCell>Gender</Table.HeaderCell>
                                        <Table.HeaderCell>Level</Table.HeaderCell>
                                        <Table.HeaderCell>Phone</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='right'>Actions</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {students?.data?.data?.map((student, index) => (
                                        <Table.Row key={index} textAlign='center'>
                                            <Table.Cell> {index + 1} </Table.Cell>
                                            <Table.Cell> {student.lname}</Table.Cell>
                                            <Table.Cell> {student.fname}</Table.Cell>
                                            <Table.Cell> {student.sex === 1 ? 'Homme' : 'Femme'}</Table.Cell>
                                            <Table.Cell> {student.level?.name}</Table.Cell>
                                            <Table.Cell>{student.phone1}</Table.Cell>
                                            <Table.Cell textAlign='right'>

                                                <Tooltip title="View Student Info">
                                                    <IconButton>
                                                        <Link
                                                            to={`${student.id}`}
                                                        >
                                                            {previwIcon}
                                                        </Link>
                                                    </IconButton>
                                                </Tooltip>


                                                <Tooltip title="Enrolments">
                                                    <IconButton
                                                        onClick={() => handleEnroleModal(student.id)}
                                                    >
                                                        <Link>
                                                            {enrolmentIcon}
                                                        </Link>
                                                    </IconButton>
                                                </Tooltip>

                                                {/* Editing Icon  */}
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        onClick={() => handleEditModal(student.id)}
                                                    >
                                                        {editIcon}
                                                    </IconButton>
                                                </Tooltip>

                                                {/* Deleteing Icon  */}

                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handelDeleteModal(student.id)}>
                                                        {deleteIcon}
                                                    </IconButton>
                                                </Tooltip>
                                                {/* <Dropdown icon='ellipsis vertical'>
                                                <Dropdown.Menu>
                                                <Dropdown.Header>Text Size</Dropdown.Header>
                                                    <Dropdown.Item>Small</Dropdown.Item>
                                                    <Dropdown.Item>Medium</Dropdown.Item>
                                                    <Dropdown.Item>Large</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown> */}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={students?.data?.total}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    }
                </div >
                {/* CreateNew */}
                <ModalComponent ModalComponent
                    open={addModal}
                    setOpen={setAddModal}
                    title='Add New Student'
                    subTitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, recusandae?'
                >
                    <AddStudent
                        setOpen={setAddModal}
                    />
                </ModalComponent >

                {/* Delete */}
                <ModalComponent ModalComponent
                    open={deleteModal}
                    setOpen={setDeleteModal}
                    title='Delete Student'
                    subTitle='This Action can not be recavered ,Are You Sure About this Action '
                >
                    <DeleteStudent
                        setDeleteModal={setDeleteModal}
                        studentID={studentID}
                    />
                </ModalComponent >

                {/* Edit */}
                <ModalComponent ModalComponent
                    open={editModal}
                    setOpen={setEditModal}
                    title='Edite Teacher'
                    subTitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, recusandae?'
                >
                    <EditTeacher
                        setOpen={setEditModal}
                        studentID={studentID}
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
            </div>
        </>
    );
}

export default Students;



const dateIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>


const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>


const statusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>




const previwIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>




const editIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-700" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>


const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>



const subscriptionIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


const enrolmentIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>


const IconSize = 'w-5 h-5'