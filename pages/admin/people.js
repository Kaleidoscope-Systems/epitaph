import Head from 'next/head'
import {useSession} from "next-auth/react"
import AdminSidebar from '@/components/admin-sidebar'

export default function Records() {
	const { data: session } = useSession()
	if (!session) return
	if (session) {
		return (
			<>
				<Head>  
				<title>People - Ss. Nicodemus & Joseph Burial Society</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
				<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
					<AdminSidebar />
				</main>
			</>
		)
	}
}