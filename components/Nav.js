import LoginBtn from './login-btn';
import Link from 'next/link';

function GlobalNav() {
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light" aria-label="Navbar">
    <div className="container-fluid">
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
        <LoginBtn />
      </div>
    </div>
  </nav>
  );
}

export default GlobalNav;