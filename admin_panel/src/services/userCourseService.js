import util from "../utils/util";

export default class UserCourseService {
  getService(id) {
    return util.sendApiRequest("/usercourse/" + id, "GET", true).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }

  editService(service) {
    return util.sendApiRequest("/usercourse", "PUT", true, service).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }

  listService(data, start, length) {
    const faq = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util
      .sendApiRequest("/usercourse/list/" + start + "/" + length, "POST", true, faq)
      .then(
        response => {
          return response;
        },
        error => {
          throw new Error(error);
        }
      );
  }

  addService(service) {
    return util.sendApiRequest("/usercourse", "POST", true, service).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }
  deleteService(id) {
    return util.sendApiRequest("/usercourse/" + id, "DELETE", true).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }
}