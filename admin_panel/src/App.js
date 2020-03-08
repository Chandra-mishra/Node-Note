import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "react-bootstrap/NavLink";
import { HashRouter, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Logout from "./components/Logout";
import UserList from "./pages/user/userList";
import StudentCoursesList from "./pages/student/studentCourses";
import StudentCourseAdd from "./pages/student/courseAdd";
import StudentCourseEdit from "./pages/student/courseEdit";
import User from "./pages/user/user";
import Course from "./pages/course/course";
import CourseList from "./pages/course/courseList";
import Tag from "./pages/tag/tag";
import TagList from "./pages/tag/tagList";
import CourseTag from "./pages/courseTag/courseTag";
import CourseTagList from "./pages/courseTag/courseTagList";
import UserCourse from "./pages/usercourse/usercourse";
import UserCourseList from "./pages/usercourse/usercourseList";
// import Brochure from "./pages/course/brochure";

class App extends React.Component {
  constructor() {
    super();
    this.state = { isLogin: false };
    if (window.user) {
      this.state.isLogin = true;
    }
    this.handlerLogin = this.handlerLogin.bind(this);
  }

  handlerLogin(islogin) {
    this.setState({ isLogin: islogin });
  }

  render() {
    let navLinks = [];
    if (this.state.isLogin) {
        navLinks = [
          <NavLink key="1" href="#userlist">
            User List
          </NavLink>,
          <NavLink key="5" href="#courselist">
            Course
          </NavLink>,
          <NavLink key="5" href="#taglist">
          Tag
        </NavLink>,
        <NavLink key="5" href="#coursetaglist">
        Course Tag
      </NavLink>,
      <NavLink key="5" href="#usercourselist">
      User Course
    </NavLink>,
          // <NavLink key="8" href="#testimonial">
          //   Testimonial
          // </NavLink>,
          <NavLink key="16" href="#logout">
            Logout
          </NavLink>
        ];
    } else {
      navLinks = [
        <NavLink key="2" href="#login">
          Login
        </NavLink>
      ];
    }

    return (
      <div className="App">
        <HashRouter>
          <Navbar bg="light">
            <Navbar.Brand>
              <img src="assets/buefy.png" alt="Buefy" height="28" />
            </Navbar.Brand>
            {navLinks}
            {this.state.isLogin ? (
              <p
                style={{
                  color: "white",
                  margin: "0px 0 0px 87%",
                  position: "absolute"
                }}
              >
                {/* Welcome <span>{window.user.data.first_name || "User"}</span> */}
              </p>
            ) : (
              <div></div>
            )}
          </Navbar>
          <section className="main-content">
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={props => (
                <Login
                  handlerLoginParent={this.handlerLogin.bind(this)}
                  {...props}
                />
              )}
            />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/courselist" component={CourseList} />
            <PrivateRoute path="/course/add" component={Course} />
            <PrivateRoute path="/course/edit/:id" component={Course} />
            <PrivateRoute
              path="/student/course/list"
              component={StudentCoursesList}
            />
            <PrivateRoute
              path="/student/course/add"
              component={StudentCourseAdd}
            />
            <PrivateRoute
              path="/student/course/edit/:id"
              component={StudentCourseEdit}
            />
            <PrivateRoute path="/user/add" component={User} />
            <PrivateRoute path="/user/edit/:id" component={User} />
            <PrivateRoute path="/userlist" component={UserList} />
            <PrivateRoute path="/tag/add" component={Tag} />
            <PrivateRoute path="/tag/edit/:id" component={Tag} />
            <PrivateRoute path="/taglist" component={TagList} />
            <PrivateRoute path="/coursetag/add" component={CourseTag} />
            <PrivateRoute path="/coursetag/edit/:id" component={CourseTag} />
            <PrivateRoute path="/coursetaglist" component={CourseTagList} />
            
            <PrivateRoute path="/usercourse/add" component={UserCourse} />
            <PrivateRoute path="/usercourse/edit/:id" component={UserCourse} />
            <PrivateRoute path="/usercourselist" component={UserCourseList} />
            {/* <PrivateRoute
              path="/brochure"
              component={Brochure}
            /> */}
          </section>
        </HashRouter>
      </div>
    );
  }
}

export default App;
