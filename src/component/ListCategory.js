import React, { Component } from "react";
import { Col } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import ListGroup from "react-bootstrap/ListGroup";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUtensils, faCoffe, faCheese } from "fortawesome/free-solid-svg-icons";
import { FaUtensils, FaCoffee, FaCheese } from "react-icons/fa";

const Icon = ({ nama }) => {
  if (nama === "Makanan") return <FaUtensils className="mr-5" />;
  if (nama === "Minuman") return <FaCoffee className="mr-5" />;
  if (nama === "Cemilan") return <FaCheese className="mr-5" />;

  return <FaUtensils className="mr-5" />;
};

export default class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { choiseCategories, changeCategories } = this.props;
    return (
      <Col md={2} mt={2}>
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((categorie) => (
              <ListGroup.Item key={categorie.id} onClick={() => changeCategories(categorie.nama)} className={choiseCategories === categorie.nama && "categori-active"} style={{ cursor: "pointer" }}>
                <h5>
                  <Icon nama={categorie.nama} /> {categorie.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
