import './User.css'

import { useAppDispatch, useAppSelector } from '../../statemanagement/storehooks';

import { useLoaderData, useNavigate } from 'react-router';

import UserDetail from '../../components/user/UserDetail';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserFromStorage } from '../../utils/utils';
import { setAuthUser } from '../../statemanagement/slices/AuthSlice';
import type { User } from '../../model/user';


function UserPage() {


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
            if (records.status && records.status != 200) {
                if (records.status == 403 || records.status == 401) {
                    navigate('/login');
                }
                else {
                    toast.error("Errore in caricamento dati", { containerId: 'APP_TOASTIFY' });
                }
            }
            if (!authuser) {
                navigate('/login');
            }
            return (() => { })
        },
    );


    const user = records.payload;

    return (
        <>
            <h2>
                Dati Utente
            </h2>
            <UserDetail user={user!} />

        </>);
}


export default UserPage;

