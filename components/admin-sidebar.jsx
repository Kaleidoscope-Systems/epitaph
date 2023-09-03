import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faGauge,
	faLayerGroup,
	faUserCircle,
	faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/router"
import {useSession} from "next-auth/react"

export default function AdminSidebar (){
	const router = useRouter()
	const slug = router.pathname;
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

	return (
		<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border-end border-dark-subtle" style={{width: '280px', overflowX: 'auto', overflowY: 'hidden'}}>
			<ul className="nav nav-pills flex-column mb-auto">
				{caps.viewDashboard && (
					<li>
						<Link href="/admin/dashboard" className={slug.includes("admin/dashboard", 1) ? "nav-link active" : "nav-link link-body-emphasis"} aria-current="page">
							<FontAwesomeIcon icon={faGauge} className="pe-2"></FontAwesomeIcon>
							Dashboard
						</Link>
					</li>
				)}
				<li>
					<Link href="/admin/records" className={slug.includes("admin/records", 1) ? "nav-link active" : "nav-link link-body-emphasis"}>
						<FontAwesomeIcon icon={faLayerGroup} className="pe-2"></FontAwesomeIcon> 
							Records
					</Link>
				</li>
				{caps.viewPeople && (
					<li>
					<Link href="/admin/people" className={slug.includes("admin/people", 1) ? "nav-link active" : "nav-link link-body-emphasis"}>
						<FontAwesomeIcon icon={faUserCircle} className="pe-2"></FontAwesomeIcon>
							People
					</Link>
				</li>
				)}
				{caps.viewSettings && (
					<li>
					<Link href="/admin/settings" className={slug.includes("admin/settings", 1) ? "nav-link active" : "nav-link link-body-emphasis"}>
						<FontAwesomeIcon icon={faGear} className="pe-2"></FontAwesomeIcon>
							Settings
					</Link>
				</li>
				)}
			</ul>
		</div>
	)
}