import './User.css'

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../statemanagement/storehooks';
import { setUser, updateFailure, updateUserData } from '../../statemanagement/slices/UserSlice';
import { useLoaderData, useNavigate } from 'react-router';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import type { User } from '../../model/user';


function UserPage() {



    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { records } = useLoaderData();
    
    if (records.user) {
        dispatch(setUser(records.user.payload));
    }
    const user = useAppSelector(state => state.user.userData);
    const tokenExpired = useAppSelector(state => state.user.tokenExpired);
    const [name, setName] = useState(user?.name);
    const [surname, setSurname] = useState(user?.surname);
    const [email, setEmail] = useState(user?.email);
    const [cellulare, setCellulare] = useState(user?.phone);
    

    if (records.user) {
        dispatch(setUser(records.user.payload));
    }
    


    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user2update: User = {
            email: email || '',
            name,
            surname,
            phone: cellulare,
            id: user?.id

        }
        try {
            await dispatch(updateUserData(user2update)).unwrap();
            toast.success('Utente aggiornato');
        } catch (error) {
            console.log('error', error);
            dispatch(updateFailure('Errore in update'));
            if ( tokenExpired ) {
                navigate('/login');
            }

        }
    };

    return (
        <>
            <h2>
                Dati Utente
            </h2>
            
            <div className='form-wrapper'>
                <div className="my-form">
                    <Form onSubmit={handlesubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone" value={name} onChange={e => setName(e.target.value)} />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSurname">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone" value={surname} onChange={e => setSurname(e.target.value)} />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Numero di telefono</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone" value={cellulare} onChange={e => setCellulare(e.target.value)} />

                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={2500}
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
            </div>
        </>);
}


export default UserPage;

