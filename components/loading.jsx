export default function Loading() {
	return(
	  <>
		<main className="d-flex flex-nowrap" style={{height: '100vh'}}>
			<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '100%'}}>
				<div className="row position-absolute top-50 start-50 translate-middle">
					<h1>Loading...</h1>
				</div>
			</div>
		</main>
		</>
	)
}