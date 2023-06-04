import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import fetchSocietyData from '@/lib/fetchSocietyData';
import LoginBtn from './login-btn';

function GlobalNav() {
  const [societyShortName, setSocietyShortName] = useState("");

  useEffect(() => {
    getNames();
  }, []);

  const getNames = async () => {
    const societyData = await fetchSocietyData();
    setSocietyShortName(societyData.shortName);
};
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">{societyShortName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Learn" id="basic-nav-dropdown">
              <NavDropdown.Item href="/ancient-christian-burial-practices">Ancient Christian Burial Practices</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Plan" id="basic-nav-dropdown">
              <NavDropdown.Item href="/planning-discussion-guide">Planning and Discussion Guide</NavDropdown.Item>
              <NavDropdown.Item href="Complete-Planning-Documents-for-Family-Records.pdf" target="_blank">
                Planning Documents
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown title="Pray" id="basic-nav-dropdown">
              <NavDropdown.Item href="Vigil-Psalms-for-the-Departed-Prayers-of-the-Hours.pdf" target="_blank">Vigil Psalms</NavDropdown.Item>
              <NavDropdown.Item href="/prayers-for-sick-dying-departed">
                Prayers for the Sick, Dying, and Departed
              </NavDropdown.Item>
              <NavDropdown.Item href="https://calendly.com/saintspyridon/psalm-reading-for-the-reposed" target="_blank">Sign up to pray</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="about-us">About Us</Nav.Link>
          </Nav>
          <LoginBtn />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GlobalNav;