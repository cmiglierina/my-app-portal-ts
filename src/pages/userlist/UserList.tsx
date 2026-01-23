import Table from 'react-bootstrap/Table';
import UserItem from './UserItem';
import { useSelector } from 'react-redux';
import type { User } from '../../model/user';
import type { IRootState } from '../../statemanagement/store';

function UserList() {


     const users = useSelector<IRootState, User[]>(state => state.userList.usersList);
    
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