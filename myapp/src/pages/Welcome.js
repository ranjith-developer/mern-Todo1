import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { CredentialsContext } from '../App';
import Todos from '../components/Todos';

import './styles.css'

const Welcome = () => {
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const logout = () => {
        setCredentials(null);
    };

    return (
        <div className='welcome-main-container'>
            <div className='signup-container'>
                {credentials && <button className='button' onClick={logout}>Logout</button>}
                <h1 className='welcome'>Welcome {credentials && credentials.username}</h1>
                {!credentials && <Link to="/register">Register</Link>}
                <br />
                {!credentials && <Link to="/login">Login</Link>}
                {credentials && <Todos />}
            </div>
        </div>
    )
}

export default Welcome