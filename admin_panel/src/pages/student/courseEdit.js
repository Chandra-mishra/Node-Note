import React from "react";
import Container from "react-bootstrap/Container";
import StudentCourseService from "../../services/userService";
import Course from "../../services/courseService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
export default class StudentEdit extends React.Component {
  constructor(props) {
    super(props);
    this.studentCourse_id = props.match.params.id;
    this.user_id = JSON.parse(localStorage.getItem("student"));
    this.state = {
      studentCourse: null,
      redirect: false,
      student: null,
      courseName: ""
    };
    this.state.studentCourse = {
      course: "",
      is_active: false,
      is_course_completed: false,
      end_time: "",

    };

    this.studentcourseserv = new StudentCourseService();
    this.courseserv = new Course();

    if (this.studentCourse_id) {
      this.studentcourseserv.getUser(this.user_id).then(
        response => {
          let courseid = "";
          let is_active = false;
          let is_course_completed = false;
          let end_time = "";
          let course = response.data;
          for (let i = 0; i < course.courses.length; i++) {
            if (this.studentCourse_id === course.courses[i].course) {
              courseid = course.courses[i].course;
              is_active = course.courses[i].is_active;
              is_course_completed = course.courses[i].is_course_completed;
              end_time = course.courses[i].end_time;
            }
          }
          let studentcourse = {
            course: courseid,
            is_active: is_active,
            is_course_completed:is_course_completed,
            end_time: end_time
          };
          this.setState({ studentCourse: studentcourse });
          this.setState({ student: response.data });
        },
        error => {
          alert("Opps! Something went wrong not able to fetch details.");
        }
      );
    }

    if (this.studentCourse_id) {
      this.courseserv.getCourse(this.studentCourse_id).then(
        response => {
          this.setState({ courseName: response.data.name });
        },
        error => {
          alert("Opps! Something went wrong not able to fetch course details.");
        }
      );
    }

    this.schema = Yup.object({
      course: Yup.string()
        .required()
        .max(100, "Too Long"),
      is_active: Yup.boolean(),
      is_course_completed:Yup.boolean()
    });
  }

  submitStudentCourseForm(values, actions) {
    actions.setSubmitting(false);
    let tx = values;
    if (tx) {
      for (let i = 0; i < this.state.student.courses.length; i++) {
        if (this.state.student.courses[i].course == tx.course) {
          this.state.student.courses[i].is_active = tx.is_active;
          this.state.student.courses[i].is_course_completed = tx.is_course_completed;
          this.state.student.courses[i].end_time = tx.end_time;
        }
      }
    }
    // if (!values.is_active) {
    //   tx.is_active = false;
    // }

    this.setState({
      studentCourse: tx
    });

    if (this.studentCourse_id) {
      this.studentcourseserv.editUser(this.state.student).then(
        response => {
          this.setState({ redirect: true });
        },
        error => {
          this.setState({ redirect: false });
        }
      );
    }
    // else{
    //     this.couponserv.addCoupon(this.state.coupon).then(
    //         (response)=>{
    //             this.setState({ redirect:true });
    //         },
    //         (error) => {
    //             this.setState({ redirect:false });
    //         });
    // }
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/student/course/list" />;
    }
    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state.studentCourse}
        enableReinitialize={true}
        onSubmit={this.submitStudentCourseForm.bind(this)}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          isValidating
        }) => (
          <div className="address addresslist">
            <Container>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={12}>
                    <h3>Edit Student Course</h3>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Course Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.courseName}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.name && !errors.name}
                        disabled={true}
                      />
                      <ErrorMessage name="name">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Extend Coure Period</Form.Label>
                      <Form.Control
                        type="date"
                        value={this.state.end_time}
                        name="end_time"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.end_time && !errors.end_time}
                      />
                      <ErrorMessage name="name">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={12}>
                    <div>
                      <strong>Is Active</strong>
                    </div>
                    <Form.Group controlId="form21">
                      <Form.Check
                        type="checkbox"
                        label="Is Active"
                        checked={values.is_active}
                        value={values.is_active}
                        onChange={handleChange}
                        name="is_active"
                        onBlur={handleBlur}
                        isValid={touched.is_active && !errors.is_active}
                      />
                      <ErrorMessage name="is_active">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                <Col sm={12} md={12}>
                    <div>
                      <strong>Is Course Completed</strong>
                    </div>
                    <Form.Group controlId="form21">
                      <Form.Check
                        type="checkbox"
                        label="Is Course Completed"
                        checked={values.is_course_completed}
                        value={values.is_course_completed}
                        onChange={handleChange}
                        name="is_course_completed"
                        onBlur={handleBlur}
                        isValid={touched.is_course_completed && !errors.is_course_completed}
                      />
                      <ErrorMessage name="is_course_completed">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={4}></Col>
                  <Col sm={12} md={4}>
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
