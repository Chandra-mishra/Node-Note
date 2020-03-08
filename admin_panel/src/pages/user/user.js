import React from "react";
import { Container, Nav, Navbar, Button, Toast } from "react-bootstrap";
import userservice from "../../services/userService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const axios = require("axios");

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.user_id = props.match.params.id;
    this.state = {
      user: null,
      file: null,
      redirect: false,
      errorMsg: "",
      file: ""
    };

    this.state.user = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      role:"",
      password: "",
      userImagePath: ""
    };
    this.userServ = new userservice();
    if (this.user_id) {
      this.userServ.getUser(this.user_id).then(
        response => {
          if (response.role === "admin") {
              response.role = "Admin";
          }
          if (response.role === "user") {
            response.role = "User";
          }
          if (response.role === "manager") {
            response.role = "Manager";
          }
          this.setState({ user: response });
        },
        error => {
          alert(
            "Opps! Something went wrong not able to fetch User details."
          );
        }
      );
    }
    this.schema = Yup.object({
      first_name: Yup.string()
        .required("first name is Required Field")
        .max(100, "Too Long"),
      last_name: Yup.string().max(100, "Too Long"),
      email: Yup.string()
        .required()
        .email(),
      passsword: Yup.string(),
      phone: Yup.number().required(),
      password: Yup.string(),
    });
  }
  async submitStudentForm(values, actions) {
    actions.setSubmitting(false);
    this.setState({
      user: values
    });
    if (this.state.user.role === "Admin") {
      this.state.user.role = "admin";
    }
    if (this.state.user.role === "User") {
      this.state.user.role = "user";
    }
    if (this.state.user.role === "Manager") {
      this.state.user.role = "manager";
    }
    
    const formData = new FormData();
    for (let prop in this.state.user) {
      formData.append(prop, this.state.user[prop]);
    }
    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + token
      }
    };
    if (this.user_id) {
      try {
        const response = await axios.put(
          window.apiurl + "/user",
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
        .post(window.apiurl + "/user", formData, config)
        .then(res => {
          this.setState({ redirect: true });
        })
        .catch(err => {
          // toast.error(err);
          this.setState({ errorMsg: err.response.data, redirect: false });
        });
    }
  }

  render() {
    let data = "";
    if (this.user_id) {
      data = "Password";
    } else {
      data = "Password*";
    }
    if (this.state.redirect === true) {
      return <Redirect to="/userlist" />;
    }
    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state.user}
        enableReinitialize={true}
        onSubmit={this.submitStudentForm.bind(this)}
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
                <Col> 
                  <Navbar  style ={{backgroundColor :"#eee" , border:"1px solid black" ,borderRadius:"5px" , padding: "7px 0px 9px 0px",height: "auto" }}>
                  {'\xa0'}{'\xa0'}
                      <Link  style ={{color:"#3d4041"}} to={"/useraddress/list/"+this.user_id} >User Address{'\xa0'}{'\xa0'}{'\xa0'}</Link>
                  </Navbar>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <h3>User Detail's</h3>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>First Name*</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.first_name}
                        name="first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.first_name && !errors.first_name}
                      />
                      <ErrorMessage name="first_name">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.last_name}
                        name="last_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.last_name && !errors.last_name}
                      />
                      <ErrorMessage name="last_name">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Phone*</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.phone}
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.phone && !errors.phone}
                      />
                      <ErrorMessage name="phone">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>{data}</Form.Label>
                      <Form.Control
                        type="text"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.password && !errors.password}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Role*</Form.Label>
                      <Form.Control
                        as='select'
                        name='role'
                        value={values.role}
                        onChange={handleChange}
                        isValid={touched.role && !errors.role}>
                        <option> </option>
                        <option>Admin</option>
                        <option>User</option>
                        <option>Manager</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.email}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.email && !errors.email}
                      />
                      <ErrorMessage name="email">
                        {msg => <div className="err_below">{msg}</div>}
                      </ErrorMessage>
                      <div className="errormsg">{this.state.errorMsg}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
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
