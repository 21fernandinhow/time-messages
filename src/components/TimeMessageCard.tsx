import DeleteTimeMessage from "./DeleteTimeMessage"
interface TimeMessageCardProps {
    user: string
    content: string
    id: number
    date: string | Date
    update: () => void
}

export default function TimeMessageCard (props: TimeMessageCardProps) {
    return (
        <>
            <div className="card bg-base-100 max-w-96 shadow-xl mt-4 mx-auto" key={props.id}>
                <div className="card-body text-start">
                    <div className="flex">
                        <svg className="w-6 h-6 md:w-6 md:h-6 lg:w-6 lg:h-6 text-accent" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clipRule="evenodd"/>
                        </svg>
                        <p className="mx-2 font-bold text-accent">{new Date(props.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <p className="my-2">{props.content}</p>
                    <div className="card-actions">
                        <DeleteTimeMessage user={props.user} id={props.id} update={props.update}/>
                    </div>
                </div>
            </div>
        </>
    )
}