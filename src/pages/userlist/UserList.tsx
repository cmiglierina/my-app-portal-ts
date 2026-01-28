import Table from 'react-bootstrap/Table';
import UserItem from './UserItem';
import { useAppDispatch, useAppSelector } from '../../statemanagement/storehooks';
import { Bounce, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { setUserList } from '../../statemanagement/slices/UserListSlice';


function UserList() {




    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { records } = useLoaderData();

    useEffect(
        () => {
            if (records.status && records.status == 403) {
                navigate('/login');
            } else {
                dispatch(setUserList(records.userlist.payload));
            }
            return (() => { })
        }
    );

    let tableCode = <tr><td colSpan={4}>Nessun dato</td></tr>;

    if (records.userlist) {
        dispatch(setUserList(records.userlist.payload))
    }



    const userListdata = useAppSelector(state => state.userList.usersList);
    const statusRequest = useAppSelector(state => state.userList.pending);
    const isInError = useAppSelector(state => state.userList.isInError);
    const errorMessage = useAppSelector(state => state.userList.errorMessage);
    const httpStatus = useAppSelector(state => state.userList.status);





    tableCode = statusRequest ?
        <tr><td colSpan={4}>Caricamento in corso</td></tr>
        :
        <>
            {
                userListdata ?
                    <>
                        {userListdata.map(u => <UserItem key={u.id} user={u}></UserItem>)}
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
                            <th>#</th>
                            <th>Utente</th>
                            <th>E-mail</th>
                            <th>Cellulare</th>
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