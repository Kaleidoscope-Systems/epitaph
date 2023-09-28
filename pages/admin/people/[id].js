import {useSession} from "next-auth/react"
import AccessDenied from '@/components/access-denied'
import Loading from '@/components/loading'
import Layout from '@/components/Layout'
import fetchPeople from "@/lib/people"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import md5 from "md5"
import Image from "next/image"

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
	const router = useRouter();
	const personId = router.query.id;
	const [personData, setPersonData] = useState(null);

	useEffect(() => {
		if (personId) {
			fetchPeople(personId)
				.then((data) => {
					setPersonData(data);
				})
				.catch((error) => {
					console.error("Error fetching people data:", error);
				});
		}
	}, [personId]);	
	console.log(personId);
	console.log(personData);
	if ('loading' === status) return (<Loading />)
	if ('unauthenticated' === status) return (
		<>
		<Layout title="Access Denied" appModule={appModule}>
			<AccessDenied />
		</Layout></>)
	if ('authenticated' === status && caps.viewPeople) {
		return (
			<>
				<Layout title={personData?.displayName ? personData.displayName : "Not Found"} appModule={appModule}>
				<div style={{ backgroundColor: 'rgba(115, 45, 190,0.15)' }}>
          <div className="container-fluid">
            <div className="row p-3">
              <div className="col-12 d-flex align-items-center text-center text-md-start">
							{personData && (<>
								<Image
									alt={`${personData.displayName}`}
									src={`https://www.gravatar.com/avatar/${md5(personData.email ? personData.email : '00000000000000000000000000000000')}?s=60&d=identicon&r=g`}
									className="avatar d-none d-md-block float-start me-3 mt-2"
									height="50"
									width="50"
								/>
							
                <h1 className="h3 mb-0 text-columbine">
                  {personData.displayName ? personData.displayName : personData.id}
                </h1>
                {/* <p className="mb-0">
                  <span className={`badge ${classStatusBadge} me-2`} id="btn-status">
                    {personData.status}
                  </span>
                </p> */}</>)}
              </div>
            </div>
          </div>
        </div>
					<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
						
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