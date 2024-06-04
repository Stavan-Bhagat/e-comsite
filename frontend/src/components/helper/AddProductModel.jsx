import React from "react";
import { Modal, Typography, Button, Container, Form, Col } from "react-bootstrap";

const AddProductModal = ({ open, handleClose, onSubmit, resetForm, register, errors }) => {
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
          Add Product
        </Typography>
      </Modal.Header>
      <Container className="p-4">
        <Form onSubmit={onSubmit} className="row g-3">
          <Form.Label column sm={2}>
            Product Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              {...register("productName", { required: true })}
            />
            {errors.productName && (
              <Form.Text className="text-danger">
                Product name is required.
              </Form.Text>
            )}
          </Col>

          <Form.Label column sm={2}>
            Brand Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter brand name"
              {...register("brandName", { required: true })}
            />
            {errors.brandName && (
              <Form.Text className="text-danger">
                Brand name is required.
              </Form.Text>
            )}
          </Col>

          <Form.Label column sm={2}>
            Category
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter category"
              {...register("category", { required: true })}
            />
            {errors.category && (
              <Form.Text className="text-danger">
                Category is required.
              </Form.Text>
            )}
          </Col>

          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <Form.Text className="text-danger">
                Description is required.
              </Form.Text>
            )}
          </Col>

          <Form.Label column sm={2}>
            Price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Enter price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <Form.Text className="text-danger">
                Price is required.
              </Form.Text>
            )}
          </Col>

          <Form.Label column sm={2}>
            Stock
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Enter stock"
              {...register("stock", { required: true })}
            />
            {errors.stock && (
              <Form.Text className="text-danger">
                Stock is required.
              </Form.Text>
            )}
          </Col>

          <Form.Label column sm={2}>
            Selling Price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Enter selling price"
              {...register("sellingPrice")}
            />
          </Col>

          <Form.Label column sm={2}>
            Upload Images
          </Form.Label>
          <Col sm={10}>
            {/* Add file upload input */}
          </Col>

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

export default AddProductModal;
