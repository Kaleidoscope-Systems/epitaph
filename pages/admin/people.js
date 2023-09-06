import {useSession} from "next-auth/react"
import AccessDenied from '@/components/access-denied'
import Loading from '@/components/loading'
import Layout from '@/components/Layout'

let appModule = "people"

export default function People() {
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
		<>
		<Layout title="Access Denied" appModule={appModule}>
			<AccessDenied />
		</Layout></>)
	if ('authenticated' === status && caps.viewPeople) {
		return (
			<>
				<Layout title="People" appModule={appModule}>
					<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
						<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '100%'}}>
							<h2>People</h2>
							<div className="row">
								<div className="col col-12">

								</div>
							</div>
						</div>
					</main>
				</Layout>
			</>
		)
	}
	if ('authenticated' === status && !caps.viewPeople) {
		return (
			<>
				<Layout title="People" appModule={appModule}>
				<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
					<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '100%'}}>
						<div className="row position-absolute top-50 start-50 translate-middle">
							<h1>Access Denied</h1>
							<div className="col col-12">
								<div className="pb-1">You do not have permission to view people.</div><br/>
							</div>
						</div>
					</div>
				</main>
				</Layout>
			</>
		)
	}
}