import './User.css'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import type { User } from '../../model/user';


function UserPage() {

    const account = useSelector<unknown, User>(state => state.user.userData);

    const [name, setName] = useState(account.name);
    const [surname, setSurname] = useState(account.surname);
    const [email, setEmail] = useState(account.email);
    const [cellulare, setCellulare] = useState(account.phone);

    const handlesubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <h2>
                Dati Utente
            </h2>
            <div className='form-wrapper'>
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
        </>);
}


export default UserPage;