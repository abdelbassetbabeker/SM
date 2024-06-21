import { Chip, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Table } from 'semantic-ui-react';
import './style.css'

import { useDispatch, useSelector } from 'react-redux';
// import Loding from '../../components/Loding';

import ModalComponent from '../../../components/modal/ModalComponent';
import Delete from './Delete';
import Edit from './Edit';
import Add from './Add';
// import { listLevels } from '../../../actions/levelActions';
import { listPlans } from '../../../actions/plansActions';


const Plans = () => {


    const [addModal, setAddModal] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)
    const [editModal, setEditModal] = React.useState(false)
    const [id, setID] = React.useState(null)



    const dispath = useDispatch()
    const {
        loding,
        // error,
        plans
    } = useSelector(state => state.listPlans)


    useEffect(() => {
        dispath(listPlans())
    }, [deleteModal, addModal, editModal]);

    const handelDeleteModal = (_id) => {
        setID(() => _id)
        setDeleteModal(true)
    }


    const handleEditModal = (_id) => {
        setID(() => _id)
        setEditModal(true)
    }

    return (
        <div className='px-5'>
            <div className=''>
                <div className='my-5  flex items-center gap-3  justify-between'>
                    {/* Search section  */}
                    <div className='flex w-3/4 items-center gap-3'>
                        <button onClick={() => setAddModal(true)} className='mr-2 bg-zinc-1 00 border border-zinc-200 p-3 rounded-lg hover:bg-black/5 transition duration-300'>
                            <span className='flex gap-3 items-center text-black'>
                                {/* {plusIcon} */}
                                Filter By levels
                                {selectIcon}
                            </span>
                        </button>
                        <button onClick={() => setAddModal(true)} className='mr-2 bg-zinc-1 00 border border-zinc-200 p-3 rounded-lg hover:bg-black/5 transition duration-300'>
                            <span className='flex gap-3 items-center text-black'>
                                {/* {plusIcon} */}
                                Filter By Plans
                                {selectIcon}
                            </span>
                        </button>
                    </div>
                    {/* end of Search section  */}
                    <div className=''>
                        <button onClick={() => setAddModal(true)} className='mr-2 bg-zinc-1 00 border border-zinc-200 p-3 rounded-lg hover:bg-black/5 transition duration-300'>
                            <span className='flex gap-3 items-center text-black'>
                                {plusIcon}
                                Add New Payment Plan
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
                                <Table.Row>
                                    <Table.HeaderCell textAlign='left'>#</Table.HeaderCell>
                                    <Table.HeaderCell>Level Name</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {plans?.data?.data?.map((item, index) => (
                                    <Table.Row key={index} >
                                        <Table.Cell>{index + 1} </Table.Cell>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {/* Deleteing Icon  */}
                                            <IconButton
                                                onClick={() => handelDeleteModal(item.id)}
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
                title='Add New Level'
                subTitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, recusandae?'
            >
                <Add
                    setOpen={setAddModal}
                />
            </ModalComponent >

            {/* Delete */}
            <ModalComponent ModalComponent
                open={deleteModal}
                setOpen={setDeleteModal}
                title='Delete Level'
                subTitle='This Action can not be recavered ,Are You Sure About this Action '
            >
                <Delete
                    setOpen={setDeleteModal}
                    id={id}
                />
            </ModalComponent >

            {/* Edit */}
            <ModalComponent ModalComponent
                open={editModal}
                setOpen={setEditModal}
                title='Edite Level'
                subTitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, recusandae?'
            >
                <Edit
                    setOpen={setEditModal}
                    id={id}
                />
            </ModalComponent >

        </div >
    );
}

export default Plans;


const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

const selectIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
