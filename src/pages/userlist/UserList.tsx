import Table from 'react-bootstrap/Table';
import UserItem from './UserItem';
import { useAppDispatch, useAppSelector } from '../../statemanagement/storehooks';
import { Bounce, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { onDeleteSuccess, setUserList } from '../../statemanagement/slices/UserListSlice';
import { getUserFromStorage } from '../../utils/utils';
import type { User } from '../../model/user';
import { setAuthUser } from '../../statemanagement/slices/AuthSlice';



function UserList() {




    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { records } = useLoaderData();
    let authuser = useAppSelector(state => state.auth.user);
    if (!authuser) {
        authuser = getUserFromStorage() as User;
        if (authuser) {
            dispatch(setAuthUser(authuser));
        }
    }

    useEffect(
        () => {
            if (records.status && ( records.status == 403 || records.status == 401)) {
                navigate('/login');
            } else {
                dispatch(setUserList(records.payload));
            }
            if (!authuser) {
                navigate('/login');
            }
            return (() => { })
        }
    );

    let tableCode = <tr><td colSpan={4}>Nessun dato</td></tr>;


    const userListdata = useAppSelector(state => state.userList.usersList);
    const statusRequest = useAppSelector(state => state.userList.pending);
    const isInError = useAppSelector(state => state.userList.isInError);
    const errorMessage = useAppSelector(state => state.userList.errorMessage);
    const httpStatus = useAppSelector(state => state.userList.status);

    const onUserDeleted = (id: string) => {
        dispatch(onDeleteSuccess(id));
        navigate('/users');
    }

    tableCode = statusRequest ?
        <tr><td colSpan={4}>Caricamento in corso</td></tr>
        :
        <>
            {
                userListdata ?
                    <>
                        {userListdata.map(u => <UserItem key={u.id} onUserDeleted={onUserDeleted} user={u}></UserItem>)}
                    </>
                    :
                    <tr><td colSpan={4}>Nessun dato</td></tr>
            }
        </>

    return (
        <>
            <div><h2>Dati utenti {httpStatus}</h2></div>
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>#</th>
                            <th>Utente</th>
                            <th>E-mail</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isInError ? <tr><td colSpan={4}>{errorMessage}</td></tr> :
                                tableCode

                        }
                    </tbody>
                </Table>
                <ToastContainer
                    containerId='userlistpage-toast'
                    position="top-right"
                    autoClose={4000}
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


        </>
    );
}


export default UserList;