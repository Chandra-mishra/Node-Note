import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, ErrorMessage } from "formik";
import { Container, Nav, Navbar } from "react-bootstrap";
// import Table from "react-bootstrap/Table";
import { Col, Row, Table, Spinner } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import Userservices from "../../services/userService";
import SearchBar from "../../components/searchbar";
// import Button from "react-bootstrap/Button";
export default class userList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      totalCount: 0,
      loading: false
    };
    this.search = {
      start: 0,
      perPage: 10,
      searchTxt: "",
      searchField: ""
    };
    this.userServ = new Userservices();
  }

  componentDidMount() {
    this.getUserList();
  }

  searchUserList(searchFilters) {
    this.search.searchTxt = searchFilters.term;
    this.search.searchField = searchFilters.fieldname;
    this.search.start = 0;
    if (this.search.searchField) this.getUserList();
  }

  getUserList() {
    let user = {};
    switch (this.search.searchField) {
      case "First Name":
        this.search.searchField = "first_name";
        break;
      case "Email":
        this.search.searchField = "email";
        break;
    }
    user[this.search.searchField] = this.search.searchTxt;
    this.setState({ loading: true });
    this.userServ.listUser(user, this.search.start, this.search.perPage).then(
      response => {
        if (!response) {
          return (response = []);
        }
        this.setState({
          userList: response.rows,
          totalCount: response.count,
          loading: false
        });
      },
      error => {
        this.setState({ userList: [], totalcount: 0 });
      }
    );
  }

  handlePaging(e) {
    if (e.target.text) {
      this.search.start =
        parseInt(e.target.text) * this.search.perPage - this.search.perPage;
      this.getUserList();
    }
  }

  handleDelete(id, e) {
    if (window.confirm("Are you sure you want to delete this record?")) {
      this.userServ.deleteUser(id).then(response => {
        this.getUserList();
      });
    }
  }

  render() {
    let active = Math.ceil((this.search.start + 1) / this.search.perPage);
    let pages = Math.ceil(this.state.totalCount / this.search.perPage);
    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          onClick={this.handlePaging.bind(this)}
          active={number === active}
        >
          {number}
        </Pagination.Item>
      );
    }
    let data = [];
    for (let i = 0; i < this.state.userList.length; i++) {
      data.push(
        <tr key={this.state.userList[i].id}>
          <td>{this.search.start + i + 1}</td>
          <td>
            {" "}
            <Link to={{ pathname: "/user/edit/" + this.state.userList[i].id }}>
              {this.state.userList[i]["first_name"]}
            </Link>
          </td>
          <td>{this.state.userList[i]["email"]}</td>
          <td>
          <Button
          style={{ cursor: "pointer" }}
                  size="sm"
                  variant="danger"
                  onClick={this.handleDelete.bind(
                    this,
                    this.state.userList[i].id
                  )}
                >
                  Delete
                </Button>
            {/* <div
              style={{ cursor: "pointer" }}
              onClick={this.handleDelete.bind(this, this.state.userList[i].id)}
            >
              <i className="fas fa-trash fa-2x" color="red" />
            </div> */}
          </td>
        </tr>
      );
    }
    return (
      <div className="address addresslist">
        <Row>
          <Col sm={6}>
            <h3>User List</h3>
          </Col>
          <Col sm={5}>
            <SearchBar
              categories={["First Name", "Email"]}
              parentFunction={this.searchUserList.bind(this)}
            />
          </Col>
          <Col sm={1}>
            <div></div>
          </Col>
        </Row>
        {this.state.loading ? (
          <div style={{ textAlign: "center" }}>
            {" "}
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : (
          <React.Fragment>
            <Row>
              <Col sm={9}>
                <Pagination size="md">{items}</Pagination>
              </Col>
              <Col sm={3} className="text-right">
                <Link
                  to={{ pathname: "/user/add" }}
                  className="btn btn-primary"
                >
                  Add User
                </Link>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{data}</tbody>
                </Table>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </div>
    );
  }
}