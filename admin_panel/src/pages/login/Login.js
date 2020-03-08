import React from "react";
import userservice from "../../services/userService";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      redirect: false
    };
    // this.date = new Date.year()
    this.userv = new userservice();
    this.props.handlerLoginParent(false);
  }

  submitLogin(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.userv
      .login(this.state.username, this.state.password)
      .then(response => {
        this.props.handlerLoginParent(true);
        this.setState({ loading: false, redirect: true });
      })
      .catch(e => {
        console.log(e, "login");
        toast.error(e);
        this.props.handlerLoginParent(false);
        this.setState({ loading: false, redirect: false });
      });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  render() {
    // if (redirect === true && window.user.role===1) {
    //     return <Redirect to='/userlist' />
    // }
    // else if (redirect === true && window.user.role===2) {
    //             return <Redirect to='/orderlist' />
    //         }
    //         else if (redirect === true && window.user.role===3) {
    //             return <Redirect to='/driverlist' />
    //         }
    if (this.state.redirect === true) {
      return <Redirect to="/userlist" />;
    }

    return (
      <div className="login text-center">
        <form className="form-signin" onSubmit={this.submitLogin.bind(this)}>
          <img
            className="mb-4 logo"
            src="assets/buefy.png"
            alt=""
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputUsername" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="inputUsername"
            className="form-control"
            placeholder="Username"
            onChange={this.handleUsernameChange.bind(this)}
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            onChange={this.handlePasswordChange.bind(this)}
            required
          />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button
            className="btn btn-lg btn-primary btn-block setbgcolor"
            type="submit"
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy;2019-2020</p>
        </form>
        <ToastContainer />
      </div>
    );
  }
}
