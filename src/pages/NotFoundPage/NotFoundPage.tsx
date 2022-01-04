import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export const NotFoundPage: FC = () => {
  return (
    <div id="not-found-page">
      <h1>404</h1>
      <h1>PAGE NOT FOUND</h1>
      <Link to="/login">Go back to login page</Link>
    </div>
  );
};
