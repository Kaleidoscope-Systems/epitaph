import LoginBtn from "./login-btn"
import {useSession} from "next-auth/react"

export default function AccessDenied() {
	const { data: session } = useSession()
	if (!session) return(
	  <>
		<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
			<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '100%'}}>
				<div className="row position-absolute top-50 start-50 translate-middle">
					<h1>Access Denied</h1>
					<div className="col col-12">
						You must sign in to access this page.<br/>
						<LoginBtn />
					</div>
				</div>
			</div>
		</main>
		</>
	)
	if (session) return(
		<>
		<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
			<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '100%'}}>
			<div className="row position-absolute top-50 start-50 translate-middle">
					<h1>Access Denied</h1>
					<div className="col col-12">
						You must sign in to access this page.<br/>
						<LoginBtn />
					</div>
				</div>
			</div>
		</main>
		</>
	)
	
}