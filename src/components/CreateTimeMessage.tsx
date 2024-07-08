import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import api from '../axiosConfig';

interface CreateTimeMessageProps{
    user: string
    update: () => void
}

export default function CreateTimeMessage(props: CreateTimeMessageProps) {

    const modalRef = useRef<HTMLDialogElement>(null);
    const [newMessageDate, setNewMessageDate] = useState(() => {
        const dataAtual = new Date();
        return dataAtual.toLocaleDateString('pt-BR');
    });
    const [newMessageContent, setNewMessageContent] = useState("")
    const [feedback, setFeedback] = useState("")

    const sendMessage = async () => {
        const params = {
            time_message: {
                content: newMessageContent,
                date_to_open: newMessageDate.split("/").reverse().join("-")
            }
        }
        await api.post(`/users/${props.user}/time_messages`, params)
            .then(() => {
                setFeedback("Mensagem enviada com sucesso!")
                setTimeout(() => closeModal, 2000)
                props.update()
            })
            .catch(() =>  setFeedback("Erro ao enviar mensagem"))
    }

    const handleDate = (value: string) => {
        const inputValue = value.replace(/[^0-9]/g, '').slice(0, 8)
    
        const day = inputValue.length < 2 ? inputValue : inputValue.slice(0, 2)
        const month = inputValue.length > 2 ? inputValue.slice(2, 4) : ""
        const year = inputValue.length > 4 ? inputValue.slice(4, 8) : ""
    
        const validatedMonth = parseInt(month) > 12 ? '12' : month === '00' ? "01" : month
    
        const maxDay = validatedMonth.length < 2 || ['01', '03', '05', '07', '08', '10', '12'].includes(validatedMonth) ? '31'
            : ['04', '06', '09', '11'].includes(validatedMonth) ? '30'
                : year.length === 4 && parseInt(year) % 4 !== 0 ? '28' : '29'
    
        const validatedDay = parseInt(day) > parseInt(maxDay) ? maxDay : day === '00' ? '01' : day
    
        const validatedFirstSlash = value.length < 3 ? "" : "/"
        const validatedSecondSlash = value.length < 6 ? "" : "/"
    
        const formattedDate = validatedDay + validatedFirstSlash + validatedMonth + validatedSecondSlash + year
        setNewMessageDate(formattedDate)
    }

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (modalRef.current) {
            setNewMessageDate("")
            setNewMessageContent("")
            setFeedback("")
            modalRef.current.close();
        }
    };

    return (
        <>
            <button className="btn btn-neutral btn-sm my-4" onClick={openModal}>
                Adicionar Mensagem
            </button>

            {
                createPortal(
                    <dialog className="modal" ref={modalRef}>

                        <div className="modal-box">

                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                            <h3 className="font-bold text-lg">Adicionar Mensagem</h3>
                            <p className="py-4">Adicione uma data de quando a mensagem poderá ser visualizada:</p>
                            <div className='my-2'>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg className="w-6 h-6 md:w-6 md:h-6 lg:w-6 lg:h-6 text-secondary-content" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clipRule="evenodd"/>
                                    </svg>
                                    <input 
                                        type="text" 
                                        className="grow w-full lg:w-1/2 xl:w-1/3" 
                                        placeholder="DD/MM/YYYY" 
                                        value={newMessageDate} 
                                        onChange={(e)=>{handleDate(e.target.value)}}
                                        onKeyDown={(e) => { 
                                            if (e.key === "Enter") sendMessage()
                                        }} 
                                    />
                                </label>
                                <textarea 
                                    className="w-full grow textarea textarea-bordered my-2" 
                                    placeholder="Escreva sua mensagem..."
                                    value={newMessageContent}
                                    onChange={(e) => setNewMessageContent(e.target.value.slice(0,200))}
                                />
                            </div>

                            <button className='btn btn-primary' onClick={() => sendMessage()}>Enviar</button>

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
