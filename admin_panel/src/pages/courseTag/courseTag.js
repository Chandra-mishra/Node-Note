import React from "react";
import Container from "react-bootstrap/Container";
import Tags from "../../services/tagService";
import Course from "../../services/courseService";
import CourseTag from "../../services/coursetagService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";
export default class Coursetag extends React.Component {
  constructor(props) {
    super(props);
    this.coursetag_id = props.match.params.id;
    this.state = {
        coursetag: null,
      redirect: false,
      courseVal: [],
      tagVal: []
    };
    this.state.coursetag = {
      course_id: "",
      tag_id: ""
    };

    this.courseServ = new Course();
    this.tagServ = new Tags();
    this.coursetagServ = new CourseTag();

    if (this.coursetag_id) {
        this.coursetagServ.getService(this.coursetag_id)
        .then(
          response => {
            this.setState({coursetag: response });
          },
          error => {
            alert(
              "Opps! Something went wrong not able to fetch coursetag  details."
            );
          }
        );
    }
    this.schema = Yup.object({
      course_id: Yup.number().required(),
      tag_id: Yup.number().required()
      // sendDate: Yup.string().required(),

      // allotmentTime: Yup.string().required()
    });
  }

  // inputHandler(e){
  //     this.state.address[e.target.id] = e.target.value;
  //     this.setState({address: this.state.address});
  // }

  submitCourseTagForm(values, actions) {
    actions.setSubmitting(false);

    let invaltd = values;
    this.setState({
        coursetag: invaltd
    });
    if (this.coursetag_id) {
      this.coursetagServ
        .editService(this.state.coursetag)
        .then(
          response => {
            this.setState({ redirect: true });
          },
          error => {
            this.setState({ redirect: false });
          }
        );
    } else {
        this.coursetagServ
        . addService(this.state.coursetag)
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
    this.courseoption();
    this.tagoption();
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
  tagoption() {
    this.tagServ.listService(0, 10000000).then(
      response => {
        if (!response) {
          return (response = []);
        }
        this.setState({ tagVal: response.rows });
      },
      error => {
        alert("Opps! Something went wrong not able to fetch tag data.");
      }
    );
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/coursetaglist' />;
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

    let tagOption = [];
    for (let i = 0; i < this.state.tagVal.length; i++) {
        tagOption.push(
          <option
            key={this.state.tagVal[i].id}
            value={this.state.tagVal[i].id}>
            {this.state.tagVal[i].name}
          </option>
        );
    }
    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state.coursetag}
        enableReinitialize={true}
        onSubmit={this.submitCourseTagForm.bind(this)}
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
                    <h3 className='title'>Course Tag Details</h3>
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
                      <Form.Label>Tag Name*</Form.Label>
                      <Form.Control
                        as='select'
                        name='tag_id'
                        value={values.tag_id}
                        onChange={handleChange}
                        isValid={
                          touched.tag_id && !errors.tag_id
                        }>
                        <option></option>
                        {tagOption}
                      </Form.Control>
                      <ErrorMessage name='tag_id'>
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