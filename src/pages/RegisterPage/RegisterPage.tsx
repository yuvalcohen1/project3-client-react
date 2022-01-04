import React, { FC } from "react";
import { Container } from "react-bootstrap";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import "./RegisterPage.css";

export const RegisterPage: FC = () => {
  return (
    <Container className="register-container w-25 p-5 mt-3 ">
      <h1 className="register-title text-center mb-5">REGISTER</h1>
      <RegisterForm />
    </Container>
  );
};
