import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import Tag from "../../services/tagService";
import SearchBar from "../../components/searchbar";
import Button from "react-bootstrap/Button";

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tagList: [], totalCount: 0 };
    this.search = { start: 0, perPage: 10, searchTxt: "", searchField: "" };
    this.tagServ = new Tag();
  }

  componentDidMount() {
    this.getTagList();
  }

  searchTagList(searchFilters) {
    this.search.searchTxt = searchFilters.term;
    this.search.searchField = searchFilters.fieldname;
    this.search.start = 0;
    this.getTagList();
  }

  getTagList() {
    let tag = {};
    console.log(this.search.searchField, "this.search.searchField");
    switch (this.search.searchField) {
      case "Name":
        this.search.searchField = "name";
        break;
    }

    tag[this.search.searchField] = this.search.searchTxt;
    this.tagServ.listService(tag, this.search.start, this.search.perPage).then(
      response => {
        this.setState({ tagList: response.rows, totalCount: response.count });
      },
      error => {
        this.setState({ tagList: [], totalcount: 0 });
      }
    );
  }

  handlePaging(e) {
    if (e.target.text) {
      this.search.start =
        parseInt(e.target.text) * this.search.perPage - this.search.perPage;
      this.getTagList();
    }
  }
  handleDelete(id, e) {
    if (window.confirm("Are you sure you want to delete this record?")) {
      this.tagServ.deleteService(id).then(response => {
        this.getTagList();
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
    for (let i = 0; i < this.state.tagList.length; i++) {
      data.push(
        <tr key={this.state.tagList[i].id}>
          <td>{this.search.start + i + 1}</td>
          <td>
            <Link to={{ pathname: "/tag/edit/" + this.state.tagList[i].id }}>
              {this.state.tagList[i]["name"]}
            </Link>
          </td>
          <Button
            size="sm"
            variant="danger"
            onClick={this.handleDelete.bind(this, this.state.tagList[i].id)}
          >
            Delete
          </Button>
        </tr>
      );
    }
    return (
      <div className="address addresslist">
        <Row>
          <Col sm={6}>
            <h3>Tag List</h3>
          </Col>
          <Col sm={5}>
            <SearchBar
              categories={["Name"]}
              parentFunction={this.searchTagList.bind(this)}
            />
          </Col>
          <Col sm={1}>
            <div></div>
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <Pagination size="md">{items}</Pagination>
          </Col>
          <Col sm={3} className="text-right">
            <Link to={{ pathname: "/tag/add" }} className="btn btn-primary">
              Add Tag
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}
