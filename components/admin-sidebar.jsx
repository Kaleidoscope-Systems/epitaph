import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faGauge,
	faLayerGroup,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/router"

export default function AdminSidebar (){
	const router = useRouter()
	const slug = router.pathname;

	return (
		<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '280px', overflowX: 'auto', overflowY: 'hidden'}}>
			<h2>Admin</h2>
			<hr/>
			<ul className="nav nav-pills flex-column mb-auto">
				<li>
					<Link href="/admin/dashboard" className={slug.includes("admin/dashboard", 1) ? "nav-link active" : "nav-link link-body-emphasis"} aria-current="page">
						<FontAwesomeIcon icon={faGauge} className="pe-2"></FontAwesomeIcon>
							Dashboard
					</Link>
				</li>
				<li>
					<Link href="/admin/records" className={slug.includes("admin/records", 1) ? "nav-link active" : "nav-link link-body-emphasis"}>
						<FontAwesomeIcon icon={faLayerGroup} className="pe-2"></FontAwesomeIcon> 
							Records
					</Link>
				</li>
				<li>
				<Link href="/admin/people" className={slug.includes("admin/people", 1) ? "nav-link active" : "nav-link link-body-emphasis"}>
						<FontAwesomeIcon icon={faUserCircle} className="pe-2"></FontAwesomeIcon>
							People
					</Link>
				</li>
			</ul>
		</div>
	)
}