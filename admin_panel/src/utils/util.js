export default {
  async sendApiRequest(url, method, setauth, body) {
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };
    if (method === "DELETE") {
      delete requestOptions.body;
    }
    if (method === "GET") {
      delete requestOptions.body;
    }

    if (setauth === true) {
      let token = window.user ? window.user.token : "no-token";
      requestOptions.headers["Authorization"] = token;
    }
    try {
      const response = await fetch(window.apiurl + url, requestOptions);
      let body = await response.text();
      if (response.status != 200) {
        throw body;
      }
      const data = JSON.parse(body);
      return data;
    } catch (e) {
      throw e;
    }
  }
};
