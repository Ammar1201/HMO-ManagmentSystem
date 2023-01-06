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
export const loginRequest = async (credentials, path) => {
  try {
    const res = await Api.post(path, credentials);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const getPatientData = async () => {
  try {
    const res = await Api.post('/patients/me', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('patientToken')
      }
    });
    return res.data.patient;
  }
  catch (error) {
    return error.response.data;
  }
};

export const getDoctorData = async () => {
  try {
    const res = await Api.post('/doctors/me', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken')
      }
    });
    return res.data.patient;
  }
  catch (error) {
    return error.response.data;
  }
};

//* ------------------------------PATCH Requests-------------------------------------------
export const updatePatientInfoReq = async (patient) => {
  console.log(patient);
  try {
    const res = await Api.patch('/patients/update', { patient }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    return res.data.patient;
  }
  catch (error) {
    return error.response.data;
  }
};

export const updateDoctorInfoReq = async (doctor) => {
  try {
    const res = await Api.patch('/doctors/update', { doctor }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    return res.data.doctor;
  }
  catch (error) {
    return error.response.data;
  }
};