import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, People, PlusCircle, Person, BoxArrowInRight, List, X } from 'react-bootstrap-icons'
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap'
import './Navbar.css' // We'll create this file for custom styles

function Navbar() {
  const [expanded, setExpanded] = useState(false)

  return (
    <BootstrapNavbar expanded={expanded} expand="lg" className="navbar-custom py-3" fixed="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/home" className="brand-custom">
          <Compass size={32} className="me-2" />
          <span className="fw-bold">Travel <span className="text-accent">Journal</span></span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(!expanded)}
          className="toggle-custom"
        >
          {expanded ? <X size={24} /> : <List size={24} />}
        </BootstrapNavbar.Toggle>
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavItem to='/home' icon={<Compass size={20} />} text='Home' />
            <NavItem to='/users' icon={<People size={20} />} text='Creators' />
            <NavItem to='/addpost' icon={<PlusCircle size={20} />} text='Add Journal' />
            <NavItem to='/updateprofile' icon={<Person size={20} />} text='Profile' />
            <NavItem 
              to='/login' 
              icon={<BoxArrowInRight size={20} />} 
              text='Login' 
              className='nav-item-login'
            />
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

function NavItem({ to, icon, text, className = '' }) {
  return (
    <Nav.Link 
      as={Link} 
      to={to} 
      className={`nav-item-custom ${className}`}
    >
      {icon}
      <span className="ms-2">{text}</span>
    </Nav.Link>
  )
}

export default Navbar
