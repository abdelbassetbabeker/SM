import React from 'react';
import { Modal } from 'semantic-ui-react';

const ModalComponent = ({ children, open, setOpen, title = 'Header1', subTitle = 'SubHeader' }) => {


    return (
        <div>
            <Modal
                size='small'
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>
                    <h1 className='text-gray-700 m-0 font-roboto text-[25px]'>
                        {title}
                    </h1>
                    <p className='text-gray-500 my-1 font-roboto font-light text-[15px]'>{subTitle}</p>
                </Modal.Header>
                <Modal.Content>
                    {children}
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default ModalComponent;
