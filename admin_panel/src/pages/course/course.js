import React from "react";
import Container from "react-bootstrap/Container";
import CourseService from "../../services/courseService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");
export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.new_item = null;
    this.course_id = props.match.params.id;
    this.image = "";
    this.state = {
            course : {
            title: "",
            description: "",
            is_private: ""
          }
        };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.courseServ = new CourseService();

    if (this.course_id) {
        this.courseServ.getCourse(this.course_id).then(
        response => {
          let course = response;
          this.setState({ course: course });
        },
        error => {
          alert("Opps! Something went wrong not able to fetch Course  details.");
        }
      );
    }
    this.schema = Yup.object({
      title: Yup.string().required(),
      is_private: Yup.boolean().required()
      // description: Yup.string().required()
    });
  }
  handleEditorChange(content) {
    let course = this.state.course;
    course.description = content;
    this.setState({ course: course });
  }

  async submitCourseForm(values, actions) {
    actions.setSubmitting(false);
    values.description = this.state.course.description;
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + token
      }
    };

    if (this.course_id) {
      try {
        const response = await axios.put(
          window.apiurl + "/course",
          formData,
          config
        );
        setTimeout(() => {
          this.setState({ redirect: true });
        }, 2000);
        this.setState({ errorMsg: "" });
        toast.success(response.data);
      } catch (err) {
        this.setState({ errorMsg: err.response.data, redirect: false });
      }
    } else {
      axios
        .post(window.apiurl + "/course", formData, config)
        .then(res => {
          setTimeout(() => {
            this.setState({ redirect: true });
          }, 2000);

          toast.success(res.data);
        })
        .catch(err => {
          toast.error(err);
          this.setState({ errorMsg: err.response.data, redirect: false });
        });
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/courselist" />;
    }
    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state.course}
        enableReinitialize={true}
        onSubmit={this.submitCourseForm.bind(this)}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <div className="address addresslist">
            <Container>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={12}>
                    <h3>Course Details</h3>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Title*</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.title}
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.title && !errors.title}
                      />
                      <ErrorMessage name="title">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <p>Image Upload</p>
                      <input
                        type="file"
                        name="image"
                        onChange={event => {
                          setFieldValue(
                            "image",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      <img
                        src={this.state.course.image}
                        width={"100px"}
                        height={"auto"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Description*</Form.Label>
                      <Editor
                        apiKey={window.tinyAPIKEY}
                        init={{
                          width: 1100,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount"
                          ],
                          toolbar:
                            "undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help"
                        }}
                        value={this.state.course.description}
                        onEditorChange={this.handleEditorChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                <Col sm={12} md={12}>
                    <div>
                      <strong>Is Private</strong>
                    </div>
                    <Form.Group controlId='form22'>
                      <Form.Check
                        type='checkbox'
                        label='is_private'
                        checked={values.is_private}
                        value={values.is_private}
                        onChange={handleChange}
                        name='is_private'
                        onBlur={handleBlur}
                        isValid={touched.is_private && !errors.is_private}
                      />
                      <ErrorMessage name='is_private'>
                        {msg => <div className='err_below'>{msg}</div>}
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
              <ToastContainer />
            </Container>
          </div>
        )}
      />
    );
  }
}

