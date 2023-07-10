import { useSession, signIn, signOut } from "next-auth/react"
import Button from 'react-bootstrap/Button';
import Image from "next/image";

export default function LoginBtn() {
    const { data: session } = useSession()
    if (session) {
    return (
        <>
        <Image
            src={session.user.image}
            className='me-2'
            width={30}
            height={30}
            alt="Picture of the signed in user"
        />
        {session.user.name} <br />
        <Button className="ms-3" onClick={() => signOut()} variant='outline-primary'>Sign out</Button>
        </>
    )
    }
    return (
    <>
        <Button onClick={() => signIn()} variant='primary'>Sign in</Button>
    </>
    )
}