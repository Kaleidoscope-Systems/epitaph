import {useSession} from "next-auth/react"
import AccessDenied from '@/components/access-denied'
import Loading from '@/components/loading'
import Layout from '@/components/Layout'
import { fetchPeople } from "@/lib/people"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import md5 from "md5"
import Image from "next/image"
import Link from "next/link"

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
	const [person, setPerson] = useState(null);
	const [executor, setExecutor] = useState(null);

	useEffect(() => {
		if (personId) {
			fetchPeople(personId)
				.then((data) => {
					setExecutor(null);
					setPerson(data);
					if (data.executorId) {
						fetchPeople(data.executorId)
							.then((data) => {
								setExecutor(data);
							})
							.catch((error) => {
								console.error("Error fetching executor data:", error);
							});
					}
				})
				.catch((error) => {
					console.error("Error fetching people data:", error);
				});
		}
	}, [personId]);	

	let classStatusBadge = 'bg-secondary';
  switch (person?.status){
		case 'Living':
			classStatusBadge = 'bg-success';
			break;
		case 'Reposed':
			classStatusBadge = 'bg-indigo';
			break;
		case 'Inactive':
			classStatusBadge = 'bg-secondary';
			break;
		default:
			classStatusBadge = 'bg-secondary';
	}

	const dobFormatted = person?.dateOfBirth?.split('T')[0];
	const dayjs = require('dayjs')
	const age = dayjs().diff(dobFormatted, 'year')

	if ('loading' === status) return (<Loading />)
	if ('unauthenticated' === status) return (
		<>
		<Layout title="Access Denied" appModule={appModule}>
			<AccessDenied />
		</Layout></>)
	if ('authenticated' === status && caps.viewPeople) {
		return (
			<>
				{person && (<Layout title={person?.displayName ? person.displayName : "Not Found"} appModule={appModule}>
				
				<div className="mb-3" style={{ backgroundColor: 'rgba(115, 45, 190,0.15)' }}>
          <div className="container-fluid">
            <div className="row p-3">
							 <div className="col-12 align-items-center">
								<Image
									alt={`${person.displayName}`}
									// deepcode ignore InsecureHash: MD5 implementation is for fingerprint (vs. security) purpose
									src={`https://www.gravatar.com/avatar/${md5(person.email ? person.email : '00000000000000000000000000000000')}?s=60&d=identicon&r=g`}
									className="avatar d-none d-md-block float-start me-3 mt-2"
									height="50"
									width="50"
								/>
                <h1 className="h3 mb-0 text-columbine">
                  {person.displayName ? person.displayName : person.id}
                </h1>
                <p className="mb-0">
                  <span className={`badge ${classStatusBadge} me-2`} id="btn-status">
                    {person?.status}
                  </span>
									<span className="text-muted" id="age">{person?.dateOfBirth ? `· Age ${age}` : ""}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
				<main className="container-fluid flex-nowrap" style={{height: '100vh'}}>
					<div className="row">
            <div className="col-12 col-md-8 p-4">
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
                <div className="col">
                  <h6 className="mb-0">Email</h6>
                  <p className="text-muted">{person.email ? person.email : '-'}</p>
                </div>
                <div className="col">
                  <h6 className="mb-0">Phone</h6>
                  <p className="text-muted">{person.mobilePhone ? person.mobilePhone : '-'}</p>
                </div>
                <div className="col">
                  <h6 className="mb-0">Organ Donor</h6>
                  <p className="text-muted">
										{person.organDonor === true
											? "Yes"
											: person.organDonor === false
											? "No"
											: "-"}
									</p>
                </div>
								<div className="col">
                  <h6 className="mb-0">Occupation</h6>
                  <p className="text-muted">{person.occupation ? person.occupation : '-'}</p>
                </div>
								<div className="col">
                  <h6 className="mb-0">Marital Status</h6>
                  <p className="text-muted">{person.maritalStatus ? person.maritalStatus : '-'}</p>
                </div>
								<div className="col">
                  <h6 className="mb-0">Date of Birth</h6>
									<p className="text-muted">{person.dateOfBirth ? dobFormatted : '-'}</p>
								</div>
								<div className="col">
                  <h6 className="mb-0">Birth Place</h6>
                  <p className="text-muted">{person.birthPlace ? person.birthPlace : '-'}</p>
                </div>
								<div className="col">
                  <h6 className="mb-0">Executor</h6>
                  <p className="text-muted">{executor ? <Link href={`/admin/people/${person.executorId}`}>
                      {executor && executor.displayName}
                    </Link> : '-'}</p>
                </div>
              </div>
						</div>
					</div>
				</main>
				</Layout>)}
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