import util from "../utils/util";
const axios = require("axios");

export default class CourseService {
  getCourse(id) {
    return util.sendApiRequest("/course/" + id, "GET", true).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }

  listCourse(data, start, perpage) {
    const blog = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util
      .sendApiRequest("/course/list/" + start + "/" + perpage, "POST", true, blog)
      .then(
        response => {
          return response;
        },
        error => {
          throw new Error(error);
        }
      );
  }
  deleteCourse(id) {
    return util.sendApiRequest("/course/" + id, "DELETE", true).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }
}
