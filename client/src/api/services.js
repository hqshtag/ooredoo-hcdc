import axios from "axios";

export default class Services {
  constructor(endpoint) {
    this.baseurl = "http://localhost:5000/api/" + endpoint;
  }

  get_all = async (token) => {
    let url = this.baseurl;
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return await axios.get(url, config);
  };

  get_one = async (token, id) => {
    let url = `${this.baseurl}/${id}`;
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return await axios.get(url, config);
  };

  create = async (data, token) => {
    let url = `${this.baseurl}/create`;
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return await axios.post(url, data, config);
  };

  create_many = async (data, token) => {
    let url = `${this.baseurl}/create/many`;
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return await axios.post(url, { data }, config);
  };

  update = async (data, id, token) => {
    let url = `${this.baseurl}/update/${id}`;
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return await axios.patch(url, data, config);
  };

  remove = async (id, token) => {
    let url = `${this.baseurl}/delete/${id}`;
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return await axios.delete(url, config);
  };

  removeAll = async (token) => {
    let url = `${this.baseurl}/clear`;
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return await axios.delete(url, config);
  };
}

let alarmServices = new Services("alarm");
alarmServices.create_many = undefined;
alarmServices.update = undefined;

let settingsServices = new Services("config");
settingsServices.get_all = undefined;
settingsServices.get_one = undefined;
settingsServices.removeAll = undefined;
settingsServices.remove = undefined;
settingsServices.create = undefined;
settingsServices.create_many = undefined;
settingsServices.update = async (data, token) => {
  let url = `${settingsServices.baseurl}`;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.patch(url, data, config);
};
settingsServices.get = async (token) => {
  let url = `${settingsServices.baseurl}`;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(url, config);
};

let dataServices = new Services("data");
dataServices.get_all = undefined;
dataServices.get_one = undefined;
dataServices.remove = undefined;
dataServices.create = undefined;
dataServices.create_many = undefined;
dataServices.update = undefined;
dataServices.get_nodes = async (token) => {
  let url = `${dataServices.baseurl}/nodes`;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(url, config);
};
dataServices.get_interfaces = async (token) => {
  let url = `${dataServices.baseurl}/interfaces`;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(url, config);
};

export { alarmServices, dataServices, settingsServices };
