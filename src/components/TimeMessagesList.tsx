import CreateTimeMessage from "./CreateTimeMessage"
import TimeMessageCard from "./TimeMessageCard"

interface TimeMessagesListProps {
    messages: Array<TimeMessage>
    user: string
    update: () => void
}

interface TimeMessage {
    content: string
    user_email: string
    date_to_open: Date | string
    created_At: number
    updated_At: number
    id: number
}

export default function TimeMessagesList (props: TimeMessagesListProps) {

    return(
        <>
            <p className="font-bold m-2">Mensagens de {props.user}</p>
            <CreateTimeMessage user={props.user} update={props.update}/>
            {props.messages.map(message => <TimeMessageCard update={props.update} user={props.user} content={message.content} date={message.date_to_open} id={message.id} />)}
        </>
    )
}