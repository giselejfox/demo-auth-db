import React, { useState } from "react"

import { getDatabase, ref, set as firebaseSet } from 'firebase/database'
import { getDownloadURL, getStorage, uploadBytes, ref as storageRef } from "firebase/storage";
import { Modal, Button } from "react-bootstrap"

export default function Profile({ userInfo, currentUser }) {

    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    // State hook to deal with image input -- separate from image url
    const [imageFile, setImageFile] = useState('');
    const [imageAltText, setImageAltText] = useState('')

    const [invalidInputModalVisible, setInvalidInputModalVisible] = useState(false)

    const handleSetUsername = (event) => { setUsername(event.target.value) }
    const handleSetDescription = (event) => { setDescription(event.target.value) }
    const handleSetImageAltText = (event) => { setImageAltText(event.target.value) }
    const handleCloseInvalidInputModal = () => { setInvalidInputModalVisible(false)}

    const handleImgUpload = (event) => {
        if (event.target.files.length > 0 && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    }
 
    const handleSubmit = async (event) => {
        if (username && description && imageFile && imageAltText) { // check that they've inputted a username and description
            event.preventDefault();
            // Uploading image to storage and getting url
            const storage = getStorage();
            const newImgRef = storageRef(storage, 'profileImg/' + currentUser.uid + '.jpg');
            await uploadBytes(newImgRef, imageFile);
            const profileImageUrl = await getDownloadURL(newImgRef);
            // Building the info to pass up
            let profileInfo = {
                username: username,
                description: description,
                profileImageUrl: profileImageUrl,
                profileImageAltText: imageAltText
            }
            // Pass up the info and then reset the page
            const db = getDatabase();
            const userRef = ref(db, 'users/' + currentUser.uid )
            firebaseSet(userRef, profileInfo)
                .then(() => {
                    setUsername('')
                    setDescription('')
                    setImageAltText('')
                    setImageFile('')
                })
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
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Default file input example</label>
                            <input className="form-control" type="file" id="formFile" onChange={handleImgUpload}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="altText">Image Alt Text</span>
                            <input type="text" value={imageAltText} onChange={handleSetImageAltText} className="form-control" placeholder="ex: portrait photo of girl with red hair" aria-describedby="altText" />
                        </div>
                        <button className="btn btn-primary" type="submit">Save</button>
                    </form>
                    <h3>Your stored information</h3>
                    <p>Current username: {userInfo ? userInfo.username : "Add in your username"}</p>
                    <p>Current description: {userInfo ? userInfo.description : "Add in your description above"}</p>
                    <p>Profile Picture:</p>
                    {userInfo && <img style={{height: "40px", width:"40px"}} src={userInfo.profileImageUrl} alt={userInfo.profileImageAltText} />}
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
            <Modal.Body>Make sure to fill out all the inputs</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeInvalidInputModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}