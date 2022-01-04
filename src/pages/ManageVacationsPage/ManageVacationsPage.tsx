import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AddVacationModal } from "../../components/AddVacationModal/AddVacationModal";
import { EditVacationCard } from "../../components/EditVacationCard/EditVacationCard";
import { VacationModel } from "../../models/Vacation.model";

export const ManageVacationsPage = () => {
  const vacations = JSON.parse(localStorage.getItem("vacations") as string);

  return (
    <div>
      <Container className="my-4 d-flex justify-content-between">
        <Link to="/reports" style={{ textDecoration: "none" }}>
          Go to reports
        </Link>
        <AddVacationModal />
      </Container>

      <Container className="vacations d-flex flex-wrap">
        {vacations.map((vacation: VacationModel) => (
          <EditVacationCard key={vacation.id} {...vacation} />
        ))}
      </Container>
    </div>
  );
};
