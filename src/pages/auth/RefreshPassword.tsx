import { useState } from 'react';
import { ToastContainer, Bounce, toast } from 'react-toastify';

import './auth.css'
import { useNavigate, useSearchParams } from "react-router";
import { resetPassowordReducer } from '../../statemanagement/slices/AuthSlice';
import type { PasswordResetRequest } from '../../model/authmodel';

import { useAppDispatch, useAppSelector } from '../../statemanagement/storehooks';
import ConfirmMessageModal from '../../components/modal/ConfirmMessageModal';
import { openPortalModal } from '../../components/modal/Modal';

function RefreshPassword() {
    const [searchParams] = useSearchParams();



    const [username, setUsername] = useState('');
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector(state => state.auth.isLoading);
    const [message, setMessage] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (token) {
            if (username && password && confirmPassword && password == confirmPassword) {
                try {
                    const req: PasswordResetRequest = {
                        email: username,
                        password,
                        confirmPassword,
                        token
                    }
                    const res = await dispatch(resetPassowordReducer(req)).unwrap();
                    setMessage(res.payload!.message);
                    openPortalModal('pwd-reset-message');


                } catch (error) {
                    console.error("error", error);
                    toast.error("Errore nel reset della password");
                }
            } else if (password && confirmPassword && password != confirmPassword) {
                toast.error("Password e conferma password devono coincidere")
            } else {
                toast.error("Dati mancanti");
            }
        } else {
            toast.error("Link non valido");
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
                                <label htmlFor="exampleInputconfirmPassword">Conferma password</label>
                                <div className='input-div'>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputconfirmPassword"
                                        placeholder="Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                    />
                                    &nbsp;
                                </div>
                            </div>

                            {
                                isLoading ?
                                    <button type="submit" className="btn btn-primary" disabled>
                                        Loading ....
                                    </button> :
                                    <button type="submit" className="btn btn-primary">
                                        Reset password
                                    </button>
                            }

                            <hr />

                        </div>
                    </div>
                </div>
            </div>
            <ConfirmMessageModal id="pwd-reset-message" text={message} onConfirm={()=>navigate('/login')}></ConfirmMessageModal>
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

export default RefreshPassword;