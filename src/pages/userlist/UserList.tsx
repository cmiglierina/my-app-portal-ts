import Table from 'react-bootstrap/Table';
import UserItem from './UserItem';

function UserList() {

    const users = [{
        id: 1,
        name: 'Carlo',
        surname: 'Rossi',
        email: 'carlo.rossi@unaemail.com',
        phone: '3401111111'
    },
    {
        id: 2,
        name: 'Giovanni',
        surname: 'Bianchi',
        email: 'giovanni.bianchi@unaemail.com',
        phone: '3401111111'
    },
    {
        id: 3,
        name: 'Nadia',
        surname: 'Rossi',
        email: 'nadia.rossi@unaemail.com',
        phone: '3401111111'
    },];
    return (
        <>
            <div><h2>Dati utenti</h2></div>
            <div>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Utente</th>
                        <th>E-mail</th>
                        <th>Cellulare</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(
                            u => <UserItem key={u.id} user={u}></UserItem>
                        )
                    }
                </tbody>
            </Table>
            </div>

        </>
    );
}


export default UserList;