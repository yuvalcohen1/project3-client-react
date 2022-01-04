import moment from "moment";
import React, { FC, useCallback, useContext } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { deleteVacationById } from "../../api-client/api-client-vacations";
import { VacationModel } from "../../models/Vacation.model";
import { StateContext } from "../../state-context";
import { EditVacationModal } from "../EditVacationModal/EditVacationModal";
import "./EditVacationCard.css";

export const EditVacationCard: FC<VacationModel> = ({
  id,
  destination,
  description,
  startDate,
  endDate,
  image,
  price,
}) => {
  const { appState, setAppState } = useContext(StateContext);

  const handleDeleteClick = useCallback(async () => {
    const jwt = JSON.parse(localStorage.getItem("jwt") as string);

    await deleteVacationById(id, jwt);

    const vacations = JSON.parse(
      localStorage.getItem("vacations") as string
    ) as VacationModel[];

    const deletedVacationIndex = vacations.findIndex(
      (vacation) => vacation.id === id
    );

    vacations.splice(deletedVacationIndex, 1);

    localStorage.setItem("vacations", JSON.stringify(vacations));

    setAppState({ ...appState, vacations });
  }, [id, appState, setAppState]);

  return (
    <div>
      <Card className="m-3" style={{ width: "18rem" }}>
        <Card.Img style={{ height: "10rem" }} variant="top" src={image} />

        <Card.Body className="d-flex justify-content-between">
          <div className="w-75">
            <Card.Title>{destination}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </div>
          <div className="d-flex flex-column justify-content-around">
            <div>
              <i
                className="fas fa-trash-alt fa-lg delete-icon"
                onClick={handleDeleteClick}
                title="delete vacation"
              ></i>
            </div>
            <div>
              <EditVacationModal vacationId={id} />
            </div>
          </div>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <strong>Dates:</strong> {moment(startDate).format("MM/DD/YYYY")}-
            {moment(endDate).format("MM/DD/YYYY")}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Price:</strong> {price}$
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};
