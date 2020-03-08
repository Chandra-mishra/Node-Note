import React from "react";
import Container from "react-bootstrap/Container";
import TagService from "../../services/tagService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.tag_id = props.match.params.id;
    this.state = { tag: null, redirect: false };
    this.state.tag = {
      name: ""
    };

    this.tagServ = new TagService();
    if (this.tag_id) {
        this.tagServ.getService(this.tag_id).then(
        response => {
          this.setState({ tag: response });
        },
        error => {
          alert("Opps! Something went wrong not able to fetch Tag details.");
        }
      );
    }
    this.schema = Yup.object({
      name: Yup.string().required()
    });
  }

  submitTagForm(values, actions) {
    actions.setSubmitting(false);

    let tx = values;
    this.setState({
      tag: tx
    });

    if (this.tag_id) {
      this.tagServ.editService(this.state.tag).then(
        response => {
          setTimeout(() => {
            this.setState({ redirect: true });
          }, 2000);
          this.setState({ errorMsg: "" });
          toast.success(response);
        },
        error => {
          this.setState({ redirect: false });
        }
      );
    } else {
      this.tagServ
        .addService(this.state.tag)
        .then(response => {
          this.setState({ redirect: true });
        })
        .catch(err => {
          this.setState({ redirect: false });
        });
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/taglist" />;
    }
    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state.tag}
        enableReinitialize={true}
        onSubmit={this.submitTagForm.bind(this)}
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
                  <Col sm={12}>
                    <h3>Tag Details</h3>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Name*</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.name && !errors.name}
                      />
                      <ErrorMessage name="name">
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
            <ToastContainer />
          </div>
        )}
      />
    );
  }
}
