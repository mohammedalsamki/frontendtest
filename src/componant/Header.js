import React, { Component } from 'react'
import { Navbar, Container,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

class Header extends Component {
   render() {
       return (
           <>
               {this.props.isAuthenticated ? <>
                   <Navbar bg="success" variant="light">
                       <Container>
                           <Navbar.Brand href='#home' >{this.props.myName}</Navbar.Brand>
                           <Nav className="me-auto">
                               <Nav.Link tag={Link} href="/">Home</Nav.Link>
                               <Nav.Link tag={Link} href="/profile">Profile</Nav.Link>
                               <LogoutButton />
                           </Nav>
                       </Container>
                   </Navbar>
               </>
                   : <Navbar bg="success" variant="light">
                       <Container>
                           <Navbar.Brand href="#home">401 EXAM</Navbar.Brand>
                           <Nav className="me-auto">
                               <LoginButton />
                           </Nav>
                       </Container>
                   </Navbar>
               }
           </>
       )
   }
}


export default Header;

