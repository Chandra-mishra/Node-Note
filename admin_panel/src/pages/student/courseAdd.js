import React from "react";
import Container from "react-bootstrap/Container";
import courseService from "../../services/courseService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import userservice from "../../services/userService";
import moment from "moment";

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.stud = JSON.parse(localStorage.getItem("student"));

    this.state = { course: null, redirect: false, content: "" };
    this.state.course = {
      courses: []
    };

    this.courseserv = new courseService();
    this.userserv = new userservice();

    this.schema = Yup.object({
      courses: Yup.string().required()
    });
  }

  componentDidMount() {
    this.getCourseList();
    this.getStudent();
  }

  getCourseList() {
    this.courseserv.listCourse().then(
      response => {
        let listCourse = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].is_active === true) {
            listCourse.push(response.data[i]);
          }
        }
        this.setState({ course: listCourse });
      },
      error => {
        alert("Opps! Something went wrong not able to fetch course  details.");
      }
    );
  }
  getStudent() {
    this.userserv.getUser(this.stud).then(
      response => {
        this.stud = response.data;
      },
      error => {
        alert("Opps! Something went wrong not able to fetch course  details.");
      }
    );
  }
  submitcourseForm(values, actions) {
    actions.setSubmitting(false);
    this.setState({ courses: values.courses }); // setting the course id eg 1212133616 to the course

    let courses = this.stud.courses.map(el => el); //creating the new array from the student course list

    let finalcrsId = this.state.course.filter(el => {
      //  filtering course dtail id from selected course dropdown
      return el._id == this.state.courses;
    });
    console.log(finalcrsId, "final course id");
    let obj = finalcrsId.reduce((acc, item) => {
      return item;
    }, {});
    let day = moment()
      .add(obj.period, "days")
      .valueOf();

    courses = [
      ...courses,
      { course: this.state.courses, is_active: "true", end_time: day }
    ]; //appending the new array to the added course id
    this.stud.courses = courses;
    this.userserv.editUser(this.stud).then(
      response => {
        this.setState({ redirect: true });
      },
      error => {
        this.setState({ redirect: false });
      }
    );
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/student/course/list" />;
    }
    let data = [];
    for (let i = 0; i < this.state.course.length; i++) {
      data.push(
        <option key={this.state.course[i]._id} value={this.state.course[i]._id}>
          {this.state.course[i].name}
        </option>
      );
    }

    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state.course}
        enableReinitialize={true}
        onSubmit={this.submitcourseForm.bind(this)}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => (
          <div className="address addresslist">
            <Container>
              <Form onSubmit={handleSubmit}>
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
                </Row>
                <Row>
                  <Col sm={3}>
                    <h3>Course Add</h3>
                  </Col>
                </Row>
                <Row>
                  <Col sm={5}>
                    <Form.Group>
                      <Form.Label>All Course</Form.Label>
                      <Form.Control
                        as="select"
                        name="courses"
                        value={values.courses}
                        onChange={handleChange}
                        isValid={touched.courses && !errors.courses}
                      >
                        <option></option>
                        {data}
                      </Form.Control>
                      <ErrorMessage name="courses">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={2} style={{ marginTop: "20px" }}>
                    <button
                      className="btn btn-lg btn-primary btn-block setbgcolor"
                      type="submit"
                    >
                      Save
                    </button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
        )}
      />
    );
  }
}
