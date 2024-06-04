// UpdateProductModal.js
import React from "react";
import { Modal, Typography, Button, Container, Form, Col } from "react-bootstrap";

const UpdateProductModal = ({ open, handleClose, onSubmit, resetForm, currentProduct }) => {
  return (
    <Modal
      show={open}
      onHide={handleClose}
      size="lg"
      centered
      style={{ zIndex: "9999" }}
    >
      <Modal.Header closeButton>
        <Typography variant="h5" color="#0d47a1">
          Update Product
        </Typography>
      </Modal.Header>
      <Container className="p-4">
        <Form onSubmit={onSubmit} className="row g-3">
          {/* Form inputs */}
          <Modal.Footer>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              className="mx-2"
            >
              Close
            </Button>
            <Button variant="contained" color="success" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
};

export default UpdateProductModal;
