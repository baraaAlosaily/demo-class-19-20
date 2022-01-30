import React from 'react';
import {Navbar,Container,Nav} from "react-bootstrap"
import { Link } from 'react-router-dom';
import "./navbar.css"

const Navbar2 = () => {
  return <div>
   <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand to="/">Recipes</Navbar.Brand>
    <Nav className="me-auto">
      <Link className='link' to="/">Home</Link>
      <Link className='link' to="/favorite">Favorite</Link>
    </Nav>
    </Container>
  </Navbar>
  </div>;
};

export default Navbar2;
