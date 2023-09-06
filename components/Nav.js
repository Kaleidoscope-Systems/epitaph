import { faGauge, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import LoginBtn from './login-btn';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrid, faCogs, faSearch } from '@fortawesome/pro-solid-svg-icons';
import router from 'next/router';

let bgColor;
let btnClass;
let searchPlaceholder;

export default function GlobalNav({ appModule }) {
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
  switch (appModule) {
    case 'people':
      bgColor = 'var(--azure)';
      btnClass = 'azure';
      searchPlaceholder = 'Search People';
      break;
  }
  const navSearch = async (event) => {
    event.preventDefault();
    event.target.s.focus();
    event.target.s.select();
    switch (appModule) {
      case 'people':
        router.push(`/people/search/${event.target.s.value}`);
        break;
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light" aria-label="Navbar">
    <div className="container-fluid">
      <>
      {caps?.viewDashboard || caps?.viewPeople || caps?.viewSettings ? (
        <div className="dropdown">
          <button
            className={`btn btn-${btnClass} navbar-brand ms-3`}
            type="button"
            id="module-context"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ borderRadius: '.5rem' }}
          >
            <FontAwesomeIcon icon={faGrid} fixedWidth />
          </button>
          <ul className="dropdown-menu" aria-labelledby="module-context" style={{ fontSize: '1.25rem' }}>
            <li>
              <Link href="/" className='dropdown-item'>
                {process.env.NEXT_PUBLIC_SOCIETY_SHORT_NAME}
              </Link>
            </li>
            {caps?.viewDashboard && (
              <li>
                <Link href="/admin/dashboard" className='dropdown-item'>
                  <FontAwesomeIcon icon={faGauge} fixedWidth className="me-2" />
                  Dashboard
                </Link>
              </li>
            )}
            {caps?.viewPeople && (
              <li>
                <Link href="/admin/people" className='dropdown-item'>
                  <FontAwesomeIcon icon={faUserCircle} fixedWidth className="me-2" />
                  People
                </Link>
              </li>
            )}
            {caps?.viewSettings && (
              <li>
                <Link href="/admin/settings" className="dropdown-item">
                  <FontAwesomeIcon icon={faCogs} fixedWidth className="me-2" />
                  Settings
                </Link>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <></>
      )}
      </>

      <Link className="navbar-brand" href="/">{process.env.NEXT_PUBLIC_SOCIETY_SHORT_NAME}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample05">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Learn</a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/ancient-christian-burial-practices">Ancient Christian Burial Practices</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Plan</a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/planning-discussion-guide">Planning and Discussion Guide</Link></li>
              <li><Link className="dropdown-item" href="/Complete-Planning-Documents-for-Family-Records.pdf">Planning Documents</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Pray</a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/Vigil-Psalms-for-the-Departed-Prayers-of-the-Hours.pdf" target="_blank">Vigil Psalms</Link></li>
              <li><Link className="dropdown-item" href="/prayers-for-sick-dying-departed">Prayers for the Sick, Dying, and Departed</Link></li>
              <li><Link className="dropdown-item" href="https://calendly.com/saintspyridon/psalm-reading-for-the-reposed" target="_blank">Sign up to pray</Link></li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/about-us">About Us</Link>
          </li>
        </ul>
        <div className="collapse navbar-collapse">
          {('people' == appModule && caps?.viewPeople) && (
                <form className="form-inline ms-auto my-lg-0 me-2" id="nav-search" onSubmit={navSearch}>
                  <div className="input-group mr-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={searchPlaceholder}
                      aria-label={searchPlaceholder}
                      aria-describedby="btn-nav-search"
                      name="s"
                      id="s"
                    />
                    <button
                      className={`btn btn-${btnClass}`}
                      type="submit"
                      id="btn-nav-search"
                      style={{ borderColor: '#fff' }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </form>
              )}
        </div>
        <LoginBtn />
      </div>
    </div>
  </nav>
  );
}