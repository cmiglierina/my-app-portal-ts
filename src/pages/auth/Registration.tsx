import { useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from "react-router";
import './auth.css'
import { useAppDispatch, useAppSelector } from '../../statemanagement/storehooks';
import { registerNewUser, registrationFailure } from '../../statemanagement/slices/AuthSlice';
import type { User } from '../../model/user';

function Registration() {


    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const erromessage = useAppSelector(state => state.auth.registrationErrormessage);
    const isLoading = useAppSelector(state => state.auth.isLoading);



    const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("handleRegistration clicked");
        if (username && password && confirmPassword && name && surname && password == confirmPassword) {
            try {
                console.log("handleRegistration dispatching");
                const userData: User = {
                    email: username,
                    password,
                    surname,
                    name,
                    phone,
                    roles: undefined

                }
                await dispatch(registerNewUser(userData)).unwrap();
                navigate('/login');
            } catch (error) {
                console.error(error);
                dispatch(registrationFailure(error instanceof Error ? error.message : 'Error on login'));
            }
        } else {
            dispatch(registrationFailure('Invalid data'));
        }
    }

    return (
        <>
            <div className="back">
                <div className="div-center-registration">
                    <div className="content">
                        <div className='login-header'>
                            <h1><i className="bi bi-person-circle login-icon" /></h1>
                        </div>
                        <hr />
                        <div className="caption">
                            Per registrarti, inserisci qui i tui dati:
                            <br />
                            <span className='caption-note'>Campi con asterisco sono obbligatori</span>
                        </div>
                        <hr />
                        <form className='myForm' onSubmit={handleRegistration}>
                            <div className="registration-data-table">
                                <div className="registration-data-row">
                                    <div className="registration-data-col label-col">
                                        <label htmlFor="exampleInputEmail1">Email*</label>
                                    </div>
                                    <div className="registration-data-col data-col">
                                        <input
                                            type="email"
                                            className="my-form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Email"
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                        />
                                    </div>
                                </div>
                                <div className="registration-data-row">
                                    <div className="registration-data-col label-col">
                                        <label htmlFor="exampleInputName1">Nome*</label>
                                    </div>
                                    <div className="registration-data-col data-col">
                                        <input
                                            type="text"
                                            className="my-form-control"
                                            id="exampleInputName1"
                                            placeholder="Nome"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                        />
                                    </div>
                                </div>
                                <div className="registration-data-row">
                                    <div className="registration-data-col label-col">
                                        <label htmlFor="exampleInputSurName1">Cognome*</label>
                                    </div>
                                    <div className="registration-data-col data-col">
                                        <input
                                            type="text"
                                            className="my-form-control"
                                            id="exampleInputSurName1"
                                            placeholder="Cognome"
                                            onChange={(e) => setSurname(e.target.value)}
                                            value={surname}
                                        />
                                    </div>
                                </div>
                                <div className="registration-data-row">
                                    <div className="registration-data-col label-col">
                                        <label htmlFor="exampleInputPhone1">Telefono</label>
                                    </div>
                                    <div className="registration-data-col data-col">
                                        <input
                                            type="text"
                                            className="my-form-control"
                                            id="exampleInputPhone1"
                                            placeholder="Telefono"
                                            onChange={(e) => setPhone(e.target.value)}
                                            value={phone}
                                        />
                                    </div>
                                </div>
                                <div className="registration-data-row">
                                    <div className="registration-data-col label-col">
                                        <label htmlFor="exampleInputPassword1">Password*</label>
                                    </div>
                                    <div className="registration-data-col data-col">
                                        <input
                                            type="password"
                                            className="my-form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                    </div>
                                </div>
                                <div className="registration-data-row">
                                    <div className="registration-data-col label-col">
                                        <label htmlFor="exampleInputPassword2">Ripeti password*</label>
                                    </div>
                                    <div className="registration-data-col data-col">
                                        <input
                                            type="password"
                                            className="my-form-control"
                                            id="exampleInputPassword2"
                                            placeholder="Password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            value={confirmPassword}
                                        />
                                    </div>
                                </div>

                            </div>

                            {
                                isLoading ?
                                    <button type="submit" className="btn btn-primary" disabled>
                                        Loading ....
                                    </button> :
                                    <button type="submit" className="btn btn-primary">
                                        Registrati
                                    </button>
                            }
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
        </>
    );
}

export default Registration;