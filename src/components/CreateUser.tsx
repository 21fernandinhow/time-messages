import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import api from '../axiosConfig';

export default function CreateUser() {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [newUserEmail, setNewUserEmail] = useState("")
    const [feedback, setFeedback] = useState("")

    const signUp = async () => {
        await api.post("/users", {user: {email: newUserEmail}})
            .then(() => {
                setFeedback("Usuário adicionado com sucesso!")
                setTimeout(() => closeModal, 2000)
            })
            .catch(() =>  setFeedback("Erro ao criar usuário"))
    }

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (modalRef.current) {
            setNewUserEmail("")
            setFeedback("")
            modalRef.current.close();
        }
    };

    return (
        <>
            <button className="btn btn-sm" onClick={openModal}>
                Criar Usuário
            </button>

            {
                createPortal(
                    <dialog className="modal" ref={modalRef}>

                        <div className="modal-box">

                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                            <h3 className="font-bold text-lg">Criar usuário</h3>
                            <p className="py-4">Basta adicionar seu email para criar seu usuário:</p>
                            <div className='flex flex-wrap gap-2'>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input 
                                        type="email" 
                                        className="grow w-full lg:w-1/2 xl:w-1/3"
                                        placeholder="Digite um e-mail..." 
                                        value={newUserEmail} 
                                        onChange={(e)=>{setNewUserEmail(e.target.value)}}
                                        onKeyDown={(e) => { 
                                            if (e.key === "Enter") signUp()
                                        }} 
                                    />
                                </label>
                                <button className='btn btn-primary' onClick={() => signUp()}>Cadastrar</button>
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
