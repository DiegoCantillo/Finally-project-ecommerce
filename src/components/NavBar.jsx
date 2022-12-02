import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import CartSidebar from './CartSidebar';


const NavBar = () => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='div--nav'>
                <Navbar bg="primary" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            Cantillo-Store
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/login">
                                    login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/purchases">
                                    purchases
                                </Nav.Link>{" "}
                                {/*purchases*/}
                                <Nav.Link onClick={handleShow}><i className="fa-solid fa-cart-shopping" style={{ fontSize: 20 }}></i></Nav.Link> {/*cart*/}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <CartSidebar 
                        handleClose={handleClose}
                        show = {show}
            />
        </>
    );
};

export default NavBar;