import React, { FC, useCallback, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateVacation } from "../../api-client/api-client-vacations";
import { VacationModel } from "../../models/Vacation.model";
import { StateContext } from "../../state-context";

export const EditVacationForm: FC<{
  handleClose: any;
  vacationId: number;
}> = ({ handleClose, vacationId }) => {
  const { appState, setAppState } = useContext(StateContext);

  const CurrentVacations = JSON.parse(
    localStorage.getItem("vacations") as string
  ) as VacationModel[];
  const currentVacation = CurrentVacations.find(
    (vacation) => vacation.id === vacationId
  );
  const { destination, description, image, price } =
    currentVacation as VacationModel;

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const updatedVacation: VacationModel = {
        id: vacationId,
        destination: e.target.destination.value,
        description: e.target.description.value,
        image: e.target.image.value,
        startDate: e.target.startDate.value,
        endDate: e.target.endDate.value,
        price: e.target.price.value,
        followersAmount: 0,
      };

      const jwt = JSON.parse(localStorage.getItem("jwt") as string);

      await updateVacation(updatedVacation, jwt);

      const vacations = JSON.parse(
        localStorage.getItem("vacations") as string
      ) as VacationModel[];

      const vacationIndex = vacations.findIndex(
        (vacation) => vacation.id === vacationId
      );

      vacations.splice(vacationIndex, 1, updatedVacation);

      localStorage.setItem("vacations", JSON.stringify(vacations));

      setAppState({ ...appState, vacations });

      handleClose();
    },
    [vacationId, handleClose, appState, setAppState]
  );

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="destination">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              placeholder="destination..."
              name="destination"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="description..."
              name="description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url..."
              name="image"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="From Date..."
              name="startDate"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="endDate">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="To Date..."
              name="endDate"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price..."
              name="price"
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </div>
  );
};
