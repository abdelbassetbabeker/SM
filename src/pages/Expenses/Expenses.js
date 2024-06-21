import { IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { Loader, Table } from 'semantic-ui-react';
import './style.css'

import { useDispatch, useSelector } from 'react-redux';
// import Loding from '../../components/Loding';

import ModalComponent from '../../components/modal/ModalComponent';
import EditExpense from './EditExpense';
import DeleteStudent from './DeleteStudent';
import { listExpenses } from '../../actions/expensesActions';
import AddExpense from './AddExpense';


const Expenses = () => {


    const [addModal, setAddModal] = React.useState(false)
    const [deleteModalopen, setDeleteModalopen] = React.useState(false)
    const [editModal, setEditModal] = React.useState(false)


    const [id, setId] = React.useState(null)


    const dispath = useDispatch()

    useEffect(() => {
        dispath(listExpenses())
    }, [deleteModalopen, addModal, editModal]);

    const {
        loding,
        // error,
        expenses
    } = useSelector(state => state.listExpenses)


    const handelDeleteModal = (_id) => {
        setId(() => _id)
        setDeleteModalopen(true)
    }


    const handleEditModal = (_id) => {
        setId(() => _id)
        setEditModal(true)
    }

    return (
        <div className='px-5 pt-1'>
            <div className='mb-5'>
                <div>
                    <h2 className=' font-sans font-bold m-0'>Expenses</h2>
                    <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, ratione?</p>
                </div>
                {/* filter and search section  */}
                <div className='my-5  flex items-center gap-3  justify-between'>
                    {/* Search section  */}
                    <div className='flex w-3/4 items-center gap-3'>
                        <div className=' w-full rounded-lg  p-[2px]  pl-4 flex items-center bg-slate00 border border-gray-300 bg-zinc-100 '>
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
                            <li className='mr-2 border bg-zinc-100  px-5 py-2 rounded-lg min-w-[100px]'>
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
                        <button onClick={() => setAddModal(true)} className='mr-2 bg-zinc-100 border px-5 py-2 rounded-lg'>
                            <span className='flex gap-3 items-center text-black'>
                                {plusIcon}
                                Add
                            </span>
                        </button>
                    </div>
                </div>
                {/* end of filter and search section  */}
            </div>
            <div className=' bg-transparent overflow-scroll  rounded-lg  '>
                {loding ?
                    <Loader active inline='centered'>Loding...</Loader>
                    :
                    <>
                        <Table unstackable >
                            <Table.Header className='sticky top-0 z-10'>
                                <Table.Row textAlign='center'>
                                    <Table.HeaderCell textAlign='left'>#</Table.HeaderCell>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'>Notes</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {expenses?.data?.data?.map((obj, index) => (
                                    <Table.Row key={index} textAlign='center'>
                                        <Table.Cell textAlign='left' >{index + 1} </Table.Cell>
                                        <Table.Cell >{obj.name}</Table.Cell>
                                        <Table.Cell >{obj.amount}</Table.Cell>
                                        <Table.Cell>{obj.notes}</Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            <IconButton
                                                onClick={() => handleEditModal(obj.id)}
                                            >
                                                {editIcon}
                                            </IconButton>
                                            {/* Deleteing Icon  */}
                                            <IconButton
                                                onClick={() => handelDeleteModal(obj.id)}
                                            >
                                                {deleteIcon}
                                            </IconButton>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={products?.total ? products?.total : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
                    </>
                }
            </div >
            {/* CreateNew */}
            <ModalComponent ModalComponent
                open={addModal}
                setOpen={setAddModal}
                title='Add Expense '
                subTitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, recusandae?'
            >
                <AddExpense
                    setOpen={setAddModal}
                />
            </ModalComponent >

            {/* Delete */}
            <ModalComponent ModalComponent
                open={deleteModalopen}
                setOpen={setDeleteModalopen}
                title='Deleting Teacher'
                subTitle='This Action can not be recavered ,Are You Sure About this Action '
            >
                <DeleteStudent
                    setDeleteModalopen={setDeleteModalopen}
                    id={id}
                />
            </ModalComponent >

            {/* Edit */}
            <ModalComponent ModalComponent
                open={editModal}
                setOpen={setEditModal}
                title='Edite Teacher'
                subTitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, recusandae?'
            >
                <EditExpense
                    setOpen={setEditModal}
                    id={id}
                />
            </ModalComponent >

        </div >
    );
}

export default Expenses;



const dateIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>


const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>


const statusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>




const previwIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>




const editIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>


const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
