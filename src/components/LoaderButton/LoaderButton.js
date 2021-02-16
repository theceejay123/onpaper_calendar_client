import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowClockwise } from "react-icons/bs";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import "./LoaderButton.css";

const LoaderButton = ({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoaderButton ${className} d-flex justify-content-center align-items-center`}
      variant="dark"
      {...props}
    >
      {isLoading && <BsArrowClockwise className="spinning mr-2" />}
      {props.children}
    </Button>
  );
};

export default LoaderButton;
