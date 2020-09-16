import axios from "axios";
const baseurl = "http://localhost:5000/api/users";

export const user_login = async (username, password) => {
  let url = `${baseurl}/login`;
  let body = {
    username,
    password,
  };

  return await axios.post(url, body);
};

export const check_token = async (token) => {
  let url = `${baseurl}/check`;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(url, config);
};

export const get_all = async (token) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(baseurl, config);
};

export const add_user = async (username, password, token) => {
  let url = `${baseurl}/create`;
  let config = {
    headers: { authorization: `Bearer ${token}` },
  };
  let data = {
    username,
    password,
  };

  return await axios.post(url, data, config);
};

export const remove_user = async (id, token) => {
  let url = `${baseurl}/delete/${id}`;
  let config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.delete(url, config);
};

export const change_password = async (token, data) => {
  let url = `${baseurl}/changeme`;
  let config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.patch(url, data, config);
};
