import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import api from '../axiosConfig';

interface DeleteTimeMessageProps{
    user: string
    id: number
    update: () => void
}

export default function DeleteTimeMessage(props: DeleteTimeMessageProps) {

    const modalRef = useRef<HTMLDialogElement>(null);
    const [feedback, setFeedback] = useState("")

    const sendMessage = async () => {
        await api.delete(`/users/${props.user}/time_messages/${props.id}`)
            .then(() => {
                setFeedback("Mensagem apagada com sucesso!")
                setTimeout(() => closeModal, 2000)
                props.update()
            })
            .catch(() =>  setFeedback("Erro ao apagar mensagem"))
    }

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (modalRef.current) {
            setFeedback("")
            modalRef.current.close();
        }
    };

    return (
        <>
            <button className="btn btn-primary btn-sm" onClick={openModal}>
                Remover Mensagem
            </button>

            {
                createPortal(
                    <dialog className="modal" ref={modalRef}>

                        <div className="modal-box">

                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                            <h4 className="font-bold text-lg">Tem certeza que deseja apagar a mensagem?</h4>

                            <div className='flex gap-2 justify-end mt-6'>
                                <button className='btn btn-ghost' onClick={closeModal}>Cancelar</button>
                                <button className='btn btn-primary' onClick={() => sendMessage()}>Deletar</button>
                            </div>


                            <h4 className='my-2 font-bold'>{feedback}</h4>
                        </div>

                        <form method="dialog" className="modal-backdrop">
                            <button onClick={closeModal}>Close</button>
                        </form>

                    </dialog>, document.body
                )
            }
        
        </>
    );
}
