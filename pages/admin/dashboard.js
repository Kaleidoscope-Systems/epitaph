import Head from 'next/head'
import Image from 'next/image'
import {useSession} from "next-auth/react"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faGauge,
	faLayerGroup,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
    const { data: session } = useSession()
    if (!session) return
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
								<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '280px', 'overflow-x': 'auto', 'overflow-y': 'hidden'}}>
									<h2>Admin</h2>
									<hr/>
									<ul className="nav nav-pills flex-column mb-auto">
										<li>
											<Link href="#" className="nav-link active" aria-current="page">
												<FontAwesomeIcon icon={faGauge} className="pe-2"></FontAwesomeIcon>
													Dashboard
											</Link>
										</li>
										<li>
											<Link href="/admin/records" className="nav-link link-body-emphasis">
												<FontAwesomeIcon icon={faLayerGroup} className="pe-2"></FontAwesomeIcon> 
													Records
											</Link>
										</li>
										<li>
										<Link href="/admin/people" className="nav-link link-body-emphasis">
												<FontAwesomeIcon icon={faUserCircle} className="pe-2"></FontAwesomeIcon>
													People
											</Link>
										</li>
									</ul>
								</div>
							</main>
						</>
        )
    }
}