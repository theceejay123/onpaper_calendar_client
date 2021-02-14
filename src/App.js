import React from "react";
import "./App.css";

// Bootstrap
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

//Routes
import Routes from "./routes/Routes";

const App = () => {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark" fixed="top">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold">OnPaper</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="signup">
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
};

export default App;

// function App() {
//   return (
//     <div className="App container py-3">
//       <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
//         <Navbar.Brand className="font-weight-bold text-muted">
//           Scratch
//         </Navbar.Brand>
//         <Navbar.Toggle />
//       </Navbar>
//     </div>
//   );
// }

// export default App;
