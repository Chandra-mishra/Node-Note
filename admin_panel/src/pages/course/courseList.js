import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactHtmlParser from "react-html-parser";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import CourseService from "../../services/courseService";
import SearchBar from "../../components/searchbar";
import Button from "react-bootstrap/Button";

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { courseList: [], totalCount: 0 };
    this.search = { start: 0, perPage: 10 };
    this.courseServ = new CourseService();
  }

  componentDidMount() {
    this.getCourseList();
  }

  searchCourseList(searchFilters) {
    this.search.searchTxt = searchFilters.term;
    this.search.searchField = searchFilters.fieldname;
    this.search.start = 0;
    this.getCourseList();
  }

  getCourseList() {
    let course = {};
    switch (this.search.searchField) {
      case "Title":
        this.search.searchField = "title";
        break;
    }
    course[this.search.searchField] = this.search.searchTxt;

    this.courseServ.listCourse(course, this.search.start, this.search.perPage).then(
      response => {
        this.setState({ courseList: response.rows, totalCount: response.count });
      },
      error => {
        this.setState({ courseList: [], totalcount: 0 });
      }
    );
  }

  handlePaging(e) {
    if (e.target.text) {
      this.search.start =
        parseInt(e.target.text) * this.search.perPage - this.search.perPage;
      this.getCourseList();
    }
  }

  handleDelete(id, e) {
    if (window.confirm("Are you sure you want to delete this record?")) {
      this.courseServ.deleteCourse(id).then(response => {
        this.getCourseList();
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
    for (let i = 0; i < this.state.courseList.length; i++) {
      data.push(
        <tr key={this.state.courseList[i].id}>
          <td>{this.search.start + i + 1}</td>
          <td>
            <Link to={{ pathname: "/course/edit/" + this.state.courseList[i].id }}>
              {this.state.courseList[i]["title"]}
            </Link>
          </td>
          <td>
            <img
              src={this.state.courseList[i].image}
              width={"100px"}
              height={"auto"}
            />
          </td>
          <td>
            <Button
              size="sm"
              variant="danger"
              onClick={this.handleDelete.bind(this, this.state.courseList[i].id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    }

    return (
      <div className="address addresslist">
        <Row>
          <Col sm={6}>
            <h3>Course List</h3>
          </Col>
          <Col sm={5}>
            <SearchBar
              categories={["Title"]}
              parentFunction={this.searchCourseList.bind(this)}
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
            <Link to={{ pathname: "/course/add" }} className="btn btn-primary">
              Add new course
            </Link>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Image</th>
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
