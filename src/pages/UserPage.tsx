interface UserPageProps {
    params: {
      userEmail: string;
    };
}

async function getUserData (userEmail: string) {
    const data = await fetch(`https://api-timecapsule-production.up.railway.app/users/${userEmail}time_messages`)
}

export default function UserPage ({params}: UserPageProps) {
    // const { user } = getUserData(params.userEmail)
    
    return (
        <>
            <h1>User: </h1>
        </>
    )
}