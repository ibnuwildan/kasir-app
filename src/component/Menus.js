import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

const menus = ({ menu, getCart }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => getCart(menu)}>
        <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
        <Card.Body>
          <Card.Title>
            <strong>{menu.nama}</strong> ({menu.kode})
          </Card.Title>
          <Card.Text>Rp {menu.harga}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default menus;
