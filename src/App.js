import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./App.css";

// Bootstrap
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

// Routes
import Routes from "./routes/Routes";

// Library
import { AppContext } from "./libs/context";
import { onError } from "./libs/errors";

const App = () => {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentUser, setCurrentUser] = useState({
    name: "",
    userId: "",
  });

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      const credentials = await Auth.currentUserCredentials();
      const attr = await Auth.currentAuthenticatedUser();
      setCurrentUser({
        name: attr.attributes.name,
        userId: credentials.identityId,
      });
      userHasAuthenticated(true);
    } catch (err) {
      if (err !== "No current user") {
        onError(err);
      }
    }

    setIsAuthenticating(false);
  };

  const handleLogout = async (e) => {
    await Auth.signOut();
    setCurrentUser({
      name: "",
      userId: "",
    });
    userHasAuthenticated(false);
    history.push("/login");
  };

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar
          collapseOnSelect
          bg="dark"
          expand="lg"
          variant="dark"
          fixed="top"
        >
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold">
              <Image src="favicon-32x32.png" fluid className="agendaIcon" />
              OnPaper
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {!isAuthenticated ? (
                <React.Fragment>
                  <LinkContainer to="login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                </React.Fragment>
              ) : (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={{
            isAuthenticated,
            userHasAuthenticated,
            selectedDate,
            setSelectedDate,
            currentUser,
            setCurrentUser,
          }}
        >
          <Routes />
        </AppContext.Provider>
      </div>
    )
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
