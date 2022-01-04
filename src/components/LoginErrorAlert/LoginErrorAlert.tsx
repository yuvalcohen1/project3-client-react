import React, { FC } from "react";
import { Alert } from "react-bootstrap";

export const LoginErrorAlert: FC = () => {
  return (
    <Alert variant="warning" style={{ position: "absolute", top: "110px" }}>
      Username and password don't match.
    </Alert>
  );
};
