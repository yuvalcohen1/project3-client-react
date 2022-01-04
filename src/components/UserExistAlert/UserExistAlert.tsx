import React, { FC } from "react";
import { Alert } from "react-bootstrap";

export const UserExistAlert: FC = () => {
  return (
    <Alert variant="warning" style={{ position: "absolute", top: "110px" }}>
      Username is already exist, please choose another one.
    </Alert>
  );
};
