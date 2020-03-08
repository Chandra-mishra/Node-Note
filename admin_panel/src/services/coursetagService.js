import util from "../utils/util";

export default class CourseTagService {
  getService(id) {
    return util.sendApiRequest("/coursetag/" + id, "GET", true).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }

  editService(service) {
    return util.sendApiRequest("/coursetag", "PUT", true, service).then(
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
      .sendApiRequest("/coursetag/list/" + start + "/" + length, "POST", true, faq)
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
    return util.sendApiRequest("/coursetag", "POST", true, service).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }
  deleteService(id) {
    return util.sendApiRequest("/coursetag/" + id, "DELETE", true).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }
}
