import Head from 'next/head'
import {useSession} from "next-auth/react"
import AdminSidebar from '@/components/admin-sidebar'
import AccessDenied from '@/components/access-denied'
import Loading from '@/components/loading'

export default function Dashboard() {
	const { data: session, status } = useSession()
	/* session && session.caps
		? (() => {
				try {
					return JSON.parse(session.caps);
				} catch (e) {
					console.error('Parse error', session.caps);
					return {};
				}
			})()
		: {}; */
	if (!session && 'unauthenticated' === status) return (
		<><Head>
			<title>Access Denied - Ss. Nicodemus & Joseph Burial Society</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
			<link rel="icon" href="/favicon.ico" />
		</Head><AccessDenied /></>)
	if ('loading' === status) return (<Loading />)
	if (session && 'authenticated' === status) return (
		<><Head>
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
		</main></>
	)
}