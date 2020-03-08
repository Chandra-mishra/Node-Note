import util from "../utils/util";

export default class FaqService {
  getService(id) {
    return util.sendApiRequest("/tags/" + id, "GET", true).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }

  editService(service) {
    return util.sendApiRequest("/tags", "PUT", true, service).then(
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
      .sendApiRequest("/tags/list/" + start + "/" + length, "POST", true, faq)
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
    return util.sendApiRequest("/tags", "POST", true, service).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }
  deleteService(id) {
    return util.sendApiRequest("/tags/" + id, "DELETE", true).then(
      response => {
        return response;
      },
      error => {
        throw new Error(error);
      }
    );
  }
}
