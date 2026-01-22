import { useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { NavLink } from "react-router";
import './auth.css'

function Registration() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleRegistration = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form>
            <div className="back">
                <div className="div-center">
                    <div className="content">
                        <div className='login-header'>
                            <h1><i className="bi bi-person-circle login-icon" /></h1>
                        </div>
                        <hr />
                        Per registrarti, inserisci qui i tui dati:
                        <br/>
                        <hr/>
                        <form onSubmit={handleRegistration}>
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
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword2">Ripeti password</label>
                                <div className='input-div'>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword2"
                                        placeholder="Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                    />
                                    &nbsp;
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Sign in
                            </button>
                            <span className='span-error'></span>
                            <hr />
                            Hai già un utenza? <NavLink to='/login' >Vai alla pagina di login</NavLink>
                        </form>
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

export default Registration;