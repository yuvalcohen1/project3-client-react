import React, { FC, useCallback, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addNewUserAndGetJwt } from "../../api-client/api-client-users";
import { getVacationsAndIsAdminAndUserId } from "../../api-client/api-client-vacations";
import { StateContext } from "../../state-context";
import { UserExistAlert } from "../UserExistAlert/UserExistAlert";

export const RegisterForm: FC = () => {
  const navigate = useNavigate();

  const [usernameErr, setUsernameErr] = useState(false);

  const { appState, setAppState } = useContext(StateContext);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      const username = e.target.username.value;
      const password = e.target.password.value;

      try {
        const jwt = await addNewUserAndGetJwt(
          firstName,
          lastName,
          username,
          password
        );

        const {
          isAdmin,
          userId: connectedUserId,
          vacations,
        } = await getVacationsAndIsAdminAndUserId(jwt);

        localStorage.setItem("jwt", JSON.stringify(jwt));
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
        localStorage.setItem(
          "connectedUserId",
          JSON.stringify(connectedUserId)
        );
        localStorage.setItem("vacations", JSON.stringify(vacations));
        localStorage.setItem("followedVacationIds", JSON.stringify([]));

        setAppState({
          ...appState,
          connectedUserId,
          isAdmin,
          jwt,
          vacations,
          followedVacationIdsByConnectedUser: [],
        });

        navigate("/vacations");
      } catch (err) {
        setUsernameErr(true);
        setTimeout(() => setUsernameErr(false), 3500);
      }
    },
    [navigate, appState, setAppState]
  );

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter your new username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your new password"
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign Up
        </Button>

        <div className="mt-3">
          <Link style={{ textDecoration: "none" }} to="/login">
            Already have an account?
          </Link>
        </div>
      </Form>

      {usernameErr ? <UserExistAlert /> : null}
    </div>
  );
};
