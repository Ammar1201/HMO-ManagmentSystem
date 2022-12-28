import axios from 'axios';

let myUrl = 'http://localhost:5000/api';

if (process.env.NODE_ENV === 'production') {
  myUrl = 'api';
}

const Api = axios.create({
  baseURL: myUrl,
});

//* ------------------------------GET Requests-------------------------------------------

//* ------------------------------POST Requests-------------------------------------------
export const verifyTokenRequest = async (token, email) => {
  try {
    const res = await Api.post('/patients/verify', { token, email });
    return res.data;
  }
  catch (error) {
    return error.response.data;
    // console.log(error);
  }
};

export const loginRequest = async (credentials) => {
  try {
    const res = await Api.post('/patients/login', credentials);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

//* ------------------------------PATCH Requests-------------------------------------------