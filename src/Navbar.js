import React, { useState } from 'react';
import { Form, Button, Navbar, Nav, Container, Col, Row, Modal, ModalHeader, ModalTitle } from 'react-bootstrap';
import './Navbar.css';

function CollapsibleExample({ loadData, handleUpdateBaseDomain }) {
  const [domain, setDomain] = useState("https://demo-apis.json-server.dev");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const path = "/loan-clos"; // Fixed path
    const newApi = domain + path;
    handleUpdateBaseDomain(newApi);
    handleClose(); // Close the modal after updating the baseDomain
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"><h3>CLO Trading</h3></Nav>
        <Nav>
          <Button type="button" variant="light" onClick={loadData}>
            <i className="bi bi-arrow-clockwise fs-3"></i>
          </Button>
          <Button type="button" variant="light" onClick={handleShow}>
            <i className="bi bi-gear fs-3"></i>
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>API Base Domain</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextDomain">
                  <Form.Label column sm="3">
                    Domain
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" value={domain} onChange={(e) => setDomain(e.target.value)} />
                  </Col>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default CollapsibleExample;
