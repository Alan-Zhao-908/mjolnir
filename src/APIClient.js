const URL = "https://poll-asgard.herokuapp.com/v1/"

class ApiClient {
  static get(path) {
    let args = { headers: { 'Content-Type': 'application/json' } };
    return fetch(URL + path, args).then((data) => {
      return data.json();
    });
  }

  static post(path, data) {
    let args = { headers: { 'Content-Type': 'application/json' }, body: data, method: 'POST' };
    return fetch(URL + path, args).then((data) => {
      return data.json();
    });
  }
}

export default ApiClient;