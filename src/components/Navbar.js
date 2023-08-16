import React from "react"
import { getAuth, signOut } from "firebase/auth"

export default function Navbar({ currentUser }) {


    const handleLogOut = () => {
        signOut(getAuth());
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/profile">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/profile">Profile</a>
                    </li>
                    {!currentUser &&
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                    }
                    {currentUser &&
                        <li className="nav-item">
                            {/* <a className="nav-link" href="#">Logout</a> */}
                            <button onClick={handleLogOut} className="btn btn-primary">Logout</button>
                        </li>
                    }
                </ul>
                </div>
            </div>
            </nav>
    )
}