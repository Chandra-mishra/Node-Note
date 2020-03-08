import React from "react";
import Container from "react-bootstrap/Container";
import User from "../../services/userService";
import Course from "../../services/courseService";
import UserCourse from "../../services/userCourseService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";
export default class Usercourse extends React.Component {
  constructor(props) {
    super(props);
    this.usercourse_id = props.match.params.id;
    this.state = {
        usercourse: null,
      redirect: false,
      userVal: [],
      courseVal: []
    };
    this.state.usercourse = {
      course_id: "",
      user_id: ""
    };

    this.courseServ = new Course();
    this.userServ = new User();
    this.usercourseServ = new UserCourse();

    if (this.usercourse_id) {
        this.usercourseServ.getService(this.usercourse_id)
        .then(
          response => {
            this.setState({usercourse: response });
          },
          error => {
            alert(
              "Opps! Something went wrong not able to fetch usercourse  details."
            );
          }
        );
    }
    this.schema = Yup.object({
      course_id: Yup.number().required(),
      user_id: Yup.number().required()
      // sendDate: Yup.string().required(),

      // allotmentTime: Yup.string().required()
    });
  }

  // inputHandler(e){
  //     this.state.address[e.target.id] = e.target.value;
  //     this.setState({address: this.state.address});
  // }

  submitUserCourseForm(values, actions) {
    actions.setSubmitting(false);

    let invaltd = values;
    this.setState({
        usercourse: invaltd
    });
    if (this.usercourse_id) {
      this.usercourseServ
        .editService(this.state.usercourse)
        .then(
          response => {
            this.setState({ redirect: true });
          },
          error => {
            this.setState({ redirect: false });
          }
        );
    } else {
        this.usercourseServ
        . addService(this.state.usercourse)
        .then(
          response => {
            this.setState({ redirect: true });
          },
          error => {
            this.setState({ redirect: false });
          }
        );
    }
  }
  componentDidMount() {
    this.useroption();
    this.courseoption();
  }

  courseoption() {
    this.courseServ.listCourse(0, 10000000).then(
      response => {
        if (!response) {
          return (response = []);
        }
        this.setState({ courseVal: response.rows });
      },
      error => {
        alert("Opps! Something went wrong not able to fetch course data.");
      }
    );
  }
  useroption() {
      console.log("user")
    this.userServ.listUser(0, 10000000).then(
      response => {
        if (!response) {
          return (response = []);
        }
        this.setState({ userVal: response.rows });
      },
      error => {
        alert("Opps! Something went wrong not able to fetch user data.");
      }
    );
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/usercourselist' />;
    }
    let courseOption = [];
    for (let i = 0; i < this.state.courseVal.length; i++) {
        courseOption.push(
          <option
            key={this.state.courseVal[i].id}
            value={this.state.courseVal[i].id}>
            {this.state.courseVal[i].title}
          </option>
        );
    }

    let userOption = [];
    for (let i = 0; i < this.state.userVal.length; i++) {
        userOption.push(
          <option
            key={this.state.userVal[i].id}
            value={this.state.userVal[i].id}>
            {this.state.userVal[i].first_name}
          </option>
        );
    }
    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state.usercourse}
        enableReinitialize={true}
        onSubmit={this.submitUserCourseForm.bind(this)}
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
          <div className='address addresslist'>
            <Container>
              <Form onSubmit={handleSubmit}>
              <br />
                <Row>
                  <Col sm={12}>
                    <h3 className='title'>User Course Details</h3>
                    <i
                      className='fa fa-chevron-left'
                      onClick={() => {
                        window.history.back();
                      }}
                      aria-hidden='true'></i>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Course Name*</Form.Label>
                      <Form.Control
                        as='select'
                        name='course_id'
                        value={values.course_id}
                        onChange={handleChange}
                        isValid={touched.course_id && !errors.course_id}>
                        <option></option>
                        {courseOption}
                      </Form.Control>
                      <ErrorMessage name='course_id'>
                        {msg => <div className='err_below'>{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>User Name*</Form.Label>
                      <Form.Control
                        as='select'
                        name='tag_id'
                        value={values.user_id}
                        onChange={handleChange}
                        isValid={
                          touched.user_id && !errors.user_id
                        }>
                        <option></option>
                        {userOption}
                      </Form.Control>
                      <ErrorMessage name='user_id'>
                        {msg => <div className='err_below'>{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={4}></Col>
                  <Col sm={12} md={4}>
                    <button
                      className='btn btn-lg btn-primary btn-block setbgcolor'
                      type='submit'>
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