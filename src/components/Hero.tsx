import { useState } from "react"
import api from "../axiosConfig";
import TimeMessagesList from "./TimeMessagesList";
import CreateTimeMessage from "./CreateTimeMessage";

export default function Hero () {

    const [userEmail, setUserEmail] = useState("")
    const [userMessages, setUserMessages] = useState([])
    const [searchError, setSearchError] = useState("")

    const searchUser = async () => {
        await api.get(`/users/${userEmail}/time_messages`)
            .then((res)=>{
                setSearchError(res.data.length > 0 ? "" : `O usuário ${userEmail} ainda não tem mensagens`)
                setUserMessages(res.data)
            })
            .catch(() => {
                setSearchError("Usuário não encontrado")
                setUserMessages([])
            })
    }

    return(
        <main className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">

                <div className="max-w-md">
                <h1 className="text-5xl font-bold">Mensagens através do tempo</h1>

                <p className="py-4">
                    Aqui no Time Messages, você pode deixar mensagens para seu <strong>"Eu do Futuro"</strong>.
                    Para isso, comece criando seu usuário com o botão no topo, ou pesquise-o abaixo se já tiver criado.
                </p>

                <div className="flex flex-wrap justify-center">
                    <label className="input input-bordered flex items-center gap-2 mb-4">
                        <input 
                            type="email" 
                            className="grow w-full lg:w-1/2 xl:w-1/3" 
                            placeholder="Digite um e-mail..." 
                            value={userEmail} 
                            onChange={(e)=>{setUserEmail(e.target.value)}}
                            onKeyDown={(e) => { 
                                if (e.key === "Enter") searchUser() 
                            }} 
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                        </svg>
                    </label>

                    <button className="btn btn-primary mx-2" onClick={searchUser}>Pesquisar</button>
                </div>
                
                <p className="font-bold m-2">{searchError}</p>

                {searchError && searchError !== "Usuário não encontrado"? 
                    <CreateTimeMessage user={userEmail} update={searchUser}/>
                    : null
                }

                {userMessages.length > 0 && <TimeMessagesList messages={userMessages} user={userEmail} update={searchUser}/>}

                </div>
            </div>
        </main>
    )
}