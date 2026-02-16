import { Button } from 'react-bootstrap';
import './modal.css'
import type { ReactNode } from "react";
import { closePortalModal } from './Modal';

export interface CustomModalProps {
    children: ReactNode,
    id: string,
    title: string
}



function CustomModal(props: Readonly<CustomModalProps>) {
    const onCloseButton = () => {
        closePortalModal(props.id);
    }

    return (
        <div className="portal-modal" id={props.id}>
            <div className="custom-mod-container">
                <div className='custom-modal-header'>
                    <div><Button variant='secondary' className='modal-close-button' onClick={onCloseButton }><i className='bi bi-x-lg'></i></Button></div>
                </div>
                <br/>
                <div className="title">
                    <h2>{props.title}</h2>
                </div>
                <div className="custom-content">
                    {props.children}

                </div>
            </div>
        </div>);
}

export default CustomModal;