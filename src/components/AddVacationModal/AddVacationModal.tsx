import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AddVacationForm } from "../AddVacationForm/AddVacationForm";

export const AddVacationModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <Button>Add Vacation</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Vacation</Modal.Title>
        </Modal.Header>
        <AddVacationForm handleClose={handleClose} />
      </Modal>
    </>
  );
};
