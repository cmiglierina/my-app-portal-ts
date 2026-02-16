import './UserDetail.css';

import { Bounce, toast, ToastContainer } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import type { User } from "../../model/user";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../statemanagement/storehooks";
import { updateFailure, updateUserData } from "../../statemanagement/slices/UserSlice";
import { closePortalModal } from '../modal/Modal';
import ProtectedComponent from '../action/ProtectedComponent';
import { updateAuthUser } from '../../statemanagement/slices/AuthSlice';
import userService from "../../service/user/userservice";

interface UserDetailsProps {
    user: User;
    idModal?: string
}

function UserDetail(props: Readonly<UserDetailsProps>) {

    const user = props.user;
    const [name, setName] = useState(user?.firstName);
    const [surname, setSurname] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.email);
    const [username, setUsername] = useState(user?.username);
    const tokenExpired = useAppSelector(state => state.user.tokenExpired);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authuser = useAppSelector(state => state.auth.user);
    const disabled = !userService.hasRoles(authuser!, ['Admin']);

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user2update: User = {
            email: email || '',
            firstName: name,
            lastName: surname,
            id: user?.id,
            username

        }
        try {
            await dispatch(updateUserData(user2update)).unwrap();
            if ( user.id == authuser!.id) {
                dispatch(updateAuthUser(user));

            }
            toast.success('Utente aggiornato', { containerId: user.id });
            setTimeout(() => {
                if (props.idModal) {
                    closePortalModal(props.idModal);
                    navigate('/users');
                }
            }, 1800);
        } catch (error) {
            console.log('error', error);
            dispatch(updateFailure({ text: 'Errore in update', userid: user.id }));
            if (tokenExpired) {
                navigate('/login');
            } else {
                setTimeout(() => {
                    if (props.idModal) {
                        closePortalModal(props.idModal);
                        navigate('/users');
                    }
                }, 1800);
            }

        }
    };

    return (<div className='form-wrapper'>
        <div className="my-form">
            <Form onSubmit={handlesubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone" value={name} onChange={e => setName(e.target.value)} disabled={disabled} />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone" value={surname} onChange={e => setSurname(e.target.value)} disabled={disabled} />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)}  disabled={disabled} />
                </Form.Group>

                <ProtectedComponent user={authuser!} roles={['Admin']}>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>

                </ProtectedComponent>
            </Form>
        </div>
        <ToastContainer
            containerId={user.id}
            position="top-center"
            autoClose={880}
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
    </div>);
}



export default UserDetail;