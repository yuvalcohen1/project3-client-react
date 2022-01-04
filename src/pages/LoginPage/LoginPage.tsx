import React, { FC } from "react";
import { Container } from "react-bootstrap";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";

export const LoginPage: FC = () => {
  return (
    <Container className="login-container w-25 p-5 mt-3">
      <h1 className="login-title text-center mb-5">LOGIN</h1>
      <LoginForm />
    </Container>
  );
};
