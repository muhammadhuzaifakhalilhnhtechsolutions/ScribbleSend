import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

export const getApi = async url => {
  console.log(url);
  try {
    let response = await axios.get(url);
    // console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getApiWithToken = async (url, data, token) => {
  // console.log(url, data,token)
  try {
    let response = await axios.get(url + data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const PostApi = async (url, data, bearertoken) => {
  // console.log('PostApi---------',url, data, bearertoken)
  try {
    let response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${bearertoken}`,
      },
    });
    // console.log(response, "<======response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    // console.log(e.response, "<======e")

    return Promise.reject(e);
  }
};
export const PostApiCreate = async (url, data, bearertoken) => {
  // console.log('PostApi---------',url, data, bearertoken)
  try {
    let response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${bearertoken}`,
      },
    });
    // console.log(response, "<======response")
    if (response.status == 201) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    // console.log(e.response, "<======e")

    return Promise.reject(e);
  }
};

export const PostApiWithOutToken = async (url, data) => {
  console.log(url, data);
  try {
    let response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (error) {
    // console.log('error======<<', error);
    // console.log('error', e.response.data);

    return Promise.reject(error);
  }
};
export const sendDataAndPayments = async (url, data) => {
  // console.log(url, data)
  try {
    let response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    // console.log("error======<<", e);
    console.log('error', e.response.data);
    return Promise.reject(e);
  }
};

export const UpdateProfile = async (url, data) => {
  // console.log(url, data)
  try {
    let response = await axios.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    // console.log("error======<<", e);
    // console.log("error", e.response.data);
    return Promise.reject(e);
  }
};

export const PutApiWithOutToken = async (url, data) => {
  // console.log(url, data)
  try {
    let response = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    // console.log("error======<<", e);
    // console.log("error", e.response.data);
    return Promise.reject(e);
  }
};
export const PostApiWithOutTokenSignUp = async (url, data) => {
  // console.log(url, data)
  try {
    let response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    if (response.status == 201) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    // console.log("error======<<", e);
    // console.log("error", e.response.data);
    return Promise.reject(e);
  }
};

export const PostApiWithOutJson = async (url, data) => {
  // console.log(url, data)
  try {
    let response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    // console.log("error======<<", e);
    // console.log("error", e.response.data);
    return Promise.reject(e);
  }
};

export const PostApiForPayment = async (url, data) => {
  console.log(url, data);
  try {
    let response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status == 200 || 201) {
      return Promise.resolve({
        status: 'success',
        data: response.data,
      });
    }
  } catch (e) {
    console.log('error PostApiForPayment======<<', e);
    console.log('error', e?.response?.data);
    return Promise.reject(e);
  }
};

module.exports = {
  PostApi,
  PostApiCreate,
  PostApiWithOutToken,
  PostApiWithOutTokenSignUp,
  getApi,
  PostApiWithOutJson,
  getApiWithToken,
  UpdateProfile,
  sendDataAndPayments,
  PutApiWithOutToken,
  PostApiForPayment,
};
