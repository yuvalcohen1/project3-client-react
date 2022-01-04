import React, { FC, useCallback, useContext, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { addNewVacation } from "../../api-client/api-client-vacations";
import { VacationModel } from "../../models/Vacation.model";
import { StateContext } from "../../state-context";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";

export const AddVacationForm: FC<{ handleClose: any }> = ({ handleClose }) => {
  const { appState, setAppState } = useContext(StateContext);

  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const newVacation: Partial<VacationModel> = {
        destination: e.target.destination.value,
        description: e.target.description.value,
        image: e.target.image.value,
        startDate: e.target.startDate.value,
        endDate: e.target.endDate.value,
        price: e.target.price.value,
      };

      const jwt = JSON.parse(localStorage.getItem("jwt") as string);

      try {
        const res = await addNewVacation(newVacation, jwt);
        const fullNewVacation = res.data.fullNewVacation;

        const vacations = JSON.parse(
          localStorage.getItem("vacations") as string
        ) as VacationModel[];

        vacations.push(fullNewVacation);

        localStorage.setItem("vacations", JSON.stringify(vacations));

        setAppState({ ...appState, vacations });

        handleClose();
      } catch (err) {
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false));
      }
    },
    [appState, setAppState, handleClose]
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
            Add Vacation
          </Button>
        </Modal.Footer>
      </Form>

      {errorAlert ? <ErrorAlert /> : null}
    </div>
  );
};
