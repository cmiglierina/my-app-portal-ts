import { useState } from 'react';
import { ToastContainer, Bounce } from 'react-toastify';

import './auth.css'
import { NavLink } from "react-router";

function Login() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin = async  (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="back">
                <div className="div-center">
                    <div className="content">
                        <div className='login-header'>
                            <h1><i className="bi bi-person-circle login-icon" /></h1>
                        </div>
                        <hr />
                        <div >
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>

                                <div className='input-div'>

                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Email"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                    />

                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <div className='input-div'>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    &nbsp;
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                            <span className='span-error'></span>
                            <hr />
                            Non hai un utenza? <NavLink to='/registration' >Registrati</NavLink><br/>
                            Non ricordi la password? <NavLink to='#' >Reset password</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </form>
    );
}

export default Login;