import './modal.css';
import { Button } from 'react-bootstrap';
import { closePortalModal } from './Modal';

export interface ConfirmMessageModalProps {
    text: string,
    onConfirm: () => void,
    id:string
} 



function ConfirmMessageModal(props : Readonly<ConfirmMessageModalProps>) {
    
    const handelConfirm = () => {
        closePortalModal(props.id);
        props.onConfirm();
    }

    return (
        <div className="portal-modal" id={props.id}>

            <div className="mod-container">
                <p>{props.text}</p>
                <div className="clearfix">
                    <span className="btn-modal-container"><Button variant='primary' onClick={handelConfirm}>Conferma</Button></span>
                </div>
            </div>
        </div>

    );
}



export default ConfirmMessageModal;