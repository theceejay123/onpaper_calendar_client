import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./Login.css";

// Bootstrap
import Form from "react-bootstrap/Form";

// Library
import { useAppContext } from "../../libs/context";
import { onError } from "../../libs/errors";
import { useFormFields } from "../../libs/hooks";
import LoaderButton from "../../components/LoaderButton/LoaderButton";

const Login = () => {
  const { userHasAuthenticated, setCurrentUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      const credentials = await Auth.currentUserCredentials();
      const attr = await Auth.currentAuthenticatedUser();
      setCurrentUser({
        name: attr.attributes.name,
        userId: credentials.identityId,
      });
      userHasAuthenticated(true);
    } catch (err) {
      onError(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="md" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="md" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
};

export default Login;
