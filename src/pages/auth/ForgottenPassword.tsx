import { useState } from 'react';
import { ToastContainer, Bounce, toast } from 'react-toastify';

import './auth.css'
import { NavLink } from "react-router";
import { forgotPassowordReducer } from '../../statemanagement/slices/AuthSlice';
import type { PasswordForgottenRequest } from '../../model/authmodel';

import { useAppDispatch, useAppSelector } from '../../statemanagement/storehooks';

function ForgottenPassword() {


    const [username, setUsername] = useState('');

    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(state => state.auth.isLoading);


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username) {
            try {
                const req : PasswordForgottenRequest = {
                    email : username
                }
                await dispatch(forgotPassowordReducer(req)).unwrap();
                toast.success("Reset password richiesto con successo, controlla la tua email");
            } catch (error) {
                console.error("error" ,error);
                console.error("type of error" ,typeof error);
                toast.error("Errore nella richiesta reset password");
            }
        } else {
             toast.error('Inserisci la tua email');
        }
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
                            
                            {
                                isLoading ?
                                    <button type="submit" className="btn btn-primary" disabled>
                                        Loading ....
                                    </button> :
                                    <button type="submit" className="btn btn-primary">
                                        Richiedi nuova password
                                    </button>
                            }
                            
                            <hr />
                            <NavLink to='/login' >Torna alla login page</NavLink><br />

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

export default ForgottenPassword;