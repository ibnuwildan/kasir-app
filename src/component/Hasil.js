import { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";

export default class hasil extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt={2}>
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item>
                <Row>
                  <Col xs={2}>
                    <Badge pill variant="success">
                      <h5>{menuKeranjang.jumlah}</h5>
                    </Badge>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>Rp. {menuKeranjang.product.harga}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">{menuKeranjang.total_harga}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
