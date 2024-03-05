import {useSession} from "next-auth/react"
import AccessDenied from '@/components/access-denied'
import Loading from '@/components/loading'
import Layout from '@/components/Layout'
import { fetchPeople, updatePerson } from "@/lib/people"
import { useRouter } from "next/router"
import { useState, useEffect, useCallback } from "react"
import md5 from "md5"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressBook, faListTimeline, faWavePulse, faEdit } from "@fortawesome/pro-solid-svg-icons"

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

	const refreshData = useCallback(() => {
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

	useEffect(() => {
		refreshData();
	}, [personId, refreshData]);

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
	const handleStatusUpdate = async (newStatus) => {
		newStatus.preventDefault();
		const newPersonStatus = newStatus.target.status.value;
		const newPersonData = {
			status: newPersonStatus,
		};
		updatePerson(person.id, newPersonData)
			.then(() => {
				refreshData();
				//TODO: Hide the offcanvas
			})
			.catch((error) => {
				console.error("Error updating person status:", error);
			});
	};

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
							<div className="col-12 d-flex align-items-center">
								<Image
									alt={`${person.displayName}`}
									// deepcode ignore InsecureHash: MD5 implementation is for fingerprint (vs. security) purpose
									src={`https://www.gravatar.com/avatar/${md5(person.email ? person.email : '00000000000000000000000000000000')}?s=100&d=identicon&r=g`}
									className="avatar d-none d-md-block float-start me-3 mt-2"
									height="100"
									width="100"
								/>
								<div>
									<h1 className="mb-0">
										{person.displayName ? person.displayName : person.id}
									</h1>
									<p className="mb-0">
										<span className={`badge ${classStatusBadge} me-2`} id="btn-status" type="button" data-bs-toggle="offcanvas" data-bs-target="#statusOffcanvasRight" aria-controls="statusOffcanvasRight">
											{person?.status}
										</span>
										<span className="text-muted" id="age">{person?.dateOfBirth ? `· Age ${age}` : ""}</span>
									</p>
								</div>
							</div>
            </div>
					<div className="offcanvas offcanvas-end" tabIndex="-1" id="statusOffcanvasRight" aria-labelledby="statusOffcanvasRightLabel">
						<div className="offcanvas-header">
							<h2 className="offcanvas-title" id="statusOffcanvasRightLabel">Change Status</h2>
							<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
						</div>
						<div className="offcanvas-body">
						<label htmlFor="newPersonStatus" className="h3 form-label">Person Status</label>
							<div>
								<form onSubmit={handleStatusUpdate}>
									<select name="status" id="newPersonStatus" className="form-select">
										<option value="Living">Living</option>
										<option value="Reposed">Reposed</option>
										<option value="Inactive">Inactive</option>
									</select>
									<div className="row g-3 mt-3 d-flex">
										<div className="col-6">
											<button type="submit" className="btn btn-primary w-100">Update Status</button>
										</div>
										<div className="col-6">
											<button type="reset" className="btn btn-light w-100" data-bs-dismiss="offcanvas">Cancel</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
          </div>
        </div>
				<main className="container-fluid flex-nowrap" style={{height: '100vh'}}>
					<div className="row">
            <div className="col-12 col-md-8 p-4">
							<div className="d-flex align-items-start">
								<div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
									<a className="nav-link active" id="bio" data-bs-toggle="pill" data-bs-target="#v-pills-bio" type="button" role="tab" aria-controls="v-pills-bio" aria-selected="true"><FontAwesomeIcon icon={faWavePulse} className="me-3" fixedWidth />Bio</a>
									<a className="nav-link" id="contact" data-bs-toggle="pill" data-bs-target="#v-pills-contact" type="button" role="tab" aria-controls="v-pills-contact" aria-selected="false"><FontAwesomeIcon icon={faAddressBook} className="me-3" fixedWidth />Contact</a>
									<a className="nav-link" id="history" data-bs-toggle="pill" data-bs-target="#v-pills-history" type="button" role="tab" aria-controls="v-pills-history" aria-selected="false"><FontAwesomeIcon icon={faListTimeline} className="me-3" fixedWidth />History</a>
								</div>
								<div className="tab-content ms-3" id="v-pills-tabContent">
									<div className="tab-pane fade show active" id="v-pills-bio" role="tabpanel" aria-labelledby="bio" tabIndex="0">
									<div className="card">
										<h2 className="card-header">Bio<span className={`badge fs-5 text-end bg-primary m-2`} id="btn-edit" type="button" data-bs-toggle="modal" data-bs-target="#editBioModal">
														<FontAwesomeIcon icon={faEdit} fixedWidth />
													</span></h2>
										<div className="card-body">
											<div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
												<div className="col">
													<h3 className="h4 mb-0">Organ Donor</h3>
													
													<p className="text-muted">
														{person.organDonor === true
															? "Yes"
															: person.organDonor === false
															? "No"
															: "-"}
													</p>
													<div className="modal" id="editBioModal" tabIndex="-1">
														<div className="modal-dialog">
															<div className="modal-content">
																<div className="modal-header">
																	<h5 className="modal-title">Edit Bio</h5>
																	<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
																</div>
																<div className="modal-body">
																	Future fields to edit bio information.
																</div>
																<div className="modal-footer">
																	<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
																	<button type="button" className="btn btn-primary">Save changes</button>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col">
													<h3 className="h4 mb-0">Occupation</h3>
													<p className="text-muted">{person.occupation ? person.occupation : '-'}</p>
												</div>
												<div className="col">
													<h3 className="h4 mb-0">Marital Status</h3>
													<p className="text-muted">{person.maritalStatus ? person.maritalStatus : '-'}</p>
												</div>
												<div className="col">
													<h3 className="h4 mb-0">Date of Birth</h3>
													<p className="text-muted">{person.dateOfBirth ? dobFormatted : '-'}</p>
												</div>
												<div className="col">
													<h3 className="h4 mb-0">Birth Place</h3>
													<p className="text-muted">{person.birthPlace ? person.birthPlace : '-'}</p>
												</div>
												<div className="col">
													<h3 className="h4 mb-0">Executor</h3>
													<p className="text-muted">{executor ? <Link href={`/admin/people/${person.executorId}`}>
															{executor && executor.displayName}
														</Link> : '-'}</p>
												</div>
											</div>
										</div>
									</div>
									</div>
									<div className="tab-pane fade" id="v-pills-contact" role="tabpanel" aria-labelledby="contact" tabIndex="0">
										<div className="card">
											<h2 className="card-header">Contact</h2>
											<div className="card-body">
												<div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
													<div className="col">
														<h3 className="h4 mb-0">Email</h3>
														<p className="text-muted">{person.email ? person.email : '-'}</p>
													</div>
													<div className="col">
														<h3 className="h4 mb-0">Phone</h3>
														<p className="text-muted">{person.mobilePhone ? person.mobilePhone : '-'}</p>
													</div>
													<div className="col">
														<h3 className="h4 mb-0">Occupation</h3>
														<p className="text-muted">{person.occupation ? person.occupation : '-'}</p>
													</div>
													<div className="col">
														<h3 className="h4 mb-0">Executor</h3>
														<p className="text-muted">{executor ? <Link href={`/admin/people/${person.executorId}`}>
																{executor && executor.displayName}
															</Link> : '-'}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
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