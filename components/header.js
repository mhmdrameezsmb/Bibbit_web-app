import Image from 'next/image';
import React,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header() {
  const [scroll, setScroll] = useState(false);
  useEffect(()=>{
    window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 50);
      });
  },[])
  return (
    <>
    <div className={"menuNav " + (scroll ? "stickyMenu animated fadeInDown" : "staticMenu")}>
    <Navbar bg="light" expand="lg" className='nav_bar_main'>
      <Container className='navContainer'>
      <Navbar.Brand href="#home">
      {/* <Image src="/images/bibit-logo.svg" alt="" quality={100}  width={160} height={100}  /> */}
      <img src='/images/bibit-logo.svg' alt="" />

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav_listing">
            <Nav.Link href="#home" >Home</Nav.Link>
            <Nav.Link href="#services">Our Services</Nav.Link>
            <Nav.Link href="#why_special">Why we are Special?</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            <div className="riderBtn">
              <a href='#rider_detail'>Become a rider</a>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    
  </>
  )
}

export default Header
