import React from "react";
import { Navbar, Container, Nav ,NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
const Header = () => {
  const userInfo = useSelector((state) => state.userLogin);
  const { user, error, loading } = userInfo;
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            AlmatyComplaint
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
            <Nav.Link as={Link} to="/contact" className="disabledCursor">
                    Contact
                  </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/profile" className="disabledCursor">
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/"
                    className="disabledCursor"
                    onClick={(e) => dispatch(logout())}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Sign In
                </Nav.Link>
              )}
              {user && user.is_admin && 
                        <NavDropdown title={`${user.first_name} (Admin)`} id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to='/admin/category'>Category</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/admin/users'>Users</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/admin/complaints'>Complaints</NavDropdown.Item>
                      </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
