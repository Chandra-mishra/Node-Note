import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ReactHtmlParser from 'react-html-parser';

import moment from "moment";
import userservice from "../../services/userService";

export default class StudentCourses extends React.Component {
  // {courseList:this.stud,totalCount:0,start:0,perPage:15};
  constructor(props) {
    super(props);
    this.stud = JSON.parse(localStorage.getItem("student"));
    this.state = { refresh: false, len: "", courseList: [], start: 0 };
    this.search = { searchTxt: "", searchField: "" };
    this.userserv = new userservice();
  }

  componentDidMount() {
    this.getCourseList();
  }
  handleDelete(id, e) {
    console.log(this.state.courseList.courses);
    let filteredCourseId = [...this.state.courseList.courses].filter(del_id => {
      return del_id._id !== id;
    });
    console.log(filteredCourseId);
    this.state.courseList.courses = filteredCourseId;
    console.log(this.state.courseList.courses);
    let obj = { ...this.state.courseList, filteredCourseId };
    this.userserv.editUser(obj).then(res => {
      this.setState({ len: res.data });
      this.getCourseList();
    });
  }

  getCourseList() {
    this.setState({ refresh: false });
    this.userserv.getUser(this.stud, 1).then(
      response => {
        if (!response) {
          return (response = []);
        }
        this.setState({
          refresh: true,
          len: response.data.courses.length,
          courseList: response.data
        });
      },
      error => {
        alert("Opps! Something went wrong not able to Course  details.");
      }
    );
  }
  render() {
    let data = [];
    for (let i = 0; i < this.state.len; i++) {
      data.push(
        <tr>
          <td>{this.state.start + i + 1}</td>
          <td>
            <Link
              to={{
                pathname:
                  "/student/course/edit/" +
                  this.state.courseList.courses[i].course._id
              }}
            >
              {this.state.courseList.courses[i].course["name"]}
            </Link>
          </td>
          <td>{this.state.courseList.courses[i]["is_active"].toString()}</td>
          <td>
            {moment(this.state.courseList.courses[i]["end_time"]).format(
              "MMMM Do YYYY"
            )}
          </td>
          <td>
            <Button
              variant="primary"
              style={{ backgroundColor: "firebrick" }}
              onClick={this.handleDelete.bind(
                this,
                this.state.courseList.courses[i]._id
              )}
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
          <Col>
            <div>
              <i
                onClick={() => {
                  window.history.back();
                }}
                className="fa fa-arrow-circle-left fa-3x"
                aria-hidden="true"
              ></i>
            </div>
          </Col>
          <Col md={{ offset: 10 }}>
            <div>
              <i
                onClick={() => {
                  window.history.forward();
                }}
                className="fa fa-arrow-circle-right fa-3x"
                aria-hidden="true"
              ></i>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <h4>{this.stud.first_name} Course Detail's</h4>
          </Col>
          <Col sm={4}></Col>
          <Col sm={2}>
            <Link
              to={{ pathname: "/student/course/add" }}
              className="btn btn-primary"
            >
              Add Course
            </Link>
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <br></br>
          </Col>

          <Col sm={3} className="text-right"></Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>course</th>
                  {/* <th>description</th> */}
                  <th>is Active</th>
                  <th>Expired On</th>
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
