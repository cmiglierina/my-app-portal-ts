import './userlist.css'
import { Button } from 'react-bootstrap';
import type { User } from '../../model/user';
import ConfirmModal from '../../components/modal/ConfirmModal';
import { openPortalModal } from '../../components/modal/Modal';
import CustomModal from '../../components/modal/CustomModal';
import UserDetail from '../../components/user/UserDetail';
import ProtectedComponent from '../../components/action/ProtectedComponent';
import { useAppDispatch, useAppSelector } from '../../statemanagement/storehooks';
import { deleteUserByIdT, onDeleteFailure } from '../../statemanagement/slices/UserListSlice';

interface UserProps {
    user: User,
    onUserDeleted : (id:string) => void
}

function UserItem({ user,onUserDeleted }: Readonly<UserProps>) {
    const dispatch = useAppDispatch();
    const handleConfirm = async () => {
        try {
            console.log('delete user: ' + user.id);
            await dispatch(deleteUserByIdT(user.id)).unwrap();
            onUserDeleted(user.id);


        } catch (error) {
            console.log(error);
            dispatch(onDeleteFailure({ text: 'Errore in update', userid: user.id }));
        }
    }
    const authuser = useAppSelector(state => state.auth.user);
    return (

        <tr className='row-users'>
            <td className='col-actions'>
                <Button variant='info' className='btn-user-act' onClick={() => { openPortalModal('edit-' + user.id) }}  ><i className='bi bi-pencil'></i></Button>
                {
                    authuser?.id == user.id ? <></> : <ProtectedComponent user={authuser!} roles={['Admin']}><Button variant='danger' className='btn-user-act' onClick={() => { openPortalModal('info-' + user.id) }}><i className='bi bi-trash'></i></Button></ProtectedComponent>
                }
                <ConfirmModal id={'info-' + user.id} onConfirm={handleConfirm} text="Confermare la cancellazione dell'utente?"></ConfirmModal>
                <CustomModal title='Dati utente' id={'edit-' + String(user.id)} ><UserDetail user={user} idModal={'edit-' + String(user.id)}></UserDetail> </CustomModal>
            </td>
            <td>{user.id}</td>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
        </tr>


    );
}

export default UserItem;