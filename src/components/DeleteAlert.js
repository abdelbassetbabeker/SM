import React from 'react'

import { Button, Modal } from 'semantic-ui-react'







function DeleteAlert({ deleteAlert, setDeleteAlert, handleDelet, id }) {


    const handleDelete = () => {
        handleDelet(id)
        setDeleteAlert(false)
    }


    return (
        <Modal
            dimmer='blurring'
            open={deleteAlert}
        >
            <Modal.Header>Use Google's location service?</Modal.Header>
            <Modal.Content>
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => setDeleteAlert(false)}>
                    Disagree
                </Button>
                <Button positive onClick={handleDelete}>
                    Agree
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteAlert