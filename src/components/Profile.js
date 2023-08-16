import React, { useState } from "react"

import { getDatabase, ref, set as firebaseSet } from 'firebase/database'
import { Modal, Button } from "react-bootstrap"


export default function Profile({ userInfo, currentUser }) {

    const [username, setUsername] = useState()
    const [description, setDescription] = useState()

    const [invalidInputModalVisible, setInvalidInputModalVisible] = useState(false)

    const handleSetUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleSetDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleCloseInvalidInputModal = () => {
        setInvalidInputModalVisible(false)
    }
 
    const handleSubmit = (event) => {
        if (username && description) { // check that they've inputted a username and description
            event.preventDefault();
            let profileInfo = {
                username: username,
                description: description
            }
            const userID = currentUser.uid // change once we have user auth
            const db = getDatabase();
            const userRef = ref(db, 'users/' + userID)
            firebaseSet(userRef, profileInfo)
        } else {
            event.preventDefault();
            setInvalidInputModalVisible(true)
        } 
    }

    return(
        <div className="container">
            <h2 className="mt-5">Profile</h2>
            {!currentUser &&
                <div>Login to add profile data</div>
            }
            {currentUser &&
                <div>
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input type="text" value={username} onChange={handleSetUsername} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="description">Description</span>
                            <input type="text" value={description} onChange={handleSetDescription} className="form-control" placeholder="Info about you" aria-label="Description" aria-describedby="description" />
                        </div>
                        <button className="btn btn-primary" type="submit">Save</button>
                    </form>
                    <h3>Your stored information</h3>
                    <p>Current username: {userInfo ? userInfo.username : "Add in your username"}</p>
                    <p>Current description: {userInfo ? userInfo.description : "Add in your description above"}</p>
                </div>
            }
            <InvalidInputModal invalidInputModalVisible={invalidInputModalVisible} closeInvalidInputModal={handleCloseInvalidInputModal} />
        </div>
    )
}

function InvalidInputModal({ invalidInputModalVisible, closeInvalidInputModal }) {
    return (
        <Modal show={invalidInputModalVisible} onHide={closeInvalidInputModal}>
            <Modal.Header closeButton>
            <Modal.Title>Invalid Input</Modal.Title>
            </Modal.Header>
            <Modal.Body>Make sure to input both the username and description</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeInvalidInputModal}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}