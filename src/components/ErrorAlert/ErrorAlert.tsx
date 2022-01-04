import React, { FC } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ErrorAlert: FC = () => {
  return (
    <Alert variant="warning" style={{ position: "fixed", top: "40px" }}>
      Something is wrong, please try to{" "}
      <Alert.Link>
        <Link to="/login">Log in</Link>
      </Alert.Link>{" "}
      again
    </Alert>
  );
};
