import util from "../utils/util";

export default class UserService {
  login(email, password) {
    let body = { email, password };
    return util
      .sendApiRequest("/user/login", "POST", true, body)
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response));
        window.user = response;
        return window.user;
      })
      .catch(e => {
        throw e;
      });
  }


  logout() {
    localStorage.removeItem("user");
    window.user = null;
  }

  getUser(id, withCourse) {
    return util
      .sendApiRequest("/user/" + id + (withCourse ? "/1" : ""), "GET", true)
      .then(
        response => {
          return response;
        },
        error => {
          throw new Error(error);
        }
      );
  }

  editUser(user) {
    return util.sendApiRequest("/user", "PUT", true, user).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }

  listUser(data, start, perpage) {
    const user = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});
    return util
      .sendApiRequest("/user/list/" + start + "/" + perpage, "POST", true, user)
      .then(response => {
        return response;
      })
      .catch(err => {
        throw err;
      });
  }
  addUser(user) {
    return util.sendApiRequest("/user", "POST", true, user).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }
  deleteUser(_id) {
    return util.sendApiRequest("/user/" + _id, "DELETE", true).then(
      response => {
        return response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
