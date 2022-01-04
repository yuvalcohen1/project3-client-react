import React, { FC, useCallback, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getFollowedVacationIds } from "../../api-client/api-client-follows";
import { getJwtByLogin } from "../../api-client/api-client-users";
import { getVacationsAndIsAdminAndUserId } from "../../api-client/api-client-vacations";
import { StateContext } from "../../state-context";
import { LoginErrorAlert } from "../LoginErrorAlert/LoginErrorAlert";
import "./LoginForm.css";

export const LoginForm: FC = () => {
  const { appState, setAppState } = useContext(StateContext);

  const [loginErr, setLoginErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const username = e.target.username.value;
      const password = e.target.password.value;

      try {
        const jwt = await getJwtByLogin(username, password);
        const {
          isAdmin,
          userId: connectedUserId,
          vacations,
        } = await getVacationsAndIsAdminAndUserId(jwt);
        const followedVacationIds = await getFollowedVacationIds(jwt);
        localStorage.setItem("jwt", JSON.stringify(jwt));
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
        localStorage.setItem(
          "connectedUserId",
          JSON.stringify(connectedUserId)
        );
        localStorage.setItem("vacations", JSON.stringify(vacations));
        localStorage.setItem(
          "followedVacationIds",
          JSON.stringify(followedVacationIds)
        );

        setAppState({
          ...appState,
          isAdmin,
          jwt,
          connectedUserId,
          vacations,
          followedVacationIdsByConnectedUser: followedVacationIds,
        });

        if (isAdmin) {
          navigate("/manage-vacations");
          return;
        }

        navigate("/vacations");
      } catch (err) {
        setLoginErr(true);
        setTimeout(() => setLoginErr(false), 3500);
      }
    },
    [navigate, appState, setAppState]
  );

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Login
        </Button>
        <div className="mt-3">
          <Link className="link-to-register" to="/register">
            Don't have an account yet?
          </Link>
        </div>
      </Form>

      {loginErr ? <LoginErrorAlert /> : null}
    </div>
  );
};
