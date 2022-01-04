import React, { FC, useCallback } from "react";
import { Container } from "react-bootstrap";
import { VacationCard } from "../../components/VacationCard/VacationCard";
import { VacationModel } from "../../models/Vacation.model";
import "./NonAdminsVacationsPage.css";

export const NonAdminsVacationsPage: FC = () => {
  const vacations = JSON.parse(localStorage.getItem("vacations") as string);
  const followedVacationIds = JSON.parse(
    localStorage.getItem("followedVacationIds") as string
  );

  const compare = useCallback(
    (a, b) => {
      if (
        followedVacationIds.includes(a.id) &&
        !followedVacationIds.includes(b.id)
      ) {
        return -1;
      }
      if (
        !followedVacationIds.includes(a.id) &&
        followedVacationIds.includes(b.id)
      ) {
        return 1;
      }
      return 0;
    },
    [followedVacationIds]
  );

  vacations.sort(compare);

  return (
    <Container className="vacations d-flex flex-wrap">
      {vacations.map((vacation: VacationModel) => (
        <VacationCard key={vacation.id} {...vacation} />
      ))}
    </Container>
  );
};
