import './modal.css';
import { Button } from 'react-bootstrap';
import { closePortalModal } from './Modal';

export interface ConfirmModalProps {
    text: string,
    onConfirm: () => void,
    id:string
} 



function ConfirmModal(props : Readonly<ConfirmModalProps>) {
    
    const closeModal = () => {
        closePortalModal(props.id);
    }

    const handelConfirm = () => {
        closePortalModal(props.id);
        props.onConfirm();
    }

    return (
        <div className="portal-modal" id={props.id}>

            <div className="mod-container">
                <p className='icon-header'><i className='bi bi-exclamation-diamond-fill my-modal-icon'></i></p>
                <h2>Conferma azione</h2>
                <p>{props.text}</p>
                <div className="clearfix">
                    <span className="btn-modal-container"><Button variant='light' onClick={closeModal}>Annulla</Button></span>
                    <span className="btn-modal-container"><Button variant='danger' onClick={handelConfirm}>Conferma</Button></span>
                </div>
            </div>
        </div>

    );
}



export default ConfirmModal;