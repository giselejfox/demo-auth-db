import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {

  // This is the information the user inputs (the username and description we outlined in Profile.js)
  const [userInfo, setUserInfo] = useState({username: "loading...", description: "loading..."})
  // This is the information we get from firebase authentication (includes user id, user display name, and email)
  const [currentUser, setCurrentUser] = useState()

  // updates the user who's currently using the page
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (firebaseUserObj) => {
      setCurrentUser(firebaseUserObj)
    })
  }, [])

  // updates the stored userInfo 
  useEffect(() => {
    if (currentUser) { // checks to see that we've loading the current user from authentication
      const userID = currentUser.uid 
      const db = getDatabase()
      const userRef = ref(db, 'users/' + userID) // get the reference to the user who's currently logged in
  
      // Use the onValue listener to updates on this user's info
      onValue(userRef, function(snapshot) {
        const newUserInfo = snapshot.val()
        setUserInfo(newUserInfo)
      })
    }
  }, [currentUser])

  return (
    <div className="App">
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route index element={<Profile userInfo={userInfo} currentUser={currentUser} />} />
        <Route path='/profile' element={<Profile userInfo={userInfo}  currentUser={currentUser}/>} />
        <Route path="login" element={<Login currentUser={currentUser}/>} />
      </Routes>
    </div>
  );
}

export default App;
