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
    return await axios.post(url, data, config);
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
}
