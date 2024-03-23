
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { login } from './actions/authActions'; 
const Login = () => {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleChange = (e) => {
      setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(login(credentials));
    }

    return (
      <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={credentials.email} onChange={handleChange}/>
            <input type="password" name="password" value={credentials.password} onChange={handleChange}/>
            <button type='submit'>Login</button>
          </form>
      </div>
    );
}

export default Login;
