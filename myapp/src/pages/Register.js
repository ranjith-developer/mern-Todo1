import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { CredentialsContext} from '../App'
import {handleErrors} from './Login'

import './styles.css'

const Register = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [, setCredentials] = useContext(CredentialsContext);

    const register = (e) => {
        e.preventDefault()
        fetch(`http://localhost:4000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
            }),
        })
        .then(handleErrors)
        .then(() => {
            setCredentials({
                username,
            });
            history('/')
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    const history =  useNavigate();

    return (
        <div className='login-container'>
            <form className='form-container' onSubmit={register}>
                <h1>Register</h1>
                {error && <span style={{ color: "red" }}>{error}</span>}
                <input
                className='input'
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" />
                <br />
                <button className='button' type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register