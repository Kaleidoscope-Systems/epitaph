import Head from 'next/head'
import {useSession} from "next-auth/react"
import AccessDenied from '@/components/access-denied'
import Loading from '@/components/loading'

export default function Settings() {
	const { data: session, status } = useSession()
	const caps = 
		session && session.user.caps
			? (() => {
					try {
						return session.user.caps;
					} catch (e) {
						console.error('Error getting user capabilities:', e);
						return {};
					}
				})()
			: {};
	if ('loading' === status) return (<Loading />)
	if ('unauthenticated' === status) return (
		<><Head>
			<title>Access Denied - Ss. Nicodemus & Joseph Burial Society</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
			<link rel="icon" href="/favicon.ico" />
		</Head><AccessDenied /></>)
	if ('authenticated' === status && caps.viewSettings) {
		return (
			<>
				<Head>  
				<title>Settings - Ss. Nicodemus & Joseph Burial Society</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
				<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
					<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '100%'}}>
						<h2>Settings</h2>
						<div className="row">
							<div className="col col-12">
								
							</div>
						</div>
					</div>
				</main>
			</>
		)
	}
	if ('authenticated' === status && !caps.viewSettings) {
		return (
			<>
				<Head>
				<title>Settings - Ss. Nicodemus & Joseph Burial Society</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
				<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
					<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '100%'}}>
						<div className="row position-absolute top-50 start-50 translate-middle">
							<h1>Access Denied</h1>
							<div className="col col-12">
								<div className="pb-1">You do not have permission to view settings.</div><br/>
							</div>
						</div>
					</div>
				</main>
			</>
		)
	}
}