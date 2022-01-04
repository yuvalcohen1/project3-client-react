import React, { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { EditVacationForm } from "../EditVacationForm/EditVacationForm";

export const EditVacationModal: FC<{ vacationId: number }> = ({
  vacationId,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <i className="fas fa-edit fa-lg edit-icon" title="update vacation"></i>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vacation</Modal.Title>
        </Modal.Header>
        <EditVacationForm vacationId={vacationId} handleClose={handleClose} />
      </Modal>
    </>
  );
};
