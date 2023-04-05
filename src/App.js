// import logo from "./logo.svg";
import "./App.css";
import { Hasil, ListCategory, Navbar, Menus } from "./component";
import { Row, Col, Container } from "react-bootstrap";
import React, { Component } from "react";
import { API_URL } from "./utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      choiseCategories: "Minuman ",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.choiseCategories)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  changeCategories = (value) => {
    this.setState({
      choiseCategories: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCart = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const cart = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", cart)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "succsess",
                text: "successfully added to the shopping cart" + cart.product.nama,
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, cart)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "succsess",
                text: "successfully added to the shopping cart" + cart.product.nama,
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const cart = {
      jumlah: 1,
      total_harga: value.harga,
      product: value,
    };
  };
  render() {
    const { menus, choiseCategories, keranjangs } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategory changeCategories={this.changeCategories} choiseCategories={choiseCategories} />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>{menus && menus.map((menu) => <Menus key={menu.id} menu={menu} getCart={this.getCart} />)}</Row>
              </Col>
              <Hasil keranjangs={keranjangs} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
