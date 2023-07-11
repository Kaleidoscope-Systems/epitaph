import Head from 'next/head'
import {useSession} from "next-auth/react"
import AdminSidebar from '@/components/admin-sidebar'
import LoginBtn from '@/components/login-btn'

export default function Dashboard() {
	const { data: session } = useSession()
	if (!session) return (
		<>
			<Head>  
			<title>Dashboard - Ss. Nicodemus & Joseph Burial Society</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
			<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
				<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '100%'}}>
					<h2>Dashboard</h2>
					<div className="row">
						<div className="col col-12">
							You must sign in to access this page.<br/>
							<LoginBtn />
						</div>
					</div>
				</div>
			</main>
		</>
	)
	if (session) {
		return (
			<>
				<Head>  
				<title>Dashboard - Ss. Nicodemus & Joseph Burial Society</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
				<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
					<AdminSidebar />
					<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '100%'}}>
						<h2>Dashboard</h2>
						<div className="row">
							<div className="col col-12">
								
							</div>
						</div>
					</div>
				</main>
			</>
		)
	}
}